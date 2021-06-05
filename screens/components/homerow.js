import React from "react";
import Homecard from "./Homecard";

import { View, Text, StyleSheet, ScrollView } from "react-native";
const Home2 = ({ data, text }) => {
  return (
    <View
      style={styles.main}
    >
      <Text
        style={styles.text}
      >
        {text}
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row" }}>
          {data.map((artists, index) => {
            return (
              <Homecard
                key={artists.id}
                data={data}
                name={artists.name}
                index={index}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
const styles=StyleSheet.create({
    main:{
        flexDirection: "column",
        marginTop: "7%",
        marginHorizontal: "2%",
      },
    text:{
        color: "white",
        textAlign: "left",
        fontSize: 19,
        fontWeight: "bold",
      }
})
export default Home2;
