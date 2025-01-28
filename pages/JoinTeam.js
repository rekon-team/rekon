import React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions, Image, BackHandler } from "react-native";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function JoinTeam({route, navigation}) {
    const { Lang } = useLang();
    const { Colors } = useColors();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.primary,
            width: "100%",
            height: "100%",
            gap: Dimensions.get('window').height * 0.05
        },
        text: {
            fontFamily: 'Inter',
            color: Colors.text,
            fontSize: 18
        },
        bigText: {
            fontFamily: 'Inter',
            color: Colors.text,
            fontSize: 32
        },
        accentButton: {
            backgroundColor: Colors.accent,
            width: '80%',
            height: Dimensions.get('screen').height * 0.8 * 0.1,
            borderRadius: 10,
            padding: 10,
            margin: 25,
            alignItems: 'center',
            justifyContent: 'center',
        },
        circleAccentButton: {
            backgroundColor: Colors.accent,
            width: 100,
            height: 100,
            borderRadius: 50,
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
        circleContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: Dimensions.get("window").width * 0.2
        },
        column: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 30/Dimensions.get("window").fontScale,
        }
    });
    
    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header navigation={navigation} backButton={true} title={Lang.join_team.title}/>
            <View style={styles.circleContainer}>
                <View style={styles.column}>
                    <Pressable style={styles.circleAccentButton} onPress={() => navigation.navigate('QRScan')}>
                        <MaterialIcons name="qr-code-scanner" size={50} color={Colors.onAccent} />
                    </Pressable>
                    <Text style={styles.text}>{Lang.join_team.scan_qr}</Text>
                </View>
                <View style={styles.column}>
                    <Pressable style={styles.circleAccentButton} onPress={() => navigation.navigate('ScanQR')}>
                        <MaterialIcons name="key" size={50} color={Colors.onAccent} />
                    </Pressable>
                    <Text style={styles.text}>{Lang.join_team.code}</Text>
                </View>
            </View>
            <Text style={styles.bigText}>{Lang.join_team.or}</Text>
            <Pressable style={styles.accentButton} onPress={() => navigation.navigate('CreateTeam')}>
                <Text style={styles.accentText}>{Lang.join_team.create_team}</Text>
            </Pressable>
        </View>
    )
}
    

