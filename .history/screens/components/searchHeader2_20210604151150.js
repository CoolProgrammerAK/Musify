import React from 'react'
import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
  } from "react-native";
const Search_header2 = ({ name, photo, subname, id, track }) => {
    const navigation = useNavigation();
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("video2", {
            name: name,
            photo: photo,
            subname: subname,
            id: id,
            track: track,
          });
        }}
      >
        <View
          style={styles.main}
        >
          <Image
            source={{ uri: photo }}
            style={styles.image}
          ></Image>
          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{ fontSize: 16, color: "white" }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text
              style={styles.text}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {subname}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );

  };
  const styles = StyleSheet.create({
    main: {
        flexDirection: "row",
        margin: 10,
        padding: 7,
        flex: 1,
        marginBottom: 0,
        marginRight: 67,
        marginTop: 6,
      },
   
    text: {
        fontSize: 12,
        color: "white",

        fontWeight: "400",
        marginTop: 5,
        opacity: 0.7,
      },
   image: {width: "24%", height: 78, borderRadius: 5},
  });
  export default Search_header2