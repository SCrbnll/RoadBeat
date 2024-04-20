import { StyleSheet, View, TouchableOpacity } from "react-native"
import React from "react"

import CustomText from "../../components/CustomText"
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const ChangeProfile = () => {
    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Mi perfil</CustomText>
            <View style={{ marginVertical: 15 }} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style = {styles.button}>
                    <View style={{ marginHorizontal: 3 }} />
                    <Ionicons name="person" size={24} color="white" />
                    <View style={{ marginHorizontal: 5 }} />
                    <CustomText style={styles.buttonTitle}>Editar perfil</CustomText>
                </TouchableOpacity>
                <View style={{ marginVertical: 5 }} />
                <TouchableOpacity style = {styles.button}>
                    <View style={{ marginHorizontal: 5 }} />
                    <FontAwesome name="unlock-alt" size={24} color="white" />
                    <View style={{ marginHorizontal: 5 }} />
                    <CustomText style={styles.buttonTitle}> Cambiar contraseña</CustomText>
                </TouchableOpacity>
                <View style={{ marginVertical: 5 }} />
                <TouchableOpacity style = {styles.button}>
                    <View style={{ marginHorizontal: 3 }} />
                    <Feather name="log-out" size={24} color="white" />
                    <View style={{ marginHorizontal: 5 }} />
                    <CustomText style={styles.buttonTitle}>Cerrar sesión</CustomText>
                </TouchableOpacity>
            </View>
            <CustomText style={styles.subtitle}>Copyright C 2024 RoadBeat. {"\n"}RoadBeat.com v1.0.0</CustomText>
        </View>
    )
}

export default ChangeProfile

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
        height: 30,
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