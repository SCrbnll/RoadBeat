import { StyleSheet, View, TouchableOpacity, Alert, TextInput, Image } from "react-native"
import React from "react"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
import Constants from 'expo-constants'
import SpotifyAPI from "../../types/SpotifyData";

import CustomText from "../../components/CustomText"

const RoomScreenAdmin = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('');
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    useEffect(() => {
        const chargeRoomInfo = async () => {
            const roomCode = await AsyncStorage.getItem("room_code")
            setCode(roomCode)
            chargeCurrentSong()
            SpotifyAPI.getToken()
            
        }
        chargeRoomInfo();
        }, []
    );

    const chargeCurrentSong = async () => {
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <CustomText style={styles.title}>Código de la Sala</CustomText>
                <CustomText style={styles.code}>{code}</CustomText>
            </View>
            <Image src={imageUrl}></Image>
            
        </View>  
    )
};

export default RoomScreenAdmin

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#210000',
        flex: 1,  
    },
    title:{
        fontSize: 14,
        fontFamily: 'Krona One',
        top: 25,
        color: '#FFFFFF',
        left: -65,
    },
    textContainer: {
        flexDirection: 'row',
    },
    code: {
        color: '#FFC0CB',
        fontSize: 14,
        fontFamily: 'Krona One',
        top: 25,
        left: 65,

    },
    textInput: {
        backgroundColor: 'transparent',  
        fontSize: 14, 
        color: '#FFFFFF',
    },
    contentBox: {
        backgroundColor: '#000000',
        height: 325,
        width: 350,
        paddingHorizontal: 25,
        alignItems: 'flex-start',
        alignContent: 'center',
        flex: 0
    },
    textInputLine: {
        borderBottomWidth: 2, 
        borderBottomColor: '#7A7A7A', 
        width: '100%',
    },
    button: {
        backgroundColor: '#580000',
        padding: 10,
        color: '#FFFFFF',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 220,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonTitle: {
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1,
        fontSize: 12
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
    },
    photoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 400,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 'auto',
        backgroundColor: '#180000',
        flex: 1,
    },
});