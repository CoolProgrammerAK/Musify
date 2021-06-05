import React from "react";
import { ActivityIndicator} from "react-native";
function Loader() {
  return (
    <ActivityIndicator
      size={32}
      color="white"
      style={{
        fontSize: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
      }}
    ></ActivityIndicator>
  );
}

export default Loader;
