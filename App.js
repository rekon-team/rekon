import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LangProvider } from './components/Lang';
import { ColorProvider, useColors } from './components/Colors';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { Menu, MenuProvider } from 'react-native-popup-menu';
import { SettingsProvider } from './components/Settings';
import { UploadProvider } from './components/Upload';
import { DebugProvider } from './components/Debug';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Onboarding pages
import Start from './pages/Start';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Verification from './pages/VerificationCode';
import Welcome from './pages/Welcome';
import JoinTeam from './pages/JoinTeam';
import CreateTeam from './pages/CreateTeam'
import QRScan from './pages/QRScan';

// Admin pages
import AdminHomeMatch from './pages/AdminHomeMatch';
import AdminHomePit from './pages/AdminHomePit';
import AllMatchAssignments from './pages/AllMatchAssignments';

// Debug pages
import DebugTools from './pages/DebugTools';
import ColorTools from './pages/debug_pages/ColorTools';
import FileTools from './pages/debug_pages/FileTools';
import FileViewer from './pages/debug_pages/FileViewer';


import StyledDrawer from './components/Drawer';
import { MaterialIcons } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding, so we can hide it ourselves
// when all the fonts and assets are loaded.
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//CustomDrawerContent was moved to a different file

function AdminDrawers() {
  const { Colors } = useColors();
  //Yippee!!
  return (
    <Drawer.Navigator drawerContent={(props) => <StyledDrawer {...props} />}>
      <Drawer.Screen name="Overview" component={AdminHomeMatch} options={{ headerShown: false, drawerIcon: () => (<MaterialIcons name="pie-chart" size={22} color={Colors.text} />) }} />
      <Drawer.Screen name="AdminHomePit" component={AdminHomePit} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
    </Drawer.Navigator>
  )
}

function PageStack() {
  // This stack navigator is gonna be huge
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
      <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="JoinTeam" component={JoinTeam} options={{ headerShown: false }} />
      <Stack.Screen name="CreateTeam" component={CreateTeam} options={{ headerShown: false }} />
      <Stack.Screen name="QRScan" component={QRScan} options={{ headerShown: false }} />
      <Stack.Screen name="AllMatches" component={AllMatchAssignments} options={{ headerShown: false }} />
      <Stack.Screen name="AdminDrawers" component={AdminDrawers} options={{ headerShown: false }} />
      <Stack.Screen name="DebugTools" component={DebugTools} options={{ headerShown: false }} />
      <Stack.Screen name="ColorTools" component={ColorTools} options={{ headerShown: true }} />
      <Stack.Screen name="FileTools" component={FileTools} options={{ headerShown: true }} />
      <Stack.Screen name="FileViewer" component={FileViewer} options={{ headerShown: true }} />
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MenuProvider>
          <LangProvider>
            <ColorProvider>
            <SettingsProvider>
              <UploadProvider>
                <DebugProvider>
                  <PageStack />
                  <StatusBar style="light" translucent={true}/>
                </DebugProvider>
              </UploadProvider>
            </SettingsProvider>
          </ColorProvider>
        </LangProvider>
        </MenuProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
