import React from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColors } from '../Colors';
import { useLang } from '../Lang';

export default function PictureSection(props) {
    const { Colors } = useColors();
    const { Lang } = useLang();

    const styles = StyleSheet.create({
        pictureSectionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
        },
        header: {
            fontSize: 20,
            marginBottom: 10,
            color: Colors.text,
            fontFamily: 'Inter',
        },
        pictureQuestion: {
            backgroundColor: Colors.secondaryBright,
            padding: 10,
            fontSize: 20,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: Colors.text,
            marginRight: 5,
            fontFamily: 'Inter',
            color: Colors.text,
        },
        pictureBox: {
            backgroundColor: Colors.text,
            borderWidth: 1,
            height: 100,
            marginTop: 10,
            borderRadius: 10,
            marginRight: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        cameraIcon: {
            height: 50,
            width: 50,
            backgroundColor: 'gray',
            alignSelf: 'center',
            padding: 5,
            fontFamily: 'Inter',
        }
    });

    return (
        <View style={styles.pictureSectionContainer}>
            <View style={{flexdirection: 'column', flex: 1 }}>
                <Text style={styles.header}>Picture Section</Text>
                <TextInput
                    placeholder='Question'
                    value={props.question}
                    onChangeText={props.onChangeQuestion}
                    style={styles.pictureQuestion}
                    placeholderTextColor={Colors.text}
                />
                <View style={styles.pictureBox}>
                    <Text style={styles.cameraIcon}>Photo Here</Text>
                </View>
            </View>
            <MaterialIcons name="delete" size={30} color={Colors.error} onPress={props.onDelete}/>
        </View>
    );
}