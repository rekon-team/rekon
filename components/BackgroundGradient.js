import { RadialGradient } from "react-native-gradients";
import React from "react";
import { useColors } from "./Colors";
import { StyleSheet, View } from "react-native";

export default function BackgroundGradient(props) {
    const { Colors } = useColors();
    const styles = StyleSheet.create({
        gradientBackground: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            zIndex: 0,
            opacity: 0.4
        },
    });   
    const colorList = [
        { offset: '0%', color: Colors.accent, opacity: '1' },
        { offset: '53.61%', color: Colors.primary, opacity: '1' }
    ];
    return (
        <View style={styles.gradientBackground}>
            <RadialGradient
                x="50%"
                y="0%"
                rx="370.55%"
                ry="100%"
                colorList={colorList}
            />
        </View>
    );
}