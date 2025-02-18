import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSettings } from '../components/Settings';
import ky from 'ky';
import Constants from '../components/Constants';
import { useColors } from '../components/Colors';
import Header from '../components/Header';
import QRCode from 'react-native-qrcode-svg';
import BackgroundGradient from '../components/BackgroundGradient';

export default function InviteMember({ navigation }) {
    const { Settings } = useSettings();
    const { Colors } = useColors();
    const [inviteCode, setInviteCode] = useState('none');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);


    const createInvite = async () => {
        try {
            const response = await ky.post(Constants.serverUrl + '/groups/createInvite', {
                json: {
                    userToken: Settings.token,
                    groupID: Settings.currentTeam
                }
            }).json();

            if (response.error) {
                setError(response.error);
            } else {
                setInviteCode(response.secret);
                setSuccess(true);
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while inviting the member.');
        }
    };

    useEffect(() => {
        createInvite();
    }, []);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Reset states and create new invite when screen is focused
            setInviteCode('none');
            setSuccess(false);
            setError(null);
            createInvite();
        });

        return unsubscribe;
    }, [navigation]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.primary
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: Colors.text
        },
        qrContainer: {
            padding: 20,
            backgroundColor: "white",
        },
        text: {
            fontSize: 24,
            color: Colors.text,
            marginTop: 20
        }
    });

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header title="Invite Member" overrideFontSize={39} backButton={true} navigation={navigation}/>
            
            <View style={styles.qrContainer}>
                {inviteCode !== 'none' && <QRCode value={inviteCode} size={200} />}
            </View>
            
            <Text style={styles.text}>Code: {inviteCode}</Text>

            {success && <Text style={styles.success}>Member invited successfully!</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

