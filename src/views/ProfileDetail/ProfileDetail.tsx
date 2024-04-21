import { StyleSheet, View, TouchableOpacity, Alert, TextInput } from "react-native"
import React from "react"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';

import CustomText from "../../components/CustomText"

const ProfileDetail = () => {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [canciones, setCanciones] = useState('');


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
        }
        chargeRoomBossInfo();
        }, []);

    const handlePress = () => {
        navigation.goBack()
    };
    const changeInfo = async () => {
        try {
            // Register the User
            const response = await fetch('http://10.0.2.2:8080/usuarios/changeprofile', {
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
                    canciones: canciones
                }),
            });
    
            // Save the new User into user_info
            const userInfo = await fetch('http://10.0.2.2:8080/usuarios/'+ id);
            const users = await userInfo.json(); 
            const infoUser = JSON.stringify(users);
            await AsyncStorage.removeItem('user_info');
            await AsyncStorage.setItem('user_info', infoUser);
            console.log('User info saved to AsyncStorage');
            console.log(infoUser)
            Alert.alert(
                'Información cambiada exitosamente', '',[
                    {
                    text: 'Okay',
                    onPress: () => {
                        handlePress()
                    },
                }],
            );
        } catch (error) {  
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
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

export default ProfileDetail

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
});