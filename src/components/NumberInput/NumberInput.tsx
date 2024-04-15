import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const UserNumberInput = () => {
  const [value, setValue] = useState('');
  const numberInputRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <TextInput
        ref={numberInputRef}
        style={styles.input}
        maxLength={3}
        onChangeText={text => setValue(text)}
        keyboardType="number-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 12,
    left: 50,
    flexDirection: 'row',
    alignContent: 'center',
  },
  input: {
    width: 140,
    height: 40,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 16,
    left: 5,
    color: '#FFFFFF'
  },
});

export default UserNumberInput;