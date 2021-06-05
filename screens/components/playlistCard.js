import React from "react";
import { StackActions, useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
  TouchableHighlight,
  
  } from "react-native";
  
const PlaylistCard = ({ data, index }) => {
  const navigation = useNavigation();

  return (
    <View
      style={styles.main}
    >
      <Image
        source={{ uri: data[index].photo }}
        style={styles.image}
      ></Image>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("video2", { data: data, index: index });
        }}
      >
        <View style={{ marginRight: 3, paddingLeft: 20 }}>
          <Text
            style={styles.text}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {data[index].name}
          </Text>
          <Text
            style={styles.text2}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {data[index].subtitle}
          </Text>
        </View>
      </TouchableHighlight>
      <SimpleLineIcons
        onPress={() => {
          navigation.dispatch(
            StackActions.push("add_playlist", {
              name: data[index].name,
              photo: data[index].photo,
              subname: data[index].subtitle,
              id: data[index].id,
              track: data[index].track,
            })
          );
        }}
        style={styles.icon}
        name="playlist"
        size={27}
        color="white"
      ></SimpleLineIcons>
    </View>
  );
  
};
const styles=StyleSheet.create({
  main:{
    
        flexDirection: "row",
        margin: 17,
        marginBottom: 0,
        backgroundColor: "black",
      
  },
  image:{
      width: "17%", height: 57, borderRadius: 8
  },
  text:{
    fontSize: 15,
    color: "white",
    width: Dimensions.get("screen").width - 133,
  },
  text2:{
    fontSize: 12,
    color: "gray",
    width: Dimensions.get("screen").width - 136,
    marginTop: 5,
  },
  icon:{
       textAlignVertical: "center", marginLeft: 7, marginRight: 5 }
  
})
export default PlaylistCard