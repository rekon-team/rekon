import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { useColors } from '../Colors';
import { useLang } from '../Lang';

export default function SliderPreview(props) {
    const { Colors } = useColors();
    const { Lang } = useLang();

    const [sliderValue, setSliderValue] = useState(Number(props.minimum));

    const styles = StyleSheet.create ({
        sliderSectionContainer: {
            margin: 10,
            flexDirection: 'column',
            alignItems: 'center',
        },
        header: {
            marginBottom: 5,
            fontSize: 20,
            color: Colors.text,
            fontFamily: 'Inter',
        },
        limits: {
            alignContent: 'center',
            justifyContent: 'center',
        },
        text: {
            color: Colors.text,
            fontFamily: 'Inter',
        }
    });

    return(
        <View style={styles.sliderSectionContainer}>
            <Text style={styles.header}>{props.question}</Text>
            <Text style={styles.text}>{sliderValue}</Text>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.limits}><Text style={styles.text}>{props.minimum}</Text></View>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={Number(props.minimum)}
                    maximumValue={Number(props.maximum)}
                    minimumTrackTintColor={Colors.text}
                    maximumTrackTintColor={Colors.secondary}
                    onValueChange={value => setSliderValue(value)}
                    thumbTintColor={Colors.accent}
                    step={1}
                />
                <View style={styles.limits}><Text style={styles.text}>{props.maximum}</Text></View>
            </View>
        </View>
    )
}