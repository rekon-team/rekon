import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const settingsKeys = ['teamNumber', 'accountID', 'email', 'password', 'token', 'stage'];
    const [Settings, setSettings] = useState({});

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const loadedSettings = {};
                for (const key of settingsKeys) {
                    const value = await AsyncStorage.getItem(key);
                    if (value) {
                        loadedSettings[key] = value;
                    }
                }
                setSettings(loadedSettings);
                console.log(loadedSettings);
            } catch (e) {
                console.error('Failed to load settings', e);
            }
        };

        loadSettings();
    }, []);

    useEffect(() => {
        const saveSettings = async () => {
            try {
                for (const key of settingsKeys) {
                    if (Settings[key] !== undefined) {
                        await AsyncStorage.setItem(key, Settings[key]);
                    }
                }
            } catch (e) {
                console.error('Failed to save settings', e);
            }
        };

        saveSettings();
    }, [Settings]);

    const updateSetting = (key, value) => {
        console.log(`Setting ${key} to ${value}`);
        setSettings(prevSettings => ({ ...prevSettings, [key]: value }));
    };

    const resetSettings = () => {
        setSettings({});
        AsyncStorage.clear();
    };

    return (
        <SettingsContext.Provider value={{ Settings, updateSetting, resetSettings }}>
          {children}
        </SettingsContext.Provider>
    );
};
