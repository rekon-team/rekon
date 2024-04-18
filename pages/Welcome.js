import React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

export default function Welcome({route, navigation}) {
    const { Lang } = useLang();
    const { Colors } = useColors();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: Colors.primary,
            width: "100%",
            height: "100%",
        },
        text: {
            fontFamily: 'Inter',
            color: Colors.text,
            fontSize: 20
        },
        input: {
            width: '80%',
            height: parseInt(Dimensions.get('screen').height * 0.1),
            margin: 12,
            color: Colors.text,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
            fontSize: 20
        },
        inputContainer: {
            width: '100%',
            height: '50%',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        accentButton: {
            backgroundColor: Colors.accent,
            width: '80%',
            height: '10%',
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
        underlineText: {
            fontFamily: 'Inter',
            color: Colors.text,
            textDecorationLine: 'underline',
        },
        logInContainer: {
            width: '100%',
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        pictureButton: {
            width: '80%',
            borderRadius: 10,
            padding: 10,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        },
        errorText: {
            fontFamily: 'Inter',
            color: Colors.error,
            fontSize: 20,
        }
    });
    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header title={Lang.welcome.title} backButton={false} navigation={navigation} overrideFontSize={50}>
                <Text style={[styles.text, {fontSize: 20}]}>{Lang.welcome.subtitle}</Text>
            </Header>
            <View style={styles.inputContainer}>
                <Pressable style={styles.pictureButton}>
                    <MaterialIcons name="account-circle" size={Dimensions.get('screen').width * 0.4} color={Colors.text} />
                    <Text style={styles.text}>{Lang.welcome.profile_picture}</Text>
                </Pressable>
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.welcome.name} />
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.welcome.team} />
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.welcome.bio} />
                <Pressable style={styles.accentButton} onPress={() => navigation.navigate('Next')}>
                    <Text style={styles.accentText}>{Lang.welcome.next}</Text>
                </Pressable>
                <Text style={styles.errorText}>Error</Text>
            </View>
        </View>
    );
}