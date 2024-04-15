import { StyleSheet, Text, View, ScrollView } from "react-native"
import React from "react"
import CustomText from "../../components/CustomText"
import SalaBox from "../../components/SalaBox/SalaBox"

const HistoryScreen = () => {
    return (
      <View style={styles.container}>
        <CustomText style={styles.title}>Historial</CustomText>
        <View style={{ marginVertical: 20 }} />
        <View style={styles.textInputLine} />
        <SalaBox />
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