import { TextInput } from "react-native-paper";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import { useState } from "react";

export default function SignUp({route, navigation}) {
    const { Lang } = useLang();
    const { Colors } = useColors();
    const [accountError, setAccountError] = useState('');
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
            height: '80%',
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        errorText: {
            fontFamily: 'Inter',
            color: Colors.error,
            fontSize: 20,
        }
    });
    return (
        <View style={styles.container}>
            <BackgroundGradient/>
            <Header title={Lang.sign_up.title} navigation={navigation}/>
            <View style={styles.inputContainer}>
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.sign_up.email} />
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.sign_up.password} />
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.sign_up.confirm_password} />
                <Pressable style={styles.logInContainer} onPress={() => {setAccountError('log in page does not exist')}}>
                    <Text style={styles.text}>{Lang.sign_up.already_have_account}</Text>
                    <Text style={styles.underlineText}>{Lang.sign_up.log_in}</Text>
                </Pressable>
                <Pressable style={styles.accentButton} onPress={() => {setAccountError(Lang.sign_up.email_taken)}}>
                    <Text style={styles.accentText}>{Lang.start_page.sign_up_button}</Text>
                </Pressable>
                <Text style={styles.errorText}>{accountError}</Text>
            </View>
        </View>
    );

}