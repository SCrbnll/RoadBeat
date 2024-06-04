import { Text } from 'react-native';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';

const CustomText = (props) => {
    const [fontLoaded, setFontLoaded] = useState(false);
  
    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
            'krona-one': require('./../assets/fonts/KronaOne-Regular.ttf'),
            });
  
            setFontLoaded(true);
        }
        loadFont();
            }, []);
        if (!fontLoaded) {
            return <Text>Loading...</Text>;
        }
        return (
        <Text style={{ ...props.style, fontFamily: 'krona-one' }}
            numberOfLines={props.numberOfLines}
            ellipsizeMode={props.ellipsizeMode}
        >
            {props.children}
        </Text>
    );
};

export default CustomText;