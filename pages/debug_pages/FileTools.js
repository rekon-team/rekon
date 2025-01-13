import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useColors } from '../../components/Colors';
import { useUpload } from '../../components/Upload';
import { useSettings } from '../../components/Settings';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';

export default function FileTools() {
    const { Colors } = useColors();
    const Upload = useUpload();
    const { Settings } = useSettings();
    const Navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
        },
        button: {
            backgroundColor: Colors.accent,
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: Colors.onAccent,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    const pickFiles = async () => {
        console.log('pickFiles');
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                multiple: true,
            });
            console.log(result);
            if (result.assets) {
                // Create array of upload promises
                const uploadPromises = result.assets.map(async (asset) => {
                    const fileExtension = asset.uri.split('.').pop();
                    const fileName = await Upload.prepFileForUpload(asset.uri, asset.name);
                    if (!fileName) {
                        throw new Error('Failed to prepare file');
                    }
                    const token = await Upload.fetchUploadToken('userblock', Settings.token, asset.name, '.' + fileExtension);
                    if (!token) {
                        throw new Error(`Failed to fetch upload token for file ${asset.name} with extension ${fileExtension}`);
                    }
                    await Upload.uploadFile(fileName, Settings.token, token);
                    console.log(`file ${asset.name} uploaded`);
                });

                // Execute all uploads concurrently
                await Promise.all(uploadPromises);
                console.log('All files uploaded');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const viewFiles = () => {
        Navigation.navigate('FileViewer');
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => {pickFiles()}}>
                <Text style={styles.buttonText}>Upload Files</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => {viewFiles()}}>
                <Text style={styles.buttonText}>View Uploaded Files</Text>
            </Pressable>
        </View>
    );
}