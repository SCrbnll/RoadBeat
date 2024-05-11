import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants'
import CustomText from "./CustomText";


const HeaderPassword = () => {
    
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('./../assets/images/logo.png')} style={styles.image} />
            </View>
            <View>
                <CustomText style={styles.title}>Cambio de contraseña</CustomText>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20,
        backgroundColor: '#180000',
        height: 85
    },
    title: {
        fontSize: 14, 
        color: '#FFFFFF',
        paddingHorizontal: 20,
        fontFamily: 'Krona One',
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 0,
    }
});
export default HeaderPassword;