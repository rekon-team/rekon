import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
const en_us = require('../lang/en_us.json');
const es_es = require('../lang/es_es.json');

const LangContext = createContext();

export const useLang = () => useContext(LangContext);

const defaultLang = 'en_us';

export const LangProvider = ({ children }) => {
    const allLangs = ['English', 'Español', 'Deutsch', 'Türkçe'];
    const allLangCodes = ['en_us', 'es_es', 'de_de', 'tr_tr'];
    const [Lang, setLang] = useState(en_us);
    const [langList, setLangList] = useState(['English', 'Español', 'Deutsch', 'Türkçe']);
    const [langCodes, setLangCodes] = useState(['en_us', 'es_es', 'de_de', 'tr_tr']);
    const [currentLang, setCurrentLang] = useState('English');
    const [currentLangCode, setCurrentLangCode] = useState('en_us');

    // loads the preferred language from AsyncStorage to make it persistent across app restarts
    async function loadLang() {
        try {
            const userLang = await AsyncStorage.getItem('lang');
            console.log(userLang)
            if (userLang !== null) {
                if (userLang == "en_us") {
                    setLang(en_us);
                    setCurrentLang('English');
                    setCurrentLangCode('en_us');
                } else if (userLang == "es_es") {
                    setLang(es_es);
                    setCurrentLang('Español');
                    setCurrentLangCode('es_es');
                } else {
                    setLang(en_us);
                    setCurrentLang('English');
                    setCurrentLangCode('en_us');
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

    // switches the language and saves it to AsyncStorage
    function switchLang(lang) {
        console.log(lang)
        if (lang == "en_us") {
            setLang(en_us);
            setCurrentLang('English');
            setCurrentLangCode('en_us');
            AsyncStorage.setItem('lang', "en_us");
        } else if (lang == "es_es") {
            setLang(es_es);
            setCurrentLang('Español');
            setCurrentLangCode('es_es');
            AsyncStorage.setItem('lang', "es_es");
        } else {
            // Assumes English as the default because it is by far the most spoken language in FIRST
            setLang(en_us);
            setCurrentLang('English');
            setCurrentLangCode('en_us');
            AsyncStorage.setItem('lang', "en_us");
        }
    }

    useEffect(() => {
        loadLang();
    }, []);

    useEffect(() => {
        // remove the current language from the language list so dropdown doesn't show it
        let newList = allLangs.filter((item) => item !== currentLang);
        setLangList(newList);
        let newCodes = allLangCodes.filter((item) => item !== currentLangCode);
        setLangCodes(newCodes);

    }, [currentLang, currentLangCode]);

    // weird provider stuff
    return (
        <LangContext.Provider value={{ Lang, switchLang, langList, langCodes, currentLang }}>
          {children}
        </LangContext.Provider>
    );
}