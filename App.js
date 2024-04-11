import { StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './src/routes/StackNavigator';

export default function App() {
  return (
    <>
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
