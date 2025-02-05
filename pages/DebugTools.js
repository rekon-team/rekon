import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../components/Colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSettings } from '../components/Settings';

export default function DebugTools() {
    const navigation = useNavigation();
    const { Colors, resetColorsToDefault } = useColors();
    const { Settings, resetSettings, updateSetting } = useSettings();
    const [resetConfirmation, setResetConfirmation] = useState(false);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
        },
        text: {
            color: Colors.text,
            fontSize: 16,
            fontWeight: 'bold',
        },
        header: {
            position: 'absolute',
            top: getStatusBarHeight() + 10,
            color: Colors.text,
            fontSize: 24,
            fontWeight: 'bold',
        },
        button: {
            backgroundColor: Colors.primary,
            borderColor: Colors.divider,
            borderWidth: 2,
            padding: 10,
            borderRadius: 5,
        },
        accentButton: {
            backgroundColor: Colors.accent,
            padding: 10,
            borderRadius: 5,
            position: 'absolute',
            bottom: 10,
        },
        buttonText: {
            color: Colors.onAccent,
            fontSize: 24,
            fontWeight: 'bold',
        },
        resetConfirmation: {
            backgroundColor: Colors.primary,
            padding: 10,
            borderRadius: 5,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        resetConfirmationText: {
            color: Colors.text,
            fontSize: 16,
            fontWeight: 'bold',
        },
        resetConfirmationButton: {
            backgroundColor: Colors.accent,
            padding: 10,
            borderRadius: 5,
        },
        resetConfirmationButtonText: {
            color: Colors.onAccent,
            fontSize: 24,
            fontWeight: 'bold',
        },
    });
    return (
        <View style={styles.container}>
            {resetConfirmation && <Modal transparent={true} visible={true} onRequestClose={() => setResetConfirmation(false)}>
                <View style={styles.resetConfirmation}>
                    <Text style={styles.resetConfirmationText}>Are you sure you want to reset your settings?</Text>
                    <Pressable style={styles.resetConfirmationButton} onPress={() => {resetSettings(); setResetConfirmation(false);}}>
                        <Text style={styles.resetConfirmationButtonText}>Reset</Text>
                    </Pressable>
                </View>
            </Modal>}
            <Text style={styles.header}>Debug Tools</Text>
            <Pressable style={styles.button} onPress={() => {navigation.navigate('ColorTools')}}>
                <Text style={styles.buttonText}>Color Tools</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => {navigation.navigate('FileTools')}}>
                <Text style={styles.buttonText}>File Tools</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => {setResetConfirmation(true)}}>
                <Text style={styles.buttonText}>Reset Settings</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => {updateSetting('stage', 'welcome')}}>
                <Text style={styles.buttonText}>Set Stage to Welcome</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => {updateSetting('stage', 'joinTeam')}}>
                <Text style={styles.buttonText}>Set Stage to Join Team</Text>
            </Pressable>
            <Pressable style={styles.accentButton} onPress={() => {navigation.goBack()}}>
                <Text style={styles.buttonText}>Exit Debug Mode</Text>
            </Pressable>
        </View>
    );
}