import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { StackActions } from "@react-navigation/native";
import { alert } from "../reducer/action";
import Alertbox from "./components/alert";
import Addmodal from "./components/modal";
import Touchablecard from "./components/touchableCard";
import Loader from "./components/loader";
import { postData, addSong, getplaylist } from "./database/databasemethods";

class add_library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      text: "",
      playlist_data: [],
      loading: false,buttonloading:false,
      error: "",
      opacity: 0,
      message: "",
    };
  }
  componentDidMount() {

      this.refresh();
    
  }

  refresh = async () => {
    this.setState({ loading: true, playlist_data: [], error: "" });

    var result =await getplaylist()
    if (result.docs) {
      this.setState({ loading: false });
      result.docs.map((data) => {
        this.setState((prev) => ({
          playlist_data: [
            { title: data.data().title, id: data.id },
            ...prev.playlist_data,
          ],
        }));
      });
    }
  };
  postdata = async () => {
    if (this.state.text) {
      
      this.setState({buttonloading:true})
      await postData( this.state.text,this.props.route.params,);
    
      this.setloader("Playlist is created and updated", 1);
      setTimeout(() => {
        this.props.navigation.dispatch(StackActions.pop());
        this.setloader("", 0);
      }, 2000);
      this.setState({ modal: false, text: "", error: "" });
    } else {
      this.setState({ error: "Please enter playlist name" });
    }
  };

  addsong = async (val) => {
    await addSong(val, this.props.route.params);
    this.setloader("Song is added in the playlist", 1);
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.pop());
      this.setloader("", 0);
    }, 2000);
  };

  modalclose = () => {
    this.setState({ modal: false, error: "",text:"",buttonloading:false });
  };
  changehandler = (e) => {
    this.setState({ text: e, error: "" });
  };
  setloader = (msg, opacity) => {
    this.setState({
      opacity: opacity,
      message: msg,
    });
  };
  render() {
    return (
      <View style={{ backgroundColor: "black", flex: 1 }}>
        <View style={styles.main}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          ></AntDesign>
          <Text style={styles.textHeading}>Add to Playlist</Text>
          <Text>12</Text>
        </View>
        <View style={{ alignItems: "center", marginVertical: 15 }}>
          <Text
            onPress={() => this.setState({ modal: true })}
            style={styles.text}
          >
            NEW PLAYLIST
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.loading && <Loader></Loader>}
          <ScrollView>
            <View>
              {this.state.playlist_data &&
                this.state.playlist_data.map((item, index) => {
                  return (
                    <Touchablecard
                      key={item.id}
                      item={item}
                      deletecard={null}
                      navigation={null}
                      library={false}
                      addcard={this.addsong}
                    ></Touchablecard>
                  );
                })}
            </View>
          </ScrollView>
        </View>
        <Addmodal
          modal={this.state.modal}
          text={this.state.text}
          loading={this.state.buttonloading}
          post={this.postdata}
          close={this.modalclose}
          change={this.changehandler}
          error={this.state.error}
        ></Addmodal>
        <Alertbox
          opacity={this.state.opacity}
          message={this.state.message}
        ></Alertbox>
      </View>
    );
  }
}
const mapdispatchtoprops = (dispatch) => {
  return {
    alerts: (link) => dispatch(alert(link)),
  };
};
const styles = StyleSheet.create({
  main: {
    margin: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textHeading: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,

    marginBottom: 9,
    alignItems: "center",
  },
  text: {
    color: "white",
    marginTop: 0,
    marginBottom: 4,
    borderRadius: 34,
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "#65c368",
    paddingVertical: 11,
    paddingHorizontal: 45,
  },
});
export default connect(null, mapdispatchtoprops)(add_library);
