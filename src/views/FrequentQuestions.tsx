import { StyleSheet, View, TouchableOpacity } from "react-native"
import React from "react"
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomText from "../components/CustomText"
import DropdownButton from "../components/DropdownButton";

const FrequentQuestions = () => {    
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.goBack()
      };

    return (
        <View style={styles.container}>
            <DropdownButton titleButton={'¿RoadBeat está disponible en diferentes plataformas?'} content={'Actualmente solo nos centramos en nuestra aplicación móvil pero en un fúturo quien sabe'} enlace={null}/>
            <DropdownButton titleButton={'¿Puedo reproducir música sin conexión en RoadBeat?'} content={'En este caso no permitimos el uso de nuestra aplicación sin conexión a Internet'} enlace={null}/>
            <DropdownButton titleButton={'¿Cómo puedo informar un problema o enviar comentarios sobre la aplicación?'} content={'Puedes ponerte en contacto con nosotros mediante el email soporte@roadbeat.es'} enlace={null}/>
            <DropdownButton titleButton={'¿Cómo puedo eliminar mi cuenta?'} content={'Si deseas eliminar la cuenta puedes hacerlo clickando aquí'} enlace={'a'}/>
            <TouchableOpacity style = {styles.button} onPress={handlePress}>
                <CustomText style={styles.buttonTitle}>Volver atrás</CustomText>
            </TouchableOpacity>
        </View>  
    )
};

export default FrequentQuestions

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#210000',
        flex: 1,  
        paddingVertical: 10
    },
    button: {
        backgroundColor: '#580000',
        padding: 10,
        color: '#FFFFFF',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 20,
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
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: 50,
      },
});