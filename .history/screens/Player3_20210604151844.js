import React, { Component } from "react";
import { Audio } from "expo-av";
import {
  Text,
  View,
  StyleSheet,
  Slider,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { Ionicons, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { adddata } from "../reducer/action";
import { StackActions } from "@react-navigation/native";

class Player2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false,
      playing: true,
      currentindex: 0,
      volume: 1.0,
      count: 0,
      isBuffering: false,
      playBackInstance: null,
      current: 0,
      remaining: 0,
      duration: 0,
      track: "",
    };
  }
  pad = (n, z) => {
    var seconds = Math.floor((n / 1000) % 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    var minutes = Math.floor((n / (60 * 1000)) % 60);

    return z == 0 ? minutes : seconds;
  };

  minutesAndSeconds = (position) =>
    position ? [this.pad(position, 0), this.pad(position, 1)] : ["0", "00"];

  async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
      playThroughEarpieceAndroid: true,
    });
    if (this.props.route.params.index) {
      this.setState({ currentindex: this.props.route.params.index });
    }
    this.loadAudio();
  }

  handle = () => {
    if (this.state.playBackInstance) {
      this.state.playBackInstance.unloadAsync(() => {
        this.setState({ track: "" });

        this.props.navigation.navigate("home");
      });
    } else {
      this.setState({ track: "", playBackInstance: null });
      this.props.navigation.navigate("home");
    }
  };
  componentWillUnmount() {
    if (this.state.playBackInstance) {
      this.state.playBackInstance.unloadAsync();
    }
  }

  async loadAudio() {
    const { currentindex, volume, playing } = this.state;
    const { data } = this.props.route.params;
    try {
      var playBackInstance = new Audio.Sound();
      this.setState({
        track: this.props.route.params.data[currentindex].track,
        playBackInstance: playBackInstance,
      });
      const source = { uri: this.props.route.params.data[currentindex].track };
      const instatus = {
        shouldPlay: playing,
        volume: volume,
      };
      await playBackInstance.loadAsync(source, instatus, false);

      this.props.adddata(this.props.route.params.data[currentindex]);

      playBackInstance.setOnPlaybackStatusUpdate(this.on);

      BackHandler.addEventListener("hardwareBackPress", this.handle);
      playBackInstance.setOnPlaybackStatusUpdate((result) => {
        console.log(result.durationMillis);
        this.setState({ duration: parseInt(result.durationMillis) });

        this.setState({ current: parseInt(result.positionMillis) });
        if (result.didJustFinish) {
          if (data.length != 1) {
            this.next();
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  on = (status) => {
    this.setState({
      isBuffering: status.isBuffering,
    });
  };
  play = () => {
    this.setState({
      playing: !this.state.playing,
    });

    if (this.state.playBackInstance) {
      if (this.state.playing) {
        this.state.playBackInstance.pauseAsync();
      } else {
        this.state.playBackInstance.playAsync();
      }
    }
  };
  previous = async () => {
    let { playBackInstance, currentindex } = this.state;

    if (playBackInstance) {
      await playBackInstance.unloadAsync();
      currentindex < this.props.route.params.data.length - 1
        ? (currentindex -= 1)
        : (currentindex = 0);

      this.setState({ currentindex });
      this.loadAudio();
    }
  };
  next = async () => {
    let { playBackInstance, currentindex } = this.state;

    if (playBackInstance) {
      await playBackInstance.unloadAsync();
      currentindex < this.props.route.params.data.length - 1
        ? (currentindex += 1)
        : (currentindex = 0);
      this.setState({ currentindex });
      this.loadAudio();
    }
  };
  render() {
    const { data, show } = this.props.route.params;
    const { currentindex } = this.state;

    const elapsed = this.minutesAndSeconds(this.state.current);
    const remaining = this.minutesAndSeconds(
      this.state.duration - this.state.current
    );
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <View style={style.mainView}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          ></AntDesign>
          <Text style={style.headingText}>Songs</Text>
          {!show && (
            <SimpleLineIcons
              onPress={() => {
                this.props.navigation.dispatch(
                  StackActions.push("add_playlist", {
                    name: data[currentindex].name,
                    photo: data[currentindex].photo,
                    subname: data[currentindex].subtitle,
                    id: data[currentindex].id,
                    track: data[currentindex].track,
                  })
                );
              }}
              style={style.headingIcon}
              name="playlist"
              size={27}
              color="white"
            ></SimpleLineIcons>
          )}
          {show && <Text>12</Text>}
        </View>
        <View style={{ marginVertical: 15, alignItems: "center" }}>
          <Image
            style={{ height: 270, width: 270 }}
            source={{
              uri: data[currentindex].photo,
            }}
          ></Image>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text
              style={{ ...style.nameText }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {data[currentindex].name}
            </Text>
            <Text style={style.subname}>{data[currentindex].subtitle}</Text>
          </View>
        </View>

        <>
          <View style={style.slider}>
            <Slider
              value={this.state.current || 0}
              minimumTrackTintColor="white"
              maximumTrackTintColor="white"
              maximumValue={this.state.duration || 1}
            ></Slider>
            {this.state.playBackInstance ? (
              <View style={style.timeView}>
                <Text style={style.white}>
                  {" "}
                  {"0" + elapsed[0] + ":" + elapsed[1]}{" "}
                </Text>
                <Text style={style.white}>
                  {"-" + "0" + remaining[0] + ":" + remaining[1]}
                </Text>
              </View>
            ) : (
              <View style={style.timeView}>
                <Text style={style.white}> {"00" + ":" + "00"} </Text>
                <Text style={style.white}>{"-" + "00" + ":" + "00"}</Text>
              </View>
            )}
          </View>
          <View style={style.bottomView}>
            <TouchableOpacity
              onPress={() => {
                this.state.currentindex != 0 ? this.previous() : null;
              }}
            >
              <Ionicons
                size={32}
                style={{
                  color: this.state.currentindex != 0 ? "white" : "grey",
                }}
                name="md-rewind"
              ></Ionicons>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.play();
              }}
            >
              {this.state.playing ? (
                <Ionicons
                  size={45}
                  style={style.icon}
                  name="md-pause"
                ></Ionicons>
              ) : (
                <Ionicons
                  size={45}
                  style={style.icon}
                  name="md-play"
                ></Ionicons>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.state.currentindex != data.length - 1 ? this.next() : null;
              }}
            >
              <Ionicons
                size={32}
                style={{
                  color:
                    this.state.currentindex != data.length - 1
                      ? "white"
                      : "grey",
                }}
                name="md-fastforward"
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </>
      </View>
    );
  }
}

const mapstatetoprops = (state) => ({
  data: state.data,
});
const mapdispatchtoprops = (dispatch) => {
  return {
    adddata: (link) => dispatch(adddata(link)),
  };
};

const style = StyleSheet.create({
  mainView: {
    marginTop: 9,
    marginHorizontal: 9,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,

    marginBottom: 9,
    alignItems: "center",
  },
  headingIcon: {
    textAlignVertical: "center",
    marginLeft: 7,
    marginRight: 5,
  },
  nameText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    paddingHorizontal: 4,
  },
  subname: { color: "orange", fontSize: 15, textAlign: "center" },
  slider: {
    width: 350,
    marginTop: 22,
    marginRight: "11%",
    marginLeft: 9,
  },
  white: { color: "white" },
  timeView: { flexDirection: "row", justifyContent: "space-between" },
  bottomView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: -22,
  },
  icon: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: "white",
    width: 80,
    textAlign: "center",
  },
});
export default connect(mapstatetoprops, mapdispatchtoprops)(Player2);
