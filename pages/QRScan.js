import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { useLang } from '../components/Lang';
import { useColors } from '../components/Colors';
import Header from '../components/Header';

export default function QRScan({route, navigation}) {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const { Lang } = useLang();
    const { Colors } = useColors();

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
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
            zIndex: -200
        },
    });

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text>Please accept camera permission...</Text>
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
            <Header backButton={true} title="QR Scan" navigation={navigation} backgroundShown={true}/>
            <CameraView style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </Pressable>
                </View>
            </CameraView>
        </View>
    )
}