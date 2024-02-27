import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {RegisterApi, LoginApi} from '../../components/ApiScreen';
import {setUser} from '../../ReduxToolkit/MyUserSlice';
import {useDispatch, useSelector} from 'react-redux';
import AndroidToast from '../../components/AndroidToast';
import Button from '../../components/Button';
import Loader from '../../components/loader';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Signup = ({navigation}) => {
  const dispatch = useDispatch();

  const [eye, seteye] = useState(false);
  const [eye2, seteye2] = useState(false);

  const [username, setUsername] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [email, setEmail] = useState('');
  const [EmailErr, setEmailErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [ConfirmPassErr, setConfirmPassErr] = useState('');
  const [MatchPassword, setMatchPassword] = useState('');
  const [LoadingCursor, setLoadingCursor] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isChecked, setChecked] = useState('');
  const [ischeckederr, setischeckederr] = useState('');
  const [alerts, setAlerts] = useState(false);

  const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  const Validation = () => {
    if (!email && !password && !username && !confirmpassword && !isChecked) {
      setEmailErr('Enter your email address');
      setPasswordErr('Enter your password');
      setUsernameErr('Enter your username');
      setConfirmPassErr('Enter your confirm password');
      setischeckederr('Enter your');

      return false;
    } else if (!email) {
      setEmailErr('please enter your Email');
      return false;
    } else if (emailCheck.test(email) === false) {
      setEmailErr('not correct format for email address');
      return false;
    } else if (!username) {
      setUsernameErr('please enter your username');
      return false;
    } else if (!password) {
      setPasswordErr('please enter your password');
      return false;
    } else if (password != confirmpassword) {
      setMatchPassword('Password does not match.');
      return false;
    } else if (!confirmpassword) {
      setConfirmPassErr('please enter your confirm password');
      return false;
    } else if (password != confirmpassword) {
      setMatchPassword('Password does not match.');
      return false;
    } else if (!specialCharRegex.test(password)) {
      setPasswordStrength(
        'Password should contain minimum 4 characters, with one UPPERCASE, lowercase, number and special character: @$! % * ? &',
      );
      return false;
    } else if (!isChecked) {
      setAlerts(true);
      return false;
    }

    return true;
  };

  const register = async () => {
    if (Validation()) {
      setLoadingCursor(true);
      const formdata = new FormData();
      formdata.append('username', username),
        formdata.append('email', email),
        formdata.append('password', password),
        formdata.append('password_confirmation', confirmpassword),
        RegisterApi({url: 'register'}, formdata)
          .then(res => {
            console.log('response of register api',res)
            setLoadingCursor(false);

            if (res.status == 'success') {
              dispatch(setUser(res));
            } else if (res.status === 'error') {
              AndroidToast(res.message);
            }
          })
          .catch(err => {
            console.log('err in register', err);
            setLoadingCursor(false);
          });
    }
  };

  const SignIn = async da => {
    LoginApi({url: 'login', email: da.user.email, password: da.user.id})
      .then(res => {
        AndroidToast(res.message);
        console.log('Login Response Data', res);
        if (res.status == 'success') {
          dispatch(setUser(res));
          navigation.navigate('Index');
        }
      })
      .catch(err => {
        console.log('err in login', err);
      });
  };

  const registerGoogle = async data => {
    setLoadingCursor(true);
    const formdata = new FormData();
    formdata.append('username', data.user.name),
      formdata.append('email', data.user.email),
      formdata.append('password', data.user.id),
      formdata.append('password_confirmation', data.user.id),
      RegisterApi({url: 'register'}, formdata)
        .then(res => {
          setLoadingCursor(false);
          console.log('SingIn response', res);
          if (res.status == 'error') {
            if (res.message.email == 'The email has already been taken.') {
              SignIn(data);
            }
          } else if (res.status === 'success') {
            AndroidToast(res.message);
            dispatch(setUser(res));
          }
        })
        .catch(err => {
          console.log('err in register', err);
          setLoadingCursor(false);
        });
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      registerGoogle(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {LoadingCursor && <Loader />}

      <ScrollView>
        <Text style={styles.upper_text}>Hey you, welcome!</Text>
        <Text style={styles.lower_text}>Let's get to know each other.</Text>

        <View
          style={[
            styles.textbox,
            {
              borderWidth: usernameErr ? 1 : 0,
              borderColor: usernameErr ? 'red' : null,
            },
          ]}>
          <TextInput
            style={styles.input}
            placeholder="Enter Username"
            placeholderTextColor={'#B8B9BB'}
            autoCorrect={false}
            value={username}
            onChangeText={Text => {
              setUsernameErr('');
              setUsername(Text);
            }}
          />
        </View>

        <View style={styles.error_view}>
          {usernameErr ? (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Montserrat-Regular',
                fontSize: 10,
              }}>
              {usernameErr}
            </Text>
          ) : null}
        </View>

        <View
          style={[
            styles.textbox,
            {
              borderWidth: EmailErr ? 1 : 0,
              borderColor: EmailErr ? 'red' : null,
            },
          ]}>
          <TextInput
            style={styles.input}
            placeholder="Enter E-Mail"
            placeholderTextColor={'#B8B9BB'}
            keyboardType="email-address"
            value={email}
            onChangeText={Text => {
              setEmailErr('');
              setEmail(Text);
            }}
          />
        </View>
        <View style={styles.error_view}>
          {EmailErr ? (
            <Text
              style={{
                color: 'red',
                fontFamily: 'Montserrat-Regular',
                fontSize: 10,
              }}>
              {EmailErr}
            </Text>
          ) : null}
        </View>

        <View
          style={[
            styles.textbox,
            {
              borderWidth: passwordErr ? 1 : 0,
              borderColor: passwordErr ? 'red' : null,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor={'#B8B9BB'}
              style={[styles.input, {flex: 1}]}
              secureTextEntry={!eye}
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

        <View
          style={[
            styles.textbox,
            {
              borderWidth: ConfirmPassErr ? 1 : 0,
              borderColor: ConfirmPassErr ? 'red' : null,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={'#B8B9BB'}
              secureTextEntry={!eye2}
              style={[styles.input, {flex: 1}]}
              value={confirmpassword}
              onChangeText={Text => {
                setMatchPassword('');
                setConfirmPassErr('');
                setConfirmpassword(Text);
              }}
            />
            <TouchableOpacity
              onPress={() => seteye2(!eye2)}
              activeOpacity={0.7}>
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

        <View style={styles.touch}>
          <TouchableOpacity onPress={() => setChecked(!isChecked)}>
            <MaterialCommunityIcons
              onChangeText={() => {
                setischeckederr(), setChecked();
              }}
              name={isChecked ? 'checkbox-outline' : 'checkbox-blank-outline'}
              // uncheckedColor="#ffffff"
              size={18}
              style={[
                styles.checkbox,
                {color: isChecked ? '#5FB9E8' : '#5FB9E8'},
              ]}
            />
          </TouchableOpacity>

          <View>
            <View style={{flexDirection: 'row',alignItems:'center',marginTop:2}}>
              <Text style={styles.termText}>I agree to the</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Term')}>
                <Text style={styles.termText2}> Terms & Conditions</Text>
              </TouchableOpacity>

              <View style={{flexDirection: 'row',alignItems:'center'}}>
              <Text style={[styles.termText,{    marginLeft:0}]}> and </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Privacy_Policy')}>
                <Text style={styles.termText2}> Privacy Policy</Text>
              </TouchableOpacity>
            </View>

            </View>

           
          </View>
        </View>

        <View style={{marginTop: wp(12)}}>
          <Button
            title="Sign Up"
            onPress={() => {
              register();
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: wp(8),
          }}>
          <View style={styles.line}></View>
          <Text style={styles.text}> Or continue with: </Text>
          <View style={styles.line}></View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop:wp(8),
            marginHorizontal: wp(20),
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
     >
             <Image
              resizeMode="contain"
              source={require('../../assets/ios.png')}
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Faceboologin()}
            activeOpacity={0.8}
            >
             <Image
              resizeMode="contain"
              source={require('../../assets/facebook.png')}
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => signInGoogle()}
            activeOpacity={0.8}>
            <Image
              resizeMode="contain"
              source={require('../../assets/gmail2.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: hp(5),
            paddingBottom: hp(5),
          }}>
          <Text style={styles.account_text}>Already have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.66}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.highlighted}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal transparent={true} animationType={'none'} visible={alerts}>
        <View style={styles.alrtBG}>
          <View style={styles.alertsview}>
            <Text style={styles.alrttetxt}>
              Please accept the Terms & Conditions and Privacy Policy.
            </Text>
            <TouchableOpacity
            onPress={()=>setAlerts(false)}
              style={{alignSelf: 'flex-end', marginTop: 15, right: 20}}>
              <Text style={styles.Ok}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  upper_text: {
    color: '#5FB9E8',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textAlign:'center',
    marginTop:25
    
  },
  lower_text: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    marginTop: wp(1),
    textAlign: 'center',
  },
  textbox: {
    width: wp(89),
    height: hp(7.5),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: wp(3),
  },
  input: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    paddingLeft: wp(5),
    fontSize: 14,
  },
  button: {
    width: wp(60),
    height: hp(8),
    alignSelf: 'center',
    backgroundColor: '#5FB9E8',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: wp(6),
  },
  button_text: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  text: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  line: {
    width: wp(24),
    height: wp(0.2),
    backgroundColor: '#000000',
  },
  box: {
    width: wp(16),
    height: wp(16),
    borderRadius: 10,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: wp(16),
    height: wp(16),
  },
  account_text: {
    fontFamily: 'Poppins-Regular',
    color: '#5B5B5E',
    alignSelf: 'center',
    fontSize: 12,
  },
  highlighted: {
    fontFamily: 'Poppins-SemiBold',
    color: '#5FB9E8',
    alignSelf: 'center',
    fontSize: 12,
  },
  error_view: {alignSelf: 'flex-start', left: wp(7), top: 4},
  touch: {
    flexDirection: 'row',
    marginLeft: wp(5),
    top: wp(5),
    width: wp(85),
    alignItems:'center',
  },
  termText: {
    color: '#000',
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    marginLeft:5
  },
  termText2: {
    color: '#5FB9E8',
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  },
  alrtBG: {
    backgroundColor: 'rgba(4, 4, 4,0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertsview: {
    width: wp(80),
    height: hp(16),
    backgroundColor: '#F4F8F9',
    borderRadius: 10,
  },
  alrttetxt: {
    color: '#3F3F3F',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    margin: 15,
  },
  Ok: {
    color: '#5FB9E8',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});
export default Signup;
