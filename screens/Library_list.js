import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Alert,
  RefreshControl,
} from "react-native";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import Alertbox from "./components/alert";
import Loader from "./components/loader";
import { getsongs, songremove } from "./database/databasemethods";

class Library_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loading: false,
      opacity: 0,
      refreshing: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.refresh();
  }

  deleted = (n, artists) => {
    Alert.alert("Confirmation", "Are you sure you want to delete this song?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async() => {
         await songremove(artists, n);

          this.refresh();
          this.setState({ opacity: 1 });
          setTimeout(() => {
            this.setState({ opacity: 0 });
          }, 2000);
        },
      },
    ]);
  };
  refresh = async () => {
    this.setState({
      playlist_data: [],
      refreshing: true,
      loading: true,
      refreshing: false,
    });

    var result = await getsongs(this.props.route.params.name);

    if (result.data()) {
      this.setState({ loading: false });

      this.setState({
        songs: result.data().songs == undefined ? [] : result.data().songs,
      });
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    const { name, id } = this.props.route.params;
    const { navigation } = this.props;

    return (
      <SafeAreaView
        style={{
          backgroundColor: "black",
          height: Dimensions.get("screen").height,
        }}
      >
        <View
          style={{
            backgroundColor: "black",
            marginVertical: 15,

            margin: 14,
          }}
        >
          <View style={styles.view}>
            <AntDesign
              name="arrowleft"
              size={28}
              color="white"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            ></AntDesign>
            <Text style={styles.text}>{name}</Text>
            <Text>12</Text>
          </View>
          <View style={{ alignItems: "center", marginVertical: 15 }}>
            {this.state.songs.length > 0 ? (
              <Text
                onPress={() =>
                  navigation.navigate("video2", {
                    data: this.state.songs,
                    show: true,
                  })
                }
                style={styles.search}
              >
                PLAY
              </Text>
            ) : (
              <Text
                onPress={() =>
                  navigation.navigate("search", {
                    screen: "search_page",
                    params: { focus: true },
                  })
                }
                style={styles.search}
              >
                Add Songs
              </Text>
            )}
          </View>
        </View>

        <View style={styles.songview}>
          {this.state.loading == false && this.state.songs.length == 0 && (
            <View style={styles.iconView}>
              <FontAwesome
                name="music"
                style={{ marginTop: 9, marginRight: 6, fontWeight: "100" }}
                size={67}
                color="white"
              />
              <Text style={styles.general1}>Save your favourite songs</Text>
              <Text style={styles.general2}>Let them play and be happy</Text>
            </View>
          )}
          {this.state.loading && <Loader></Loader>}
          <View style={{}}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.refresh()}
                ></RefreshControl>
              }
            >
              {this.state.songs.length > 0 &&
                this.state.songs.map((artists, index) => {
                  return (
                    <View style={styles.main} key={artists.id}>
                      <Image
                        source={{ uri: artists.photo }}
                        style={{ width: "17%", height: 57, borderRadius: 8 }}
                      ></Image>
                      <TouchableHighlight
                        onPress={() => {
                          navigation.navigate("video2", {
                            data: this.state.songs,
                            index: index,
                            show: true,
                          });
                        }}
                      >
                        <View style={{ marginRight: 3, paddingLeft: 20 }}>
                          <Text
                            style={styles.title}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                          >
                            {artists.name}
                          </Text>
                          <Text
                            style={styles.subtitle}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                          >
                            {artists.subtitle}
                          </Text>
                        </View>
                      </TouchableHighlight>
                      <Entypo
                        onPress={() => {
                          this.deleted(this.props.route.params.name, artists);
                        }}
                        style={styles.icon}
                        name="trash"
                        size={27}
                        color="white"
                      ></Entypo>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </View>

        <Alertbox
          opacity={this.state.opacity}
          message="Song removed from playlist"
        ></Alertbox>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,

    marginBottom: 9,
  },
  title: {
    fontSize: 15,
    color: "white",
    width: Dimensions.get("screen").width - 133,
  },
  icon: {
    textAlignVertical: "center",
    marginLeft: 7,
    marginRight: 5,
  },

  view: {
    marginRight: 12,
    flexDirection: "row",
    marginBottom: 0,
    justifyContent: "space-between",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
    width: Dimensions.get("screen").width - 136,
    marginTop: 5,
  },
  search: {
    color: "white",
    marginTop: 0,
    marginBottom: 4,
    borderRadius: 34,
    fontWeight: "bold",
    fontSize: 17,
    backgroundColor: "#65c368",
    paddingVertical: 11,
    paddingHorizontal: 45,
  },
  songview: { marginTop: -13, marginBottom: 89, zIndex: -1, flex: 1 },

  main: {
    flexDirection: "row",
    margin: 17,
    marginBottom: 0,
    backgroundColor: "black",
  },
  general1: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 32,
  },
  general2: {
    color: "white",
    fontSize: 12,
    fontWeight: "100",
    letterSpacing: 1,
  },
  iconView: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    marginTop: 110,
  },
});
export default Library_list;
