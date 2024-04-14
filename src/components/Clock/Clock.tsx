import React, { useEffect, useState } from 'react';
import { View, StyleSheet} from 'react-native';
import CustomText from '../CustomText';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  

  const formattedTime = time.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString('es-ES', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  
  const capitalizedDate = formattedDate.replace(
    /\b\w/g,
    (char) => char.toUpperCase()
  );

  return (
    <View>
      <CustomText style={styles.title}>{formattedTime}</CustomText>
      <CustomText style={styles.title}>{capitalizedDate}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
    title:{
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Krona One',
        top: 25,
        color: '#FFFFFF'
    },
    subtititle:{
        textAlign: 'center',
        color: '#7A7A7A',
        fontSize: 10, 
        top: 30
    },
});

export default Clock;