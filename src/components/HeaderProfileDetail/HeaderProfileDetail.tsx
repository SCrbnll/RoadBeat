import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HeaderProfileDetail = () => {
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        const chargeProfilePicture = async () => {
            const pfp = await AsyncStorage.getItem("profileImage");
            setProfileImage(pfp)
        }
        chargeProfilePicture();
        }, []);

    const handleChooseProfileImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
    
        if (!pickerResult.canceled) {
            await AsyncStorage.setItem('profileImage', pickerResult.assets[0].uri);
            setProfileImage(pickerResult.assets[0].uri);
        }
      };

    return (
        <View style={styles.container}>
            <Image source={profileImage ? { uri: profileImage } : require('../../assets/images/pfp.png')} style={styles.image} />
            <TouchableOpacity style={styles.cameraButton} onPress={handleChooseProfileImage}>
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
