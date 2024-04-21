import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import { useState, useEffect } from 'react';

const HeaderProfileDetail = () => {
    const [profileImage, setProfileImage] = useState(null);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/pfp.png')} style={styles.image} />
            <TouchableOpacity style={styles.cameraButton}>
                <Entypo name="camera" size={20} color="white" style={{left: 8, top: 5}} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 'auto',
        backgroundColor: '#180000',
        height: 180
    },
    cameraButton: {
        height: 35,
        width: 35,
        backgroundColor: '#580000',
        borderRadius: 50,
        left: -150,
        top: 45
    },
    image: {
        width: 100,
        height: 100,
        left: 10,
        borderRadius: 100,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

export default HeaderProfileDetail;
