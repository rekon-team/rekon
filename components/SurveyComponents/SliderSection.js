import React, { useState, useEffect } from 'react';
import { Pressable, TextInput, StyleSheet, Text, View, Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../Colors';
import { useLang } from '../Lang';

export default function SliderSection(props) {
    const { Colors } = useColors();
    const { Lang } = useLang();

    const [ valuesCorrect, setValuesCorrect ] = useState(true);
    const [minimumValue, setMinimumValue] = useState(null);
    const [maximumValue, setMaximumValue] = useState(null);

    useEffect(() => {
        setMinimumValue(props.minimum);
        setMaximumValue(props.maximum);
    }, [props.minValue, props.maximum]);

    const editMin = (input) => {
        setValuesCorrect(true);
        const newInt = input.replace(/[^0-9]/g, '');
        setMinimumValue(newInt);
    }

    const editMax = (input) => {
        setValuesCorrect(true);
        const newInt = input.replace(/[^0-9]/g, '');
        setMaximumValue(newInt);
    }

    const compareValues = () => {
        var minValue = parseInt(minimumValue, 10);
        var maxValue = parseInt(maximumValue, 10);
        if (minimumValue && maximumValue) {
            console.log('values exist!')
            if (minValue < maxValue) {
                props.onChangeMax(maximumValue);
                props.onChangeMin(minimumValue);
                setValuesCorrect(true);
            } else {
                setMinimumValue(props.minimum);
                setMaximumValue(props.maximum);
                console.log('can not')
                setValuesCorrect(false);
            }
        } else {
            props.onChangeMax(maximumValue);
            props.onChangeMin(minimumValue);
            setValuesCorrect(true);
        }
    }

    const styles = StyleSheet.create ({
        text: {
            color: Colors.text,
            fontFamily: 'Inter',
        },
        sliderSectionContainer: {
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        header: {
            marginBottom: 5,
            fontSize: 20,
            color: Colors.text,
            fontFamily: 'Inter',
        },
        sliderQuestion: {
            backgroundColor: Colors.secondaryBright,
            padding: 10,
            fontSize: 20,
            borderWidth: 2,
            borderColor: Colors.text,
            borderRadius: 10,
            marginRight: 5,   
            marginBottom: 10,
            color: Colors.text,
            fontFamily: 'Inter',
        },
        limits: {
            backgroundColor: Colors.secondaryBright,
            padding: 10,
            fontSize: 15,
            borderWidth: 2,
            borderColor: Colors.text,
            borderRadius: 10,
            flex: 2,
            marginHorizontal: 5,
            marginBottom: 10,
            color: Colors.text,
            fontFamily: 'Inter',
        },
        limitsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        warning: {
            color: Colors.error,
            marginHorizontal: 5,
            fontFamily: 'Inter',
        },
    });

    return(
        <View style={styles.sliderSectionContainer}>
            <View style={{ flexDirection: 'colummn', flex: 1, }}>
                <Text style={styles.header}>Slider Section</Text>
                <TextInput
                    placeholder="Question"
                    value={props.question}
                    onChangeText={props.onChangeQuestion}
                    style={styles.sliderQuestion}
                    placeholderTextColor={Colors.text}
                />

                <Text>
                    <Text style={[styles.text, {fontSize: 14}]}>Set min and max values - </Text>
                    <Text style={[styles.text, {fontSize: 14, color: Colors.error, fontWeight: 'bold'}]}>Required</Text>
                </Text>
                <View style={styles.limitsContainer}>
                    <TextInput //set minimum value
                        placeholder="min"
                        value={minimumValue}
                        onChangeText={editMin}
                        onEndEditing={compareValues}
                        style={styles.limits}
                        inputMode='numeric'
                        placeholderTextColor={Colors.text}
                    />
                    <TextInput //set maximum value
                        placeholder="max"
                        value={maximumValue}
                        onChangeText={editMax}
                        onEndEditing={compareValues}
                        style={styles.limits}
                        inputMode='numeric'
                        placeholderTextColor={Colors.text}
                    />
                </View>
                    {!valuesCorrect && <Text style={styles.warning}>Minimum has to be less than Maximum</Text>}
            </View>
            <MaterialIcons name="delete" size={30} color={Colors.error} onPress={props.onDelete} />
        </View>
    )
}