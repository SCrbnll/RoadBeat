import { StyleSheet, View, Image } from "react-native"
import SpotifyAPI from "../types/SpotifyData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Socket } from 'socket.io-client';

import CustomText from "./CustomText"
import { Entypo } from '@expo/vector-icons';
import { API_URL_LOCAL, API_URL_AZURE } from "@env";


interface TrackSearchProps {
  item: TrackItem;
  socket: Socket;
  username: string;
}

const TrackSearch: React.FC<TrackSearchProps> = ({ item, socket, username }) => {

  const addSongServer = async (url: string) => {
    try {
      console.log(url)
      incrementSongsUser()
      // Emitir evento al servidor para agregar canción a la cola
      const codeSala = await AsyncStorage.getItem('room_code');
      socket.emit('add_to_playlist', codeSala, {
        name: item.name,
        artists: item.artists.map(artist => artist.name).join(', '),
        url: item.external_urls.spotify,
        addedBy: username 
      });

    } catch (error) {
      console.error(error);
    }
  }

  const incrementSongsUser = async () => {
    const userInfoJson = await AsyncStorage.getItem("user_info");
    const userInfo = JSON.parse(userInfoJson);
    let canciones: number = userInfo.canciones + 1

    const response = await fetch(`${API_URL_AZURE}/usuarios/incrementSongs/` + userInfo.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userInfo.id,
        email: userInfo.email,
        nombre: userInfo.nombre,
        username: userInfo.username,
        password: userInfo.password,
        canciones: canciones,
        foto: userInfo.foto,
        closed: userInfo.closed
      }),
    });

    const result = await fetch(`${API_URL_AZURE}/usuarios/` + userInfo.id);
    const users = await result.json();
    const infoUser = JSON.stringify(users);
    await AsyncStorage.removeItem('user_info');
    await AsyncStorage.setItem('user_info', infoUser)
  }

  const checkPlaylist = async () => {
    const idSala = await AsyncStorage.getItem('room_id')
    const roomJson = await fetch(`${API_URL_AZURE}/salas/` + idSala);
    const room = await roomJson.json();
    if (room.linkPlaylist == 'no playlist') {
      const nameRoom = room.nombre
      const descriptionRoom = `Anfitrión: ${room.usuarios.username} - ${room.fecha}`
      SpotifyAPI.createPlaylist(nameRoom, descriptionRoom)
    }
  }

  return (
    <View style={styles.contentBox}>
      <Image source={{ uri: item.album.images[0].url }} style={styles.image} />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column' }}>
          <CustomText style={styles.nameTrack} numberOfLines={1} ellipsizeMode="tail">{item.name}</CustomText>
          <CustomText style={styles.artistTrack} numberOfLines={1} ellipsizeMode="tail">{item.artists.map(artist => artist.name).join(', ')}</CustomText>
        </View>
        <Entypo
          name="add-to-list"
          size={20}
          color="white"
          style={styles.addIcon}
          onPress={() => {
            addSongServer(item.external_urls.spotify);
          }}
        />
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
  nameTrack: {
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
  addIcon: {
    alignSelf: 'center',
    left: 100
  }
})

export default TrackSearch;


