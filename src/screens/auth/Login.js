import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../ReduxToolkit/MyUserSlice';
import {LoginApi, RegisterApi} from '../../components/ApiScreen';
import AndroidToast from '../../components/AndroidToast';
import Loader from '../../components/loader';
import Button from '../../components/Button';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {err} from 'react-native-svg/lib/typescript/xml';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const [eye, seteye] = useState(false);

  const [email, setEmail] = useState('');
  const [EmailErr, setEmailErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [LoadingCursor, setLoadingCursor] = useState('');

  const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const Validation = () => {
    if (!email && !password) {
      setEmailErr('Enter your email address');
      setPasswordErr('Enter your password');

      return false;
    } else if (!email) {
      setEmailErr('please enter your Email');
      return false;
    } else if (emailCheck.test(email) === false) {
      setEmailErr('not correct format for email address');
      return false;
    } else if (!password) {
      setPasswordErr('please enter your username');
      return false;
    } else if (password.length < 8) {
      setPasswordErr('please use at least 6-12 characters');
      return false;
    }

    return true;
  };

  const SignIn = async () => {
    if (Validation()) {
      setLoadingCursor(true);
      LoginApi({url: 'login', email, password})
        .then(res => {
          setLoadingCursor(false);
          if (res.status == 'success') {
            dispatch(setUser(res));
          }else{
          AndroidToast(res.message);
          setLoadingCursor(false);

          }
        })
        .catch(err => {
          console.log('err in login', err);
          setLoadingCursor(false);
        });
    }
  };

  const signInGoogleApi = async da => {
    setLoadingCursor(true);
    LoginApi({url: 'login', email: da.user.email, password: da.user.id})
      .then(res => {
        AndroidToast(res.message);
        console.log('Login Response Data', res);
        setLoadingCursor(false);
        if (res.status == 'success') {
          dispatch(setUser(res));
        }
      })
      .catch(err => {
        console.log('err in login', err);
        setLoadingCursor(false);
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
          console.log('SingIn response', res);
          if (res.status == 'error') {
            if (res.message.email == 'The email has already been taken.') {
              signInGoogleApi(data);
            }
          } else if (res.status === 'success') {
            AndroidToast(res.message);
            dispatch(setUser(res));
            setLoadingCursor(false);
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

  const fblogin = resCallback => {
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log('fb resultssssss', result);
        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          resCallback({message: 'Email is required'});
        }
        if (result.isCancelled) {
          console.log('error');
        } else {
          const infoRequest = new GraphRequest(
            '/me?feilds=email,name,picture,friends',
            null,
            resCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (error) {
        console.log('Login fail with error:' + error);
      },
    );
  };

  const onFbLogin = async () => {
    try {
      await fblogin(_responseInfoCallBack);
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const _responseInfoCallBack = async (error, result) => {
    if (error) {
      console.log('error top+++', error);
    } else {
      const userData = result;
      console.log('fb data++++', userData);
    }
  };

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        {LoadingCursor && <Loader />}

        <Text style={styles.upper_text}>Hey You!</Text>
        <Text style={styles.lower_text}>We missed you,{'\n'}Welcome back!</Text>

        <View style={{marginTop: wp(5)}}>
          <View
            style={[
              styles.textbox,
              {
                borderWidth: EmailErr ? 1 : 0,
                borderColor: EmailErr ? 'red' : null,
              },
            ]}>
            <TextInput
              placeholder="Enter E-Mail"
              placeholderTextColor={'#B8B9BB'}
              style={styles.input}
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
                  setPassword(Text);
                }}
              />
              <TouchableOpacity
                onPress={() => seteye(!eye)}
                activeOpacity={0.7}>
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

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Forgot_Password')}>
            <Text style={styles.fpass_text}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => SignIn()}
            activeOpacity={0.85}
            style={styles.button}>
            <Text style={styles.button_text}>Log In</Text>
          </TouchableOpacity> */}
          <View style={{marginTop: wp(10)}}>
            <Button
              title="Log In"
              onPress={() => SignIn()}
              // }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: wp(8),
            }}>
            <View style={[styles.line, {right: wp(4)}]}></View>
            <Text style={styles.text}> Or continue with: </Text>
            <View style={[styles.line, {left: wp(4)}]}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: wp(8),
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
              // onPress={() => onFbLogin()}
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
              activeOpacity={0.8}
              // style={[styles.box, {backgroundColor: '#C0DDFF'}]}
              >
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
              marginTop: wp(10),
            }}>
            <Text style={styles.account_text}>Don't have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.66}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.highlighted}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  upper_text: {
    color: '#5FB9E8',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'center',
    marginTop: wp(15),
  },
  lower_text: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop:2,
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
    top:2
  },
  fpass_text: {
    textAlign: 'right',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#5FB9E8',
    marginRight: wp(6),
    marginTop: wp(3),
  },
  button: {
    width: wp(60),
    height: hp(6.5),
    alignSelf: 'center',
    backgroundColor: '#5FB9E8',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: wp(10),
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
  box: {
    width: wp(16),
    height: wp(16),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    width: wp(16),
    height: wp(16),
  },
  line: {
    width: wp(24),
    height: wp(0.2),
    backgroundColor: '#000000',
    // borderWidth: 0.2,
    // borderColor: '#000000',
    // // alignSelf: 'flex-end',
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
  error_view: {alignSelf: 'flex-start', left: wp(8),top:5},
});
export default Login;
