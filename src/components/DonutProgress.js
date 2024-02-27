import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,ProgressBarAndroid} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {family} from '../constant/Index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';

const DonutProgress = ({percentage}) => {
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);

  useEffect(() => {
    // Update progress when the percentage changes
    setProgress2(percentage);
  }, [percentage]);

  useEffect(() => {
    // Update progress when the percentage changes
    setProgress(percentage);
  }, [percentage]);

  const radius = 80; // adjust the radius as needed
  const strokeWidth = 12; // adjust the stroke width as needed
  const circumference = Math.PI * radius;
  const radius2 = 50;
  const centerX = radius;
  const centerY = radius2;
  const radius3 = 70;
  const centerX2 = radius;
  const centerY2 = radius3;
  return (
    <>
    <View
      style={{
        flexDirection: 'row',
        width: wp(100),
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <View>
      <Text style={styles.dates}>Monday, <Text style={styles.dates2}>12th Janury</Text></Text>

        <Text style={styles.Kcal}>
          {'1654'}
          <Text style={styles.cal}>{'Kcal'}</Text>
        </Text>
      </View>
      <View style={{paddingBottom: 20}}>
        <Svg height={radius} width={radius * 2}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            stroke="#ddd" // set the color of the background circle
            strokeWidth={strokeWidth}
          />
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            stroke="#5FB9E8" // set the color for the progress bar
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round" // round the stroke line cap for rounded corners
            transform={`rotate(-180 ${radius} ${radius})`}
          />
          <View
            style={{alignSelf: 'center', marginTop: 35, alignItems: 'center'}}>
            <Text style={styles.percent}>{`${progress}%`}</Text>
            <Text style={styles.txt}>{'Daily indicate'}</Text>
          </View>
        </Svg>
      </View>
    </View>
    
  <View style={{flexDirection:'row',justifyContent:'space-between',width:wp(88)}}>
    <View>
    <Text style={styles.bartxt}>{'Carb'}</Text>
    <Text style={styles.txt}>{'12.5g / 24.5g'}</Text>

  <Progress.Bar 
  progress={0.5} 
  width={90}
  color='#FBA118'
  unfilledColor='#EFEFEF' />
  </View>
  <View>
  <Text style={styles.bartxt}>{'Fat'}</Text>
  <Text style={styles.txt}>{'16.5g / 19.0g'}</Text>

    <Progress.Bar 
  progress={0.9} 
  width={90}
  color='#673BE2'
  unfilledColor='#EFEFEF' />
  </View>
  <View>
  <Text style={styles.bartxt}>{'Protein'}</Text>
  <Text style={styles.txt}>{'3.3g / 14.0g'}</Text>

    <Progress.Bar 
  progress={0.2} 
  width={90}
  unfilledColor='#EFEFEF' 
  color='#2BDBF3'/>
  </View>
  </View>
    </>
  );
};

const styles = StyleSheet.create({
  Kcal: {
    color: '#353535',
    fontSize: 50,
    fontFamily: family.medium,
  },
  cal: {
    color: '#353535',
    fontSize: 15,
    fontFamily: family.regular,
  },
  percent: {
    color: '#353535',
    fontSize: 16,
    fontFamily: family.semibold,
  },
  txt: {
    color: '#353535',
    fontSize: 10,
    fontFamily: family.regular,
  },
  dates:{
    color: '#353535',
    fontSize: 10,
    fontFamily: family.semibold,
    top:5
  },
  dates2:{
    color: '#A2A2A2',
    fontSize: 10,
    fontFamily: family.regular,
  },
  bartxt:{
    color: '#353535',
    fontSize: 10,
    fontFamily: family.semibold,
  }
});

export default DonutProgress;
