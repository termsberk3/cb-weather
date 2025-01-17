import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';


export default function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-Rebecca' edges={['top', 'bottom']}>
        <View >
          <HomeScreen />
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}




