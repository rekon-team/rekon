import React, {useEffect} from "react";
import { StyleSheet, Text, View, Pressable, Dimensions, Image, BackHandler } from "react-native";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from "@react-navigation/native";

export default function Welcome({route, navigation}) {
    const [image, setImage] = useState(null);
    const { Lang } = useLang();
    const { Colors } = useColors();

    const isFocused = useIsFocused();

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => isFocused)
        return () => backHandler.remove()
    },[isFocused]);

    function disableBack() {
        return true;
    }
  
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
            fontSize: 18
        },
        input: {
            width: '80%',
            height: parseInt(Dimensions.get('window').height * 0.8 * 0.1),
            margin: 4,
            color: Colors.text,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
            fontSize: 20
        },
        inputBio: {
            width: '80%',
            height: parseInt(Dimensions.get('window').height * 0.8 * 0.2),
            margin: 4,
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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header title={Lang.welcome.title} backButton={true} navigation={navigation} overrideFontSize={50}>
                <Text style={[styles.text, {fontSize: 20}]}>{Lang.welcome.subtitle}</Text>
            </Header>
            <View style={styles.inputContainer}>
                <Pressable style={styles.pictureButton} onPress={pickImage}>
                    {image ? <Image source={{uri: image}} style={{width: Dimensions.get('window').width * 0.4, height: Dimensions.get('window').width * 0.4, borderRadius: 1000}} /> :
                    <MaterialIcons name="account-circle" size={Dimensions.get('window').width * 0.4} color={Colors.text} />
                    }
                    <Text style={styles.text}>{Lang.welcome.profile_picture}</Text>
                </Pressable>
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.welcome.name} />
                <TextInput outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.welcome.team} />
                <TextInput multiline={true} outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.inputBio} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.welcome.bio} />
                <Pressable style={styles.accentButton} onPress={() => {navigation.navigate('JoinTeam')}}>
                    <Text style={styles.accentText}>{Lang.welcome.next}</Text>
                </Pressable>
                <Text style={styles.errorText}>Error</Text>
            </View>
        </View>
    );
}