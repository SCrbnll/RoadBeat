import { StyleSheet, View, FlatList, Image, TouchableOpacity, TextInput, Alert, BackHandler } from "react-native"
import React from "react"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from 'react';

import CustomText from "../components/CustomText"
import TrackQueue from "../components/TrackQueue";

interface Track {
    addedBy: string;
    artists: string;
    name: string;
    url: string;
}


const QueueScreen = () => {
    // GLOBAL
    const [data, setData] = useState<Track[]>([]);

    // HEADER
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack()
    };
    useEffect(() => {
        const chargeData = async () => {
            const playlistString = await AsyncStorage.getItem('playlist');
            const playlistArray = JSON.parse(playlistString);
            setData(playlistArray);
        };

        chargeData();

        const backAction = () => {
            handleBack()
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    },);

    return (
        <View style={styles.container}>
            <View style={styles.playQueue}>
                <CustomText style={styles.actualTrack}>Canciones en cola</CustomText>
                <View style={styles.queueBox}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <TrackQueue item={item} />}
                        keyExtractor={(item, index) => item.name + index.toString()}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                    <CustomText style={styles.buttonTitle}>Volver atrás</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#210000',
        flex: 1,
    },
    actualTrack: {
        fontSize: 12,
        fontFamily: 'Krona One',
        color: '#FFFFFF',
        left: 0,
    },
    playQueue: {
        top: 20,
        alignSelf: 'center'
    },
    queueBox: {
        backgroundColor: '#000000',
        height: 510,
        width: 360,
        top: 10,
    },
    button: {
        backgroundColor: '#580000',
        padding: 6,
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
    buttonContainer: {
        marginVertical: 8,
        top: 80,
    },
});

export default QueueScreen