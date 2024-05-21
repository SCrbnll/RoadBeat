import { StyleSheet, View, TouchableOpacity, TextInput, Image, BackHandler } from "react-native"
import React from "react"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
import Constants from 'expo-constants'
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import CustomText from "../components/CustomText"
import { API_URL_LOCAL, API_URL_AZURE } from "@env";

const ProfileDetail = () => {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [canciones, setCanciones] = useState('');
    const [pfp, setPfp] = useState('');
    const [closed, setClosed] = useState('');

    const handlePress = () => {
        navigation.goBack()
    };
    
    useEffect(() => {
        const chargeRoomBossInfo = async () => {
            const userInfoJson = await AsyncStorage.getItem("user_info");
            const userInfo = JSON.parse(userInfoJson);
            setId(userInfo.id)
            setUsername(userInfo.username)
            setName(userInfo.nombre)
            setEmail(userInfo.email)
            setPassword(userInfo.password)
            setCanciones(userInfo.canciones)
            if(userInfo.foto == 'pfp'){
                setPfp('')
            } else {
                setPfp(userInfo.foto)
            }
            setClosed(userInfo.closed)
        }
        chargeRoomBossInfo();

        const backAction = () => {
            handlePress();
            return true; 
        };
  
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
        return () => backHandler.remove();
        }, []);

    const handleChooseProfileImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (!pickerResult.canceled) {
            setPfp(pickerResult.assets[0].uri);
        }
    };

    const changeInfo = async () => {
        try {
            const response = await fetch(`${API_URL_LOCAL}/usuarios/changeprofile`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    email: email,
                    nombre: name,
                    username: username,
                    password: password,
                    canciones: canciones,
                    foto: pfp,
                    closed: closed
                }),
            });
    
            const userInfo = await fetch(`${API_URL_LOCAL}/usuarios/`+ id);
            const users = await userInfo.json(); 
            const infoUser = JSON.stringify(users);
            await AsyncStorage.removeItem('user_info');
            await AsyncStorage.setItem('user_info', infoUser);
            handlePress()
        } catch (error) {  
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.photoContainer}>
                <Image source={pfp === '' ? require('./../assets/images/pfp.png') : { uri: pfp }} style={styles.image} />
                <TouchableOpacity style={styles.cameraButton} onPress={handleChooseProfileImage}>
                    <Entypo name="camera" size={20} color="white" style={{left: 8, top: 5}} />
                </TouchableOpacity>
            </View>
            <View style={{padding: 10}} />
            <View style = {styles.contentBox}>
                <CustomText style={styles.title}> Nombre</CustomText>
                <View style={{padding: 15}}></View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <View style={styles.textInputLine} />
                <CustomText style={styles.title}> Nombre de usuario</CustomText>
                <View style={{padding: 15}}></View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setUsername(text)}
                    value={username}
                />
                <View style={styles.textInputLine} />
                <CustomText style={styles.title}> Correo electrónico</CustomText>
                <View style={{padding: 15}}></View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <View style={styles.textInputLine} />
                <View style={{padding: 15}}></View>
                <TouchableOpacity style = {styles.button} onPress={changeInfo}>
                    <CustomText style={styles.buttonTitle}>Guardar cambios</CustomText>
                </TouchableOpacity>
            </View>
            <View style={{padding: 100}} />
            <TouchableOpacity style = {styles.button} onPress={handlePress}>
                <CustomText style={styles.buttonTitle}>Volver atrás</CustomText>
            </TouchableOpacity>
            <View style={{padding: 15}} />
        </View>  
    )
};

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
        left: -5,
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

export default ProfileDetail