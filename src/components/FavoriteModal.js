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

const FavoriteModal = ({loader, close, value, select}) => {
  return (
    <Modal transparent={true} animationType={'none'} visible={loader}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <TouchableOpacity
           style={[
            styles.View,
            {backgroundColor: value === 'Product' ? '#5FB9E8' : null},
          ]}
            onPress={async () => {
              select('Product');
              close();
            }}>
            <Text style={styles.txt1}>Product</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity
          style={[
            styles.View,
            {backgroundColor: value === 'Recipes' ? '#5FB9E8' : null},
          ]}
            onPress={() => {
              select('Recipes');
              close();
            }}>
            <Text style={styles.txt2}>Recipes</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity
           style={[
            styles.View,
            {backgroundColor: value === 'News' ? '#5FB9E8' : null},
          ]}
            onPress={() => {
              select('News');
              close();
            }}>
            <Text style={styles.txt2}>News</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity
           style={[
            styles.View,
            {backgroundColor: value === 'Articles' ? '#5FB9E8' : null},
          ]}
            onPress={() => {

              select('Articles');
              close();
            }}>
            <Text style={styles.txt2}>Articles</Text>
          </TouchableOpacity>
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
    height: hp(23),
    width: wp(38),
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
    width: wp(30),
    backgroundColor: '#E4E4E4',
    marginTop: wp(1),
    alignSelf: 'center',
  },
  View: {
    marginTop: wp(1),
    height: hp(4),
    width: wp(30),
    justifyContent: 'center',
    // backgroundColor: '#5FB9E8',
    alignSelf: 'center',
  },
});
