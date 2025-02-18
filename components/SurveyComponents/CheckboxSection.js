import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../Colors';
import { useLang } from '../Lang';

export default function CheckboxSection(props) {
  const { Colors } = useColors();
  const { Lang } = useLang();

  const [editIndex, setEditIndex] = useState(null);

  const handleAddOption = () => {
    let optionNumber = props.options.length + 1;
    let newOption = `Option ${optionNumber}`;

    while (props.options.includes(newOption)) {
      optionNumber++;
      newOption = `Option ${optionNumber}`;
    }

    props.onUpdateOptions([...props.options, newOption]);
  };

  const handleDeleteOption = (optionToDelete) => {
    const newOptions = props.options.filter(option => option !== optionToDelete);
    props.onUpdateOptions(newOptions);
  };

  const handleEditOption = (index, newText) => {
    const newOptions = [...props.options];
    newOptions[index] = newText;
    props.onUpdateOptions(newOptions);
    setEditIndex(null);
  };

  // Styles for checkboxSection and checkbox components
  const styles = StyleSheet.create({
    text: {
      color: Colors.text,
      fontFamily: 'Inter',
    },
    checkboxSectionContainer: {
      margin: 10,
    },
    checkboxQuestion: {
      backgroundColor: Colors.secondaryBright,
      borderWidth: 2,
      borderColor: Colors.text,
      padding: 10,
      fontSize: 20,
      borderRadius: 10,
      marginRight: 5,
      marginBottom: 10,
      color: Colors.text,
      fontFamily: 'Inter',
    },
    pressables: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.text,
      marginTop: 5
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
    },
    checkbox: {
      height: 20,
      width: 20,
      borderRadius: 3,
      borderWidth: 2,
      borderColor: Colors.text,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 5,
    },
    textInput: {
      fontSize: 16,
      flex: 1,
      color: Colors.text,
      fontFamily: 'Inter',
    },
    deleteOption: {
      borderWidth: 2,
    },
    warning: {
      color: Colors.error,
      marginHorizontal: 5,
      fontFamily: 'Inter',
    },
    optionContainer: {
      paddingBottom: 10,
    },
  });

  // Checkbox component defined here
  const Checkbox = ({ label, onDelete, onEdit, options }) => {
    const [editText, setEditText] = useState(label);
    const [isDuplicate, setIsDuplicate] = useState(false);

    const handleEdit = () => {
      if (editText === label) {
        onEdit(editText);
        setIsDuplicate(false);
        return
      }

      if (!options.includes(editText)) {
        onEdit(editText);
        setIsDuplicate(false);
      } else {
        console.log('Option already exists');
        setEditText(label); //reset the text input to the original label
        setIsDuplicate(true);
      }
    };

    return (
      <View style={styles.optionContainer}>
        <View style={styles.container}>
          <View style={styles.checkbox} />
          <TextInput
            value={editText}
            onChangeText={setEditText}
            onEndEditing={handleEdit}
            style={styles.textInput}
          />
          <MaterialIcons name="close" size={30} color={Colors.error} onPress={onDelete} />
        </View>
          {isDuplicate && <Text style={styles.warning}>Duplicate cannot exist!</Text>}
      </View>
    );
  };

  return (
    <View style={styles.checkboxSectionContainer}>
      <Text style={styles.header}>Checkbox Section</Text>
      <TextInput
        placeholder="Question"
        value={props.question}
        onChangeText={props.onChangeQuestion}
        style={styles.checkboxQuestion}
        placeholderTextColor={Colors.text}
      />
      {props.options.map((option, index) => (
        <Checkbox
          key={index}
          label={option}
          onDelete={() => handleDeleteOption(option)}
          onEdit={(newText) => handleEditOption(index, newText)}
          options={props.options}
        />
      ))}
      <Pressable style={styles.pressables} onPress={handleAddOption}>
        <Text style={[styles.text, {fontSize: 15}]}>Add Option</Text>
      </Pressable>
      <Pressable style={[styles.pressables, {borderColor: Colors.error}]} onPress={props.onDelete}>
        <Text style={[styles.text, {color: Colors.error, fontSize: 15}]}>Delete</Text>
      </Pressable>
    </View>
  );
}