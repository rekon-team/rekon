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
import { useUpload } from "../components/Upload";
import { useSettings } from "../components/Settings";
import placeholderImage from './assets/OIP.jpg';
import ky from "ky";
import Constants from "../components/Constants";

export default function Welcome({route, navigation}) {
    const [image, setImage] = useState(null);
    const [profileTimestamp, setProfileTimestamp] = useState(Date.now());
    const { Lang } = useLang();
    const { Colors } = useColors();
    const Upload = useUpload();
    const { Settings, updateSetting } = useSettings();

    const isFocused = useIsFocused();

    const [name, setName] = useState('');
    const [teamNumber, setTeamNumber] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => isFocused)
        return () => backHandler.remove()
    },[isFocused]);

    function disableBack() {
        return true;
    }

    async function createGroup() {
        try {
            const createTeam = await ky.post(`${Constants.serverUrl}/groups/createGroup`, {
                json: {
                    group_name: name,
                    group_description: bio,
                    team_number: teamNumber,
                    user_token: Settings.token
                }
            }).json();
            console.log(createTeam);
            if (createTeam.error) {
                throw new Error(createTeam.error);
            }
            updateSetting('stage', 'complete');
            navigation.navigate('AdminDrawers');
        } catch (error) {
            console.error("Error in creating team: ", error);
            return;
        }
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
            marginBottom: 60 / Dimensions.get('window').fontScale
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
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                const fileExtension = result.assets[0].uri.split('.').pop();
                
                console.log('prepping file for upload');
                const fileName = await Upload.prepFileForUpload(result.assets[0].uri, 'profile_picture');
                if (!fileName) {
                    throw new Error('Failed to prepare file');
                }

                console.log('fetching upload token');
                const token = await Upload.fetchUploadToken('profile', Settings.token, 'profile_picture', '.' + fileExtension);
                if (!token) {
                    throw new Error('Failed to get upload token');
                }

                console.log('uploading file');
                await Upload.uploadFile('profile_picture', Settings.token, token);
                
                setProfileTimestamp(Date.now());
            }
        } catch (error) {
            console.error('Error in pickImage:', error);
            // Handle error appropriately (maybe show it in the UI)
        }
    };

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header title={Lang.create_team.title} backButton={true} navigation={navigation}></Header>
            <View style={styles.inputContainer}>
                {/*<Pressable style={styles.pictureButton} onPress={pickImage}>
                    <Image 
                        source={{
                            uri: `${Constants.serverUrl}/uploads/getGroupPicture?accountID=${Settings.accountID}&t=${profileTimestamp}`
                        }}
                        placeholder={placeholderImage}
                        recycleKey={profileTimestamp}
                        style={{width: Dimensions.get('window').width * 0.4, height: Dimensions.get('window').width * 0.4, borderRadius: 1000, zIndex: 4, opacity: 1, position: 'absolute', top: 10}} 
                    />
                    <Image source={require('./assets/OIP.jpg')} style={{width: Dimensions.get('window').width * 0.4, height: Dimensions.get('window').width * 0.4, borderRadius: 1000, zIndex: 1, opacity: 1}} />
                    <Text style={styles.text}>{Lang.create_team.profile_picture}</Text>
                </Pressable>*/}
                <TextInput value={name} onChangeText={(text) => {setName(text)}} textColor={Colors.text} outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.create_team.name} />
                <TextInput value={teamNumber} onChangeText={(text) => {setTeamNumber(text)}} textColor={Colors.text} outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.input} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.welcome.team} />
                <TextInput value={bio} onChangeText={(text) => {setBio(text)}} multiline={true} textColor={Colors.text} outlineColor={Colors.text} activeOutlineColor={Colors.text} mode="outlined" style={styles.inputBio} outlineStyle={{borderRadius: 10}} theme={{ colors: { onSurfaceVariant: 'white'} }} label={Lang.create_team.bio} />
                <Pressable style={styles.accentButton} onPress={() => {createGroup()}}>
                    <Text style={styles.accentText}>{Lang.create_team.create}</Text>
                </Pressable>
            </View>
        </View>
    );
}