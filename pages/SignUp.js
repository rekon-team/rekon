import { TextInput } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";

export default function SignUp() {
    const { Lang } = useLang();
    const { Colors } = useColors();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.primary,
        },
        text: {
            color: Colors.onPrimary,
        },
        input: {
            width: '80%',
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderColor: Colors.onPrimary,
            color: Colors.onPrimary,
        },
    });
    return (
        <View style={styles.container}>
            <BackgroundGradient/>
            <Header backButton={true} title={Lang.sign_up.title} navigation={navigation}/>
            <View style={styles.inputContainer}>
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.sign_up.email} />
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.sign_up.password} />
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.sign_up.confirm_password} />
                <Pressable style={styles.logInContainer} onPress={() => {setAccountError('log in page does not exist')}}>
                    <Text style={styles.text}>{Lang.sign_up.already_have_account}</Text>
                    <Text style={styles.underlineText}>{Lang.sign_up.log_in}</Text>
                </Pressable>
                <Pressable style={styles.accentButton} onPress={() => {navigation.navigate("Welcome")}}>
                    <Text style={styles.accentText}>{Lang.start_page.sign_up_button}</Text>
                </Pressable>
                <Text style={styles.errorText}>{accountError}</Text>
            </View>
        </View>
    );

}