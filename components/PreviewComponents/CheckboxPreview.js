import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../Colors';
import { useLang } from '../Lang';

export default function CheckboxPreview(props) {
  const { Colors } = useColors();
  const { Lang } = useLang();

  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    console.log(props.question + ': ' + selectedOptions);
  }, [selectedOptions]);

  // Styles for MultipleChoiceSection and RadioButton components
  const styles = StyleSheet.create({
    checkboxSectionContainer: {
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
    checkbox: {
      height: 20,
      width: 20,
      borderRadius: 3,
      borderWidth: 2,
      borderColor: Colors.onAccent,
      textAlign: 'center',
      textAlignVertical: 'center',
      marginRight: 5,
    },
    optionContainer: {
    },
  });

  // Checkbox component defined here
  const Checkbox = ({ label, options }) => {
    const handlePress = () => {
      setSelectedOptions(prevOptions => {
        if (prevOptions.includes(label)) {
            return prevOptions.filter(option => option !== label);
        } else {
            return [...prevOptions, label];
        }
      });
    };

    const isSelected = selectedOptions.includes(label);

    return (
      <View style={styles.optionContainer}>
        <Pressable style={styles.container} onPress={handlePress}>
          <MaterialIcons name={isSelected ? "check" : null} size={15} color={Colors.onAccent} style={[styles.checkbox, isSelected ? {borderColor: Colors.accent, backgroundColor: Colors.accent} : null]}/>
          <Text style={{color: Colors.text, fontSize: 15.3, fontFamily: 'Inter'}}>{label}</Text>
        </Pressable>
      </View> //This View might be unnecessary
    );
  };

  return (
    <View style={styles.checkboxSectionContainer}>
      <Text style={styles.header}>{props.question}</Text>
      {props.options.map((option, index) => (
        <Checkbox
          key={index}
          label={option}
          options={props.options}
        />
      ))}
    </View>
  );
}