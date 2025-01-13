import { StyleSheet, View, Text, Pressable } from "react-native";
import { useLang } from "../components/Lang";
import { RadialGradient } from 'react-native-gradients';
import { useColors } from "../components/Colors";
import { useEffect } from "react";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuActions, renderers } from 'react-native-popup-menu';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { useSettings } from "../components/Settings";
import Popup from "../components/Popup";

export default function Start({route, navigation}) {
    /* Loads the language handling functions from the LanguageProvider (Lang.js)
    These support functions and variables are used for the language switcher,
    other pages simply need the Lang variable to access the current language's strings */
    const { Lang, switchLang, langList, langCodes, currentLang } = useLang();
    const { Settings, updateSetting, resetSettings } = useSettings();
    /* Loads the color handling functions from the ColorProvider (Colors.js) 
    This is currently just for testing purposes, only the Colors variable is needed on this page,
    and most others.*/
    const { Colors, calcDiffFromTable, updateColorsFromCalc, resetColorsToDefault } = useColors();
    const [langOpen, setLangOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('info');
    const [statusText, setStatusText] = useState('');
    const [debugCounter, setDebugCounter] = useState(0);

    useEffect(() => {
        if (debugCounter > 10) {
            updateSetting('stage', 'debug');
            navigation.navigate('DebugTools');
        }
    }, [debugCounter]);

    // Color switcher testing
    useEffect(() => {
        //let newColors = calcDiffFromTable('#5ae200');
        //updateColorsFromCalc(newColors);
        resetColorsToDefault();
        //resetSettings();
    }, []);

    useEffect(() => {
        if (Settings.accountID != undefined && Settings.token == undefined) {
            setShowPopup(true);
            setPopupType('info');
            setStatusText('Resuming account creation');
            setTimeout(() => {
                navigation.navigate('Verification', {sign_up: true});
            }, 1500)
        } else if (Settings.stage == 'welcome') {
            setShowPopup(true);
            setPopupType('info');
            setStatusText('Resuming account creation');
            setTimeout(() => {
                navigation.navigate('Welcome');
            }, 1500);
        } else if (Settings.stage == 'debug') {
            setShowPopup(true);
            setPopupType('info');
            setStatusText('Entering debug mode');
            setTimeout(() => {
                navigation.navigate('DebugTools');
            }, 1000);
        }
    }, [Settings]);

    // Defines the more complex styles for the page.
    // MAKE SURE TO USE Colors.onAccent FOR TEXT ON AN ACCENT BUTTON
    // PLEASE DO NOT HARDCODE HEX COLORS
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '20%',
            paddingTop: '40%'
        },
        wrapper: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        },
        textContainer: {
            gap: -10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        gradientBackground: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            zIndex: -5,
        },
        dimBackground: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: -4,
        },
        titleText: {
            fontFamily: 'Inter',
            fontSize: 70,
            color: Colors.text,
        },
        taglineText: {
            fontFamily: 'Inter',
            fontSize: 35,
            color: Colors.text,
        },
        buttonContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            height: '40%',
            width: '100%',
        },
        accentButton: {
            backgroundColor: Colors.accent,
            width: '80%',
            height: '30%',
            borderRadius: 10,
            padding: 10,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        accentText: {
            fontFamily: 'Inter',
            fontSize: 20,
            color: Colors.onAccent,
        },
        langMenu: {
            position: 'absolute',
            top: getStatusBarHeight() /*This is a nifty function added by a library to make sure the menu is below the android status bar :)*/,
            right: 10,
            padding: 10,
            zIndex: 100,
        }
    });

    // Defines the gradient colors for the background
    const colorList = [
        { offset: '0%', color: Colors.accent, opacity: '1' },
        { offset: '100%', color: Colors.primary, opacity: '1' }
      ];

    useEffect(() => {
        if (Settings.accountID != undefined && Settings.token == undefined) {
            setShowPopup(true);
            setPopupType('info');
            setStatusText('Resuming account creation');
            setTimeout(() => {
                navigation.navigate('Verification', {sign_up: true});
            }, 1500)
        }
    }, []);
    return (
        <View style={styles.wrapper}>
            {/*Language switcher menu.
            This is wrapped in a View so it can be absolutely positioned without causing isses.
            Menu styling should probably be set in the provider if we are going to style these all the same*/}
            <View style={styles.langMenu}>
                <Menu renderer={renderers.NotAnimatedContextMenu} onOpen={() => setLangOpen(true)} onClose={() => setLangOpen(false)}>
                    {/*TODO: switch larger inline styles to StyleSheet*/}
                    <MenuTrigger>
                        {/*This does some weird flex stuff to make the text centered while the arrow is to the right
                        We should test this on different screen sizes to ensure that it continues to work.*/}
                        <View style={[{backgroundColor: 'white', zIndex: 400, width: 120, height: 40, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', borderRadius: 10, backgroundColor: Colors.secondaryContainer}, langOpen == true && {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
                            <Text style={{color: Colors.secondary, marginRight: 20}}>{currentLang}</Text>
                            <MaterialIcons name={langOpen ? "expand-less" : "expand-more"} size={24} color={Colors.secondary} style={{marginRight: 10}}/>
                        </View>
                    </MenuTrigger>
                    {/*This dynamically loads the languages in the list based on the unselected languages returned by the LanguageProvider (Lang.js).
                    The Lang.js file handles A LOT of the logic here, all this does is load what it provides.*/}
                    <MenuOptions customStyles={{optionsContainer: {width: 140, backgroundColor: 'transparent'}}} style={{position: 'absolute', top: 40, left: 20, width: 120}}>
                        {langList.map((lang, index) => {
                            return (
                                <MenuOption key={index} style={[{backgroundColor: Colors.secondaryBright, flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, borderColor: Colors.secondaryContainer}, index == langList.length - 1 && {borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]} onSelect={() => {switchLang(langCodes[index])}}>
                                    <Text style={{color: Colors.text}}>{lang}</Text>
                                </MenuOption>
                            )
                        })}
                    </MenuOptions>
                </Menu>
            </View>
            {/*The gradient background and dimBackground are fullscreen absolute views that fill the screen to provide the accurate background for the page.*/}
            <View style={styles.gradientBackground}>
                <RadialGradient
                    x="18.28%"
                    y="11.94%"
                    rx="120.58%"
                    ry="64.75%"
                    colorList={colorList}
                />
            </View>
            <View style={styles.dimBackground}></View>

            {/*The main content of the page, this is a simple container with the title, tagline, and two buttons.
            Note the usage of the Lang.js file for providing text, rather than hardcoded text.*/}
            <View style={styles.container}>
                {/*The textContainer is a simple container that holds the title and tagline text.*/}
                <View style={styles.textContainer}>
                    <Pressable onPress={() => {setDebugCounter(debugCounter + 1)}}>
                        <Text style={styles.titleText}>{Lang.start_page.start_title}</Text>
                    </Pressable>    
                    <Text style={styles.taglineText}>{Lang.start_page.start_tagline}</Text>
                </View>
                {/*The buttonContainer is a simple container that holds the sign up and log in buttons.*/}
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.accentButton} onPress={() => {navigation.navigate('SignUp')}}>
                        <Text style={styles.accentText}>{Lang.start_page.sign_up_button}</Text>
                    </Pressable>
                    <Pressable style={styles.accentButton} onPress={() => {navigation.navigate('LogIn')}}>
                        <Text style={styles.accentText}>{Lang.start_page.sign_in_button}</Text>
                    </Pressable>
                </View>
            </View>
            <Popup type={popupType} text={statusText} visible={showPopup} setVisible={setShowPopup} loading={true}/>
        </View>
    );
}   