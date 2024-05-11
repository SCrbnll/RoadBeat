import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/CustomText';

import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const formatDate =  (fecha) => {
    const fechaParseada = new Date(fecha);
    const dia = fechaParseada.getDate();
    const mes = fechaParseada.getMonth() + 1;
    const anio = fechaParseada.getFullYear();
    const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${anio}`;
    return fechaFormateada;
  }

const RoomDetail = () => {
    const [usuarioUsername, setUsuarioUsername] = useState("");
    const [fechaSala, setFechaSala] = useState("");
    const [playlist, setPlaylist] = useState("");
    const navigation = useNavigation();
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const salaId = await AsyncStorage.getItem("sala_id");
            const response = await fetch(`http://10.0.2.2:8080/historial/${salaId}`);
            const jsonData = await response.json();
            console.log(jsonData)
            setUsuarioUsername(jsonData.salas.usuarios.username);
            setFechaSala(formatDate(jsonData.salas.fecha));
            setPlaylist(jsonData.salas.linkPlaylist);
          } catch (error) {
            console.error("Error al obtener los datos de la sala:", error);
          }
        };
    
        fetchData();
      }, []);
      const handlePress = () => {
        navigation.goBack()
      };

      return (
        <View style={styles.container}>
          <View style={{ marginVertical: 20 }} />
          <CustomText style={styles.title}> Sala creada por </CustomText>
          <CustomText style={styles.subtitle}> {usuarioUsername} </CustomText>
          <View style={{ marginVertical: 10 }} />
          <CustomText style={styles.title}> Fecha de creación </CustomText>
          <CustomText style={styles.subtitle}> {fechaSala} </CustomText>
          <View style={{ marginVertical: 20 }} />
          <View style={styles.textInputLine} />
          <View style={{ marginVertical: 10 }} />
          <View style={styles.playlistContainer}>
            <CustomText style={styles.title}> ¡Revive tus momentos favoritos o descubre nuevas canciones! </CustomText>
            <View style={{ marginVertical: 10 }} />
            <View style={{flexDirection: 'row'}}>
              <Entypo name="spotify" size={24} color="white" />
              <View style={{ marginHorizontal: 5 }} />
              <CustomText style={styles.subtitle}>RoadBeat te ofrece una playlist personalizada con las canciones reproducidas en la sala para que puedas
              rememorar el momento {"\n"}o bien descubrir nuevas canciones </CustomText>
            </View>
            <View style={{ marginVertical: 20 }} />
            <View style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto'}}>
              <TouchableOpacity style = {styles.buttonLink} onPress={() => Linking.openURL(playlist)}>
                <CustomText style={styles.buttonTitleLink}>Ver playlist</CustomText>
                <Feather name="external-link" size={20} color="white" style={{marginLeft: 'auto'}}/>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style = {styles.button} onPress={handlePress}>
            <CustomText style={styles.buttonTitle}>Volver atrás</CustomText>
          </TouchableOpacity>
          <View style={{marginVertical: 25}}></View>
        </View>
          );
    
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#210000',
    flex: 1,
    paddingBottom: 30,
    paddingHorizontal: 18,  
  },
  title: {
    fontSize: 14,
    color: '#FFFFFF'
  },
  subtitle: {
    fontSize: 12,
    color: '#7A7A7A'
  },
  titleTwo:{
    fontSize: 12,
    fontFamily: 'Krona One',
    top: 25,
    left: 10,
    color: '#FFFFFF',
    textAlign:'center',
  },
  textInputLine: {
    borderBottomWidth: 2, 
    borderBottomColor: '#7A7A7A', 
    width: '100%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#580000',
    padding: 10,
    color: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
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
  buttonLink: {
    flexDirection: 'row',
    backgroundColor: '#580000',
    padding: 3,
    color: '#FFFFFF',
    marginLeft: 'auto',
    width: 200,
    borderRadius: 25,
  },
  buttonTitleLink: {
    color: '#FFFFFF',
    textAlign: 'center',
    top: 2,
    left: 50,
    fontSize: 12
  },
  playlistContainer:{
    backgroundColor: '#000000',
    padding: 20,
    marginVertical: 8,
    borderRadius: 25,
    paddingBottom: 15
  },
});

export default RoomDetail;