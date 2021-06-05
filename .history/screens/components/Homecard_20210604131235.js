import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Homecard = ({ data, name, index }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("video", { data: data, index: index });
      }}
    >
      <View style={style.margin}>
        <View style={style.imageview}>
          <Image
            source={{ uri: data[index].photo }}
            style={style.image}
          ></Image>
          <View style={{ marginTop: 12 }}>
            <Text style={style.text} ellipsizeMode="tail" numberOfLines={1}>
              {name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  text: { color: "white", fontSize: 12, textAlign: "center" },
  margin: {
    borderRadius: 4,
    marginTop: 15,
    marginRight: 17,
    marginLeft: 5,
    marginBottom: 16,
  },
  imageview: { flexDirection: "column", width: 120, height: 165 },
  image: {
    height: 135,
    borderRadius: 12,
  },
});
export default Homecard;
