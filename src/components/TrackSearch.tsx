import { StyleSheet, View, Image } from "react-native"
import React from "react"
import SpotifyAPI from "../types/SpotifyData";

import CustomText from "./CustomText"
import { Entypo } from '@expo/vector-icons';


const TrackSearch: React.FC<TrackSearchProps> = ({ item }) => {

    const getUrl = async (url:string) => {
      SpotifyAPI.getToken()
      console.log(url)
      console.log(SpotifyAPI.getTrackUrl(url))
      
    }

    return (
      <View style={styles.contentBox}>
        <Image source={{ uri: item.album.images[0].url }} style={styles.image} />
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <CustomText style={styles.nameTrack}>{item.name}</CustomText>
            <CustomText style={styles.artistTrack}>{item.artists.map(artist => artist.name).join(', ')}</CustomText>
          </View>
          <Entypo name="add-to-list" size={20} color="white" style={styles.addIcon} onPress={() => getUrl(item.external_urls.spotify)}/>
        </View>
      </View>
  );
}
    

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
    nameTrack:{
      fontSize: 10,
      fontFamily: 'Krona One',
      color: '#FFFFFF',
      top: 15,
      left: 50,
      width: 150,
    },
    artistTrack: {
      fontSize: 8,
      fontFamily: 'Krona One',
      color: '#FFFFFF',
      top: 15,
      left: 50,
      width: 150,
    },
    addIcon:{
      alignSelf: 'center',
      left: 100
    }
})
export default TrackSearch;


