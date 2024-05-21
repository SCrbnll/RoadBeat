import { StyleSheet, View, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SpotifyAPI from '../types/SpotifyData';

import { API_URL_LOCAL, API_URL_AZURE, } from '@env';

import CustomText from '../components/CustomText';
import Line from '../components/Line';
import CustomModal from '../components/CustomModal';

const LoginScreen = () => {
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    const handlePress = (screenName) => {
        navigation.navigate(screenName as never);
    };

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const checkLogin = async () => {
        if(email.length === 0 || password.length === 0) {
            setModalTitle('Error')
            setModalMessage('Debes rellenar todos los campos');
            openModal();
        } else {
            try {
                const response = await fetch(`${API_URL_LOCAL}/usuarios/login/` + email + '/' + password);
                const users = await response.json(); 
                if (!users.error || !users == null) {
                    const userInfo = JSON.stringify(users);
                    const userId = users.id;
                    await AsyncStorage.setItem('user_id', userId.toString());
                    await AsyncStorage.setItem('user_info', userInfo);
                    await AsyncStorage.setItem('profileImage', users.foto)
                    await AsyncStorage.setItem('user_password', password);
                    await SpotifyAPI.getToken()
                    .then(token => {
                        AsyncStorage.setItem("token", token)
                    })
                    .catch(error => {
                        console.error(error);
                    });
                    handlePress('Main');
                } else {
                    setModalTitle('Error')
                    setModalMessage('Credenciales incorrectas');
                    openModal();
                }
            } catch (error) {
                console.error('Error during login:', error);
                setModalTitle('Error')
                setModalMessage('Ha ocurrido un problema durante el login');
                openModal();
            }
        }
    }
    
    return (
        <LinearGradient colors={['#040306', '#210000']} style={{ flex: 1 }}>
            <CustomModal
                visible={modalVisible}
                onClose={closeModal}
                title={modalTitle}
                message={modalMessage}
            />
            <SafeAreaView style={{ paddingTop: Constants.statusBarHeight }}>
                <Image
                    source={require('./../assets/images/logo-full.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style = {styles.container}>
                    <CustomText style={styles.title}> ¡Bienvenido de nuevo! </CustomText>
                    <CustomText style={styles.subtititle}> Inserta tus credenciales aquí </CustomText>
                    <View style={{padding: 25}}></View>
                    <TextInput
                        ref={emailInputRef}
                        style={styles.textInput}
                        placeholder="Dirección de email"
                        placeholderTextColor="#7A7A7A"
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                    <Line />
                    <View style={{padding: 15}}></View>
                    <View style={styles.passwordContainer} >
                        <TextInput
                            ref={passwordInputRef}
                            secureTextEntry={!showPassword} 
                            style={showPassword ? styles.passwordInputOff : styles.passwordInputOn} 
                            placeholder="Contraseña"
                            placeholderTextColor="#7A7A7A"
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />
                        <MaterialCommunityIcons 
                            name={showPassword ? 'eye-off' : 'eye'} 
                            size={20} 
                            style={showPassword ? styles.iconOff : styles.iconOn} 
                            onPress={toggleShowPassword} 
                        /> 
                    </View>
                    <Line />
                    <TouchableOpacity style = {styles.button} onPress={checkLogin}>
                        <CustomText style={styles.buttonTitle}>Iniciar sesión</CustomText>
                    </TouchableOpacity> 
                </View>
            </SafeAreaView>
            <TouchableOpacity style={styles.registerButton} onPress={() => handlePress('Register')}>
                <CustomText style={styles.subtititle}>¿No tienes cuenta?</CustomText>
                <CustomText style={styles.register}>Registrate aquí</CustomText>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '30%',
        top: 100,
        flex : 0,
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
        flex :0,
        top: 50
    },
    buttonTitle: {
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1,
        fontSize: 12
    },
    container : {
        backgroundColor: '#000000',
        marginHorizontal: 30,
        top: 150, 
        height: 300
    }, 
    title:{
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Krona One',
        top: 25,
        color: '#FFFFFF'
    },
    subtititle:{
        textAlign: 'center',
        color: '#7A7A7A',
        fontSize: 10, 
        top: 30
    },
    textInput: {
        backgroundColor: 'transparent',  
        fontSize: 14, 
        color: '#FFFFFF',
        left: 35
    },
    register: {
        color: '#FFFFFF',
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 10, 
        top: 30
    },
    registerButton:{
        top: 60
    },
    passwordContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    passwordInputOff:{
        flex: 0, 
        paddingVertical: 1, 
        left: -85,
        color: '#FFFFFF'
    },
    passwordInputOn:{
        flex: 0, 
        paddingVertical: 1, 
        left: -79, 
        color: '#FFFFFF'
    },
    iconOff: { 
        right: -70,
        color: '#7A7A7A'
    },
    iconOn: { 
        right: -65,
        color: '#7A7A7A'
    },
});

export default LoginScreen;