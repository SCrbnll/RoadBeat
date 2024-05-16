import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants'
import CustomText from "./CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';

const HeaderRoomScreen = () => {
    const [nombreSala, setNombreSala] = useState('');

    useEffect(() => {
        const chargeRoomBossInfo = async () => {
            const salaAnfitrion = await AsyncStorage.getItem("sala_nombre");
            setNombreSala(salaAnfitrion);
        }
        chargeRoomBossInfo();
        }, []);

    return (
        <View style={styles.container}>
            <View>
                <Image source={require('./../assets/images/logo.png')} style={styles.image} />
            </View>
            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>Detalle de {nombreSala}</CustomText>
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
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    }
});

export default HeaderRoomScreen;