import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import { Dimensions, View, Text, Pressable } from "react-native";
import { TextInput } from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";

export default function Settings({ navigation }) {
    const { Lang, switchLang, langList, langCodes, currentLang, allLangs } = useLang();
    const { Colors, calcDiffFromTable, updateColorsFromCalc, resetColorsToDefault } = useColors();


    const [colors, setColors] = useState("");
    const [langOpen, setLangOpen] = useState(false);


    useEffect(() => {
        console.log(langList);
        console.log(langCodes);
    }, [langList])
    let indent = Dimensions.get("window").width * 0.1;
    let verticalIndent = Dimensions.get("window").height * 0.1;

    const styles = {
        container: {
            flex: 1,
            backgroundColor: Colors.primary,
            width: "100%",
            height: "100%",
            paddingTop: 40/Dimensions.get("window").fontScale,
            gap: indent,
            alignItems: 'center',
            justifyContent: 'center'
        },
        text: {
            fontFamily: 'Inter',
            color: Colors.text
        },
        input: {
            flex: 1,
            height: verticalIndent * .5,
            backgroundColor: Colors.primary,
        },
    }
    

    return(
        <View style = {styles.container}>

            <BackgroundGradient/>
            <Header title={Lang.settings.title} navigation={navigation} backButton={false} hamburgerButton={true} />
                
            <View>
                <View style={{marginTop: verticalIndent / 4, marginLeft: indent, marginRight: indent, height: verticalIndent / 2, alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={[styles.text, {fontSize: indent / 2, width: '50%'}]}>{Lang.settings.language}</Text>
                    
                    <View style={{width: '50%', height: verticalIndent / 2}}>
                        <Menu renderer={renderers.NotAnimatedContextMenu} onOpen={() => setLangOpen(true)} onClose={() => setLangOpen(false)}>
                            <MenuTrigger>
                                <View style={{backgroundColor: Colors.secondaryContainer, height: verticalIndent / 2, alignItems: 'center', flexDirection: 'row'}}>
                                    <View style={{width: '70%'}}>
                                        <Text style={[styles.text, {fontSize: indent / 2, width: '100%', left: 0, textAlign: 'center', color: Colors.onAccent}]}>{currentLang}</Text>
                                    </View>

                                    <View style={{width: '30%', justifyContent: 'center', alignItems: 'center'}}>
                                        <MaterialIcons color={Colors.onAccent} size={indent} name={langOpen ? 'expand-less' : 'expand-more'} />
                                    </View>
                                </View>
                            </MenuTrigger>
                                <MenuOptions customStyles={{optionsContainer: {backgroundColor: "transparent", height: verticalIndent / 2}}}>
                                    {langList.map((lang, index) => {
                                        return (
                                            <MenuOption key={index} style={[{top:verticalIndent / 2, left: verticalIndent / 3, height: verticalIndent/2, alignItems: 'center', flexDirection: 'row', width: '84%', backgroundColor: Colors.secondaryBright}, index == langList.length - 1 && {borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]} onSelect={() => {switchLang(langCodes[index])}}>
                                                <Text style={{color: Colors.onAccent}}>{lang}</Text>
                                            </MenuOption>
                                        )
                                    })}
                                </MenuOptions>

                            {/*<MenuOptions customStyles={{optionsContainer: {backgroundColor: 'transparent'}}}>
                                
                                
                                {langList.map((lang, index) => {
                                    return (
                                        <MenuOption key={Math.random() * 1000000 + 1000000} onSelect={() => {switchLang(langCodes[index])}}>
                                            <View style={{top: verticalIndent / 2,height: verticalIndent/2, alignItems: 'center', flexDirection: 'row', width: '84%', backgroundColor: "red"}}>
                                               <Text style={[styles.text, {fontSize: indent / 2, width: '70%', left: indent * .2, textAlign: 'center'}]}>{lang}</Text>
                                            </View>
                                        </MenuOption>)})}
                                    
                            </MenuOptions>*/}
                        </Menu>
                    </View>
                </View>
            </View>

            <View style={{ height: verticalIndent * .5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: indent, marginRight: indent, gap: 10}}>
                <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.settings.system_color}</Text>
                <TextInput onChangeText={(text) => {setColors(text)}} activeOutlineColor={Colors.text} outlineColor={Colors.text} textColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: Colors.text} }} label={Lang.settings.hex_color} />
                <Pressable style={{ height: verticalIndent * .5, width: verticalIndent * .5, backgroundColor: colors.toLowerCase() === "reset" ? Colors.originalAccent : (/^#[0-9A-F]{6}$/i.test(colors) == true ? colors : Colors.accent), borderRadius: 2000}} onPress={ () => {
                    if (/^#[0-9A-F]{6}$/i.test(colors) == true){
                        let newColors = calcDiffFromTable(colors);
                        updateColorsFromCalc(newColors);
                    }
                    if (colors.toLowerCase() == "reset"){
                        resetColorsToDefault();
                    }

                    /*console.log("laidjkflsadf");*/
                }} />
            </View>

           

        </View>
    );
}