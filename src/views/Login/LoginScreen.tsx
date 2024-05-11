import { StyleSheet, View, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SpotifyAPI from '../../types/SpotifyData';

import CustomText from '../../components/CustomText';
import ShowAlert from '../../components/ShowAlert';
import Line from '../../components/Line';

const LoginScreen = () => {
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };

    const checkLogin = async () => {
        if(email.length === 0 || password.length === 0) {
            ShowAlert('Error', 'Debes rellenar todos los campos')
        } else {
            try {
                const response = await fetch('http://10.0.2.2:8080/usuarios/login/' + email + '/' + password);
                // Parse the JSON response
                const users = await response.json(); 
                console.log(users)      
                // Check if the user exists and the email and password match
                if (!users.error || !users == null) {
                    // Save user info to AsyncStorage
                    const userInfo = JSON.stringify(users);
                    const userId = users.id;
                    await AsyncStorage.setItem('user_id', userId.toString());
                    await AsyncStorage.setItem('user_info', userInfo);
                    await AsyncStorage.setItem('profileImage', users.foto)
                    console.log('User info saved to AsyncStorage');
                    await AsyncStorage.setItem('user_password', password);
                    // User exists, navigate to the main screen
                    await SpotifyAPI.getToken()
                    .then(token => {
                        console.log(token);
                        AsyncStorage.setItem("token", token)
                    })
                    .catch(error => {
                        console.error(error);
                    });
                    handlePress('Main');
                } else {
                    // User does not exist, show an error message
                    ShowAlert('Error', 'Credenciales incorrectas');
                }
            } catch (error) {
                console.error('Error during login:', error);
                // Handle any errors that occur during the request
                ShowAlert('Error', 'An error occurred while logging in');
            }
        }
        
    }
    const handlePress = (screenName) => {
        navigation.navigate(screenName as never);
    };

    return (
        <LinearGradient colors={['#040306', '#210000']} style={{ flex: 1 }}>
            <SafeAreaView style={{ paddingTop: Constants.statusBarHeight }}>
                <Image
                    source={require('../../assets/images/logo-full.png')}
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
    textInputLine: {
        borderBottomWidth: 2, 
        borderBottomColor: '#7A7A7A', 
        width: '80%',
        alignSelf: 'center',
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