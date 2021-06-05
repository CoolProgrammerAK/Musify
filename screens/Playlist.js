import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import PlaylistCard from './components/playlistCard'
import { connect } from "react-redux";


class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, photo, data } = this.props.route.params;
    const { navigation} = this.props;
    return (
      <SafeAreaView
        style={{
          backgroundColor: "black",

          height: Dimensions.get("screen").height,
        }}
      >
        <View
          style={styles.main}
        >
          <Text
            style={styles.title}
          >
            {title}
          </Text>
          <Image
            style={{ height: 100, width: 100, borderRadius: 70 }}
            source={{ uri: photo }}
          ></Image>
          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <Text
              onPress={() => navigation.navigate("video2", { data })}
              style={styles.text}
            >
              PLAY
            </Text>
          </View>
        </View>
        <View style={{ marginTop: -13, marginBottom: 89, zIndex: -1, flex: 1 }}>
          <ScrollView>
            {data.map((artists, index) => {
              return (
                <PlaylistCard key={artists.id} data={data} index={index} />
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles=StyleSheet.create({
  main:{
    backgroundColor: "black",
    marginVertical: 15,
    alignItems: "center",
    margin: 14,
  },
  text:{
    color: "white",
    marginTop: 0,
    marginBottom: 4,
    borderRadius: 34,
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "#65c368",
    paddingVertical: 11,
    paddingHorizontal: 45,
  },
  title:{
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 9,
  },
  
  
})

const mapstatetoprops = (state) => ({
  opacity: state.opacity,
  message: state.message,
});

export default connect(mapstatetoprops)(Playlist);
//Neha
