import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LangProvider } from './components/Lang';
import { ColorProvider } from './components/Colors';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { Menu, MenuProvider } from 'react-native-popup-menu';

// Onboarding pages
import Start from './pages/Start';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Welcome from './pages/Welcome';

// Prevent the splash screen from auto-hiding, so we can hide it ourselves
// when all the fonts and assets are loaded.
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

function PageStack() {
  // This stack navigator is gonna be huge
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  // DO NOT TOUCH THIS FONT LOADING CODE
  // IT WILL IMPLODE ON ITSELF IF YOU CHANGE ANYTHING
  const [fontsLoaded, fontError] = useFonts({
    'Inter': require('./fonts/Inter-VariableFont.ttf'),
  });

  const onLayoutRootView = useEffect(() => {
    async function load() {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    }
    load();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Holy providers!
  return (
    <NavigationContainer>
      <MenuProvider>
        <LangProvider>
          <ColorProvider>
            <PageStack />
            <StatusBar style="light" />
          </ColorProvider>
        </LangProvider>
      </MenuProvider>
    </NavigationContainer>
  );
}
