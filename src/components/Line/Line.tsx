import React from "react";
import {View, StyleSheet} from 'react-native';

const Line = () => {
    return (
        <View style={styles.textInputLine} />
    )
};

const styles = StyleSheet.create({
    textInputLine: {
        borderBottomWidth: 2, 
        borderBottomColor: '#7A7A7A', 
        width: '80%',
        alignSelf: 'center',
    },
});
export default Line;