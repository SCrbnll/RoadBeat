import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native"
import React, { useEffect } from "react"
import { LinearGradient } from "expo-linear-gradient"
import Constants from 'expo-constants'
import { Entypo } from '@expo/vector-icons';
import * as AppAuth from 'expo-app-auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const LoginScreen = () => {
    /*const navigation = useNavigation();
    useEffect(() => {
        const checkTokenValidity = async () => {
            const accesToken = await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");
            console.log("acess token", accesToken);
            console.log("expiration date", expirationDate);

            if(accesToken && expirationDate) {
                const currentTime = Date.now();
                if(currentTime > parseInt(expirationDate)){
                    // token still valid
                    navigation.navigate("Main" as never);
                } else {
                    // token would be expired so we need it
                    AsyncStorage.removeItem("token");
                    AsyncStorage.removeItem("expirationDate");
                }
            }
        }
        checkTokenValidity();
    })
    async function authenticate () {
        const config = {
            issuer:"https://acounts.spotify.com",
            clientId:"27994d84d064403ea7a488ba6fbbfdab",
            scopes: [
                "user-read-email",
                "user-read-private",
                "user-library-read",
                "playlist-read-collaborative"
            ],
            redirectUrl: "exp://localhost:19002/--/spotify-auth-callback"
        }
        const result = await AppAuth.authAsync(config);
        console.log(result);
        if(result.accessToken){
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
            AsyncStorage.setItem("token", result.accessToken);
            AsyncStorage.setItem("expirationDate", expirationDate.toString());
            navigation.navigate("Main" as never);
        }
    }
*/
    return (
        <LinearGradient colors={["#040306", "#210000"]} style={{flex: 1}}>
            <SafeAreaView style={{paddingTop: Constants.statusBarHeight,}}>
            <Image
                source={require('../../assets/logo-full.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <TouchableOpacity /*onPress={authenticate}*/ style = {styles.button}>
                <Entypo name="spotify" size={25} color="white" />
                <Text style={styles.title}>Iniciar sesión con Spotify</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </LinearGradient>
        
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '45%',
        top: 200,
    },
    button: {
        backgroundColor: "#580000",
        padding: 10,
        color: "#FFFFFF",
        marginLeft: "auto",
        marginRight: "auto",
        width: 300,
        marginVertical: 10,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        top: 270
    },
    title: {
        color: '#FFFFFF',
        textAlign: "center",
        flex: 1,
    },
})

export default LoginScreen