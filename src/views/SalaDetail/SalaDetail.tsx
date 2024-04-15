import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';

const formatDate =  (fecha) => {
    const fechaParseada = new Date(fecha);
    const dia = fechaParseada.getDate();
    const mes = fechaParseada.getMonth() + 1;
    const anio = fechaParseada.getFullYear();
    const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${anio}`;
    return fechaFormateada;
  }

const SalaDetails = () => {
    const [salaNombre, setSalaNombre] = useState("");
    const [usuarioUsername, setUsuarioUsername] = useState("");
    const [fechaSala, setFechaSala] = useState("");
    const [playlist, setPlaylist] = useState("");
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const salaId = await AsyncStorage.getItem("sala_id");
            const response = await fetch(`http://10.0.2.2:8080/historial/${salaId}`);
            const jsonData = await response.json();
            setSalaNombre(jsonData.salas.nombre);
            setUsuarioUsername(jsonData.usuarios.username);
            setFechaSala(formatDate(jsonData.salas.fecha));
            setPlaylist(jsonData.salas.linkPlaylist);
          } catch (error) {
            console.error("Error al obtener los datos de la sala:", error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nombre de Sala: {salaNombre}</Text>
            <Text style={styles.title}>Usuario: {usuarioUsername}</Text>
            <Text style={styles.title}>Fecha de Creación: {fechaSala}</Text>
            <Text style={styles.title}>Playlist: {playlist}</Text>
        </View>
    );
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
});

export default SalaDetails;