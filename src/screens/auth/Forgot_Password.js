import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import Loader from '../../components/loader';
import {EmailConfirmApi,} from '../../components/ApiScreen';
import AndroidToast from '../../components/AndroidToast';

const Forgot_Password = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [EmailErr, setEmailErr] = useState('');
  const [LoadingCursor, setLoadingCursor] = useState('');

  const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const Validation = () => {
    if (!email) {
      setEmailErr('Enter your email address');
      return false;
    } else if (emailCheck.test(email) === false) {
      setEmailErr('not correct format for email address');
      return false;
    }
    return true;
  };

  const Mail = async () => {
    if (Validation()) {
      setLoadingCursor(true);
      EmailConfirmApi({url: 'forgot', email})
        .then(res => {
          AndroidToast(res.message);
          setLoadingCursor(false);
          console.log('Email Response Data', res);
          if (res.status == 'success') {
            navigation.navigate('Verify', {email});
          }
        })
        .catch(err => {
          console.log('err in forgot catch', err);
          setLoadingCursor(false);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {LoadingCursor && <Loader />}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={{left: wp(4)}}>
          <AntDesign name="arrowleft" color="#000" size={26} />
        </TouchableOpacity>
        <Text style={styles.header_text}>Forgot Password</Text>
        <Text style={styles.header_text}></Text>
      </View>

      <ScrollView>
        <View style={{paddingBottom:15}}>
          <Image
            resizeMode="contain"
            source={require('../../assets/Forgotpassword.png')}
            style={styles.image}
          />

          <Text style={styles.text}>
          To reset your password, you need your email{'\n'}that can be authenticated
          </Text>

          <View
            style={[
              styles.textbox,
              {
                borderWidth: EmailErr ? 1 : 0,
                borderColor: EmailErr ? 'red' : null,
              },
            ]}>
            <TextInput
              placeholder="Provide your registered Email address."
              placeholderTextColor={'#B8B9BB'}
              keyboardType="email-address"
              style={styles.input}
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

          <View style={{marginTop: wp(15),}}>
            <Button title="Next" onPress={() => Mail()} />
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
    // marginLeft: wp(12.7),
  },
  image: {
    alignSelf: 'center',
    width: wp(75),
    height: hp(40),
    marginTop: hp(6),
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
    marginTop: wp(5),
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
    marginTop: hp(7),
  },
  button_text: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  error_view: {alignSelf: 'flex-start', left: wp(8)},
});
export default Forgot_Password;
