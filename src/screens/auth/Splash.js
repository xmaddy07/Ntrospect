import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {images} from '../../constant/Index';
import Button from '../../components/Button';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import {LoginApi} from '../../components/ApiScreen';
import {markAsSeen} from '../../ReduxToolkit/MarkAsScreen';
import {useDispatch} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { setUser } from '../../ReduxToolkit/MyUserSlice';

const Splash = ({navigation}) => {
  const [LoadingCursor, setLoadingCursor] = useState(false);
  const [alertPop, setAlertPop] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const androidId = DeviceInfo.getDeviceId();
  // console.log('Android ID:++++', androidId);

  const SignIn = async () => {
    LoginApi({url: 'login', is_guest: true, device_id: androidId})
      .then(res => {
        console.log('response of guest', res);
        if (res.status == 'success') {
          setAlertPop(false);
          dispatch(setUser(res));
          dispatch(markAsSeen());
        }
      })
      .catch(err => {
        console.log('err in login', err);
      });
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar
        backgroundColor="#FFFFFF" // Status bar background color
        barStyle="dark-content" // Content color (dark or light)
      /> */}
      <Image
        resizeMode="contain"
        source={images.applogo2}
        style={styles.Image}
      />
      <View style={{marginTop: wp(15)}}>
        <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
      </View>
      <View style={{marginTop: wp(5)}}>
        <Button title="Log In" onPress={() => navigation.navigate('Login')} />
      </View>

      <TouchableOpacity onPress={() => setAlertPop(true)}>
        <Text style={styles.guest}>Continue As Guest</Text>
      </TouchableOpacity>
      <Modal transparent={true} animationType={'none'} visible={alertPop}>
        <View style={styles.alrtBG}>
          <View style={styles.pop}>
            <TouchableOpacity
              onPress={() => setAlertPop(false)}
              style={{alignSelf: 'flex-end', right: 15, top: 15}}>
              <AntDesign name="close" size={20} style={{color: '#000'}} />
            </TouchableOpacity>
            <Image
              resizeMode="contain"
              source={images.applogo2}
              style={styles.Image2}
            />

            <Text style={styles.txt}>
              By continuing as a guest, you agree to our Terms & Conditions and
              Privacy Policy. Limited access, no account creation, and data
              handling during sessions apply. Consider registering for enhanced
              benefits.
            </Text>

            <View style={styles.touch}>
              <TouchableOpacity onPress={() => {setChecked(true),SignIn()}}>
                <MaterialCommunityIcons
                  name={
                    isChecked ? 'checkbox-outline' : 'checkbox-blank-outline'
                  }
                  // uncheckedColor="#ffffff"
                  size={18}
                  style={{color: isChecked ? '#5FB9E8' : '#5FB9E8'}}
                />
              </TouchableOpacity>
              <Text style={styles.termText}>I Agree, continue.</Text>
            </View>
            <Text style={styles.txt2}>Ntrospect Team</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  Image: {
    height: hp(35),
    width: wp(90),
    marginTop: wp(25),
  },
  button: {
    width: wp(65),
    height: hp(7.5),
    backgroundColor: '#5FB9E8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  guest: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#5FB9E8',
    marginTop: 15,
  },
  alrtBG: {
    backgroundColor: 'rgba(4,4,4,0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pop: {
    width: wp(80),
    // height: hp(50),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    paddingBottom:20
  },
  Image2: {
    height: 120,
    width: 120,
    marginTop: 10,
    alignSelf: 'center',
  },
  txt: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    lineHeight: 20,
  },
  termText: {
    color: '#5FB9E8',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    left: 5,
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
    marginTop: 40,
  },
  txt2: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#5FB9E8',
    textAlign: 'center',
    marginTop: 40,
    
  },
});
export default Splash;
