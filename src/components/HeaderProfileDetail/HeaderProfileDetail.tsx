import React from "react";
import {View, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants'

const HeaderProfileDetail = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/pfp.png')} style={styles.image} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 'auto',
        backgroundColor: '#180000',
        height: 180
    },
    title: {
        fontSize: 14, 
        color: '#FFFFFF',
        paddingHorizontal: 20
    },
    titleSongs: {
        fontSize: 10, 
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 10,
        color: '#7A7A7A'
      },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});
export default HeaderProfileDetail;