import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import {family} from '../constant/Index';
import LinearGradient from 'react-native-linear-gradient';

const CalorieChart = ({}) => {
  const barData = [
    {
      value: 30,
      label: 'Mon',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        right: 8,
        fontFamily: family.regular,
      },
      frontColor: '#54CAA2',
    },
    {value: 30, frontColor: '#D25F70'},
    {
      value: 40,
      label: 'Tue',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        right: 8,
        fontFamily: family.regular,
      },
      frontColor: '#54CAA2',
    },
    {value: 50, frontColor: '#D25F70'},
    {
      value: 50,
      label: 'Wed',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        right: 8,
        fontFamily: family.regular,
      },
      frontColor: '#54CAA2',
    },
    {value: 70, frontColor: '#D25F70'},
    {
      value: 40,
      label: 'Thu',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        right: 8,
        fontFamily: family.regular,
      },
      frontColor: '#54CAA2',
    },
    {value: 40, frontColor: '#D25F70'},
    {
      value: 45,
      label: 'Fri',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        right: 8,
        fontFamily: family.regular,
      },
      frontColor: '#54CAA2',
    },
    {value: 60, frontColor: '#D25F70'},
    {
      value: 50,
      label: 'Sat',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        right: 8,
        fontFamily: family.regular,
      },
      frontColor: '#54CAA2',
    },
    {value: 75, frontColor: '#D25F70'},
    {
      value: 35,
      label: 'Sun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        right: 8,
        fontFamily: family.regular,
      },
      frontColor: '#54CAA2',
    },
    {value: 50, frontColor: '#D25F70'},
  ];
  const renderTitle = () => {
    return (
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: 'white',
            fontFamily: family.semibold,
            fontSize: 18,
            marginLeft: 10,
          }}>
          Calories
        </Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#7895F8', '#8C35CC']} // You can adjust these colors as needed
      style={{
        paddingBottom: 20,
        borderRadius: 10,
        width: 350,
        alignSelf: 'center',
        marginTop: 10,
      }}>
      {/* <Text style={styles.title}>Weekly Calorie Chart</Text> */}
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={8}
        spacing={24}
        roundedTop
        // roundedBottom
        // hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: family.regular,
        }}
        noOfSections={4}
        maxValue={75}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CalorieChart;
