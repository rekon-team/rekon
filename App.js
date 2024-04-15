import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LangProvider, useLang } from './components/Lang';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Start from './pages/Start';

const Stack = createStackNavigator();

function PageStack() {
  <Stack.Navigator initialRouteName="Start">
    <Stack.Screen name="Start" component={Start} />
  </Stack.Navigator>
}

export default function App() {
  return (
    <NavigationContainer>
      <LangProvider>
        <PageStack />
        <StatusBar style="auto" />
      </LangProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
