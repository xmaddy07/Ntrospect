import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { family } from '../constant/Index';


const NutrientsChart = ({ percentage,color1,color2 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update progress when the percentage changes
    setProgress(percentage);
  }, [percentage]);

  const radius = 40; // adjust the radius as needed
  const strokeWidth = 8; // adjust the stroke width as needed
  const circumference = Math.PI * (radius * 2);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          width: wp(100),
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <View style={{}}>
          <Svg height={radius * 2} width={radius * 2}>
            <Defs>
              <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={color1} />
                <Stop offset="100%" stopColor={color2} />
              </LinearGradient>
            </Defs>
            <Circle
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="none"
              stroke="#ddd"
              strokeWidth={strokeWidth}
            />
            <Circle
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              strokeLinecap="round"
            />
            <View
              style={{
                alignSelf: 'center',
                marginTop: 30,
                alignItems: 'center',
              }}>
              <Text style={styles.percent}>{`${progress}%`}</Text>
            </View>
          </Svg>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  percent: {
    color: '#353535',
    fontSize: 14,
    fontFamily: family.semibold,
  },
  txt: {
    color: '#353535',
    fontSize: 10,
    fontFamily: family.regular,
  },
});

export default NutrientsChart;
