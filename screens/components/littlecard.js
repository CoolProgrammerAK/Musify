import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
} from "react-native";

const Littlecard = ({ title, colored, photo, data }) => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate("playlist", { title, photo, data, colored })
      }
    >
      <View style={{ ...styles.cardview, backgroundColor: colored }}>
        <ImageBackground
          source={{ uri: photo }}
          style={{ justifyContent: "center", flex: 1 }}
          imageStyle={{ flex: 1, resizeMode: "cover", opacity: 0.4 }}
        >
          <Text style={styles.text}>{title}</Text>
        </ImageBackground>
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  cardview: {
    height: 100,
    width: 150,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: "center",
    zIndex: -4,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "400",
  },
});
export default Littlecard;
