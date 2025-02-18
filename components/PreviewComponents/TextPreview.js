import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../Colors';
import { useLang } from '../Lang';

export default function TextPreview(props) {
  const { Colors } = useColors();
  const { Lang } = useLang();

  const styles = StyleSheet.create({
    textSectionContainer: {
      //flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
      marginTop: 5
    },
    textAnswer: {
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
      fontSize: 20,
      color: Colors.text,
      fontFamily: 'Inter',
    },
  
  });

  return (
    <View style={styles.textSectionContainer}>
        <Text style={styles.header}>{props.question}</Text>
        <View style={{flexDirection: 'row', flex: 1, marginBottom: 10}}>
            <TextInput
              style={styles.textAnswer}
              placeholder='Answer'
              placeholderTextColor={Colors.textDim}
            />
        </View>
    </View>
    );
}
