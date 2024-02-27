import { ToastAndroid, Platform, Alert, StyleSheet } from "react-native";
import React from 'react'

export default function AndroidToast(msg) {
    console.log('AndroidToast', msg)
    // Alert.alert(
    //     '',
    //     msg,
    // )
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }
    else {
        Alert.alert(msg)
        // return
    }
}

const styles = StyleSheet.create({})