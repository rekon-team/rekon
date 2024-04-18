import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLang } from './Lang';
import { Colors } from './Colors';

export default function Header(props) {
    let fontSize = 40;
    if (props.overrideFontSize != 40 && props.overrideFontSize != undefined) {
        fontSize = props.overrideFontSize;
    }
    const { Colors } = useColors();
    const styles = StyleSheet.create({
        header: {
            width: '100%',
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.primary,
            borderBottomWidth: 1,
            borderBottomColor: Colors.onPrimary,
        },
        headerText: {
            fontFamily: 'Inter',
            color: Colors.text,
            fontSize: fontSize,
            lineHeight: fontSize * 1.125
        }
    });
    return (
        <View style={styles.header}>
            <View style={{width: "15%", height: '100%', alignItems: 'center', justifyContent: 'flex-start', height: "100%"}}>
                {props.backButton &&
                <Pressable onPress={() => props.navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={40} color={Colors.text} />
                </Pressable>}
            </View>
            <View style={{width: "70%", height: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Text style={styles.headerText}>{props.title}</Text>
                {props.children}
            </View>
            <View style={{width: "15%", height: "100%"}}>
            </View>
        </View>
    );
}