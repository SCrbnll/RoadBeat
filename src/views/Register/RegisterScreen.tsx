import { StyleSheet, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomText from '../../components/CustomText';
import ShowAlert from '../../components/ShowAlert';
import Line from '../../components/Line';

const RegisterScreen = () => {
    const nameInputRef = useRef<TextInput>(null);
    const usernameInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    };

    const checkRegister = async () => {
        if(name.length === 0 || username.length === 0 || email.length === 0 || password.length === 0) {
            ShowAlert('Error', 'Debes rellenar todos los campos')
        } else {
            try {
                // Register the User
                const response = await fetch('http://10.0.2.2:8080/usuarios', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        nombre: name,
                        username: username,
                        password: password,
                    }),
                });
                // ID of the new User
                const idUser = await response.json(); 
                console.log(idUser) 
    
                // Save the new User into user_info
                const userInfo = await fetch('http://10.0.2.2:8080/usuarios/'+ idUser);
                const users = await userInfo.json(); 
                const infoUser = JSON.stringify(users);
                await AsyncStorage.setItem('user_info', infoUser);
                console.log('User info saved to AsyncStorage');
                console.log(infoUser)
                handlePress('Main')
            } catch (error) {  
                ShowAlert('Error', 'This email is already used')
            }
        }
    }

    const handlePress = (screenName) => {
        navigation.navigate(screenName as never);
    };

    return (
        <LinearGradient colors={['#040306', '#210000']} style={{ flex: 1}}>
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                <Image
                    source={require('../../assets/images/logo-full.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style = {styles.container}>
                    <CustomText style={styles.title}> ¡Registrate con nosotros! </CustomText>
                    <CustomText style={styles.subtititle}> Escribe los datos necesarios </CustomText>
                    <View style={{padding: 25}}></View>
                    <TextInput
                        ref={nameInputRef}
                        style={styles.textInput}
                        placeholder="Nombre completo"
                        placeholderTextColor="#7A7A7A"
                        onChangeText={text => setName(text)}
                        value={name}
                    />
                    <Line />
                    <View style={{padding: 15}}></View>
                    <TextInput
                        ref={usernameInputRef}
                        style={styles.textInput}
                        placeholder="Nombre de usuario"
                        placeholderTextColor="#7A7A7A"
                        onChangeText={text => setUsername(text)}
                        value={username}
                    />
                    <Line />
                    <View style={{padding: 15}}></View>
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
                    <TouchableOpacity style = {styles.button} onPress={checkRegister}>
                        <CustomText style={styles.buttonTitle}>Crear cuenta</CustomText>
                    </TouchableOpacity> 
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '20%',
        top:70,
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
        top: 100, 
        height: 400
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

export default RegisterScreen;