import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Clock from '../../components/Clock';
import Line from '../../components/Line';
import CustomText from '../../components/CustomText';
import UserNumberInput from '../../components/NumberInput/NumberInput';
import ShowAlert from "../../components/ShowAlert";

const HomeScreen = () => {
    const [name, setName] = useState('');
    const [cod, setCod] = useState('');
    const [joinCod, setJoinCod] = useState('');

    const currentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate();
        console.log(`${year}-${month}-${day}`)

        return(`${year}-${month}-${day}`);
    }
    const generateRandomNumber = async () => {
        let randomNumber;
        let found = false;
        const response = await fetch('http://10.0.2.2:8080/codigosSalas/salas');
        const jsonData = await response.json();
        const codSalas = [];
        jsonData.map(item => {
            codSalas.push(item.codSala);
        });
        console.log(codSalas)
        do {
            found = false;
            randomNumber = Math.floor(Math.random() * 900) + 100;

            for (let i = 0; i < codSalas.length; i++) {
                if (codSalas[i] === randomNumber) {
                    found = true;
                    break;
                }
            }

        } while (found);
        setCod(randomNumber)  
        console.log('Generated code: ' + cod)   
      }

    const createRoom = async () => {
        if(name.length === 0) {
            ShowAlert('Error', 'Debes insertar el nombre de la sala')
        } else {
            try {
                const userInfoJson = await AsyncStorage.getItem('user_info')
                const userInfo = JSON.parse(userInfoJson);
                console.log(userInfo)
                // Register the Room
                const response = await fetch('http://10.0.2.2:8080/salas', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre: name,
                        usuarios: userInfo,
                        linkPlaylist: 'no playlist',
                        fecha: currentDate()
                    }),
                });
                // ID of the new Room
                const idSala = await response.json(); 
                await AsyncStorage.setItem('room_id', idSala.toString())
                console.log(idSala) 

                const roomJson = await fetch('http://10.0.2.2:8080/salas/' + idSala);
                const room = await roomJson.json(); 
                console.log(room)      
                await generateRandomNumber()

                if(idSala){
                    // Register the Code of the Room
                    const response = await fetch('http://10.0.2.2:8080/codigosSalas', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            cerrada: false,
                            codSala: cod,
                            salas: room
                        }),
                    });
                    const codSala = await response.json(); 
                    console.log(codSala) 
                    console.log('Sala creada');
                    Alert.alert(
                        'Sala creada exitosamente', ' ',[
                            {
                            text: 'Okay',
                            onPress: async () => {
                            
                            },
                        }],
                    );    
                }   
                
            } catch (error) {  
                console.log(error)
            }
        }
    }

    const joinRoom = async () => {
        if(joinCod.length === 0) {
            ShowAlert('Error', 'Debes insertar el código de la sala')
        } else {
            const roomJson = await fetch('http://10.0.2.2:8080/codigosSalas/codigo/' + joinCod);
            const room = await roomJson.json(); 
            console.log(room.salas)
            const userInfoJson = await AsyncStorage.getItem("user_info");
            const userInfo = JSON.parse(userInfoJson);
            console.log(userInfo)
            const response = await fetch('http://10.0.2.2:8080/historial', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    salas: room.salas,
                    usuarios: userInfo
                }),
            });
            const idHistorial = await response.json(); 
            console.log(idHistorial)
            console.log('Unión completada')
            Alert.alert(
                'Uniendote a la sala', ' ',[
                    {
                    text: 'Okay',
                    onPress: async () => {
                    
                    },
                }],
            );   
        }   
    }

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
                        style={styles.textInput}
                        placeholder="Nombre de la sala"
                        placeholderTextColor="#7A7A7A"
                        onChangeText={text => setName(text)}
                        value={name}
                    />
                    <View style={styles.textInputLine} />
                    <View style={{padding: 15}}></View>
                    <TouchableOpacity style = {styles.button} onPress={createRoom}>
                        <CustomText style={styles.buttonTitle}>Crear sala</CustomText>
                    </TouchableOpacity>
                </View>
                <View style={{marginVertical: 25}}></View>
                <Line />
                <View style={{padding: 15}} />
                <View style = {styles.contentBox}>
                    <CustomText style={styles.titleTwo}> Escribe el código de la sala {"\n"}que deseas unirte </CustomText>
                    <View style={{padding: 15}}></View>
                    <View style={styles.numberContainer}>
                        <TextInput
                            style={styles.input}
                            maxLength={3}
                            onChangeText={text => setJoinCod(text)}
                            keyboardType="number-pad"
                            value={joinCod}
                        />
                    </View>
                    <View style={{padding: 15}}></View>
                    <TouchableOpacity style = {styles.button} onPress={joinRoom}>
                        <CustomText style={styles.buttonTitle}>Unirse a la sala</CustomText>
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
    titleTwo:{
        fontSize: 12,
        fontFamily: 'Krona One',
        top: 25,
        left: 10,
        color: '#FFFFFF',
        textAlign:'center',
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
    input: {
        width: 140,
        height: 40,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 16,
        left: 5,
        color: '#FFFFFF'
      },
    numberContainer:{
        top: 12,
        left: 50,
        flexDirection: 'row',
        alignContent: 'center',
    }
});

export default HomeScreen