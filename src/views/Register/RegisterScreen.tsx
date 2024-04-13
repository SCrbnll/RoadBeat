import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';

const CustomText = (props) => {
    const [fontLoaded, setFontLoaded] = useState(false);
  
    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
            'krona-one': require('../../assets/fonts/KronaOne-Regular.ttf'),
            });
  
            setFontLoaded(true);
        }
        loadFont();
            }, []);
        if (!fontLoaded) {
            return <Text>Loading...</Text>;
        }
        return (
        <Text style={{ ...props.style, fontFamily: 'krona-one' }}>
            {props.children}
        </Text>
    );
};

const RegisterScreen = () => {
    const navigation = useNavigation();

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
                        style={styles.textInput}
                        placeholder="Dirección de email"
                        placeholderTextColor="#7A7A7A"
                    />
                    <View style={styles.textInputLine} />
                    <View style={{padding: 15}}></View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Contraseña"
                        placeholderTextColor="#7A7A7A"
                    />
                    <View style={styles.textInputLine} />
                    <TouchableOpacity style = {styles.button} onPress={() => handlePress('Main')}>
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
        width: 300,
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
        fontFamily: 'krona-one',
        fontSize: 10, 
        color: '#333',
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
});

export default RegisterScreen;