import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Stylesheet from '../../constant/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {family} from '../../constant/Index';

export default function Subscription({navigation}) {
  return (
    <View style={Stylesheet.Container}>
      <View style={Stylesheet.Headerstyle}>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
          <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
        </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>Subscription</Text>
        <Text>{'    '}</Text>
      </View>
      <View
        style={{
          width: wp(90),
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: wp(5),
        }}>
        <Image
          style={{width: 215, height: 220}}
          source={require('../../assets/capa.png')}
        />
      </View>
      <View
        style={{
          width: wp(90),
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 13,
            fontFamily: family.medium,
            textAlign: 'center',
            // marginHorizontal:wp(2)
          }}>
          Personalize your experience—become a member today! Unlock exclusive
          features, receive tailored recommendations, and enjoy early access.
          Join now for a uniquely personalized journey!
        </Text>
      </View>
      <View
        style={{
          height: hp(30),
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <TouchableOpacity style={styles.button1}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: wp(80),
            }}>
            <Text style={styles.txt1}>{'         '}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: wp(50),
                top: 10,
              }}>
              <Text style={styles.txt1}>Yearly</Text>
              <Text style={styles.txt2}>$14,99/year</Text>
            </View>
            <Image
              style={{width: 63, height: 38}}
              source={require('../../assets/free.png')}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.txt4}>
            3 days free trial, than $8/m if not canceled{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Text style={[styles.txt1, {color: '#000'}]}>Monthly</Text>
          <Text style={styles.txt3}>
            <Text style={[styles.txt3, {color: '#FF8800'}]}>$8.99</Text>/month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={[styles.txt1, {color: '#000'}]}>Weekly</Text>
          <Text style={styles.txt3}>
            <Text style={[styles.txt3, {color: '#FF8800'}]}>$8.99</Text>/week
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 12,
          fontFamily: family.medium,
          textAlign: 'center',
          marginTop: 30,
          // marginHorizontal:wp(2)
        }}>
        Invite a User to get 7 days extensions of free trial
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  txt1: {color: 'white', fontSize: 14, fontFamily: family.semibold},
  txt2: {color: 'white', fontSize: 14, fontFamily: family.medium},
  txt3: {color: '#000', fontSize: 14, fontFamily: family.medium},
  txt4: {
    color: 'white',
    fontSize: 10,
    fontFamily: family.regular,
    left: 1,
    top: 2,
  },
  button1: {
    width: wp(80),
    // marginVertical: wp(7),
    alignSelf: 'center',
    height: wp(18),
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#5FB9E8',
    // justifyContent: 'space-around',r
  },
  button2: {
    width: wp(80),
    alignSelf: 'center',
    height: wp(18),
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-around',
  },
});
