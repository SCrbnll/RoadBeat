import { StyleSheet, View } from "react-native"
import React from "react"
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../components/CustomText"
import SalaBox from "../components/RoomBox"
import { useFocusEffect } from '@react-navigation/native';
import { API_URL_LOCAL, API_URL_AZURE } from "@env";

const HistoryScreen = () => {
  const [data, setData] = useState();
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        const response = await fetch(`${API_URL_LOCAL}/historial/salasUsuario/${userId}`);
        const jsonData = await response.json();
        setData(jsonData);
      };

      fetchData();
    }, [])
  );
    return (
      <View style={styles.container}>
        <CustomText style={styles.title}>Historial</CustomText>
        <View style={{ marginVertical: 20 }} />
        <View style={styles.textInputLine} />
        <SalaBox data={data}/>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#210000',
        flex: 1,  
    },
    title:{
        fontSize: 14,
        fontFamily: 'Krona One',
        top: 25,
        color: '#FFFFFF',
        left: 20,
    },
    textInputLine: {
        borderBottomWidth: 2, 
        borderBottomColor: '#7A7A7A', 
        width: '90%',
        alignSelf: 'center',
    },
})

export default HistoryScreen