import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
const en_us = require('../lang/en_us.json');

const LangContext = createContext();

export const useLang = () => useContext(LangContext);

const defaultLang = 'en_us';

export const LangProvider = ({ children }) => {
    const [Lang, setLang] = useState(en_us);

    //color bootstrapping
    async function loadLang() {
        try {
            const userLang = await AsyncStorage.getItem('lang');
            if (userLang !== null) {
                if (userLang == "en_us") {
                    setLang(en_us);
                }
            } else {
                setLang(en_us);
                await AsyncStorage.setItem('lang', defaultLang);
            }
        } catch (error) {
            console.error('Error loading lang from AsyncStorage:', error);
            setLang(en_us);
        }
    }

    useEffect(() => {
        loadLang();
    }, []);

    return (
        <LangContext.Provider value={{ Lang }}>
          {children}
        </LangContext.Provider>
    );
}