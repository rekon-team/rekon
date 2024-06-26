import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useColors } from "./Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function Error(props) {
    const position = useSharedValue(-Dimensions.get('window').height / 15);

    const { Colors } = useColors();

    useEffect(() => {
        if (props.visible == true) {
            position.value = withTiming(0);
        } else {
            position.value = withTiming(-Dimensions.get('window').height / 15);
        }
    }, [props.visible]);

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: -Dimensions.get('window').height / 15,
            width: '100%',
            height: Dimensions.get('window').height / 15,
            backgroundColor: Colors.error,
            zIndex: 100,
            justifyContent: 'center',
        }, text: {
            color: Colors.text,
            textAlign: 'center',
            fontSize: Dimensions.get('window').height / 30,
            fontFamily: 'Inter'
        }
    });

    const animatedStyles = useAnimatedStyle(() => ({
        bottom: position.value
    }));

    return (
        <Animated.View style={[animatedStyles, styles.container]}>
            <View style={{flexDirection: 'row'}}>
                <View style={{width: '15%'}} />

                <View style={{width: '70%'}}>
                    <Text style={styles.text}>{props.errorText}</Text>
                </View>
                
                <View style={{width: '15%', alignItems: 'center', justifyContent: 'center'}}>
                    <Pressable onPress={() => {props.setVisible(false)}}>
                        <MaterialIcons name="close" size={Dimensions.get('window').height / 30} color={Colors.text} />
                    </Pressable>
                </View>
            </View>
        </Animated.View>
    )
}