import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const Loader = ({loader,y}) => {
  return (
    <Modal transparent={true} animationType={'none'} visible={loader}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
        <UIActivityIndicator color='#5FB9E8' size={25} />
        </View> 
        
      </View>
    </Modal>
  );
};
export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(4, 4, 4,0.7)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 60,
    width: 60,
    borderRadius: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});