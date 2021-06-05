import React from "react";
import { TouchableHighlight, StyleSheet, View, Text } from "react-native";

import { Entypo } from "@expo/vector-icons";

function Touchablecard({
  item,
  navigation,
  deletecard,
  library,
  addcard,
}) {
  return (
    <TouchableHighlight
      key={item.id}
      onPress={() => {
        library
          ? navigation.navigate("library_list", {
              name: item.title,
              id: item.id,
            })
          : addcard(item.title);
      }}
      onLongPress={() => {
        library && deletecard(item.id, item.title);
      }}
    >
      <View style={{ flexDirection: "row", margin: 5 }}>
        <Entypo name="folder-music" size={55} style={styles.icon2} />
        <Text
          style={{
            fontSize: 20,
            color: "white",
            textAlignVertical: "center",
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  icon2: {
    //   borderColor: "white",
    marginHorizontal: 16,
    backgroundColor: "black",
    width: 60,
    color: "white",
    textAlign: "center",
  },
});
export default Touchablecard;
