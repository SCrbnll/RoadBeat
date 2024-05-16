import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const formatDate =  (fecha) => {
  const fechaParseada = new Date(fecha);
  const dia = fechaParseada.getDate();
  const mes = fechaParseada.getMonth() + 1;
  const anio = fechaParseada.getFullYear();
  const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${anio}`;
  return fechaFormateada;
}
const Item = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      AsyncStorage.setItem('sala_id', item.id.toString())
      AsyncStorage.setItem("sala_nombre", item.salas.nombre);
      navigation.navigate('SalaDetails' as never);
    } catch (error) {
      console.log("Error al guardar el ID de la sala:", error);
    }
  };
  
  return (
    <View style={styles.item}>
        <CustomText style={styles.title}>Sala</CustomText>
        <CustomText style={styles.subtitle}>{item.salas.nombre}</CustomText>
        <View style={{padding: 10}}/>
        <CustomText style={styles.title}>Fecha de creación</CustomText>
        <CustomText style={styles.subtitle}>{formatDate(item.salas.fecha)}</CustomText>
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
    borderRadius: 25,
    paddingBottom: 15
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