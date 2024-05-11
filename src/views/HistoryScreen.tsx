import { StyleSheet, View } from "react-native"
import React from "react"
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../components/CustomText"
import SalaBox from "../components/RoomBox"
import { useFocusEffect } from '@react-navigation/native';


const HistoryScreen = () => {
  const [data, setData] = useState();
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        const response = await fetch(`http://10.0.2.2:8080/historial/salasUsuario/${userId}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
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
export default HistoryScreen

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