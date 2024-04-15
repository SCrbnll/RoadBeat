import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from '../CustomText';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Sala = {
  id: string;
  nombre: string;
  fecha: string;
};

const Item = ({ item }: { item: Sala }) => {
  const navigation = useNavigation();
  const handlePress = async () => {
    try {
      AsyncStorage.setItem('sala_id', item.id.toString())
      console.log(item.id);
      navigation.navigate('SalaDetails' as never);
    } catch (error) {
      console.log("Error al guardar el ID de la sala:", error);
    }
  };
  return (
    <View style={styles.item}>
        <CustomText style={styles.title}>Sala</CustomText>
        <CustomText style={styles.subtitle}>{item.nombre}</CustomText>
        <View style={{padding: 10}}/>
        <CustomText style={styles.title}>Fecha de creación</CustomText>
        <CustomText style={styles.subtitle}>{item.fecha}</CustomText>
        <View style={{padding: 10}}/>
        <TouchableOpacity style = {styles.button} onPress={handlePress}>
          <CustomText style={styles.buttonTitle}>Ver detalle</CustomText>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#000000',
    padding: 20,
    marginVertical: 8,
    borderRadius: 25
  },
  title: {
    fontSize: 14,
    color: '#FFFFFF'
  },
  subtitle: {
    fontSize: 12,
    color: '#7A7A7A'
  },
  button: {
    backgroundColor: '#580000',
    padding: 3,
    color: '#FFFFFF',
    marginLeft: 'auto',
    width: 120,
    borderRadius: 25,
  },
  buttonTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
    fontSize: 12
  },
});

export default Item;