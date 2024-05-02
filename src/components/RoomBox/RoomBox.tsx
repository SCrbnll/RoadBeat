import React from "react";
import {View, StyleSheet,FlatList} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
import Item from "../Item";


const RoomBox = () => {
    const [data, setData] = useState();
  
    useEffect(() => {
      const fetchData = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        const response = await fetch(`http://20.199.42.13:8080/historial/salasUsuario/${userId}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData)
      };
  
      fetchData();
    }, []);
  
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 18,
    },
})
export default RoomBox;


