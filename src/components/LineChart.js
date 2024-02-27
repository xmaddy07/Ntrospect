import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import React,{useState} from 'react';
import {BarChart} from 'react-native-gifted-charts';
import moment from 'moment';
import {LineChart} from "react-native-chart-kit-chz"

export default function LineCharts() {
  
     
  const getFormattedDate = day => {
    // Use moment to format the date
    const formattedDate = moment(`2024-01-${day}`).format('DD');
    return formattedDate;
  };

  // Rest of your code remains unchanged
  const generateBarData = () => {
    const barData = [];
    const labelColors = ['#54CAA2', '#D25F70']; // Red and Green as alternating colors
  
    for (let day = 1; day <= 31; day++) {
      const formattedDate = getFormattedDate(day);
      const colorIndex = day % labelColors.length; // Determine the color based on position
      const barEntry = {
        value: Math.floor(Math.random() * 100),
        label: formattedDate,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: labelColors[colorIndex], fontSize: 8, right: 10 },
        frontColor: labelColors[colorIndex],
      };
      barData.push(barEntry);
    }
  
    return barData;
  };
  

  const barData = generateBarData();

  const windowWidth = Dimensions.get('window').width;

  return (
    <>
       <View
       >
    <LineChart
  data={{
    labels: ["", "", "", "", "", "", ""], // Bottom Labels
    datasets: [
      {
        data: [10.47, 25.6, 11.4, 19.5, 8.9, 30.9, 55.9], // Data for Chart 
        amount: [,,,,,,], //Amount show on the ToolTip
        color: "#5FB9E8", // Chart Line Color
        currency: "", //Currency to show before amount , 
        id: 1, //ID
        
      },
      //You can add another set here with different data
    ],
  }}
  onPointPress={(d: any) => {
  }}

  selectedDotColor="#ED7681"
  width={Dimensions.get("window").width}
  height={200}
  chartConfig={{
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Change color here
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Change label color here
    fontSize: 12, // Change font size here
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  }}
  bezier //Command this for stright line chart
  style={{
    marginVertical:10
  }}
/>
      </View>
      <View style={{backgroundColor: '#F4F4F4', flex: 1}}>
        <FlatList
          horizontal
          data={[1]}
          renderItem={({item, index}) => {
            return (
              <BarChart
                frontColor={'#177AD5'}
                barWidth={9}
                data={barData}
                spacing={1}
                hideRules
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{color: '#6D6D6D', fontSize: 10}}
              />
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
