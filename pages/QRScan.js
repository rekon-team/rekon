import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { useLang } from '../components/Lang';
import { useColors } from '../components/Colors';
import Header from '../components/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { MaterialIcons } from '@expo/vector-icons';
import { useSettings } from '../components/Settings';
import ky from 'ky';
import Constants from '../components/Constants';

export default function QRScan({route, navigation}) {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const { Lang } = useLang();
    const { Colors } = useColors();
    const { Settings, updateSetting } = useSettings();
    const [loading, setLoading] = useState(false);

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleBarcodeScanned = ({data}) => {
        // Prevent multiple rapid scans
        if (loading) return;
        setLoading(true);
        acceptInvite(data);
    }

    const acceptInvite = async (inviteCode) => {
        try {
            const response = await ky.post(Constants.serverUrl + '/groups/acceptInvite', {
                json: {
                    userToken: Settings.token,
                    inviteSecret: inviteCode
                }
            }).json();
            if (response.error) {
                console.error(response.message);
                Alert.alert('Error', response.message, [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                updateSetting('currentTeam', response.groupID);
                updateSetting('stage', 'complete');
                navigation.navigate('AdminDrawers'); // TODO: CHANGE TO SCOUT HOME WHEN SCOUT IS BUILT
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while accepting the invite. Please try again.', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.primary
        },
        accentButton: {
            backgroundColor: Colors.accent,
            width: '80%',
            height: 50,
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
        text: {
            fontFamily: 'Inter',
            color: Colors.text,
            fontSize: 18
        },
        camera: {
            flex: 1,
            width: "100%",
            zIndex: 0
        },
        buttonContainer: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            zIndex: 100
        },
        cameraOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        QRCrosshair: {
            width: Dimensions.get('window').width * .75,
            height: Dimensions.get('window').width * .75,
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 0,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Please accept camera permission...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Accept camera permission</Text>
                <Pressable style={styles.accentButton} onPress={requestPermission}>
                    <Text style={styles.accentText}>Accept</Text>
                </Pressable>
            </View>
        );
    }   

    return (
        <View style={styles.container}>
            <Header backButton={true} title="QR Scan" navigation={navigation} backgroundShown={true} customZIndex={100} overrideTopOffset={getStatusBarHeight()}/>
            <CameraView style={styles.camera} facing={facing} barcodeScannerSettings={{barcodeTypes: ['qr']}} onBarcodeScanned={handleBarcodeScanned}>
                <View style={styles.cameraOverlay}>
                    <View style={styles.QRCrosshair}>
                        {loading && <ActivityIndicator size={100} color={Colors.accent} />}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={toggleCameraFacing}>
                        <MaterialIcons name="flip-camera-android" size={64} color="white" />
                    </Pressable>
                </View>
            </CameraView>
        </View>
    )
}