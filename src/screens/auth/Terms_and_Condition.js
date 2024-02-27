import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Checkbox, theme} from 'react-native-paper';
import Stylesheet from '../../constant/Stylesheet';
import {images} from '../../constant/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { markAsSeen2 } from '../../ReduxToolkit/MarkAsScreen';
import SplashScreen from 'react-native-splash-screen';

const Terms_and_Condition = ({navigation}) => {

  const dispatch=useDispatch()
  const isOnboardingCompleted2 = useSelector((state) => state.screen.completed2);
  console.log('isOnboardingCompleted2+++++++++mlml', isOnboardingCompleted2);


 
useEffect(() => {
  const timeoutId = setTimeout(() => {
    SplashScreen.hide();
  }, 1000); // Replace 1000 with the desired delay in milliseconds

  // Cleanup function to clear the timeout in case the component unmounts
  return () => clearTimeout(timeoutId);
}, []);



  const [checked, setChecked] = useState(isOnboardingCompleted2);
  const [checked2, setChecked2] = useState(isOnboardingCompleted2);
  console.log('checkek____1', checked);
  console.log('check___2', checked2);



  return (
    <View style={[Stylesheet.Container, {alignItems: 'center'}]}>
      <Image
        style={Stylesheet.logo}
        source={images.applogo2}
        resizeMode="cover"
      />

      <View style={[Stylesheet.checkButton, {marginTop: wp(20)}]}>
        <TouchableOpacity 
         onPress={() => {
          setChecked(!checked);
          if (checked && !checked2 ||!checked && checked2 ) {
            navigation.navigate('Onboarding');
            dispatch(markAsSeen2(checked,checked2))
          }
        }}
        style={{right:wp(5.3)}}>
          <MaterialCommunityIcons
            name={checked ? 'checkbox-outline' : 'checkbox-blank'}
            // uncheckedColor="#ffffff"
            size={23}
            color={checked ? "#EEEEEE":'#FFFFFF'}
           
          />
        </TouchableOpacity>

        <View style={Stylesheet.direction}>
          <Text style={[Stylesheet.checkButton_txt1,{}]}>I agree to the </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Privacy_Policy')}>
            <Text
              style={[
                Stylesheet.checkButton_txt1,
                {textDecorationLine: 'underline'},
              ]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={Stylesheet.checkButton}>
        <TouchableOpacity 
          onPress={() => {
            setChecked2(!checked2);
            if (checked && !checked2 ||!checked && checked2 ) {
              navigation.navigate('Onboarding');
              dispatch(markAsSeen2(checked,checked2))
            }
          }}
        style={{left:wp(3)}}>
          <MaterialCommunityIcons
            name={checked2 ? 'checkbox-outline' : 'checkbox-blank'}
            // uncheckedColor="#ffffff"
            size={23}
            color={checked2 ? "#EEEEEE":'#FFFFFF'}
          
          />
        </TouchableOpacity>

        <View style={Stylesheet.direction}>
          <Text style={[Stylesheet.checkButton_txt1,{paddingLeft:wp(8)}]}>I agree to the </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Term')}>
            <Text
              style={[
                Stylesheet.checkButton_txt1,
                {textDecorationLine: 'underline'},
              ]}>
              Terms & Coditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Terms_and_Condition;
