import { StyleSheet, View, TouchableOpacity, BackHandler } from "react-native"
import React, { useEffect } from "react"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import CustomText from "../components/CustomText"
import ConfirmModal from "../components/ConfirmModal";

import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const ProfileDetail = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const backAction = () => {
            logOut();
            return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    const logOut = () => {
        setModalTitle('Cerrar sesión')
        setModalMessage('¿Estás seguro que deseas cerrar sesión?');
        openModal();
    };

    const handlePress = (screenName) => {
        navigation.navigate(screenName as never);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleConfirm = async () => {
        await AsyncStorage.removeItem("user_password")
        await AsyncStorage.removeItem("user_info")
        await AsyncStorage.removeItem("user_id")
        handlePress('Login');
    };

    return (
        <View style={styles.container}>
            <ConfirmModal
                visible={modalVisible}
                onClose={closeModal}
                onConfirm={handleConfirm}
                title={modalTitle}
                message={modalMessage}
            />
            <CustomText style={styles.title}>Mi perfil</CustomText>
            <View style={{ marginVertical: 15 }} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('ProfileDetail')}>
                    <View style={{ marginHorizontal: 3 }} />
                    <Ionicons name="person" size={20} color="white" />
                    <View style={{ marginHorizontal: 5 }} />
                    <CustomText style={styles.buttonTitle}>Editar perfil</CustomText>
                </TouchableOpacity>
                <View style={{ marginVertical: 5 }} />
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('ChangePassword')}>
                    <View style={{ marginHorizontal: 5 }} />
                    <FontAwesome name="unlock-alt" size={20} color="white" />
                    <View style={{ marginHorizontal: 5 }} />
                    <CustomText style={styles.buttonTitle}> Cambiar contraseña</CustomText>
                </TouchableOpacity>
                <View style={{ marginVertical: 5 }} />
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('FrequentQuestions')}>
                    <View style={{ marginHorizontal: 5 }} />
                    <FontAwesome6 name="clipboard-question" size={20} color="white" />
                    <View style={{ marginHorizontal: 5 }} />
                    <CustomText style={styles.buttonTitle}> Preguntas frecuentes</CustomText>
                </TouchableOpacity>
                <View style={{ marginVertical: 5 }} />
                <TouchableOpacity style = {styles.button} onPress={logOut}>
                    <View style={{ marginHorizontal: 3 }} />
                    <Feather name="log-out" size={20} color="white" />
                    <View style={{ marginHorizontal: 5 }} />
                    <CustomText style={styles.buttonTitle}>Cerrar sesión</CustomText>
                </TouchableOpacity>
            </View>
            <CustomText style={styles.subtitle}>Copyright C 2024 RoadBeat. {"\n"}RoadBeat.com v1.0.0</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#210000',
        flex: 1,  
    },
    title:{
        fontSize: 14,
        top: 25,
        color: '#FFFFFF',
        left: 20,
    },
    subtitle: {
        fontSize: 8,
        color: '#7A7A7A',
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: 70,
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 1,
        marginTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 18,
    },
    button: {
        backgroundColor: '#580000',
        padding: 6,
        height: 35,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
    },
      buttonTitle: {
        color: '#FFFFFF',
        flex: 1,
        fontSize: 12
    },
})

export default ProfileDetail
