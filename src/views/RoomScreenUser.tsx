import { StyleSheet, View, FlatList, Alert, Image, TouchableOpacity, TextInput } from "react-native"
import React from "react"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from 'react';
import SpotifyAPI from "../types/SpotifyData";

import CustomText from "../components/CustomText"
import { Feather } from '@expo/vector-icons';
import ShowAlert from "../components/ShowAlert";

import { Entypo } from '@expo/vector-icons';
import TrackSearch from "../components/TrackSearch";

const RoomScreenUser = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('');
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [data, setData] = useState<TrackItem[]>([]);
    const [searchedSong, setSearchedSong] = useState('');
    const searchedSongInputRef = useRef<TextInput>(null);

    const handlePress = (screenName) => {
        navigation.navigate(screenName as never);
    };
    
    useEffect(() => {
        const initialMethod = async () => {
            SpotifyAPI.getToken()
        };
        initialMethod();
    }, []);

    const searchSong = async () => {
        try {
            const searchResult = await SpotifyAPI.searchSongs(searchedSong);
            const tracks = searchResult.tracks.items;
            setData(tracks);
        } catch (error) {
            console.error('Error al buscar canciones:', error);
        }
    }

    const leaveRoom = async () => {
        try {
            const roomJson = await fetch('http://10.0.2.2:8080/salas/' + await AsyncStorage.getItem('room_id'))
            const room = await roomJson.json();
            Alert.alert(
                'Abandonar sala',
                '¿Estás seguro de que deseas abandonar la sala?',
                [
                    {
                        text: 'No',
                        style: 'cancel',
                    },
                    {
                        text: 'Sí',
                        onPress: async () => {
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
                <View style={{flexDirection: "row"}}>
                    <Entypo name="magnifying-glass" size={20} color="white" style={{alignSelf: 'center'}}/>
                    <TextInput
                        ref={searchedSongInputRef}
                        style={styles.textInput}
                        placeholder="¿Qué canción estás buscando?"
                        placeholderTextColor="#7A7A7A"
                        onChangeText={text => setSearchedSong(text)}
                        value={searchedSong}
                    />
                    <TouchableOpacity style = {styles.searchButton} onPress={searchSong}>
                        <CustomText style={styles.searchTitle}>Buscar</CustomText>
                    </TouchableOpacity>
                </View>
                <View style={styles.queueBox}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <TrackSearch item={item} />}
                        keyExtractor={item => item.id.toString()}
                    /> 
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style = {styles.button}>
                    <Feather name="shuffle" size={20} color="white" style={{left: 15}}/>
                    <CustomText style={styles.buttonTitle}>Realizar votación</CustomText>
                </TouchableOpacity>
                <View style={{padding: 5}}></View>
                <TouchableOpacity style = {styles.button}>
                    <CustomText style={styles.buttonTitle}>Ver Canciones en cola</CustomText>
                </TouchableOpacity>
                <View style={{padding: 20}}></View>
                <TouchableOpacity style = {styles.button}  onPress={leaveRoom}>
                    <CustomText style={styles.buttonTitle}>Cerrar sala</CustomText>
                </TouchableOpacity>
            </View>
        </View>  
    )
};

export default RoomScreenUser

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
        top: 50,
        alignSelf: 'center'
    },
    queueBox: {
        backgroundColor: '#000000',
        height: 310,
        width: 360,
        top: 10,
    },
    textInputLine: {
        borderBottomWidth: 2, 
        borderBottomColor: '#7A7A7A', 
        width: '90%',
        alignSelf: 'center',
        top: 40
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
        padding: 6,
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
    searchButton: {
        backgroundColor: '#580000',
        padding: 6,
        color: '#FFFFFF',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 60,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        left: 25
    },
    searchTitle: {
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1,
        fontSize: 10
    },
    image: {
        width: 100,
        height: 100,
        left: 0,
        marginRight: 'auto'
    },
    currentSongInfo: {
        flexDirection: 'row',
        top: 20,
        alignSelf: 'center'

    },
    buttonContainer: {
        marginVertical: 8,
        top: 80,
    },
    textInput: {
        backgroundColor: 'transparent',  
        fontSize: 14, 
        color: '#FFFFFF',
        left: 20,
        alignSelf: 'center',
        width: 220
    },
});