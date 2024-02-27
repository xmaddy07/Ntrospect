import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import {ConfrimCodeApi, EmailConfirmApi} from '../../components/ApiScreen';
import Loader from '../../components/loader';
import AndroidToast from '../../components/AndroidToast';

const CELL_COUNT = 4;

const Verify = ({navigation, route}) => {
  const {email} = route.params;
  const [counter, setcounter] = useState(59);
  const [LoadingCursor, setLoadingCursor] = useState('');

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setcounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const ReciveCode = async () => {
    setLoadingCursor(true);
    ConfrimCodeApi({url: 'confirm-code', email, pin: value})
      .then(res => {
        AndroidToast(res.error);
        setLoadingCursor(false);
        console.log('0000000000', res);
        if (res.status == 'success') {
          navigation.navigate('Change_Password', {email, value});
        AndroidToast(res.message);

        }
      })
      .catch(err => {
        console.log('err in confrimcode catch', err);
        setLoadingCursor(false);
      });
  };
  const resendotp = async () => {
    setcounter(59);
    EmailConfirmApi({url: 'forgot', email})
      .then(res => {
       
        console.log('res of email', res);
        if (res.status == 'success') {
          setRefresh(!refresh);
          AndroidToast(res.message);
        }
      })
      .catch(err => {
        console.log('err in email', err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF',}}>
      {LoadingCursor && <Loader />}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={{left: wp(4)}}>
          <AntDesign name="arrowleft" color="#000" size={26} />
        </TouchableOpacity>
        <Text style={styles.header_text}>Verification Code</Text>
        <Text style={styles.header_text}></Text>
      </View>

      <ScrollView>
        <View>
          <Image
            resizeMode="contain"
            source={require('../../assets/otp.png')}
            style={styles.image}
          />

          <Text style={styles.text}>
          A confirmation code has been sent to{'\n'}your Email.
          </Text>

          <View style={styles.pinView}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>

          {counter == 0 ? (
            <TouchableOpacity
              onPress={() => resendotp()}
              style={styles.counter}>
              <Text style={[styles.counter_txt, {color: 'red'}]}>Resend</Text>
              <AntDesign name="right" size={12} style={{color: '#000'}} />
            </TouchableOpacity>
          ) : (
            <View style={styles.counter}>
              <Text style={styles.counter_txt}>
                {'0:' + counter} Resend Code
              </Text>
              <AntDesign name="right" size={12} style={{color: '#000'}} />
            </View>
          )}

          <View style={{marginTop: wp(10),paddingBottom:10}}>
            <Button title="Submit" onPress={() => ReciveCode()} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(4),
  },
  header_text: {
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginLeft: wp(5),
  },
  image: {
    alignSelf: 'center',
    width: wp(95),
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
  box: {
    width: wp(20),
    height: hp(10),
    borderWidth: 0.5,
    borderColor: '#5FB9E8',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
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
  counter: {
    alignSelf: 'flex-end',
    right: wp(8),
    marginTop: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  counter_txt: {
    color: '#022C43',
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  pinView: {
    alignItems: 'center',
    alignSelf: 'center',
    width: wp(80),
    height: hp(6),
    marginTop: wp(10),
    height: wp(18),
  },
  cell: {
    width: wp(18),
    height: wp(16),
    lineHeight: wp(18),
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5FB9E8',
    textAlign: 'center',
    marginHorizontal: wp(2),
    backgroundColor: '#FFFFFF',
    elevation: 0.5,
    color: '#3F3F3F',
  },
  focusCell: {
    // fontSize:29
  },
  root: {
    flex: 1,
    padding: 20,
    top: wp(16),
  },
  codeFieldRoot: {
    // marginTop: wp(5),
  },
});
export default Verify;
