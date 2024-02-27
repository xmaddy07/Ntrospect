import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {family} from '../constant/Index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';



const FavoriteModal = ({loader, close, value, select,data}) => {

console.log('objekjndkjsnckjsdct',data)

  return (
    <Modal transparent={true} animationType={'none'} visible={loader}>
      <View style={styles.modalBackground}>
        
      <TouchableOpacity 
      style={{alignSelf:'flex-start',top:wp(6), left: wp(3), }}
      onPress={() => close()}>
          <AntDesign name="arrowleft" size={25} style={styles.closeIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => close()}
          style={styles.chartIcon}>
          <Ionicons name="filter" size={20} color={'#5FB9E8'} />
        </TouchableOpacity>
        
        <View style={styles.activityIndicatorWrapper}>

{data.map((item)=>(
  <>
  <TouchableOpacity 
  onPress={()=>select(item.name)}
  style={[
    styles.View,
    {backgroundColor: value === item.name ? '#5FB9E8' : null},
  ]}>
  <Text style={styles.txt1}>{item.description}</Text>
  </TouchableOpacity>
   <View style={styles.line}></View>
   </>
))}


          {/* <TouchableOpacity
           style={[
            styles.View,
            {backgroundColor: value === 'Food Science' ? '#5FB9E8' : null},
          ]}
            onPress={async () => {
              select('Food Science');
              close();
            }}>
            <Text style={styles.txt1}>Food Science</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity
          style={[
            styles.View,
            {backgroundColor: value === 'Nutrition' ? '#5FB9E8' : null},
          ]}
            onPress={() => {
              select('Nutrition');
              close();
            }}>
            <Text style={styles.txt2}>Nutrition</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity
           style={[
            styles.View,
            {backgroundColor: value === 'Environmental Quality' ? '#5FB9E8' : null},
          ]}
            onPress={() => {
              select('Environmental Quality');
              close();
            }}>
            <Text style={styles.txt2}>Environmental Quality</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity
           style={[
            styles.View,
            {backgroundColor: value === 'Diet' ? '#5FB9E8' : null},
          ]}
            onPress={() => {

              select('Diet');
              close();
            }}>
            <Text style={styles.txt2}>Diet</Text>
          </TouchableOpacity>

          <View style={styles.line}></View>
          <TouchableOpacity
           style={[
            styles.View,
            {backgroundColor: value === 'Overweight and Obesity' ? '#5FB9E8' : null},
          ]}
            onPress={() => {

              select('Overweight and Obesity');
              close();
            }}>
            <Text style={styles.txt2}>Overweight and Obesity</Text>
          </TouchableOpacity> */}

        </View>
      </View>
    </Modal>
  );
};
export default FavoriteModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'flex-end',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    // backgroundColor: 'rgba(4, 4, 4,0.7)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    height: hp(20),
    width: wp(47),
    marginTop: wp(18),
    marginRight: wp(3),
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txt1: {
    color: '#1F2937',
    marginLeft: wp(2),
    fontSize: 12,
    fontFamily: family.medium,
    // marginTop: wp(2),
  },
  txt2: {
    color: '#1F2937',
    marginTop: 5,
    marginLeft: wp(2),
    fontSize: 12,
    fontFamily: family.medium,
    // marginTop: wp(3),
  },
  line: {
    height: hp(0.2),
    width: wp(40),
    backgroundColor: '#E4E4E4',
    marginTop: wp(1),
    alignSelf: 'center',
  },
  View: {
    marginTop: wp(1),
    height: hp(4),
    width: wp(45),
    justifyContent: 'center',
    backgroundColor: '#5FB9E8',
    alignSelf: 'center',
  },
  closeIcon: {
    color: '#000',
  },
  chartIcon: {
    backgroundColor: '#F7F7F7',
    width: wp(10),
    height: hp(5),
    right: wp(3.3),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#707070',
    top:wp(17.3)
  },
});
