import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  Text,
  View,
  Slider,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { Ionicons, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { adddata } from "../reducer/action";
import { StackActions } from "@react-navigation/native";

function Player({
  route: {
    params: { data, show,index },
  },
  navigation,
}) {
  const [state, setstate] = useState({
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
    value: 0,
  });
  useEffect(() => {
    audioinitialise(){}
   audioinitialise()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={style.mainView}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        ></AntDesign>
        <Text style={style.headingText}>Song</Text>
        {!show && (
          <SimpleLineIcons
            onPress={() => {
              navigation.dispatch(
                StackActions.push("add_playlist", {
                  name: data[state.currentindex].name,
                  photo: data[state.currentindex].photo,
                  subname: data[state.currentindex].subtitle,
                  id: data[state.currentindex].id,
                  track: data[state.currentindex].track,
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
      <View style={{ marginVertical: 8, alignItems: "center" }}>
        <Image
          style={{ height: 270, width: 270 }}
          source={{
            uri: data[state.currentindex].photo,
          }}
        ></Image>
        <View style={{ alignItems: "center", marginVertical: 15 }}>
          <Text style={style.nameText}>{data[state.currentindex].name}</Text>
          <Text style={style.subname}>{data[state.currentindex].subtitle}</Text>
        </View>
      </View>
      <View style={style.slider}>
        <Slider
          value={state.current || 0}
          minimumTrackTintColor="white"
          maximumTrackTintColor="white"
          maximumValue={state.duration || 1}
        ></Slider>
        {state.playBackInstance ? (
          <View style={style.timeView}>
            <Text style={style.white}>
              {" "}
              {/* {"0" + elapsed[0] + ":" + elapsed[1]}{" "} */}
            </Text>
            <Text style={style.white}>
              {/* {"-" + "0" + remaining[0] + ":" + remaining[1]} */}
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
        <Ionicons
          size={32}
          style={{ color: "white", opacity: 0.6 }}
          name="md-rewind"
        ></Ionicons>

        <TouchableOpacity
          onPress={() => {
            // this.play();
          }}
        >
          {state.playing ? (
            <Ionicons size={45} style={style.icon} name="md-pause"></Ionicons>
          ) : (
            <Ionicons size={45} style={style.icon} name="md-play"></Ionicons>
          )}
        </TouchableOpacity>

        <Ionicons
          size={32}
          style={{ color: "white", opacity: 0.6 }}
          name="md-fastforward"
        ></Ionicons>
      </View>
    </View>
  );
}
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
const mapstatetoprops = (state) => ({
  songdata: state.data,
});
const mapdispatchtoprops = (dispatch) => {
  return {
    adddata: (link) => dispatch(adddata(link)),
  };
};

export default connect(mapstatetoprops, mapdispatchtoprops)(Player);
