import { Alert } from 'react-native';

const ShowAlert = (title, message) => {
    Alert.alert(
        title, message,[
        {
          text: 'OK',
          style: 'cancel',
        },],
    );
};

export default ShowAlert
