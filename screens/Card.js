
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import Littlecard from './components/littlecard'
import {Neha,Arijit,Sonu,Guru,Dhvani,Darshan,Armaan,Jubin,Sidhu,Vishal,Diljeet,Rehman} from '../data/singerssong.js'
import {NehaPhoto,ArijitPhoto,ArmanPhoto,DarshanPhoto,DhvaniPhoto,DiljeetPhoto,SidhuPhoto,SonuPhoto,RehmanPhoto,JubinPhoto,VishalPhoto,GuruPhoto} from '../data/photo'
class Card extends Component {
  render() {
    

    return (
      <View style={{ marginHorizontal: 16, marginVertical: 19, flex: 1 }}>
        <View style={{ marginBottom: 5 }}>
          <Text
            style={styles.text}
          >
            My top singers
          </Text>
        </View>

        <View
          style={styles.cardview}
        >
          <Littlecard
            data={Arijit}
            title="Arijit singh"
            colored="red"
            photo={ArijitPhoto}
          />
          <Littlecard
            data={Armaan}
            title="Armaan Malik"
            colored="blue"
            photo={ArmanPhoto}
          />
          <Littlecard
            data={Diljeet}
            title="Diljeet"
            colored="brown"
            photo={DiljeetPhoto}
          />
          <Littlecard
            data={Vishal}
            title="Vishal-Shekhar"
            colored="orange"
            photo={VishalPhoto}
          />
          <Littlecard
            data={Rehman}
            title="AR Rehman"
            colored="green"
            photo={RehmanPhoto}
          />
          <Littlecard
            data={Sidhu}
            title="Sidhu Moosewala"
            colored="#4B0082"
            photo={SidhuPhoto}
          />
          <Littlecard
            data={Neha}
            title="Neha Kakkar"
            colored="#FF00FF"
            photo={NehaPhoto}
          />
          <Littlecard
            data={Sonu}
            title="Sonu Nigam"
            colored="#FF4500"
            photo={SonuPhoto}
          />
          <Littlecard
            data={Guru}
            title="Guru Randhawa"
            colored="#008080"
            photo={GuruPhoto}
          />
          <Littlecard
            data={Darshan}
            title="Darshan Raval"
            colored="blue"
            photo={DarshanPhoto}
          />
          <Littlecard
            data={Dhvani}
            title="Dhavani Bhanushali"
            colored="#483D8B"
            photo={DhvaniPhoto}
          />
          <Littlecard
            data={Jubin}
            title="Jubin Nautiyal"
            colored="red"
            photo={JubinPhoto}
          />
        </View>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  cardview:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 13,
    zIndex: -3,
  },
  text:{
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    zIndex: -4,
  }
})
export default Card;
