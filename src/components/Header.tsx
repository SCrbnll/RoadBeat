import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants'
import CustomText from "./CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";

const Header = () => {
    const [username, setUsername] = useState('');
    const [pfp, setPfp] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            const chargeUserInfo = async () => {
                const retrievedUserInfo = await AsyncStorage.getItem('user_info');
                const parsedUserInfo = JSON.parse(retrievedUserInfo);
                setUsername(parsedUserInfo.username);
                if(parsedUserInfo.foto == 'pfp'){
                    setPfp('')
                } else {
                    setPfp(parsedUserInfo.foto)
                }
            }
            chargeUserInfo();
        }, [])
    );
    

    return (
        <View style={styles.container}>
            <View>
                <Image source={pfp ? { uri: pfp } : require('./../assets/images/pfp.png')} style={styles.image} />
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
        fontSize: 14, 
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