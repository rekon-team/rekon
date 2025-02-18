import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../Colors';
import { useLang } from '../Lang';

export default function MultipleChoicePreview(props) {
  const { Colors } = useColors();
  const { Lang } = useLang();

  const [selectedOption, setSelectedOption] = useState(null);

  // Styles for MultipleChoiceSection and RadioButton components
  const styles = StyleSheet.create({
    multipleChoiceSectionContainer: {
      margin: 10,
    },
    header: {
      marginBottom: 10,
      fontSize: 20,
      color: Colors.text,
      fontFamily: 'Inter',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
      paddingVertical: 5,
    },
    circle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.onAccent,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 5,
    },
    selectedCircle: {
      display: 'flex',
      height: 10,
      width: 10,
      borderRadius: 10,
      backgroundColor: Colors.accent,
      justifyContent: 'center',
    }, 
    optionContainer: {
    },
  });

  // RadioButton component defined here
  const RadioButton = ({ label, options }) => {
    const handlePress = () => {
      setSelectedOption(label);
    };

    const isSelected = label === selectedOption;

    return (
      <View style={styles.optionContainer}>
        <Pressable style={styles.container} onPress={handlePress}>
          <View style={[styles.circle, isSelected ? {borderColor: Colors.accent} : null]}>
            <View style={[{display: 'none'}, isSelected ? styles.selectedCircle : null]}/>
          </View>
          <Text style={{color: Colors.text, fontSize: 15.3, fontFamily: 'Inter'}}>{label}</Text>
        </Pressable>
      </View> //This view might be unnecessary
    );
  };

  return (
    <View style={styles.multipleChoiceSectionContainer}>
      <Text style={styles.header}>{props.question}</Text>
      {props.options.map((option, index) => (
        <RadioButton
          key={index}
          label={option}
          options={props.options}
          setSelectedOption={setSelectedOption}
        />
      ))}
    </View>
  );
}