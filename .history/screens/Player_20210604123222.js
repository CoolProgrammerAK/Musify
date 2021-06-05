import React, { useState } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  Text,
  View,
  Slider,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { Ionicons, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

function Player({ name, photo, subname, key, track, show, id }) {
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
        <Text style={style.headingText}>Song</Text>
        {!show && (
          <SimpleLineIcons
            onPress={() => {
              this.props.navigation.dispatch(
                StackActions.push("add_playlist", {
                  name: name,
                  photo: photo,
                  subname: subname,
                  id: id,
                  track: track,
                })
              );
            }}
            style={style.headingO}
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
            uri: photo,
          }}
        ></Image>
        <View style={{ alignItems: "center", marginVertical: 15 }}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 22,
              textAlign: "center",
            }}
          >
            {name}
          </Text>
          <Text style={{ color: "orange", fontSize: 15, textAlign: "center" }}>
            {subname}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 350,
          marginTop: 22,
          marginRight: "11%",
          marginLeft: 9,
        }}
      >
        <Slider
          value={this.state.current || 0}
          minimumTrackTintColor="white"
          maximumTrackTintColor="white"
          maximumValue={this.state.duration || 1}
        ></Slider>
        {this.state.playBackInstance ? (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "white" }}>
              {" "}
              {"0" + elapsed[0] + ":" + elapsed[1]}{" "}
            </Text>
            <Text style={{ color: "white" }}>
              {"-" + "0" + remaining[0] + ":" + remaining[1]}
            </Text>
          </View>
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "white" }}> {"00" + ":" + "00"} </Text>
            <Text style={{ color: "white" }}>{"-" + "00" + ":" + "00"}</Text>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
          marginTop: -22,
        }}
      >
        <Ionicons
          size={32}
          style={{ color: "white", opacity: 0.6 }}
          name="md-rewind"
        ></Ionicons>

        <TouchableOpacity
          onPress={() => {
            this.play();
          }}
        >
          {this.state.playing ? (
            <Ionicons
              size={45}
              style={{
                padding: 15,
                borderRadius: 50,
                backgroundColor: "white",
                width: 80,
                textAlign: "center",
              }}
              name="md-pause"
            ></Ionicons>
          ) : (
            <Ionicons
              size={45}
              style={{
                padding: 15,
                borderRadius: 50,
                backgroundColor: "white",
                width: 80,
                textAlign: "center",
              }}
              name="md-play"
            ></Ionicons>
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
});
export default Player;
