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

// Onboarding pages
import Start from './pages/Start';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Verification from './pages/VerificationCode';
import Welcome from './pages/Welcome';
import JoinTeam from './pages/JoinTeam';
import QRScan from './pages/QRScan';
import AdminHomeMatch from './pages/AdminHomeMatch';
import AdminHomePit from './pages/AdminHomePit';
import AllMatchAssignments from './pages/AllMatchAssignments';
import Teammates from './pages/Teammates';
import AssignTeammates from './pages/AssignTeammates';
import Events from './pages/Events';
import Forms from './pages/Forms';
import Preview from './pages/Preview';
import PreviewForm from './pages/PreviewForm';
import MatchFormPages from './pages/MatchFormPages';
import MatchFormBuilder from './pages/MatchFormBuilder';
import PitFormBuilder from './pages/PitFormBuilder';
import Settings from './pages/Settings';

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
    <Drawer.Navigator initialRouteName='Forms' drawerContent={(props) => <StyledDrawer {...props} />}>
      <Drawer.Screen name="Overview" component={AdminHomeMatch} options={{ headerShown: false }} />
      <Drawer.Screen name="AdminHomePit" component={AdminHomePit} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Teammates" component={Teammates} options={{ headerShown: false }} />
      <Drawer.Screen name="AssignTeammates" component={AssignTeammates} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Events" component={Events} options={{ headerShown: false }} />
      <Drawer.Screen name="Forms" component={Forms} options={{ headerShown: false }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Drawer.Navigator>
  )
}

function PageStack() {
  // This stack navigator is gonna be huge
  return (
    <Stack.Navigator initialRouteName="AdminDrawers">
      <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
      <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="JoinTeam" component={JoinTeam} options={{ headerShown: false }} />
      <Stack.Screen name="QRScan" component={QRScan} options={{ headerShown: false }} />
      <Stack.Screen name="AllMatches" component={AllMatchAssignments} options={{ headerShown: false }} />
      <Stack.Screen name="AdminDrawers" component={AdminDrawers} options={{ headerShown: false }} />
      <Stack.Screen name="Preview" component={Preview} options={{ headerShown: false }} />
      <Stack.Screen name="PreviewForm" component={PreviewForm} options={{ headerShown: false }} />
      <Stack.Screen name="MatchFormPages" component={MatchFormPages} options={{ headerShown: false }} />
      <Stack.Screen name="MatchFormBuilder" component={MatchFormBuilder} options={{ headerShown: false }} />
      <Stack.Screen name="PitFormBuilder" component={PitFormBuilder} options={{ headerShown: false }} />
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
