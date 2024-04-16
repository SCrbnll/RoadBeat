import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants'
import CustomText from "../CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';

const HeaderRoom = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const chargeRoomBossInfo = async () => {
            const salaAnfitrion = await AsyncStorage.getItem("sala_nombre");
            setUsername(salaAnfitrion);
        }
        chargeRoomBossInfo();
        }, []);

    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../assets/images/logo.png')} style={styles.image} />
            </View>
            <View>
                <CustomText style={styles.title}>Detalle de {username}</CustomText>
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
        fontSize: 14, 
        color: '#FFFFFF',
        paddingHorizontal: 20,
        fontFamily: 'Krona One',
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 0,
    }
});
export default HeaderRoom;