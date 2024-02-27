import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Header({
  text,
  textclr,
  fontFamily,
  mov,
  width =90,
  height =10,
  marginTop=0,
  btom =0,
  backgroundColor='#FBFBFB',
  justifyContent,
  alignSelf,
  alignItems,

}) {
  return (
    <View style={{
        width:wp(100),
        height:hp(9),
        borderBottomWidth:1,
        borderBottomColor:'#5FB9E8',
        backgroundColor:backgroundColor,
        justifyContent:justifyContent,
        alignSelf:alignSelf,
        alignItems:alignItems,
    }}>
   
    </View>
  );
}
