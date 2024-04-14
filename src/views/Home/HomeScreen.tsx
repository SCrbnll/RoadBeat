import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';

import Clock from '../../components/Clock';
import Line from '../../components/Line';
import CustomText from '../../components/CustomText';

const HomeScreen = () => {
    const nameInputRef = useRef<TextInput>(null);
    const [name, setName] = useState('');
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <View style={styles.container}>
                <Clock />
                <View style={{marginVertical: 25}}></View>
                <Line />
                <View style={{padding: 15}} />
                <View style = {styles.contentBox}>
                    <CustomText style={styles.title}> Nombre de la Sala </CustomText>
                    <View style={{padding: 15}}></View>
                    <TextInput
                        ref={nameInputRef}
                        style={styles.textInput}
                        placeholder="Nombre completo"
                        placeholderTextColor="#7A7A7A"
                        onChangeText={text => setName(text)}
                        value={name}
                    />
                    <View style={styles.textInputLine} />
                    <View style={{padding: 15}}></View>
                    <TouchableOpacity style = {styles.button}>
                        <CustomText style={styles.buttonTitle}>Crear sala</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}


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
        height: 200,
        width: 320,
        paddingHorizontal: 35,
        alignItems: 'flex-start',
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

export default HomeScreen