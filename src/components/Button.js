import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const Button = ({title,onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={styles.button}>
    <Text style={styles.button_text}>{title}</Text>
  </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        width: wp(70),
        height: hp(6.5),
        alignSelf: 'center',
        backgroundColor: '#5FB9E8',
        borderRadius:50,
        justifyContent: 'center',
        // marginTop: wp(10),
      },
      button_text: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#FFFFFF',
        alignSelf: 'center',
      },
})