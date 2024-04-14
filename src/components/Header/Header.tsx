import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants'
import CustomText from "../CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';

const Header = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const chargeUserInfo = async () => {
            const retrievedUserInfo = await AsyncStorage.getItem('user_info');
            const parsedUserInfo = JSON.parse(retrievedUserInfo);
            setUsername(parsedUserInfo.username);
        }
        chargeUserInfo();
        }, []);

    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../assets/images/pfp.png')} style={styles.image} />
            </View>
            <View>
                <CustomText style={styles.title}>{username}</CustomText>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20,
        backgroundColor: '#180000',
        height: 85
    },
    title: {
        fontSize: 16, 
        color: '#FFFFFF',
        paddingHorizontal: 20,
        fontFamily: 'Krona One',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    }
});
export default Header;