import React, { Component } from "react";
import {  View, ScrollView } from "react-native";
import { connect } from "react-redux";
import {Englishsongs,Sadsongs,Partysongs,Punjabisongs,Rapsongs} from '../data/categorysong'
import {data1,data2,data3,data4,data5} from '../data/moviewisesong'
import Homerow from './components/homerow'
class home extends Component {
  render() {
   
    
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <View>
          Musify
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
          {this.props.data.length > 0 && (
            <Homerow text="Recent" data={this.props.data} />
          )}
          <Homerow text="Punjabi" data={Punjabisongs} />
          <Homerow text="Romantic" data={Sadsongs} />
          <Homerow text="English " data={Englishsongs} />

          <Homerow text="Rap" data={Rapsongs} />
          <Homerow text="Party" data={Partysongs} />
          
          <Homerow text="Sonu ke titu ke sweety" data={data1} />
          <Homerow text="Ae dil hain mushkil" data={data2} />
          <Homerow text="Kabir singh" data={data3} />
          <Homerow text="Marjaavan" data={data4} />
          <Homerow text="Street Dancer 3d" data={data5} />
        
      </ScrollView>
      </View>
    );
  }
}
const mapstatetoprops = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapstatetoprops)(home);
