import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { useColors } from './Colors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function Error(props) {
    const { Colors } = useColors();

    const position = useSharedValue(Dimensions.get('window').height * .1);

    const styles = StyleSheet.create({
        errorContainer: {
            backgroundColor: Colors.error,
            width: '100%',
            height: '10%',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
        },
        errorText: {
            fontFamily: 'Inter',
            color: Colors.text,
            fontSize: 20,
        }
    });

    const errorContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: position.value }]
        }
    });

    useEffect(() => {
        if (props.error.trim() === '') {
            position.value = withTiming(Dimensions.get('window').height * .1);
        } else {
            position.value = withTiming(0);
        }
    }, [props.error]);

    return(
        <Animated.View style={[styles.errorContainer, errorContainerStyle]}>
            <Text style={styles.errorText}>{props.error}</Text>
        </Animated.View>
    );
}