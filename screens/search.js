import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import Card from "./Card";
class search extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <ScrollView
        onscrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <View style={styles.textview}>
            <Text style={styles.text}>Search</Text>
            <TextInput
              style={styles.textfield}
              placeholderTextColor="black"
              placeholder="Artists,songs,or podcasts"
              onFocus={() =>
                navigation.navigate("search_page", { focus: true })
              }
            />
          </View>

          <Card />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  textview: {
    flexDirection: "column",
    textAlign: "center",
    marginTop: 64,
  },
  textfield: {
    height: 50,
    width: "90%",
    fontSize: 15,
    borderColor: "white",
    color: "#000",
    backgroundColor: "white",
    borderWidth: 1,
    textAlign: "center",
    padding: 9,
    borderRadius: 5,
    marginTop: 16,
    paddingTop: 10,
    marginHorizontal: 17,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 33,
    fontWeight: "bold",
  },
});
export default search;
