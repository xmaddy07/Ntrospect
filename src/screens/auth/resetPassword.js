import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView
  } from 'react-native';
  import React, {useState} from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Entypo from 'react-native-vector-icons/Entypo';
  import Button from '../../components/Button';
  import Loader from '../../components/loader';
  import AndroidToast from '../../components/AndroidToast';
import { ForgotPassword, NewPasswordApi } from '../../components/ApiScreen';
import { useSelector } from 'react-redux';
  
  const ResetPassword = ({navigation}) => {
const user =useSelector(state =>state.user.user)
console.log('user',user)
    const [eye, seteye] = useState(false);
    const [eye3, seteye3] = useState(false);
    const [eye2, seteye2] = useState(false);
  
    // const {email} = route.params;
    // const {value} = route.params;
  
    const [oldpassword, setOldpassword] = useState('');
    const [oldpasswordErr, setOldpasswordErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [ConfirmPassErr, setConfirmPassErr] = useState('');
    const [MatchPassword, setMatchPassword] = useState('');
    const [LoadingCursor, setLoadingCursor] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
  console.log('oldpassword',oldpassword)
  
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  
  
    const Validation = () => {
      if (!oldpassword && !password && !confirmpassword) {
        setOldpasswordErr('Enter your old password');
        setPasswordErr('Enter your new password');
        setConfirmPassErr('Enter your confirm password');
  
        return false;
      }  else if (!oldpassword) {
        setOldpasswordErr('please enter confirm Pass');
        return false;
      }else if (!confirmpassword) {
        setConfirmPassErr('please enter confirm Pass');
        return false;
      } else if (password != confirmpassword) {
        setMatchPassword('Password does not match.');
        return false;
      } else if (password.length < 8) {
        setPasswordErr('please use at least 6-12 characters');
        return false;
      } else if (!specialCharRegex.test(password)) {
        setPasswordStrength(
          'Password should contain minimum 4 characters, with one UPPERCASE, lowercase, number and special character: @$! % * ? &',
        );
        return false;
  
    };
    return true;
    }
    const _updatepassword = async () => {
        if (Validation()) {
        setLoadingCursor(true);
          const formaldata = new FormData();
          formaldata.append('old_password',oldpassword),
            formaldata.append('password',password),
            formaldata.append('password_confirmation',confirmpassword),
            ForgotPassword({url: 'change-password', token: user.token}, formaldata)
              .then(res => {
                console.log('Update password response', res);
                if (res.status == 'success') {
                    setLoadingCursor(false);
                  AndroidToast(
                    res.message
                      ? res?.message?.old_password[0]
                      : res.error
                      ? res.error
                      : res.status
                      ? res.status
                      : null,
                  );
                  navigation.navigate('Setting');
                } else {
                    setLoadingCursor(false);
                  AndroidToast(
                    res.message
                      ? res?.message?.old_password[0]
                      : res.error
                      ? res.error
                      : null,
                  );
                }
              })
              .catch(err => {
                console.log('err in Update password', err);
                setLoadingCursor(false);
              });
        }
      };
  
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        {LoadingCursor &&<Loader/>}
        <View style={styles.header}>
          <TouchableOpacity 
          onPress={()=> navigation.goBack()}
          activeOpacity={0.7} 
          style={{left: wp(4)}}>
            <AntDesign name="arrowleft" color="#000" size={25} />
          </TouchableOpacity>
          <Text style={styles.header_text}>Change Password</Text>
          <Text style={styles.header_text}></Text>
        </View>
  
  <ScrollView>
  <View>
        <Image
          resizeMode="contain"
          source={require('../../assets/update.png')}
          style={styles.image}
        />
  
        {/* <Text style={styles.text}>Enter your New PAssword</Text> */}
  
        <View style={[styles.textbox,  {
                  borderWidth: oldpasswordErr ? 1 : 0,
                  borderColor: oldpasswordErr ? 'red' : null,
                },]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Enter Old Password"
              placeholderTextColor={'#B8B9BB'}
              secureTextEntry={!eye3}
              style={[styles.input]}
              value={oldpassword}
              onChangeText={Text => {
                setOldpasswordErr('');
                setPasswordStrength('');
                setOldpassword(Text);
              }}
            />
            <TouchableOpacity onPress={() => seteye3(!eye3)} activeOpacity={0.7}>
              <Entypo
                name={eye3 ? 'eye' : 'eye-with-line'}
                color="#5FB9E8"
                size={20}
                style={{marginRight: wp(5)}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.error_view}>
                {oldpasswordErr ? (
                  <Text
                    style={{
                      color: 'red',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 10,
                    }}>
                    {oldpasswordErr}
                  </Text>
                ) : null}
              </View>


        <View style={[styles.textbox,  {
                  borderWidth: passwordErr ? 1 : 0,
                  borderColor: passwordErr ? 'red' : null,
                  marginTop:10
                },]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Enter New Password"
              placeholderTextColor={'#B8B9BB'}
              secureTextEntry={!eye}
              style={[styles.input]}
              value={password}
              onChangeText={Text => {
                setPasswordErr('');
                setPasswordStrength('');
                setPassword(Text);
              }}
            />
            <TouchableOpacity onPress={() => seteye(!eye)} activeOpacity={0.7}>
              <Entypo
                name={eye ? 'eye' : 'eye-with-line'}
                color="#5FB9E8"
                size={20}
                style={{marginRight: wp(5)}}
              />
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.error_view}>
                {passwordErr ? (
                  <Text
                    style={{
                      color: 'red',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 10,
                    }}>
                    {passwordErr}
                  </Text>
                ) : null}
              </View>
  
        <View style={[styles.textbox,  {
                  borderWidth: ConfirmPassErr ? 1 : 0,
                  borderColor: ConfirmPassErr ? 'red' : null,
                  marginTop:wp(4)
                },]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Confirm New Password"
              placeholderTextColor={'#B8B9BB'}
              secureTextEntry={!eye2}
              style={[styles.input]}
              value={confirmpassword}
              onChangeText={Text => {
                setMatchPassword('');
                setConfirmPassErr('');
                setConfirmpassword(Text);
              }}
            />
            <TouchableOpacity onPress={() => seteye2(!eye2)} activeOpacity={0.7}>
              <Entypo
                name={eye2 ? 'eye' : 'eye-with-line'}
                color="#5FB9E8"
                size={20}
                style={{marginRight: wp(5)}}
              />
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.error_view}>
                {ConfirmPassErr ? (
                  <Text
                    style={{
                      color: 'red',
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 10,
                    }}>
                    {ConfirmPassErr}
                  </Text>
                ) : null}
                 {MatchPassword ? (
                  <Text
                    style={{
                      color: 'red',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 10,
                    }}>
                    {MatchPassword}
                  </Text>
                ) : null}
                 {passwordStrength ? (
              <Text
                style={{
                  width: wp(80),
                  color: 'red',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 10,
                }}>
                {passwordStrength}
                </Text>
            ) : null}
              </View>
  
        <View style={{marginTop: wp(15)}}>
          <Button title="Change Password"  onPress={()=> _updatepassword()}/>
        </View>
  
        </View>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      marginTop: wp(4),
      justifyContent: 'space-between',
    },
    header_text: {
      color: '#000000',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      marginLeft: wp(16),
    },
    image: {
      alignSelf: 'center',
      width: wp(75),
      height: hp(40),
    },
    text: {
      textAlign: 'center',
      color: '#000000',
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      marginTop: hp(5),
    },
    textbox: {
      width: wp(89),
      height: hp(7.5),
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      elevation: 2,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    input: {
      color: '#000',
      fontFamily: 'Poppins-Regular',
      paddingLeft: wp(5),
      fontSize: 14,
    },
    button: {
      width: wp(60),
      height: hp(7.5),
      alignSelf: 'center',
      backgroundColor: '#5FB9E8',
      borderRadius: 10,
      justifyContent: 'center',
      marginTop: wp(15),
    },
    button_text: {
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
      color: '#FFFFFF',
      alignSelf: 'center',
    },
    error_view: {alignSelf: 'flex-start', left: wp(6),marginTop:5},
  
  });
  export default ResetPassword;
  