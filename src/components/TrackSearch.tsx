import { StyleSheet, View, Image } from "react-native"
import React, { useEffect, useState } from 'react';
import SpotifyAPI from "../types/SpotifyData";
import { Audio } from 'expo-av';

import CustomText from "./CustomText"
import { Entypo } from '@expo/vector-icons';


const TrackSearch: React.FC<TrackSearchProps> = ({ item }) => {
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]
);


  const getUrl = async (url:string) => {
    try{
      SpotifyAPI.getToken()
      console.log(url)
      {
        /*
        const trackMp3 = await SpotifyAPI.getTrackUrl(url)
        const jsonData = JSON.parse(trackMp3);
        console.log(jsonData)
        const youtubeAudio = jsonData.youtubeVideo.audio[0];
        const youtubeAudioUrl = youtubeAudio.url;
        console.log(youtubeAudioUrl);
        */
      }
      const youtubeAudioUrl = 'https://redirector.googlevideo.com/videoplayback?expire=1715821026&ei=ggVFZrLBNeH82_gP1qGVyAQ&ip=198.98.59.215&id=o-ALoSgiNo70mtLPyuwWtcdDbrJ1NVDXmGDyjQTeti0pFb&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Ua&mm=31%2C29&mn=sn-ab5sznzr%2Csn-ab5l6nrd&ms=au%2Crdu&mv=m&mvi=4&pl=21&initcwndbps=633750&siu=1&bui=AWRWj2QG7HE_apHyr6EAF72b0a-ZnoJKbY2SNA41OGIo-VPdU9U_jUsBlPje3le6fbCvJZhmMA&vprv=1&svpuc=1&mime=audio%2Fmp4&ns=vBLzaINUz2IyiFU_hjfXHTAQ&rqh=1&gir=yes&clen=4077313&dur=251.890&lmt=1706491705542752&mt=1715798701&fvip=4&keepalive=yes&c=WEB&sefc=1&txp=4532434&n=Cwki4gFjkyNNyg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHWaYeowRgIhAIMHeu59alvOtmWSN8nmKwNAuotCou7wk9J4d74Pi1qXAiEA-NqSdXAwa-P7jgXJqUMjgayEpUUCmVJ17SpoHY4VF3U%3D&sig=AJfQdSswRAIgHOS7WRmrhopO2CRs74XCTEmsFUYS4OyMvu3kArvx86ICIHEgHqZkN2YNTd1wcTa7sljNzN8UsgylIkH7VR-3RGVx&range=0-'
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync({ uri: youtubeAudioUrl });
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
    } catch (error) {
      console.error('Error al cargar o reproducir el sonido:', error);
    }
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


