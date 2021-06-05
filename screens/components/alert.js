import React from "react";
import { View, Text } from "react-native";

import { Dimensions } from "react-native";
export default function AlertContainer({ opacity, message }) {
  return (
    <View
      style={{
        position: "absolute",
        top: Dimensions.get("screen").height - 116,
        opacity: opacity,
      }}
    >
      <View
        style={{
          height: 45,
          width: Dimensions.get("screen").width - 32,
          backgroundColor: "white",
          borderRadius: 5,
          marginLeft: 19,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "black",
            letterSpacing: 1,
            textAlign: "left",
            padding: 8,
            fontWeight: "400",
            fontSize: 14,
            textAlignVertical: "center",
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}
