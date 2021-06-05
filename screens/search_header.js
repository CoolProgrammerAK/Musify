import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Search_header2 from "./components/searchHeader2";
import Loader from "./components/loader";

class header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",

      artist: [],
      loading: false,
      artist2: [],
    };
  }
  fetch = () => {
    this.setState({ loading: true, artist: [], artist2: [] });
    fetch(
      `https://shazam.p.rapidapi.com/search?locale=en-US&offset=0&limit=10&term=${this.state.search}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "shazam.p.rapidapi.com",
          "x-rapidapi-key":
            "7c4e787cfamsh9516aa3008ea7cfp145342jsn1cad45f4d3be",
        },
        //
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.tracks.hits.length) {
          response.tracks.hits.forEach((element) => {
            this.setState({ loading: false });

            if (
              element.track.images.coverart != undefined &&
              element.track.hub.actions[1]
            ) {
              if (this.state.artist.length) {
                if (
                  this.state.artist.filter(
                    (artist) => artist.id == element.track.key
                  ).length == 0
                ) {
                  this.setState((prev) => ({
                    artist: [
                      {
                        name: element.track.title,
                        subtitle: element.track.subtitle,
                        id: element.track.key,
                        photo: element.track.images.coverart,
                        track: element.track.hub.actions[1].uri,
                      },
                      ...prev.artist,
                    ],
                  }));
                }
              }
              //e3boDT1JGid2a
              else if (!this.state.artist.length) {
                this.setState((prev) => ({
                  artist: [
                    {
                      name: element.track.title,
                      subtitle: element.track.subtitle,
                      id: element.track.key,
                      photo: element.track.images.coverart,
                      track: element.track.hub.actions[1].uri,
                    },
                    ...prev.artist,
                  ],
                }));
              }
              this.setState({ artist2: this.state.artist });
            } else {
              this.setState({ loading: true });
            }
          });
        } else {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Entered song/artist is not in our data
              </Text>
            </View>
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { focus } = this.props.route.params;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          height: Dimensions.get("screen").height,
        }}
      >
        <View style={styles.main}>
          <Ionicons
            style={{ marginTop: 6, marginLeft: 6 }}
            name={"md-arrow-back"}
            onPress={() => this.props.navigation.goBack()}
            color="white"
            size={35}
          ></Ionicons>
          <TextInput
            placeholder="Search"
            placeholderTextColor="black"
            style={styles.textfield}
            autoFocus={focus ? focus : null}
            onChangeText={(text) => this.setState({ search: text })}
            value={this.state.search}
            // onSubmitEditing={this.fetch()}
            onSubmitEditing={() => this.fetch()}
          ></TextInput>

          <AntDesign
            name="search1"
            style={{ marginTop: 9, marginRight: 6 }}
            size={25}
            color="white"
          />
        </View>

        <View style={{ marginBottom: 3, flex: 1 }}>
          <ScrollView>
            {this.state.loading && <Loader></Loader>}
            {this.state.artist2.length
              ? this.state.artist2.map((artists) => {
                  if (artists.photo) {
                    return (
                      <Search_header2
                        key={artists.id}
                        track={artists.track}
                        id={artists.id}
                        photo={artists.photo}
                        name={artists.name}
                        subname={artists.subtitle}
                      ></Search_header2>
                    );
                  }
                })
              : null}
          </ScrollView>
        </View>
        {this.state.artist == "" && (
          <View style={styles.textview}>
            <AntDesign
              name="search1"
              style={{ marginTop: 9, marginRight: 6, fontWeight: "100" }}
              size={67}
              color="white"
            />
            <Text style={styles.text}>Find the music you love</Text>
            <Text style={styles.text2}>Search for artists,songs and more</Text>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    height: 55,
    marginTop: 0,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 4,
    padding: 4,
  },
  textview: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    marginTop: "-50%",
  },
  textfield: {
    width: "78%",
    backgroundColor: "#e6e6e6",
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 3,
    marginTop: 2,
    marginBottom: 2,
    height: 43,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
    lineHeight: 32,
  },
  text2: {
    color: "white",
    fontSize: 12,
    fontWeight: "100",
    letterSpacing: 1,
  },
});
export default header;
