import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../Colors';
import { useLang } from '../Lang';

export default function NumberSection(props) {
  const { Colors } = useColors();
  const { Lang } = useLang();
  
  const styles = StyleSheet.create({
    numberSectionContainer: {
      //flexDirection: 'row',
      //alignItems: 'center',
      margin: 10,
    },
    numberQuestion: {
      backgroundColor: Colors.secondaryBright,
      padding: 10,
      fontSize: 20,
      borderWidth: 2,
      borderColor: Colors.text,
      borderRadius: 10,
      marginRight: 5,
      width: '100%',
      color: Colors.text,
      fontFamily: 'Inter',
    },
    numberAnswer: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: Colors.textDim,
      //marginTop: 10,
      marginHorizontal: 10,
      fontSize: 16,
      color: Colors.textDim,
      fontFamily: 'Inter',
    },
    header: {
      marginBottom: 10,
      fontSize: 20,
      color: Colors.text,
      fontFamily: 'Inter',
    }
  });

  return (
    <View style={styles.numberSectionContainer}>
      {/*<MaterialIcons name="drag-indicator" size={30} color="red" onPress={null} style={{marginBottom: 5, transform: [{ rotate: '90deg' }],}} />*/}
      <Text style={styles.header}>Number Section</Text>
      <TextInput
          placeholder="Question"
          value={props.question}
          onChangeText={props.onChangeQuestion}
          style={styles.numberQuestion}
          placeholderTextColor={Colors.text}
      />
      <View style={{ flexDirection: 'row', flex: 1, marginTop: 15, marginBottom: 10, }}>
        <Text style={styles.numberAnswer}>Number Answer</Text>
        <MaterialIcons  name="delete" size={30} color={Colors.error} onPress={props.onDelete} />
      </View>
    </View>
  );
}