import React, {useState} from 'react';
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

const FoodScienceModal = ({
  loader,
  close,
  value,
  select,
  navigation,
  parentReference,
}) => {
  // const [clrchange, setclrchange] = useState('');
  // console.log('---------', clrchange);

  return (
    <Modal transparent={true} animationType={'none'} visible={loader}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <TouchableOpacity
            style={[
              styles.View,
              {backgroundColor: value === 'most' ? '#5FB9E8' : null},
            ]}
            onPress={async () => {
              select('most');
              // parentReference(false);
              close();
            }}>
            <Text
              style={[
                styles.txt1,
                {color: value == 'most' ? 'white' : 'black'},
              ]}>
              Most Viewed
            </Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity
            style={[
              styles.View,
              {backgroundColor: value === 'newest' ? '#5FB9E8' : null},
            ]}
            onPress={async () => {
              //  setclrchange('newest')
              select('newest');
              close();
              // parentReference(false);
            }}>
            <Text
              style={[
                styles.txt2,
                {color: value === 'newest' ? 'white' : 'black'},
              ]}>
              Newest
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default FoodScienceModal;

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
    height: hp(12),
    width: wp(40),
    marginTop: wp(15),
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
    // backgroundColor:'blue',
  },
  txt2: {
    color: '#1F2937',
    marginTop: 5,
    marginLeft: wp(3),
    fontSize: 12,
    fontFamily: family.medium,
    // marginTop: wp(3),
  },
  line: {
    height: hp(0.2),
    width: wp(35),
    backgroundColor: '#E4E4E4',
    marginTop: 5,
    alignSelf: 'center',
  },
  View: {
    marginTop: wp(1),
    height: hp(4),
    width: wp(35),
    justifyContent: 'center',
    // backgroundColor: '#5FB9E8',
    alignSelf: 'center',
  },
});
