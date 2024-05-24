import React, { useState } from 'react';
import { View, Text, Dimensions, Pressable, ScrollView } from 'react-native';

import Header from '../components/Header';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLang } from '../components/Lang';
import { useColors } from '../components/Colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function AdminHomeMatch() {
    const { Lang } = useLang();
    const { Colors } = useColors();

    const [blueMatchScouts, setBlueMatchScouts] = useState([{name: 'Scout 1', team: '8234'}, {name: 'Scout 2', team: '2052'}, {name: 'Scout 3', team: '118'}]);
    const [redMatchScouts, setRedMatchScouts] = useState([{name: 'Scout 4', team: '254'}, {name: 'Scout 5', team: '359'}, {name: 'Scout 6', team: '8033'}]);
    const [blueSubjectiveScouts, setBlueSubjectiveScouts] = useState([{name: 'Scout 7'}]);
    const [redSubjectiveScouts, setRedSubjectiveScouts] = useState([{name: 'Scout 8'}]);
    const [matches, setMatches] = useState(['Quals 1', 'Quals 2', 'Quals 3', 'Quals 4', 'Quals 5']);
    
    let current_match = 0;
    let indent = Dimensions.get('window').width * .1;
    console.log(`indent: ${indent}`);

    const styles = {
        container: {
            flex: 1,
            backgroundColor: Colors.primary,
            width: "100%",
            height: "100%",
        },
        text: {
            fontFamily: 'Inter',
            color: Colors.text
        },
        switchViewButton: {
            width: (Dimensions.get('window').width / 2 ) - (indent) - (indent / 4),
            height: 1.25 * indent, //test was 50 and indent was 41.2, so 50 / 41.2 ~= 1.25
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            left: indent
        },
        scoutContainer: {
            width: (Dimensions.get('window').width / 2) - (indent) - (indent / 4), //same as indent * 3.75
            height: indent * (1 + blueMatchScouts.length),
            borderRadius: 10,
        },
        subjectiveScoutContainer: {
            width: (Dimensions.get('window').width / 2) - (indent) - (indent / 4), //same as indent * 3.75
            height: indent * 2,
            borderRadius: 10,
            alignItems: 'center',
        },
        matches: {
            width: indent * 3.75,
            height: indent * 2,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.secondary
        }
    }

    return (
        <View style={styles.container}>
            <BackgroundGradient/>
            <Header title={Lang.admin_home_match.title} backButton={false} hamburgerButton={true}/>

            <View style={{height: Dimensions.get('window').height - 60, top: 60}}>
            <ScrollView>
                <Text style={[styles.text, {fontSize: indent / 2, top: 15, left: indent}]}>{Lang.admin_home_match.scouting_overview}</Text>

                <View style={{flexDirection: 'row', top: 15, gap: indent / 2}}>
                    <Pressable style={[styles.switchViewButton, {backgroundColor: Colors.accent}]}>
                        <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.admin_home_match.match}</Text>
                    </Pressable>

                    <Pressable style={[styles.switchViewButton, {backgroundColor: Colors.secondary}]}>
                        <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.admin_home_match.pit}</Text>
                    </Pressable>
                </View>

                <View style={{alignItems: 'center', top: indent, height: indent * 12/*(4 + (blueMatchScouts.length >= redMatchScouts.length ? blueMatchScouts.length : redMatchScouts.length) + (indent * 1.5))*/}}>
                    <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.admin_home_match.current_match}</Text>

                    <View style={{flexDirection: 'row', gap: indent / 2}}>
                        <View style={[styles.scoutContainer, {backgroundColor: Colors.blueAlliance}]}>
                            <View style={{top: indent / 4, flexDirection: 'row'}}>
                                <View style={{width: indent * 3.75 / 2, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[styles.text, {fontSize: indent * .4}]}>{Lang.admin_home_match.scout}</Text>
                                </View>

                                <View style={{width: indent * 3.75 / 2, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[styles.text, {fontSize: indent * .4}]}>{Lang.admin_home_match.team}</Text>
                                </View>
                            </View>
                            {blueMatchScouts.map((scout, index) => (
                                <View key={index} style={{flexDirection: 'row'}}>
                                    <View style={{width: indent * 3.75 / 2, marginTop: indent / 4, alignItems: 'center', justifyContent: 'center'}}>
                                        <MaterialIcons name="person" size={indent * 3.75 / 5} color={Colors.text}/>
                                    </View>

                                    <View style={{marginTop: indent / 4, alignItems: 'center', justifyContent: 'center', width: indent * 3.75 / 2}}>
                                        <Text style={[styles.text, {fontSize: indent * .5}]}>{scout.team}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={[styles.scoutContainer, {backgroundColor: Colors.redAlliance}]}>
                            <View style={{top: indent / 4, flexDirection: 'row'}}>
                                <View style={{width: indent * 3.75 / 2, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[styles.text, {fontSize: indent * .4}]}>{Lang.admin_home_match.scout}</Text>
                                </View>

                                <View style={{width: indent * 3.75 / 2, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[styles.text, {fontSize: indent * .4}]}>{Lang.admin_home_match.team}</Text>
                                </View>
                            </View>
                            {redMatchScouts.map((scout, index) => (
                                <View key={index} style={{flexDirection: 'row'}}>
                                    <View style={{width: indent * 3.75 / 2, marginTop: indent / 4, alignItems: 'center', justifyContent: 'center'}}>
                                        <MaterialIcons name="person" size={indent * 3.75 / 5} color={Colors.text}/>
                                    </View>

                                    <View style={{marginTop: indent / 4, alignItems: 'center', justifyContent: 'center', width: indent * 3.75 / 2}}>
                                        <Text style={[styles.text, {fontSize: indent * .5}]}>{scout.team}</Text>
                                    </View>
                                </View>
                            ))} 
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', gap: indent / 2, marginTop: indent / 2}}>
                        <View style={[styles.subjectiveScoutContainer, {backgroundColor: Colors.blueAlliance}]}>
                            <Text style={[styles.text, {fontSize: indent * .4}]}>{Lang.admin_home_match.subjective}</Text>

                            <View style={{height: indent * 1.4, justifyContent: 'center'}}>
                                <MaterialIcons name="person" size={indent * 3.75 / 5} color={Colors.text}/>
                            </View>
                        </View>

                        <View style={[styles.subjectiveScoutContainer, {backgroundColor: Colors.redAlliance}]}>
                            <Text style={[styles.text, {fontSize: indent * .4}]}>{Lang.admin_home_match.subjective}</Text>

                            <View style={{height: indent * 1.4, justifyContent: 'center'}}>
                                <MaterialIcons name="person" size={indent * 3.75 / 5} color={Colors.text}/>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{width: '100%', top: indent / 4}}>
                        <Text style={[styles.text, {fontSize: indent / 2, textAlign: 'left', left: indent}]}>{Lang.admin_home_match.matches}</Text>
                    </View>

                    <View style={{height: indent * 2}}>
                        <ScrollView horizontal={true} style={{width: Dimensions.get('window').width - indent, top: indent / 4, left: indent / 2}}>
                            <View style={{gap: indent / 2, flexDirection: 'row'}}>
                                {matches.map((match, index) => (
                                    (index > current_match) && (current_match + 4 > index) && (
                                        <Pressable key={index} style={styles.matches}>
                                            <Text style={[styles.text, {fontSize: indent * 0.75}]}>{match}</Text>
                                        </Pressable>
                                    )
                                ))}

                                <Pressable style={styles.matches}>
                                    <Text style={[styles.text, {fontSize: indent * 0.75}]}>{Lang.admin_home_match.show_all}</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            </View>
        </View>
    );
}