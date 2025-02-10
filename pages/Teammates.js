import React, { useState } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';

import Header from '../components/Header';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLang } from '../components/Lang';
import { useColors } from '../components/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function Teammates({ navigation }) {
    const { Lang } = useLang();
    const { Colors } = useColors();

    const [scouts, setScouts] = useState([{name: 'Scout 1', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Scout 2', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Scout 3', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Scout 4', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Scout 5', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Scout 6', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Jonas Grill', assignedMatch: [], assignedPit: [], assignedObjective: []}]);
    const [admins, setAdmins] = useState([{name: 'Scout 1', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Scout 2', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Scout 3', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Scout 4', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Scout 5', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Scout 6', assignedMatch: [], assignedPit: [], assignedObjective: []}, {name: 'Jonas Grill', assignedMatch: [], assignedPit: [], assignedObjective: []}]);

    let indent = Dimensions.get('window').width * .1;
    let verticalIndent = Dimensions.get('window').height * .1;

    const styles = {
        container: {
            flex: 1,
            backgroundColor: Colors.primary,
            width: '100%',
            height: '100%',
        },
        text: {
            color: Colors.text,
            fontFamily: 'Inter',
        },
        scoutContainer: {
            width: '80%',
            height: verticalIndent * .75,
            borderRadius: 10,
            backgroundColor: Colors.secondary,
            marginBottom: indent / 2,
            left: indent,
            flexDirection: 'row',
            alignItems: 'center',
            gap: indent
        },
        addButton: {
            width: indent * 1.5,
            height: indent * 1.5,
            borderRadius: indent * .75,
            position: 'absolute',
            bottom: indent,
            //changed to indent * 3 from indent bc for some reason it was broken. check in with actual phone, not emulator
            //nvm just emulator being goofy
            right: indent,
            backgroundColor: Colors.accent,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header title={Lang.teammates.title} backButton={false} hamburgerButton={true} />

            <View style={{height: Dimensions.get('window').height * .9, top: Dimensions.get('window').height * .1}}>
                <ScrollView>
                    <View style={{height: Dimensions.get('window').height * .9}}>
                        <Text style={[styles.text, {fontSize: indent / 2, top: indent, left: indent}]}>{Lang.teammates.scouts}</Text>

                        <View style={{height: verticalIndent * 3.1, top: indent}}>
                            <ScrollView>
                                {scouts.map((scout, index) => (
                                    <Pressable style={styles.scoutContainer} key={index} onPress={() => navigation.navigate('AssignTeammates')}>
                                        <MaterialIcons name="person" size={indent * .75} color={Colors.text} style={{left: indent / 2}} />
                                        <Text style={[styles.text, {fontSize: indent / 2}]}>{scout.name}</Text>
                                        <MaterialIcons name="open-in-new" size={indent * .75} color={Colors.text} style={{left: indent * 2}} />
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>

                        <Text style={[styles.text, {fontSize: indent / 2, top: verticalIndent, left: indent}]}>{Lang.teammates.admins}</Text>

                        <View style={{height: verticalIndent * 3.1, top: Dimensions.get('window').height * .1}}>
                            <ScrollView>
                                {admins.map((admin, index) => (
                                    <Pressable style={styles.scoutContainer} key={index} onPress={() => navigation.navigate('AssignTeammates')}>
                                        <MaterialIcons name="person" size={indent * .75} color={Colors.text} style={{left: indent / 2}} />
                                        <Text style={[styles.text, {fontSize: indent / 2}]}>{admin.name}</Text>
                                        <MaterialIcons name="open-in-new" size={indent * .75} color={Colors.text} style={{left: indent * 2}} />
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Pressable style={styles.addButton}>
                    <MaterialIcons name="add" size={indent * 1.5} color={Colors.text} />
                </Pressable>
        </View>
    );
}