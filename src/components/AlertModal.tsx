import React, { useEffect } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import CustomText from './CustomText';

const AlertModal = ({ visible, message, onClose }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose();
            }, 1000); 

            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <CustomText style={styles.message}>{message}</CustomText>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        width: '50%',
        padding: 20,
        backgroundColor: 'green',
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default AlertModal;
