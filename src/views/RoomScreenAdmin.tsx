import { StyleSheet, View, FlatList, Alert, Image, TouchableOpacity } from "react-native"
import React from "react"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
import SpotifyAPI from "../types/SpotifyData";

import CustomText from "../components/CustomText"
import TrackQueue from "../components/TrackQueue";
import { Feather } from '@expo/vector-icons';

const RoomScreenAdmin = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('');
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const data = [
        {
            name: 'Song 1',
            author: 'artist 1',
            added: 'Agregado por x'
        },
        {
            name: 'Song 2',
            author: 'artist 1',
            added: 'Agregado por x'
        },
        {
            name: 'Song 3',
            author: 'artist 1',
            added: 'Agregado por x'
        },

        {
            name: 'Song 4',
            author: 'artist 1',
            added: 'Agregado por x'
        },
        {
            name: 'Song 5',
            author: 'artist 1',
            added: 'Agregado por x'
        },
        {
            name: 'Song 6',
            author: 'artist 1',
            added: 'Agregado por x'
        },

    ]
    const handlePress = (screenName) => {
        navigation.navigate(screenName as never);
    };
    
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
    const closeRoom = async () => {
        try {
            const roomJson = await fetch('http://10.0.2.2:8080/salas/' + await AsyncStorage.getItem('room_id'))
            const room = await roomJson.json();
            Alert.alert(
                'Cerrar sala',
                '¿Estás seguro de que deseas cerrar la sala?',
                [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Sí',
                    onPress: async () => {
                            const response = await fetch('http://10.0.2.2:8080/codigosSalas/cerrada', {
                            method: 'PUT',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                cerrada: true,
                                codSala: code,
                                salas: room
                            }),
                        });
                        await AsyncStorage.removeItem("room_id")
                        await AsyncStorage.removeItem("room_code")
                        handlePress('Main');
                    },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {  
            console.log(error)
        }
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <CustomText style={styles.title}>Código de la Sala</CustomText>
                <CustomText style={styles.code}>{code}</CustomText>
            </View>
            <View style={styles.currentSongInfo}>
                <Image source={require('./../assets/images/pfp.png')} style={styles.image} />
                <View style={{paddingHorizontal: 5}}/>
                <View>
                    <CustomText style={styles.actualTrack}>Canción actual</CustomText>
                    <View style={styles.contentBox}>
                        <CustomText style={styles.dataTrack}>Running in the Night</CustomText>
                        <CustomText style={styles.dataTrack}>FM-84</CustomText>
                    </View>
                    <CustomText style={styles.addedBy}>Agregada por Usuario1</CustomText>
                </View>
            </View> 
            <View style={styles.textInputLine} />
            <View style={styles.playQueue}>
                <CustomText style={styles.actualTrack}>Canciones en cola</CustomText>
                <View style={styles.queueBox}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <TrackQueue item={item} />}
                        keyExtractor={item => item.name.toString()}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style = {styles.button}>
                    <Feather name="shuffle" size={20} color="white" style={{left: 15}}/>
                    <CustomText style={styles.buttonTitle}>Saltar canción</CustomText>
                </TouchableOpacity>
                <View style={{padding: 30}}></View>
                <TouchableOpacity style = {styles.button}  onPress={closeRoom}>
                    <CustomText style={styles.buttonTitle}>Cerrar sala</CustomText>
                </TouchableOpacity>
            </View>
        </View>  
    )
};

export default RoomScreenAdmin

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#210000',
        flex: 1,  
    },
    title:{
        fontSize: 14,
        fontFamily: 'Krona One',
        top: 25,
        color: '#FFFFFF',
        left: -80,
    },
    dataTrack:{
        fontSize: 12,
        fontFamily: 'Krona One',
        color: '#FFFFFF',
        left: 20,
        top: 15
    },
    addedBy:{
        fontSize: 10,
        fontFamily: 'Krona One',
        color: '#7A7A7A',
        top: 10,
    },
    actualTrack: {
        fontSize: 12,
        fontFamily: 'Krona One',
        color: '#FFFFFF',
        left: 0,
    },
    playQueue: {
        top: 55,
        alignSelf: 'center'
    },
    queueBox: {
        backgroundColor: '#000000',
        height: 310,
        width: 360,
        top: 10,
    },
    textContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    textInputLine: {
        borderBottomWidth: 2, 
        borderBottomColor: '#7A7A7A', 
        width: '90%',
        alignSelf: 'center',
        top: 50
    },
    contentBox: {
        backgroundColor: '#580000',
        height: 60,
        width: 250,
        top: 8,
        alignItems: 'flex-start',
    },
    code: {
        color: '#FFC0CB',
        fontSize: 14,
        fontFamily: 'Krona One',
        top: 25,
        left: 80,
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
    image: {
        width: 100,
        height: 100,
        left: 0,
        marginRight: 'auto'
    },
    currentSongInfo: {
        flexDirection: 'row',
        top: 40,
        alignSelf: 'center'

    },
    buttonContainer: {
        marginVertical: 8,
        top: 80,
    }
});