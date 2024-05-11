import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants'
import CustomText from "./CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';

const HeaderRoomScreen = () => {
    const [name, setName] = useState('');
    const [anfitrion, setAnfitrion] = useState('');

    useEffect(() => {
        const chargeRoomBossInfo = async () => {
            const idSala = await AsyncStorage.getItem('room_id')
            const roomJson = await fetch('http://10.0.2.2:8080/salas/' + idSala);
            const room = await roomJson.json(); 
            console.log(room)
            setName(room.nombre);
            setAnfitrion(room.usuarios.username)
        }
        chargeRoomBossInfo();
        }, []);

    return (
        <View style={styles.container}>
            <View>
                <Image source={require('./../assets/images/logo.png')} style={styles.image} />
            </View>
            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>{name}</CustomText>
                <View style={{paddingVertical: 2}}></View>
                <CustomText style={styles.subtitle}>Anfitrión : {anfitrion}</CustomText>
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
    subtitle:{
        color: '#7A7A7A',
        fontSize: 10, 
        paddingHorizontal: 20,
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 0,
    },
    titleContainer: {
        flexDirection: 'column',
    }
});
export default HeaderRoomScreen;