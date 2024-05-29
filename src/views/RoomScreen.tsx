import { StyleSheet, View, FlatList, Image, TouchableOpacity, TextInput, Alert, BackHandler } from "react-native"
import React from "react"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from 'react';
import { socket } from '../utils/socket';

import SpotifyAPI from "../types/SpotifyData";
import CustomText from "../components/CustomText"
import ConfirmModal from "../components/ConfirmModal";
import CustomModal from "../components/CustomModal";
import TrackSearch from "../components/TrackSearch";
import TrackQueue from "../components/TrackQueue";

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { API_URL_LOCAL, API_URL_AZURE } from "@env";


const RoomScreen = () => {
    // GLOBAL
    const [isHost, setIsHost] = useState(Boolean);
    const [username, setUsername] = useState('')
    const socketRef = useRef(socket);

    // HEADER
    const navigation = useNavigation();
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [data, setData] = useState<TrackItem[]>([]);

    // USER INTERFACE
    const [searchedSong, setSearchedSong] = useState('');
    const searchedSongInputRef = useRef<TextInput>(null);
    const [modalVisible, setModalVisible] = useState(Boolean);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [customModalVisible, setCustomModalVisible] = useState(Boolean);

    // ADMIN INTERFACE
    const [code, setCode] = useState('');


    const handlePress = (screenName) => {
        navigation.navigate(screenName as never);
    };

    useEffect(() => {
        const chargeUsername = async () => {
            const userInfoJson = await AsyncStorage.getItem("user_info");
            const userInfo = JSON.parse(userInfoJson);
            setUsername(userInfo.username)
        }
        chargeUsername();

        const onConnect = () => {
            socketRef.current.emit('register_user', username);
        };

        const setupSocket = () => {
            if (!socketRef.current.connected) {
                socketRef.current.connect();
            } else {
                socketRef.current.emit('register_user', username);
            }
            socketRef.current.on('connect', onConnect);
        };

        setupSocket();

        return () => {
            socketRef.current.off('connect', onConnect);
        };
    }, [username]);

    useEffect(() => {
        const chargeCode = async () => {
            const roomCode = await AsyncStorage.getItem("room_code");
            setCode(roomCode);
        }
        chargeCode();

        const onConnect = () => {
            socketRef.current.emit('join_room', code)
        };

        const setupSocket = () => {
            if (!socketRef.current.connected) {
                socketRef.current.connect();
            } else {
                socketRef.current.emit('join_room', code)
            }
            socketRef.current.on('connect', onConnect);
        };

        setupSocket();

        return () => {
            socketRef.current.off('connect', onConnect);
        };
    }, [code]);

    

    useEffect(() => {
        const checkUserRole = async () => {
            try {
                const userId = await AsyncStorage.getItem('user_id');
                const roomId = await AsyncStorage.getItem('room_id');

                const response = await fetch(`${API_URL_LOCAL}/salas/${roomId}`);
                const room = await response.json();

                if (room.usuarios.id === userId) {
                    setIsHost(true);
                } else {
                    setIsHost(false);
                }

                await SpotifyAPI.getToken();
            } catch (error) {
                console.error('Error al verificar el rol del usuario:', error);
            }
        };

        checkUserRole();

        const backAction = () => {
            if (isHost) {
                handleConfirmAdmin();
            } else {
                handleConfirmUser();
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [isHost]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const updateCurrentSong = (songName, artistName, imageUrl) => {
        setSongName(songName);
        setArtistName(artistName);
        setImageUrl(imageUrl);
    };
    const playTrack = (track) => {
        console.log(`Reproduciendo canción: ${track.name} por ${track.artist}`);
    };

    // USER INTERFACE
    const userInterface = () => {
        return (
            <View>
                <View style={styles.currentSongInfo}>
                    {imageUrl ? (
                        <Image source={{ uri: imageUrl }} style={styles.image} />
                    ) : (
                        <Image source={require('./../assets/images/logo.png')} style={styles.image} />
                    )}
                    <View style={{ paddingHorizontal: 5 }} />
                    <View>
                        <CustomText style={styles.actualTrack}>Canción actual</CustomText>
                        {songName || artistName ? (
                            <View style={styles.contentBox}>
                                <CustomText style={styles.dataTrack}>{songName}</CustomText>
                                <CustomText style={styles.dataTrack}>{artistName}</CustomText>
                            </View>
                        ) : (
                            <View style={styles.contentBox}>
                                <CustomText style={styles.dataTrack}>No hay ninguna canción reproduciéndose</CustomText>
                            </View>
                        )}
                        <CustomText style={styles.addedBy}>Agregada por Usuario1</CustomText>
                    </View>
                </View>
                <View style={styles.textInputLine} />
                <View style={styles.playQueue}>
                    <View style={{ flexDirection: "row" }}>
                        <Entypo name="magnifying-glass" size={20} color="white" style={{ alignSelf: 'center' }} />
                        <TextInput
                            ref={searchedSongInputRef}
                            style={styles.textInput}
                            placeholder="¿Qué canción estás buscando?"
                            placeholderTextColor="#7A7A7A"
                            onChangeText={text => setSearchedSong(text)}
                            value={searchedSong}
                        />
                        <TouchableOpacity style={styles.searchButton} onPress={searchSong}>
                            <CustomText style={styles.searchTitle}>Buscar</CustomText>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {data.length > 0 ? (
                            <View style={styles.queueBox}>
                                <FlatList
                                    data={data}
                                    renderItem={({ item }) => <TrackSearch item={item} updateCurrentSong={updateCurrentSong} />}
                                    keyExtractor={item => item.id.toString()}
                                />
                            </View>

                        ) : (
                            <View style={styles.queueBox}>
                                <View style={styles.noSearchedSong}>
                                    <FontAwesome5 name="ghost" size={52} color="white" style={styles.iconQueuBox} />
                                    <CustomText style={styles.titleNoSearchedSong}>Escribe el nombre de la cancíón que deseas escuchar</CustomText>
                                </View>
                            </View>
                        )}

                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Feather name="shuffle" size={20} color="white" style={{ left: 15 }} />
                        <CustomText style={styles.buttonTitle}>Realizar votación</CustomText>
                    </TouchableOpacity>
                    <View style={{ padding: 5 }}></View>
                    <TouchableOpacity style={styles.button}>
                        <CustomText style={styles.buttonTitle}>Ver Canciones en cola</CustomText>
                    </TouchableOpacity>
                    <View style={{ padding: 20 }}></View>
                    <TouchableOpacity style={styles.button} onPress={leaveRoom}>
                        <CustomText style={styles.buttonTitle}>Abandonar sala</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    const searchSong = async () => {
        if (searchedSong.trim().length > 0) {
            try {
                const searchResult = await SpotifyAPI.searchSongs(searchedSong);
                const tracks = searchResult.tracks.items;
                setData(tracks);
            } catch (error) {
                console.error('Error al buscar canciones:', error);
            }
        } else {
            setCustomModalVisible(false)
            setModalTitle('Error')
            setModalMessage('Debe escribir el nombre de la canción para realizar la búsqueda');
            openModal();
        }
    }

    const handleConfirmUser = async () => {
        const roomCode = await AsyncStorage.getItem('room_code');
        await AsyncStorage.removeItem("room_id")
        await AsyncStorage.removeItem("room_code")
        socketRef.current.emit('leave_room', roomCode);
        handlePress('Main');
    };

    const leaveRoom = async () => {
        try {
            const roomJson = await fetch(`${API_URL_LOCAL}/salas/` + await AsyncStorage.getItem('room_id'))
            const room = await roomJson.json();
            setCustomModalVisible(true)
            setModalTitle('Abandonar sala')
            setModalMessage('¿Estás seguro de querer abandonar la sala?');
            openModal();
        } catch (error) {
            console.log(error)
        }
    }

    // ADMIN INTERFACE
    const adminInterface = () => {
        return (
            <View>
                <View style={styles.textContainer}>
                    <CustomText style={styles.title}>Código de la Sala</CustomText>
                    <CustomText style={styles.code}>{code}</CustomText>
                </View>
                <View style={styles.currentSongInfoAdmin}>
                    <Image source={require('./../assets/images/logo.png')} style={styles.image} />
                    <View style={{ paddingHorizontal: 5 }} />
                    <View>
                        <CustomText style={styles.actualTrack}>Canción actual</CustomText>
                        {songName || artistName ? (
                            <View style={styles.contentBox}>
                                <CustomText style={styles.dataTrack}>{songName}</CustomText>
                                <CustomText style={styles.dataTrack}>{artistName}</CustomText>
                            </View>
                        ) : (
                            <View style={styles.contentBox}>
                                <CustomText style={styles.dataTrack}>No hay ninguna canción reproduciéndose</CustomText>
                            </View>
                        )}
                        <CustomText style={styles.addedBy}>Agregada por Usuario1</CustomText>
                    </View>
                </View>
                <View style={styles.textInputLineAdmin} />
                <View style={styles.playQueueAdmin}>
                    <CustomText style={styles.actualTrack}>Canciones en cola</CustomText>
                    <View style={styles.queueBox}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <TrackQueue item={item} />}
                            keyExtractor={item => item.name.toString()}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Feather name="shuffle" size={20} color="white" style={{ left: 15 }} />
                        <CustomText style={styles.buttonTitle}>Saltar canción</CustomText>
                    </TouchableOpacity>
                    <View style={{ padding: 30 }}></View>
                    <TouchableOpacity style={styles.button} onPress={closeRoom}>
                        <CustomText style={styles.buttonTitle}>Cerrar sala</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const closeRoom = async () => {
        try {
            setCustomModalVisible(true)
            setModalTitle('Cerrar sala')
            setModalMessage('¿Estás seguro de que deseas cerrar la sala?');
            openModal();
        } catch (error) {
            console.log(error)
        }
    }
    const handleConfirmAdmin = async () => {
        const roomJson = await fetch(`${API_URL_LOCAL}/salas/` + await AsyncStorage.getItem('room_id'))
        const room = await roomJson.json();
        const response = await fetch(`${API_URL_LOCAL}/codigosSalas/cerrada`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cerrada: true,
                codSala: code,
                salas: room
            }),
        });
        const roomCode = await AsyncStorage.getItem('room_code');
        await AsyncStorage.removeItem("room_id")
        await AsyncStorage.removeItem("room_code")
        socketRef.current.emit('leave_room', roomCode);
        handlePress('Main');
    };


    return (
        <View style={styles.container}>
            {
                customModalVisible ?
                    <ConfirmModal
                        visible={modalVisible}
                        onClose={closeModal}
                        onConfirm={isHost ? handleConfirmAdmin : handleConfirmUser}
                        title={modalTitle}
                        message={modalMessage}
                    />
                    :
                    <CustomModal
                        visible={modalVisible}
                        onClose={closeModal}
                        title={modalTitle}
                        message={modalMessage}
                    />
            }
            {isHost ? adminInterface() : userInterface()}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#210000',
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontFamily: 'Krona One',
        top: 25,
        color: '#FFFFFF',
        left: -80,
    },
    dataTrack: {
        fontSize: 12,
        fontFamily: 'Krona One',
        color: '#FFFFFF',
        left: 20,
        top: 15
    },
    addedBy: {
        fontSize: 10,
        fontFamily: 'Krona One',
        color: '#7A7A7A',
        top: 10,
    },
    actualTrack: {
        fontSize: 12,
        fontFamily: 'Krona One',
        color: '#FFFFFF',
        left: 0,
    },
    playQueue: {
        top: 50,
        alignSelf: 'center'
    },
    playQueueAdmin: {
        top: 55,
        alignSelf: 'center'
    },
    queueBox: {
        backgroundColor: '#000000',
        height: 310,
        width: 360,
        top: 10,
    },
    textInputLine: {
        borderBottomWidth: 2,
        borderBottomColor: '#7A7A7A',
        width: '90%',
        alignSelf: 'center',
        top: 40
    },
    textInputLineAdmin: {
        borderBottomWidth: 2,
        borderBottomColor: '#7A7A7A',
        width: '90%',
        alignSelf: 'center',
        top: 50
    },
    contentBox: {
        backgroundColor: '#580000',
        height: 60,
        width: 250,
        top: 8,
        alignItems: 'flex-start',
    },
    code: {
        color: '#FFC0CB',
        fontSize: 14,
        fontFamily: 'Krona One',
        top: 25,
        left: 80,
    },
    button: {
        backgroundColor: '#580000',
        padding: 6,
        color: '#FFFFFF',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 220,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonTitle: {
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1,
        fontSize: 12
    },
    searchButton: {
        backgroundColor: '#580000',
        padding: 6,
        color: '#FFFFFF',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 60,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        left: 25
    },
    searchTitle: {
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1,
        fontSize: 10
    },
    image: {
        width: 100,
        height: 100,
        left: 0,
        marginRight: 'auto'
    },
    currentSongInfo: {
        flexDirection: 'row',
        top: 20,
        alignSelf: 'center'
    },
    currentSongInfoAdmin: {
        flexDirection: 'row',
        top: 40,
        alignSelf: 'center'

    },
    buttonContainer: {
        marginVertical: 8,
        top: 80,
    },
    textInput: {
        backgroundColor: 'transparent',
        fontSize: 14,
        color: '#FFFFFF',
        left: 20,
        alignSelf: 'center',
        width: 220
    },
    noSearchedSong: {
        alignSelf: 'center',
        padding: 40,
        justifyContent: 'space-between',
    },
    iconQueuBox: {
        width: 100,
        height: 100,
        top: 50,
        alignSelf: 'center',
        left: 30,
        opacity: 0.5
    },
    titleNoSearchedSong: {
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1,
        fontSize: 12,
        top: 30,
        width: 300,
        opacity: 0.5
    },
    textContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
});

export default RoomScreen