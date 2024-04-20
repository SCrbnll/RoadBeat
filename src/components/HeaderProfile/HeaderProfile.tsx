import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants'
import CustomText from "../CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';

const HeaderProfile = () => {
    const [username, setUsername] = useState('');
    const [canciones, setCanciones] = useState('');

    useEffect(() => {
        const chargeRoomBossInfo = async () => {
            const userInfoJson = await AsyncStorage.getItem("user_info");
            const userInfo = JSON.parse(userInfoJson);
            setUsername(userInfo.username)
            setCanciones(userInfo.canciones)
        }
        chargeRoomBossInfo();
        }, []);

    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../assets/images/pfp.png')} style={styles.image} />
            </View>
            <View>
                <CustomText style={styles.title}>{username}</CustomText>
                <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                    <CustomText style={styles.titleSongs}>{canciones} </CustomText>
                    <CustomText style={styles.subtitle}>· Canciones enviadas</CustomText>
                </View> 
            </View>
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
    title: {
        fontSize: 14, 
        color: '#FFFFFF',
        paddingHorizontal: 20
    },
    titleSongs: {
        fontSize: 10, 
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 10,
        color: '#7A7A7A'
      },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
    }
});
export default HeaderProfile;