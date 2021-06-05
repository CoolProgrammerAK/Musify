import React from "react";
import { View, Text, StyleSheet, Modal, TextInput, ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";

function Addmodal({ modal, text, close, post, error, change,loading }) {
  return (
    <Modal
      animationType="slide"
      visible={modal}
      transparent={false}
      onRequestClose={() => close()}
    >
      <View style={styles.view}>
        <Text style={styles.text}>Add Playlist Name</Text>
        <TextInput
          value={text}
          onChangeText={(e) => change(e)}
          style={styles.input}
        ></TextInput>
        {!text && <Text style={styles.error}>{error}</Text>}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.cancel} onPress={() =>post()} >
            {loading ? <ActivityIndicator
      size={32}
      color="white"
      style={{
        fontSize: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
      }}
    ></ActivityIndicator>:"Save"}
           
          </Text>
          <Text onPress={() => close()} style={styles.save}>
            Cancel
          </Text>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  text: { color: "white", fontWeight: "bold", fontSize: 25 },
  cancel: {
    color: "black",
    width: 90,
    backgroundColor: "white",
    height: 39,
    borderRadius: 8,
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    
    marginRight: 13,
  },
  save: {
    color: "white",
    width: 90,
    textAlignVertical: "center",
    backgroundColor: "#0f0f0f",
    borderColor: "white",
    borderWidth: 2,
    height: 39,
    borderRadius: 8,
    fontSize: 20,
    textAlign: "center",
  },

  input: {
    color: "white",
    backgroundColor: "black",
    textAlign: "center",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    width: Dimensions.get("screen").width - 100,
    marginVertical: 35,

    fontSize: 18,
  },
  error: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    marginTop: -32,
    marginBottom: 14,
  },

  view: {
    backgroundColor: "black",
    flex: 1,
    flexDirection: "column",
    width: Dimensions.get("screen").width,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Addmodal;
