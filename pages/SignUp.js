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
            <Text style={styles.text}>{Lang.SignUp}</Text>
            <TextInput style={styles.input} placeholder={Lang.Username} />
            <TextInput style={styles.input} placeholder={Lang.Password} />
            <TextInput style={styles.input} placeholder={Lang.Email} />
        </View>
    );

}