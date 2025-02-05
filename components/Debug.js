import React, { createContext, useContext, useState, useEffect } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Text, Dimensions, Pressable, View } from 'react-native';
import { useColors } from './Colors';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from './Settings';

const DebugContext = createContext();

export const useDebug = () => useContext(DebugContext);

export const DebugProvider = ({ children }) => {
    const { Colors } = useColors();
    const navigation = useNavigation();
    const [debug, setDebug] = useState(false);

    const { Settings, updateSetting } = useSettings();
    const debugTokens = Settings.debugTokens;

    const windowHeight = Dimensions.get('window').height / 2;

    const animatedView = useAnimatedStyle(() => ({
        bottom: withTiming(debug ? 0 : -windowHeight, {
            duration: 300, // 300ms animation
            easing: Easing.inOut(Easing.ease),
        }),
    }));
    
    const tapGesture = Gesture.Tap()
        .numberOfTaps(4)
        .onEnd(() => {
            setDebug(prev => !prev);
        }).runOnJS(true);

    const addUserToken = (token) => {
        const newTokens = [...debugTokens, token];
        updateSetting('debugTokens', newTokens);
    }

    const switchUserToken = async (token) => {
        updateSetting('token', token);
        try {
            const response = await ky.get(`${Constants.serverUrl}/accounts/getIDfromToken?userToken=${token}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).json();
            updateSetting('accountID', response.accountID);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <GestureDetector gesture={tapGesture}>
            <DebugContext.Provider value={{ debug, setDebug, addUserToken, switchUserToken }}>
                {children}
                <Animated.View style={[animatedView, { position: 'absolute', width: '100%', height: windowHeight, backgroundColor: Colors.text }]}>
                    <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', maxHeight: 50, backgroundColor: 'red' }} onPress={() => setDebug(prev => !prev)}>
                        <Text style={{ color: Colors.text, fontSize: 20, fontWeight: 'bold' }}>Debug menu</Text>
                    </Pressable>
                    {/* navigate to old debug menu */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                        
                    </View>
                    <Pressable style={{justifyContent: 'center', alignItems: 'center', flex: 1, maxHeight: 50, backgroundColor: 'blue' }} onPress={() => navigation.navigate('DebugTools')}>
                        <Text style={{ color: Colors.text, fontSize: 20, fontWeight: 'bold'}}>Old debug menu</Text>
                    </Pressable>

                </Animated.View>
            </DebugContext.Provider>
        </GestureDetector>
    );
}