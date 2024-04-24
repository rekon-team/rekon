import { Card, TextInput } from "react-native-paper";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import { useState } from "react";
import ky from 'ky';
import Constants from "../components/Constants";

export default function SignUp({route, navigation}) {
    const { Lang } = useLang();
    const { Colors } = useColors();
    const [accountError, setAccountError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    let emailColor = emailError ? Colors.error : Colors.text;

    let passwordColor = passwordError ? Colors.error : Colors.text;

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
            height: parseInt(Dimensions.get('window').height * 0.8 * 0.1),
            margin: 8,
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
            height: Dimensions.get('window').height * 0.8 * 0.1,
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
            <Header backButton={true} title={Lang.sign_up.title} navigation={navigation}/>
            <View style={styles.inputContainer}>
                <TextInput onChangeText={(text) => {setEmail(text)}} textColor={Colors.text} activeOutlineColor={emailColor} outlineColor={emailColor} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.sign_up.email} />
                <TextInput onChangeText={(text) => {setPassword(text)}} textColor={Colors.text} activeOutlineColor={passwordColor} outlineColor={passwordColor} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: passwordColor} }} label={Lang.sign_up.password} />
                <TextInput onChangeText={(text) => {setConfirmPassword(text)}} textColor={Colors.text} activeOutlineColor={passwordColor} outlineColor={passwordColor} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: passwordColor} }} label={Lang.sign_up.confirm_password} />
                <Pressable style={styles.logInContainer} onPress={() => {navigation.navigate('LogIn')}}>
                    <Text style={styles.text}>{Lang.sign_up.already_have_account}</Text>
                    <Text style={styles.underlineText}>{Lang.sign_up.log_in}</Text>
                </Pressable>
                <Pressable style={styles.accentButton} onPress={async () => {
                    if (email.includes('@') && email.includes('.')) {
                        setAccountError('');
                        setEmailError(false);
                    } else {
                        setAccountError(Lang.log_in.invalid_email);
                        setEmailError(true);
                        return;
                    }

                    if (password == confirmPassword) {
                        setAccountError('');
                        setPasswordError(false);
                    } else {
                        setAccountError(Lang.sign_up.password_mismatch);
                        setPasswordError(true);
                        return;
                    }
                    const json = await ky.post(Constants.serverUrl + '/accounts/registerUserAccount', {json: {email: email, password: password}}).json();
                    if (json.message.detail != undefined) {
                        setAccountError(json.message.detail);
                        return;
                    }
                    if (json.error) {
                        setAccountError(json.message);
                        return;
                    }
                    navigation.navigate("Welcome")
                    }}>
                    <Text style={styles.accentText}>{Lang.start_page.sign_up_button}</Text>
                </Pressable>
                <Text style={styles.errorText}>{accountError}</Text>
            </View>
        </View>
    );

}