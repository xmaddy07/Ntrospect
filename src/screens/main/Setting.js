import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Stylesheet from '../../constant/Stylesheet';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {images} from '../../constant/Index';
import {useDispatch, useSelector} from 'react-redux';
import {ArticleNewsAPIs} from '../../components/ApiScreen';
import {logoutUser} from '../../ReduxToolkit/MyUserSlice';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  console.log('user', user.token);

  const _deleteAccount = async () => {
    ArticleNewsAPIs({url: 'delete-user', Auth: user.token})
      .then(res => {
        console.log('response of delete account', res);
        if (res.status == 'success') {
          dispatch(logoutUser());
        }
      })
      .catch(err => {
        console.log('err in products', err);
      });
  };
  return (
    <View style={Stylesheet.Container}>
      {/* <View style={[Stylesheet.Headerstyle,{justifyContent:'space-between'}]}>
        <TouchableOpacity  onPress={()=>navigation.navigate('MyProfile')}>
      <AntDesign name="arrowleft" size={22} style={Stylesheet.arrowleft} />
      </TouchableOpacity>
        <Text style={Stylesheet.home_txt1}>Settings</Text>
        
        <Text>{'       '}</Text>
      </View> */}
      <View style={Stylesheet.blueBG}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
            <AntDesign
              name="arrowleft"
              size={22}
              style={Stylesheet.arrowleft}
            />
          </TouchableOpacity>
          <Text style={[Stylesheet.home_txt1]}>Setting</Text>
          <Text>{'       '}</Text>
        </View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width: 300,
            height: 170,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 20,
            elevation: 1.5,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={[
                Stylesheet.profileimg,
                {
                  borderWidth: user.userdata.image ? 1.5 : 0,
                  borderColor: user.userdata.image ? '#5FB9E8' : 'red',
                  marginTop: 20,
                },
              ]}
              source={
                user.userdata.image
                  ? {uri: user.userdata.image}
                  : require('../../assets/avatar.png')
              }
              resizeMode="cover"
            />

            <Text style={Stylesheet.profile_txt1}>
              {user.userdata.username}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 150,
              }}>
              <Text style={Stylesheet.profile_txt2}>
                {user.userdata.weight ? user.userdata.weight : null}
                {user.userdata.scale_system ? (
                  <Text style={Stylesheet.profile_txt3}>
                    {user.userdata.scale_system == 'Imperial System'
                      ? 'cm'
                      : 'ft'}
                  </Text>
                ) : null}
              </Text>
              <Text style={Stylesheet.profile_txt2}>
                {user.userdata.height ? user.userdata.height : null}
                {user.userdata.scale_system ? (
                  <Text style={Stylesheet.profile_txt3}>
                    {user.userdata.scale_system == 'Imperial System'
                      ? 'lbs'
                      : 'kg'}
                  </Text>
                ) : null}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        // onPress={() => navigation.navigate('Favorites')}
        style={[Stylesheet.profileimg_view, {marginTop: wp(20)}]}>
        <View style={Stylesheet.imgBG}>
          <Image
            style={Stylesheet.profile_icon}
            source={images.changeLang}
            resizeMode="contain"
          />
        </View>
        <Text style={[Stylesheet.profile_txt4, {left: wp(3)}]}>
          Add Language
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ResetPassword')}
        style={[Stylesheet.profileimg_view, {marginTop: wp(5)}]}>
        <View style={Stylesheet.imgBG}>
          <Image
            style={Stylesheet.profile_icon}
            source={images.changepass}
            resizeMode="contain"
          />
        </View>
        <Text style={[Stylesheet.profile_txt4, {left: wp(3)}]}>
          Change Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          _deleteAccount();
        }}
        style={[Stylesheet.profileimg_view, {marginTop: wp(5)}]}>
        <View style={Stylesheet.imgBG}>
          <Image
            style={Stylesheet.profile_icon}
            source={images.delete}
            resizeMode="contain"
          />
        </View>
        <Text style={[Stylesheet.profile_txt4, {left: wp(3)}]}>
          Delete Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
