import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
const en_us = require('../lang/EN.json');
const es_es = require('../lang/ES.json');
const de_de = require('../lang/DE.json');
const tr_tr = require('../lang/TR.json');
const nl_nl = require('../lang/NL.json');
const zh_cn = require('../lang/ZH.json');
const LangContext = createContext();

export const useLang = () => useContext(LangContext);

const defaultLang = 'EN';

export const LangProvider = ({ children }) => {
    const allLangs = ['English', 'Español', 'Deutsch', 'Türkçe', 'Nederlands', '简体中文'];
    const allLangCodes = ['EN', 'ES', 'DE', 'TR', 'NL', 'ZH'];
    const [Lang, setLang] = useState(en_us);
    const [langList, setLangList] = useState(['English', 'Español', 'Deutsch', 'Türkçe', 'Nederlands', '简体中文']);
    const [langCodes, setLangCodes] = useState(['EN', 'ES', 'DE', 'TR', 'NL', 'ZH']);
    const [currentLang, setCurrentLang] = useState('English');
    const [currentLangCode, setCurrentLangCode] = useState('EN');

    // loads the preferred language from AsyncStorage to make it persistent across app restarts
    async function loadLang() {
        try {
            const userLang = await AsyncStorage.getItem('lang');
            console.log(userLang)
            if (userLang !== null) {
                if (userLang == "EN") {
                    setLang(en_us);
                    setCurrentLang('English');
                    setCurrentLangCode('EN');
                } else if (userLang == "ES") {
                    setLang(es_es);
                    setCurrentLang('Español');
                    setCurrentLangCode('ES');
                } else if (userLang == "DE") {
                    setLang(de_de);
                    setCurrentLang('Deutsch');
                    setCurrentLangCode('DE');
                } else if (userLang == "TR") {
                    setLang(tr_tr);
                    setCurrentLang('Türkçe');
                    setCurrentLangCode('TR');
                } else if (userLang == "NL") {
                    setLang(nl_nl);
                    setCurrentLang('Nederlands');
                    setCurrentLangCode('NL');
                } else if (userLang == "ZH") {
                    setLang(zh_cn);
                    setCurrentLang('简体中文');
                    setCurrentLangCode('ZH');
                } else {
                    setLang(en_us);
                    setCurrentLang('English');
                    setCurrentLangCode('EN');
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
        if (lang == "EN") {
            setLang(en_us);
            setCurrentLang('English');
            setCurrentLangCode('EN');
            AsyncStorage.setItem('lang', "EN");
        } else if (lang == "ES") {
            setLang(es_es);
            setCurrentLang('Español');
            setCurrentLangCode('ES');
            AsyncStorage.setItem('lang', "ES");
        } else if (lang == "DE") {
            setLang(de_de);
            setCurrentLang('Deutsch');
            setCurrentLangCode('DE');
            AsyncStorage.setItem('lang', "DE");
        } else if (lang == "TR") {
            setLang(tr_tr);
            setCurrentLang('Türkçe');
            setCurrentLangCode('TR');
            AsyncStorage.setItem('lang', "TR");
        } else if (lang == "NL") {
            setLang(nl_nl);
            setCurrentLang('Nederlands');
            setCurrentLangCode('NL');
            AsyncStorage.setItem('lang', "NL");
        } else if (lang == "ZH") {
            setLang(zh_cn);
            setCurrentLang('简体中文');
            setCurrentLangCode('ZH');
            AsyncStorage.setItem('lang', "ZH");
        } else {
            // Assumes English as the default because it is by far the most spoken language in FIRST
            setLang(en_us);
            setCurrentLang('English');
            setCurrentLangCode('EN');
            AsyncStorage.setItem('lang', "EN");
        }
    }

    useEffect(() => {
        loadLang();
    }, []);

    useEffect(() => {
        // remove the current language from the language list so dropdown doesn't show it
        let newList = allLangs.filter((item) => item !== currentLang);
        console.log(newList);
        setLangList(newList);
        let newCodes = allLangCodes.filter((item) => item !== currentLangCode);
        console.log(newCodes);
        setLangCodes(newCodes);

    }, [currentLang, currentLangCode]);

    // weird provider stuff
    return (
        <LangContext.Provider value={{ Lang, switchLang, langList, langCodes, currentLang, allLangs, setLangList }}>
          {children}
        </LangContext.Provider>
    );
}