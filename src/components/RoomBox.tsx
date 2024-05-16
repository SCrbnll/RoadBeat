import React from "react";
import {View, StyleSheet,FlatList} from 'react-native';
import Item from "./Item";


const RoomBox = ({data}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 18,
    },
})

export default RoomBox;


