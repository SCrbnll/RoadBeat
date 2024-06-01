import { BackHandler, StyleSheet, View } from "react-native"
import React from "react"
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../components/CustomText"
import SalaBox from "../components/RoomBox"
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { API_URL_LOCAL, API_URL_AZURE } from "@env";
import ConfirmModal from "../components/ConfirmModal";

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        const response = await fetch(`${API_URL_AZURE}/historial/salasUsuario/${userId}`);
        const jsonData = await response.json();
        setData(jsonData);
      };

      fetchData();

      const backAction = () => {
        logOut();
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, [])
  );
  const logOut = () => {
    setModalTitle('Cerrar sesión')
    setModalMessage('¿Estás seguro que deseas cerrar sesión?');
    openModal();
};

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handlePress = (screenName) => {
    navigation.navigate(screenName as never);
  };

  const handleConfirm = async () => {
    await AsyncStorage.removeItem("user_password")
    await AsyncStorage.removeItem("user_info")
    await AsyncStorage.removeItem("user_id")
    handlePress('Login');
};

    return (
      <View style={styles.container}>
        <ConfirmModal
            visible={modalVisible}
            onClose={closeModal}
            onConfirm={handleConfirm}
            title={modalTitle}
            message={modalMessage}
        />
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