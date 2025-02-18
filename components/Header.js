import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLang } from './Lang';
import { useColors } from './Colors';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function Header(props) {
    const navigation = useNavigation();
    let hamburgerButton = false;
    let fontSize = Dimensions.get('window').width / 9;
    let backgroundShown = false;
    let previewButton = false;
    let customZIndex = 0;
    let topOffset = getStatusBarHeight() + fontSize / 2;
    if (props.overrideTopOffset != undefined) {
        topOffset = props.overrideTopOffset;
    }
    if (props.overrideFontSize != 40 && props.overrideFontSize != undefined) {
        // window scaling fix
        // calculates the relative font size based on the window width to prevent the header from being too small or too large
        fontSize = Dimensions.get('window').width / (Dimensions.get('window').width / props.overrideFontSize);
    }
    if (props.backgroundShown != undefined) {
        backgroundShown = props.backgroundShown;
    }
    if (props.hamburgerButton != undefined) {
        hamburgerButton = props.hamburgerButton;
    }
    if (props.previewButton != undefined) {
        previewButton = props.previewButton;
    }
    if (props.customZIndex != undefined) {
        customZIndex = props.customZIndex;
    }
    const { Colors } = useColors();
    const styles = StyleSheet.create({
        header: {
            position: 'absolute',
            top: topOffset,
            width: '100%',
            height: '15%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            zIndex: customZIndex,
            //paddingTop: '3%',  I have no idea why this is here but it makes the header look bad
        },
        fakeBackground: {
            position: 'absolute',
            top: -getStatusBarHeight(),
            left: 0,
            width: '100%',
            height: getStatusBarHeight() + Dimensions.get('window').height * 0.1,
            backgroundColor: Colors.primary,
            zIndex: -1
        },
        headerText: {
            fontFamily: 'Inter',
            color: Colors.text,
            fontSize: fontSize,
            lineHeight: fontSize * 1.125,
            textAlign: 'center'
        }
    });
    return (
        <View style={styles.header}>
            {backgroundShown && <View style={styles.fakeBackground}></View>}
            <View style={{width: "15%", height: '100%', alignItems: 'center', justifyContent: 'flex-start', height: "100%"}}>
                {props.backButton &&
                <Pressable onPress={() => props.navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={40} color={Colors.text} />
                </Pressable>}
                
                {hamburgerButton &&
                <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <MaterialIcons name="menu" size={40} color={Colors.text} />
                </Pressable>}
            </View>
            <View style={{width: "70%", height: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Text style={styles.headerText}>{props.title}</Text>
                {props.children}
            </View>
            <View style={{width: "15%", height: "100%"}}>
                {previewButton &&
                    <Pressable onPress={() => navigation.navigate('Preview', {matchFormId: props.matchFormId, pageId: props.pageId})}>
                        <MaterialIcons name="remove-red-eye" size={40} color={Colors.text} />
                    </Pressable>
                }
            </View>
        </View>
    );
}