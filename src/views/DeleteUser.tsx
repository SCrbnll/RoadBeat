import { StyleSheet, View, TouchableOpacity, TextInput, BackHandler } from "react-native"
import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import CustomText from "../components/CustomText"
import CustomModal from "../components/CustomModal";
import { API_URL_LOCAL, API_URL_AZURE } from "@env";

const DeleteUser = () => {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [canciones, setCanciones] = useState('');
    const [pfp, setPfp] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordInput, setOldPasswordInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    const handlePress = (screenName) => {
        navigation.navigate(screenName as never);
    };

    const handleBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        const chargeRoomBossInfo = async () => {
            const userInfoJson = await AsyncStorage.getItem("user_info");
            const userInfo = JSON.parse(userInfoJson);
            setOldPassword(await AsyncStorage.getItem("user_password"))
            setId(userInfo.id)
            setUsername(userInfo.username)
            setName(userInfo.nombre)
            setEmail(userInfo.email)
            setCanciones(userInfo.canciones)
            if(userInfo.foto == 'pfp'){
                setPfp('')
            } else {
                setPfp(userInfo.foto)
            }
        }
        chargeRoomBossInfo();

        const backAction = () => {
            handleBack();
            return true; 
        };
  
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
        return () => backHandler.remove();
        }, []);

    const openModal = () => {
        setModalVisible(true);
    };
         
    const closeModal = () => {
        setModalVisible(false);
    };    

    const changeInfo = async () => {
        if(oldPasswordInput.length === 0) {
            setModalTitle('Error')
            setModalMessage('Debes escribir su contraseña actual para proseguir');
            openModal();

        } else {
            try {
                if(oldPassword == oldPasswordInput) {
                    const userInfo = await fetch(`${API_URL_AZURE}/usuarios/`+ id);
                    const users = await userInfo.json(); 

                    const response = await fetch(`${API_URL_AZURE}/usuarios/changeprofile`, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: users.id,
                            email: users.email,
                            nombre: users.nombre,
                            username: users.username,
                            password: users.password,
                            canciones: users.canciones,
                            foto: users.foto,
                            closed: true
                        }),
                    });

                    const userInfo2 = await fetch(`${API_URL_AZURE}/usuarios/`+ id);
                    const users2 = await userInfo2.json(); 
                    const infoUser = JSON.stringify(users2);

                    await AsyncStorage.removeItem("user_password")
                    await AsyncStorage.removeItem("user_info")
                    await AsyncStorage.removeItem("user_id")
                    handlePress('Login')  
                } else {
                    setModalTitle('Error')
                    setModalMessage('La contraseña actual no coincide');
                    openModal();
                    
                }  
            } catch (error) {  
                console.log(error)
            }
        }
    }

    return (
        <View style={styles.container}>
            <CustomModal
                visible={modalVisible}
                onClose={closeModal}
                title={modalTitle}
                message={modalMessage}
            />
            <View style={{padding: 10}} />
            <View style = {styles.contentBox}>
                <CustomText style={styles.title}> Contraseña actual</CustomText>
                <View style={{padding: 15}} />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setOldPasswordInput(text)}
                    placeholder="Escribe la contraseña actual"
                    placeholderTextColor="#7A7A7A"
                    value={oldPasswordInput}
                    secureTextEntry={true} 
                />
                <View style={styles.textInputLine} />
            </View>
            <CustomText style={styles.warning}>
                Está a punto de poner su cuenta en suspensión, pasados los 30 días su cuenta será eliminada por completo del sistema.
                Si usted desea recuperar la cuenta antes de dicho plazo solo deberá de ponerse en contacto con soporte para volver a habilitar su cuenta
            </CustomText>
            <CustomText style={styles.warning}>
                Soporte : soporte@roadbeat.es
            </CustomText>
            <View style={styles.container}>
                <TouchableOpacity style = {styles.button} onPress={changeInfo}>
                    <CustomText style={styles.buttonTitle}>Eliminar cuenta</CustomText>
                </TouchableOpacity>
                <View style={{padding: 130}} />
                <TouchableOpacity style = {styles.button} onPress={handleBack}>
                    <CustomText style={styles.buttonTitle}>Volver atrás</CustomText>
                </TouchableOpacity>
                <View style={{padding: 15}} />
            </View>
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
        height: 120,
        width: 350,
        paddingHorizontal: 25,
        alignItems: 'flex-start',
        alignContent: 'center',
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
    warning: {
        fontSize: 10,
        paddingHorizontal: 20,
        paddingVertical: 20, 
        color: '#FFE500'
    }
});

export default DeleteUser