import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../Colors';
import { useLang } from '../Lang';

export default function NumberPreview(props) {
  const { Colors } = useColors();
  const { Lang } = useLang();

  const [ answer, setAnswer ] = useState(null);

  const editAnswer = (input) => {
    const newAnswer = input.replace(/[^0-9]/g, '');
    setAnswer(newAnswer);

  }

  const styles = StyleSheet.create({
    numberSectionContainer: {
      //flexDirection: 'row',
      margin: 10,
      marginTop: 5,
    },
    numberAnswer: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: Colors.textDim,
      //marginTop: 10,
      marginHorizontal: 10,
      fontSize: 16,
      color: Colors.text,
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
        <Text style={styles.header}>{props.question}</Text>
        <View style={{ flexDirection: 'row', flex: 1, marginBottom: 10, }}>
            <TextInput
              value={answer}
              style={styles.numberAnswer}
              placeholder='Answer'
              placeholderTextColor={Colors.textDim}
              onChangeText={editAnswer}
              inputMode='numeric'
            />
        </View>
    </View>
    );
}
