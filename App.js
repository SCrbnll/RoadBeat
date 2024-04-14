import { StyleSheet, StatusBar} from 'react-native';
import Navigation from './src/routes/StackNavigator';

export default function App() {
  return (
    <>
      <StatusBar translucent={true} barStyle="light-content" />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
