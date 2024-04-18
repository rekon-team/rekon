import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLang } from './Lang';
import { useColors } from './Colors';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { MaterialIcons } from '@expo/vector-icons';

export default function Header(props) {
    const { Colors } = useColors();
    const styles = StyleSheet.create({
        header: {
            position: 'absolute',
            top: getStatusBarHeight(),
            width: '100%',
            height: '12%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingTop: '2%'
        },
        headerText: {
            fontFamily: 'Inter',
            color: Colors.text,
            fontSize: 40,
            lineHeight: 45
        }
    });
    return (
        <View style={styles.header}>
            <View style={{width: "15%", height: '100%', alignItems: 'center', justifyContent: 'flex-start', height: "100%"}}>
                <Pressable onPress={() => props.navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={40} color={Colors.text} />
                </Pressable>
            </View>
            <View style={{width: "70%", height: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Text style={styles.headerText}>{props.title}</Text>
            </View>
            <View style={{width: "15%", height: "100%"}}>
            </View>
        </View>
    );
}