import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Alertbox from "./components/alert";
import Addmodal from "./components/modal";
import Touchablecard from "./components/touchableCard";
import Loader from "./components/loader";
import { deleteplaylist, getplaylist, postData } from "./database/databasemethods";
class library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      text: "",
      playlist_data: [],
      opacity: 0,
      loading: false,
      error: "",
      refreshing: false,
      songs: [],
    };
  }
  UNSAFE_componentWillMount() {
    try {
      this.refresh();
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  refresh = async () => {
    this.setState({
      playlist_data: [],
      error: "",
      refreshing: true,
      loading: true,
      refreshing: false,
    })
     try{

      var result = await getplaylist()
     
    if (result.docs) {
      this.setState({ loading: false, refreshing: false });
      result.docs.map((data) => {
        this.setState((prev) => ({
          playlist_data: [
            { title: data.data().title, id: data.id },
            ...prev.playlist_data,
          ],
        }));
      });
    }}
    catch(e){
      console.log(e)
    }
  };
  delete = (id, val) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this playlist?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
          await deleteplaylist(id, val);
            this.refresh();
            this.setState({opacity:1})
            setTimeout(() => {
              this.setState({opacity:0})
            }, 2000);
          },
        },
      ]
    );
  };
  postdata = async () => {
    if (this.state.text) {
      await postData(this.state.text);

      this.refresh();
      this.setState({ modal: false, text: "", error: "" });
    } else {
      this.setState({ error: "Please enter playlist name" });
    }
  };
  modalclose = () => {
    this.setState({ modal: false, error: false });
  };
  changehandler = (e) => {
    this.setState({ text: e, error: "" });
  };
  render() {
    return (
      <View style={{ backgroundColor: "black", flex: 1 }}>
        <View style={{ margin: 21 }}>
          <Text style={styles.text}>Playlist</Text>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.refresh()}
              ></RefreshControl>
            }
          >
            <TouchableHighlight onPress={() => this.setState({ modal: true })}>
              <View style={{ flexDirection: "row", margin: 5 }}>
                <Ionicons
                  onPress={() => this.setState({ modal: true })}
                  name="md-add"
                  size={34}
                  color="white"
                  style={styles.icon}
                />

                <Text
                  style={{
                    fontSize: 25,
                    color: "white",
                    textAlignVertical: "center",
                  }}
                >
                  Create
                </Text>
              </View>
            </TouchableHighlight>
            {this.state.loading && <Loader></Loader>}
            <View>
              {this.state.playlist_data &&
                this.state.playlist_data.map((item, index) => {
                  return (
                    <Touchablecard
                      key={item.id}
                      item={item}
                      deletecard={this.delete}
                      navigation={this.props.navigation}
                      library={true}
                      addcard={null}
                    ></Touchablecard>
                  );
                })}
            </View>
          </ScrollView>
        </View>

        <Alertbox
          opacity={this.state.opacity}
          message="Playlist deleted successfully"
        ></Alertbox>

        <Addmodal
          modal={this.state.modal}
          text={this.state.text}
          post={this.postdata}
          close={this.modalclose}
          change={this.changehandler}
          error={this.state.error}
        ></Addmodal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: "white",
    width: 123,
    fontSize: 27,
    textAlign: "left",
    fontWeight: "bold",
    letterSpacing: 0.986,
    borderBottomWidth: 2,
    borderColor: "white",
  },
  icon: {
    borderColor: "white",
    marginHorizontal: 16,
    backgroundColor: "#282c35",
    textAlignVertical: "center",
    width: 56,
    marginTop: 0,
    height: 56,
    margin: 3,
    textAlign: "center",
  },
});
export default library;
