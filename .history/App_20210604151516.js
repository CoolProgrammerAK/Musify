import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import Search from "./screens/search.js";
import Header from "./screens/search_header.js";
import Player2 from "./screens/Player3.js";
import Library from "./screens/library.js";
import Home from "./screens/home.js";
import Library_List from "./screens/Library_list.js";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import Playlist from "./screens/Playlist.js";
import add_library from "./screens/add_library.js";
import reducer from "./reducer/reducer.js";
import thunk from "redux-thunk";
const store = createStore(reducer, applyMiddleware(thunk));
const Stack = createStackNavigator();
function stacks() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="search_icon">
      <Stack.Screen name="search_icon" component={Search} />
      <Stack.Screen name="search_page" component={Header} />
      <Stack.Screen name="playlist" component={Playlist} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function Wideo() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="roothome">
        <Stack.Screen name="roothome" component={Appp}></Stack.Screen>
        <Stack.Screen name="video2" component={Player2} />
        <Stack.Screen name="add_playlist" component={add_library} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Wlaylist() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="library" component={Library}></Stack.Screen>
      <Stack.Screen name="library_list" component={Library_List} />
    </Stack.Navigator>
  );
}

function Appp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "search") {
            iconName = "search";
          } else if (route.name === "Playlist") {
            iconName = "playlist-add";
          }
          return <MaterialIcons name={iconName} size={32} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "gray",
        activeBackgroundColor: "black",
        inactiveBackgroundColor: "black",
      }}
    >
      <Tab.Screen name="home" component={Home}></Tab.Screen>
      <Tab.Screen name="search" component={stacks}></Tab.Screen>
      <Tab.Screen name="Playlist" component={Wlaylist}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="black" barStyle="light-content"></StatusBar>
        <Wideo />
      </View>
    </Provider>
  );
}
