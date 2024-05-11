import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants'
import CustomText from "../CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const HeaderProfile = () => {
    const [username, setUsername] = useState('');
    const [canciones, setCanciones] = useState('');
    const [pfp, setPfp] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            const chargeRoomBossInfo = async () => {
                const userInfoJson = await AsyncStorage.getItem("user_info");
                const userInfo = JSON.parse(userInfoJson);
                setUsername(userInfo.username)
                setCanciones(userInfo.canciones)
                if(userInfo.foto == 'pfp'){
                    setPfp('')
                } else {
                    setPfp(userInfo.foto)
                }
            }
        chargeRoomBossInfo();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View>
                <Image source={pfp === '' ? require('../../assets/images/pfp.png') : { uri: pfp }} style={styles.image}/>
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
        paddingHorizontal: 20,
        left: 50
    },
    titleSongs: {
        fontSize: 10, 
        color: '#FFFFFF',
        left: 50
    },
    subtitle: {
        fontSize: 10,
        color: '#7A7A7A',
        left: 50
      },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        left: 50
    }
});
export default HeaderProfile;