import { useEffect, useState } from 'react';
import { useUpload } from '../../components/Upload';
import { View, Text, StyleSheet, Pressable, ScrollView, Modal } from 'react-native';
import { useColors } from '../../components/Colors';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../../components/Settings';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';

export default function FileViewer() {
    const Upload = useUpload();
    const { Colors } = useColors();
    const [files, setFiles] = useState([]);
    const [optionDialog, setOptionDialog] = useState(null);
    const { Settings } = useSettings();
    const image_types = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.ico', '.webp'];

    useEffect(() => {
        const getFiles = async () => {
            const newFiles = await Upload.getUploadedFiles(Settings.token);
            setFiles(newFiles.files);
        }
        getFiles();
    }, []);

    async function deleteFile(file) {
        await Upload.deleteFile(Settings.token, file.upload_token);
        const newFiles = await Upload.getUploadedFiles(Settings.token);
        setFiles(newFiles.files);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 100,
        },
        refreshButton: {
            backgroundColor: Colors.accent,
            padding: 10,
            borderRadius: 5,
            position: 'absolute',
            top: 10,
            left: 10,
        },
        refreshButtonText: {
            color: Colors.onAccent,
            fontSize: 16,
        },
        fileText: {
            color: Colors.text,
            fontSize: 12,
        },
        fileContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        fileTextContainer: {
            backgroundColor: Colors.secondary,
            padding: 10,
            borderRadius: 5,
            width: 100,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
        },
        optionDialog: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 20,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        optionDialogText: {
            color: Colors.text,
            fontSize: 16,
        },
        optionDialogButton: {
            backgroundColor: Colors.accent,
            padding: 10,
            borderRadius: 5,
        },
        optionDialogButtonText: {
            color: Colors.onAccent,
            fontSize: 16,
        },
        optionDialogContent: {
            backgroundColor: Colors.secondary,
            padding: 20,
            borderRadius: 5,
            gap: 10,
        },
        fileImageContainer: {
            width: 100,
            height: 100,
            margin: 5,
        },
        fileImage: {
            flex: 1,
            borderRadius: 5,
        },
        imagePlaceholder: {
            backgroundColor: Colors.secondary,
            opacity: 0.5,
        },
    });

    const imagePlaceholder = () => (
        <View style={[StyleSheet.absoluteFill, styles.imagePlaceholder]} />
    );

    return (
        <View style={styles.container}>
            {optionDialog && <Modal transparent={true} visible={true} onRequestClose={() => setOptionDialog(null)}>
                <View style={styles.optionDialog}>
                    <View style={styles.optionDialogContent}>
                        <Text style={styles.optionDialogText}>Do you want to delete this file, or open it in the browser?</Text>
                        <Pressable style={styles.optionDialogButton} onPress={() => {
                            deleteFile(optionDialog);
                            setOptionDialog(null);
                        }}>
                        <Text style={styles.optionDialogButtonText}>Delete</Text>
                        </Pressable>
                        <Pressable style={styles.optionDialogButton} onPress={() => {
                            Linking.openURL(Constants.serverUrl + '/uploads/getUploadedFile?userToken=' + Settings.token + '&uploadToken=' + optionDialog.upload_token);
                            setOptionDialog(null);
                        }}>
                            <Text style={styles.optionDialogButtonText}>Open in Browser</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>}
            <Pressable style={styles.refreshButton} onPress={async () => {
                const newFiles = await Upload.getUploadedFiles(Settings.token);
                setFiles(newFiles.files);
            }}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
            </Pressable>
            <ScrollView contentContainerStyle={styles.fileContainer}>
                {files.map((file, index) => (
                    image_types.includes(file.file_type) ?
                    <Pressable style={styles.fileImageContainer} onPress={() => {
                        deleteFile(file);
                    }}>
                        <Image 
                            style={styles.fileImage} 
                            key={file.upload_token} 
                            width={100} 
                            height={100} 
                            source={{ uri: Constants.serverUrl + '/uploads/getUploadedFile?userToken=' + Settings.token + '&uploadToken=' + file.upload_token }}
                            placeholder={{thumbhash: file.thumb_hash}}
                            transition={300}
                        />
                    </Pressable>
                    :
                    <Pressable style={styles.fileTextContainer} key={index} onPress={() => {
                        setOptionDialog(file);
                    }}>
                        <Text style={styles.fileText}>{file.upload_token}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}