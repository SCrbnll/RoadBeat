import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

import { API_URL_LOCAL, API_URL_AZURE, } from '@env';

import Clock from '../components/Clock';
import Line from '../components/Line';
import CustomText from '../components/CustomText';
import CustomModal from '../components/CustomModal';
import ConfirmModal from '../components/ConfirmModal';

const HomeScreen = () => {
    const [name, setName] = useState('');
    const [joinCod, setJoinCod] = useState('');
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [customModalVisible, setCustomModalVisible] = useState(Boolean);

    useEffect(() => {
        const backAction = () => {
            logOut();
            return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);
    
    const logOut = () => {
        setCustomModalVisible(true)
        setModalTitle('Cerrar sesión')
        setModalMessage('¿Estás seguro que deseas cerrar sesión?');
        openModal();
    };
    
      const handleConfirm = async () => {
        await AsyncStorage.removeItem("user_password")
        await AsyncStorage.removeItem("user_info")
        await AsyncStorage.removeItem("user_id")
        handlePress('Login');
    };

    const handlePress = (screenName) => {
        navigation.navigate(screenName as never);
    };

    const currentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        return(`${year}-${month}-${day}`);
    }

    const generateRandomNumber = async () => {
        let randomNumber;
        const response = await fetch(`${API_URL_LOCAL}/codigosSalas/salas`);
        const jsonData = await response.json();
        const codSalas = [];
        jsonData.map(item => {
            codSalas.push(item.codSala);
        });

        if (codSalas.length === 0) {
            randomNumber = Math.floor(Math.random() * 900) + 100;
        } else if (codSalas.length === 1) {
            randomNumber = Math.floor(Math.random() * 900) + 100;
            while (codSalas.includes(randomNumber)) {
                randomNumber = Math.floor(Math.random() * 900) + 100;
            }
        } else {
            do {
                randomNumber = Math.floor(Math.random() * 900) + 100;
            } while (codSalas.includes(randomNumber));
        }
    
        return randomNumber.toString();
    }

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const createRoom = async () => {
        if(name.length === 0) {
            setCustomModalVisible(false)
            setModalTitle('Error')
            setModalMessage('Debes insertar el nombre de la sala');
            openModal();
        } else {
            try {
                const userInfoJson = await AsyncStorage.getItem('user_info')
                const userInfo = JSON.parse(userInfoJson);

                const response = await fetch(`${API_URL_LOCAL}/salas`, {
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
                const idSala = await response.json(); 
                await AsyncStorage.setItem('room_id', idSala.toString())
                const roomJson = await fetch(`${API_URL_LOCAL}/salas/` + idSala);
                const room = await roomJson.json();     

                if(idSala){
                    const response = await fetch(`${API_URL_LOCAL}/codigosSalas`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            cerrada: false,
                            codSala: await generateRandomNumber(),
                            salas: room
                        }),
                    });
                    const codSala = await response.json(); 
                    await AsyncStorage.setItem('room_code', codSala.toString()) 
                    const responseHistorial = await fetch(`${API_URL_LOCAL}/historial`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                salas: room,
                                usuarios: userInfo
                            }),
                        });
                    handlePress("RoomScreen")    
                }   
            } catch (error) {  
                console.log(error)
            }
        }
    }

    const joinRoom = async () => {
        if(joinCod.length === 0) {
            setCustomModalVisible(false)
            setModalTitle('Error')
            setModalMessage('Debes insertar el código de la sala');
            openModal();
        } else {
            const roomJson = await fetch(`${API_URL_LOCAL}/codigosSalas/codigo/` + joinCod);
            if(roomJson.ok){
                try{
                    const room = await roomJson.json(); 
                    const userInfoJson = await AsyncStorage.getItem('user_info')
                    const userInfo = JSON.parse(userInfoJson);
                    await AsyncStorage.setItem('room_code', room.codSala.toString()) 
                    await AsyncStorage.setItem('room_id', room.salas.id.toString())

                    try{
                        const existJson = await fetch(`${API_URL_LOCAL}/historial/existe/` + room.salas.id + '/' + userInfo.id)
                        const exist = await existJson.json();
                        handlePress("RoomScreen")
                    } catch (error) {
                        const response = await fetch(`${API_URL_LOCAL}/historial`, {
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
                        handlePress("RoomScreen")
                    }
                } catch (error) {
                    setCustomModalVisible(false)
                    setModalTitle('Error')
                    setModalMessage('El códido de la sala no es válido');
                    openModal();
                }
            } 
        }   
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <View style={styles.container}>
                
            {customModalVisible ? 
                <ConfirmModal
                    visible={modalVisible}
                    onClose={closeModal}
                    onConfirm={handleConfirm}
                    title={modalTitle}
                    message={modalMessage}
                />
            : 
                <CustomModal
                    visible={modalVisible}
                    onClose={closeModal}
                    title={modalTitle}
                    message={modalMessage}
                />
            }
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