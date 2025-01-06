import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Pressable, ActivityIndicator } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useColors } from "./Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function Success(props) {
    const position = useSharedValue(-Dimensions.get('window').height / 15);

    const { Colors } = useColors();

    useEffect(() => {
        if (props.visible == true) {
            position.value = withTiming(0);
        } else {
            position.value = withTiming(-Dimensions.get('window').height / 5);
        }
    }, [props.visible]);

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: -Dimensions.get('window').height / 15,
            width: '100%',
            backgroundColor: Colors.completedGreen,
            zIndex: 100,
            justifyContent: 'center',
            paddingVertical: Dimensions.get('window').height / 80
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
                <View style={{width: '15%', alignItems: 'center', justifyContent: 'center'}} >
                </View>

                <View style={{width: '70%'}}>
                    <Text style={styles.text}>{props.statusText}</Text>
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