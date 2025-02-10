import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import MatchScoutView from "../components/MatchScoutView";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import { Dimensions, View, Text, Pressable } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
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
        },
        text: {
            fontFamily: 'Inter',
            color: Colors.text
        }
    }
    

    return(
        <View style = {styles.container}>

            <BackgroundGradient/>
            <Header title={Lang.settings.title} navigation={navigation} backButton={false} hamburgerButton={true} />
                
            <View style={{ height: verticalIndent * 6.5, top: verticalIndent * 3.5}}>
                <View style={{top: verticalIndent / 4, left: indent, width: '84%', height: verticalIndent / 2, alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={[styles.text, {fontSize: indent / 2, width: '50%'}]}>{Lang.settings.language}</Text>
                    
                    <View style={{width: '50%', height: verticalIndent / 2}}>
                        <Menu renderer={renderers.NotAnimatedContextMenu} onOpen={() => setLangOpen(true)} onClose={() => setLangOpen(false)}>
                            <MenuTrigger>
                                <View style={{backgroundColor: Colors.secondaryContainer, height: verticalIndent / 2, alignItems: 'center', flexDirection: 'row'}}>
                                    <View style={{width: '70%'}}>
                                        <Text style={[styles.text, {fontSize: indent / 2, width: '100%', left: 0, textAlign: 'center'}]}>{currentLang}</Text>
                                    </View>

                                    <View style={{width: '30%', justifyContent: 'center', alignItems: 'center'}}>
                                        <MaterialIcons color={Colors.text} size={indent} name={langOpen ? 'expand-less' : 'expand-more'} />
                                    </View>
                                </View>
                            </MenuTrigger>
                                <MenuOptions customStyles={{optionsContainer: {backgroundColor: Colors.secondaryAccent, height: verticalIndent / 2}}}>
                                    {langList.map((lang, index) => {
                                        return (
                                            <MenuOption key={index} style={[{top:verticalIndent / 2, left: verticalIndent / 3, height: verticalIndent/2, alignItems: 'center', flexDirection: 'row', width: '84%', backgroundColor: Colors.accent}, index == langList.length - 1 && {borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]} onSelect={() => {switchLang(langCodes[index])}}>
                                                <Text style={{color: Colors.text}}>{lang}</Text>
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
                <Text style={[styles.text, {fontSize: indent / 2, top: verticalIndent, left: indent}]}>{Lang.settings.system_color}</Text>
            </View>

            <View style={{ height: verticalIndent * .5, top: verticalIndent * 5.38, left: indent * 4.5, position: "absolute", width: verticalIndent * 1.75, backgroundColor: Colors.accent, borderRadius: 5}}>
                <TextInput onChangeText={(text) => {setColors(text)}} textColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.sign_up.email} />
            </View>

            <Pressable style={{ height: verticalIndent * .5, top: verticalIndent * 5.38, left: indent * 8.3, position: "absolute", width: verticalIndent * .5, backgroundColor: (/^#[0-9A-F]{6}$/i.test(colors) == true ? colors : Colors.accent), borderRadius: 2000}} onPress={ () => {
                if (/^#[0-9A-F]{6}$/i.test(colors) == true){
                    let newColors = calcDiffFromTable(colors);
                    updateColorsFromCalc(newColors);
                }
                if (colors == "Reset"){
                    resetColorsToDefault();
                }

                /*console.log("laidjkflsadf");*/
            }} />

        </View>
    );
}