import { StyleSheet, View, TouchableOpacity } from "react-native"
import React from "react"
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomText from "../components/CustomText"
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const DropdownButton = ({titleButton ,content, enlace}) => {   
    const navigation = useNavigation(); 
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleIconPress = () => {
        if (enlace) {
            navigation.navigate('DeleteUser' as never);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
                <View style={styles.iconContainer}>
                    <Feather name={showDropdown ? 'arrow-down' : 'arrow-right'} size={18} color="yellow" style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                    <CustomText style={styles.buttonText}>{titleButton}</CustomText>
                </View> 
            </TouchableOpacity>
            {showDropdown && (
                <View style={styles.dropdownContainer}>
                    <CustomText style={styles.dropdownText}>
                        {content}
                        {enlace && (
                            <TouchableOpacity onPress={handleIconPress}>
                                <Entypo name="link" size={18} color="yellow"/>
                            </TouchableOpacity>
                        )}
                    </CustomText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        left: 5
    },
    textContainer: {
        flex: 1, 
        marginLeft: 10, 
    },
    button: {
        backgroundColor: '#580000',
        padding: 6,
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        width: 360,
        alignSelf: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 12,
        left: -20
    },
    dropdownText: {
        color: '#FFFFFF',
        fontSize: 12,
        flexWrap: "wrap"
    },
    dropdownContainer: {
        backgroundColor: '#800000',
        padding: 10,
        width: 360,
        borderRadius: 5,
        marginBottom: 5,
        marginHorizontal: 15,
    },
    icon: {
        left: 320
    },
});

export default DropdownButton;
