import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLang } from './Lang';
import { Colors } from './Colors';

export default function Header() {
    const { Lang } = useLang();
    const { Colors } = useColors();
    const styles = StyleSheet.create({
        header: {
            width: '100%',
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.primary,
            borderBottomWidth: 1,
            borderBottomColor: Colors.onPrimary,
        },
        headerText: {
            color: Colors.onPrimary,
            fontSize: 20,
            fontWeight: 'bold',
        }
    });
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}></Text>
        </View>
    );
}