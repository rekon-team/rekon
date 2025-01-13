import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '../components/Colors';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function DebugTools() {
    const navigation = useNavigation();
    const { Colors, resetColorsToDefault } = useColors();

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
    });
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Debug Tools</Text>
            <Pressable style={styles.button} onPress={() => {navigation.navigate('ColorTools')}}>
                <Text style={styles.buttonText}>Color Tools</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => {navigation.navigate('FileTools')}}>
                <Text style={styles.buttonText}>File Tools</Text>
            </Pressable>
            <Pressable style={styles.accentButton} onPress={() => {navigation.navigate('Start')}}>
                <Text style={styles.buttonText}>Exit Debug Mode</Text>
            </Pressable>
        </View>
    );
}