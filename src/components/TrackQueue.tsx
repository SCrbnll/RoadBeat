import { StyleSheet, View, Image } from "react-native"
import React, { useEffect, useState } from "react"

import CustomText from "./CustomText"
import SpotifyAPI from "../types/SpotifyData";


const TrackQueue = ({ item }) => {
  const [img, setImg] = useState('')
  useEffect(() => {
    const chargeImage = async () => {
      const trackId = item.url.substring(item.url.lastIndexOf('/') + 1);
      let trackUrl = await (await SpotifyAPI.getTrackInfo(trackId)).imageUrl
      setImg(trackUrl)
    }
    chargeImage()
  }, []);
    return (
        <View style={styles.contentBox}>
          <Image source={img ? {uri: img} : require('./../assets/images/logo.png')} style={styles.image} />
          <View style={{flexDirection: 'column'}}>
            <CustomText style={styles.dataTrack}>{item.name}</CustomText>
            <CustomText style={styles.dataTrack}>{item.artists}</CustomText>
            <CustomText style={styles.addedBy}>Agregada por {item.addedBy}</CustomText>
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


