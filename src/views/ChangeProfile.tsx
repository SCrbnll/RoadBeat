import { StyleSheet, View, TouchableOpacity, TextInput, BackHandler } from "react-native"
import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import CustomText from "../components/CustomText"
import CustomModal from "../components/CustomModal";
import { API_URL_LOCAL, API_URL_AZURE } from "@env";

const ChangeProfile = () => {
    const navigation = useNavigation();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [canciones, setCanciones] = useState('');
    const [pfp, setPfp] = useState('');
    const [closed, setClosed] = useState(Boolean);
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordInput, setOldPasswordInput] = useState('');
    const [newPasswordInput, setNewPasswordInput] = useState('');
    const [newPasswordInput2, setNewPasswordInput2] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [customModalVisible, setCustomModalVisible] = useState(Boolean);


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
            setClosed(userInfo.closed)
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
        if(oldPasswordInput.length === 0 || newPasswordInput.length === 0 || newPasswordInput2.length === 0) {
            setCustomModalVisible(true)
            setModalTitle('Error')
            setModalMessage('Debes rellenar todos los campos');
            openModal();
        } else {
            try {
                if(oldPassword == oldPasswordInput) {
                    if(newPasswordInput === newPasswordInput2){
                        const response = await fetch(`${API_URL_LOCAL}/usuarios/changepass/` + newPasswordInput, {
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
                                password: newPasswordInput,
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
                        
                        await AsyncStorage.removeItem("user_password")
                        await AsyncStorage.removeItem("user_info")
                        await AsyncStorage.removeItem("user_id")
                        handlePress('Login')
                    } else {
                        setModalTitle('Error')
                        setModalMessage('La nueva contraseña no coincide');
                        openModal();
                    }
                    
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
            <CustomText style={styles.warning}>Al cambiar su contraseña deberá iniciar sesión de nuevo en la plataforma para poder acceder</CustomText>
            <View style={styles.container}>
                <View style = {styles.contentBox2}>
                    <CustomText style={styles.title}> Contraseña nueva</CustomText>
                    <View style={{padding: 15}} />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setNewPasswordInput(text)}
                        placeholder="Inserte su nueva contraseña"
                        placeholderTextColor="#7A7A7A"
                        value={newPasswordInput}
                        secureTextEntry={true} 
                    />
                    <View style={styles.textInputLine} />
                    <CustomText style={styles.title}> Repetir contraseña nueva</CustomText>
                    <View style={{padding: 15}} />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setNewPasswordInput2(text)}
                        placeholder="Inserte de nuevo la nueva contraseña"
                        placeholderTextColor="#7A7A7A"
                        value={newPasswordInput2}
                        secureTextEntry={true} 
                    />
                    <View style={styles.textInputLine} />
                    <View style={{padding: 15}} />
                    <TouchableOpacity style = {styles.button} onPress={changeInfo}>
                        <CustomText style={styles.buttonTitle}>Cambiar contraseña</CustomText>
                    </TouchableOpacity>
                </View>
                <View style={{padding: 80}} />
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
    contentBox2: {
        backgroundColor: '#000000',
        height: 250,
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

export default ChangeProfile