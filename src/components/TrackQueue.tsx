import { StyleSheet, View, Image } from "react-native"
import React from "react"

import CustomText from "./CustomText"


const TrackQueue = ({ item }) => {
    return (
        <View style={styles.contentBox}>
          <Image source={require('./../assets/images/pfp.png')} style={styles.image} />
          <View style={{flexDirection: 'column'}}>
            <CustomText style={styles.dataTrack}>{item.name}</CustomText>
            <CustomText style={styles.dataTrack}>{item.author}</CustomText>
            <CustomText style={styles.addedBy}>{item.added}</CustomText>
          </View>
        </View>
    );
  };

  const styles = StyleSheet.create({
    image: {
      width: 45,
      height: 45,
      left: 20,
      top: 8
    },
    contentBox: {
      backgroundColor: '#580000',
      height: 60,
      width: 340,
      borderRadius: 50,
      flexDirection: 'row',
      alignSelf: 'center',
      marginVertical: 8,
    },
    dataTrack:{
      fontSize: 10,
      fontFamily: 'Krona One',
      color: '#FFFFFF',
      top: 10,
      left: 50,
    },
    addedBy:{
      fontSize: 8,
      fontFamily: 'Krona One',
      color: '#7A7A7A',
      top: 10,
      left: 50,
    },
})

export default TrackQueue;


