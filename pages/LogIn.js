import { TextInput } from "react-native-paper";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import Error from "../components/ErrorPopup";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function LogIn({route, navigation}) {
    const { Lang } = useLang();
    const { Colors } = useColors();
    const [showError, setShowError] = useState(false);
    const [accountError, setAccountError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        signUpContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        underlineText: {
            fontFamily: 'Inter',
            color: Colors.text,
            textDecorationLine: 'underline',
        }
    });

    useEffect(() => {
        console.log(`email: ${email}, password: ${password}`);
    }, [email, password]);

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header backButton={true} title={Lang.log_in.title} navigation={navigation}/>
            <View style={styles.inputContainer}>
                <TextInput textColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.log_in.email} onChangeText={text => {
                    if (text.includes('@') && text.includes('.')) {
                        setShowError(false);
                    } else {
                        setShowError(true);
                        setAccountError(Lang.log_in.invalid_email);
                    }
                    setEmail(text);
                }} />
                <TextInput textColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.log_in.password} secureTextEntry={!showPassword} onChangeText={text => {
                    setPassword(text);
                }} />
                <Pressable style={{left: Dimensions.get('window').width * .4 - 25, bottom: Dimensions.get('window').height * 0.8 * 0.1 - 8}} onPress={() => {setShowPassword(!showPassword)}} >
                    <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} color={Colors.text} />
                </Pressable>
                <Pressable style={styles.signUpContainer} onPress={() => {navigation.navigate('SignUp')}}>
                    <Text style={styles.text}>{Lang.log_in.no_account}</Text>
                    <Text style={styles.underlineText}>{Lang.log_in.sign_up}</Text>
                </Pressable>
                <Pressable style={styles.accentButton} onPress={() => {navigation.navigate('Verification')}}>
                    <Text style={styles.accentText}>{Lang.log_in.title}</Text>
                </Pressable>
            </View>
            <Error visible={showError} setVisible={setShowError} errorText={accountError}/>
        </View>
    );
}