import React, { useState } from 'react';
import { View, Text, Dimensions, Pressable, ScrollView, Modal } from 'react-native';

import Header from '../components/Header';
import BackgroundGradient from '../components/BackgroundGradient';
import MatchScoutView from '../components/MatchScoutView';
import { useLang } from '../components/Lang';
import { useColors } from '../components/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function AdminHomeMatch({ navigation }) {
    const { Lang } = useLang();
    const { Colors } = useColors();

    //const [scouts, setScouts] = useState([{blueMatchScouts: [{name: 'Scout 1', team: '8234'}, {name: 'Scout 2', team: '2052'}, {name: 'Scout 3', team: '118'}], redMatchScouts: [{name: 'Scout 4', team: '254'}, {name: 'Scout 5', team: '359'}, {name: 'Scout 6', team: '8033'}]}, {blueMatchScouts: [{name: 'Scout 7', team: '254'}, {name: 'Scout 8', team: '359'}, {name: 'Scout 9', team: '8033'}], redMatchScouts: [{name: 'Scout 10', team: '254'}, {name: 'Scout 11', team: '359'}, {name: 'Scout 12', team: '8033'}]}]);
    const [scouts, setScouts] = useState([{ "blueMatchScouts": [{ "team": "6513", "name": "Scout 1" }, { "team": "3802", "name": "Scout 2" }, { "team": "956", "name": "Scout 3" }], "redMatchScouts": [{ "team": "4629", "name": "Scout 4" }, { "team": "2801", "name": "Scout 5" }, { "team": "4303", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "5078", "name": "Scout 1" }, { "team": "8548", "name": "Scout 2" }, { "team": "1944", "name": "Scout 3" }], "redMatchScouts": [{ "team": "2893", "name": "Scout 4" }, { "team": "1390", "name": "Scout 5" }, { "team": "8186", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "8303", "name": "Scout 1" }, { "team": "5976", "name": "Scout 2" }, { "team": "6658", "name": "Scout 3" }], "redMatchScouts": [{ "team": "9839", "name": "Scout 4" }, { "team": "2225", "name": "Scout 5" }, { "team": "6187", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "2194", "name": "Scout 1" }, { "team": "5553", "name": "Scout 2" }, { "team": "1741", "name": "Scout 3" }], "redMatchScouts": [{ "team": "9255", "name": "Scout 4" }, { "team": "4876", "name": "Scout 5" }, { "team": "3952", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "1440", "name": "Scout 1" }, { "team": "1637", "name": "Scout 2" }, { "team": "2923", "name": "Scout 3" }], "redMatchScouts": [{ "team": "9844", "name": "Scout 4" }, { "team": "9553", "name": "Scout 5" }, { "team": "9775", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "9452", "name": "Scout 1" }, { "team": "4646", "name": "Scout 2" }, { "team": "9420", "name": "Scout 3" }], "redMatchScouts": [{ "team": "230", "name": "Scout 4" }, { "team": "4224", "name": "Scout 5" }, { "team": "4801", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "8505", "name": "Scout 1" }, { "team": "9870", "name": "Scout 2" }, { "team": "867", "name": "Scout 3" }], "redMatchScouts": [{ "team": "5318", "name": "Scout 4" }, { "team": "5832", "name": "Scout 5" }, { "team": "9213", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "3263", "name": "Scout 1" }, { "team": "6504", "name": "Scout 2" }, { "team": "7241", "name": "Scout 3" }], "redMatchScouts": [{ "team": "5751", "name": "Scout 4" }, { "team": "1503", "name": "Scout 5" }, { "team": "5035", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "3288", "name": "Scout 1" }, { "team": "8198", "name": "Scout 2" }, { "team": "9627", "name": "Scout 3" }], "redMatchScouts": [{ "team": "9757", "name": "Scout 4" }, { "team": "2712", "name": "Scout 5" }, { "team": "7146", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "5797", "name": "Scout 1" }, { "team": "34", "name": "Scout 2" }, { "team": "3198", "name": "Scout 3" }], "redMatchScouts": [{ "team": "1332", "name": "Scout 4" }, { "team": "889", "name": "Scout 5" }, { "team": "6075", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "3013", "name": "Scout 1" }, { "team": "1989", "name": "Scout 2" }, { "team": "5604", "name": "Scout 3" }], "redMatchScouts": [{ "team": "2037", "name": "Scout 4" }, { "team": "6207", "name": "Scout 5" }, { "team": "4869", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "6875", "name": "Scout 1" }, { "team": "5822", "name": "Scout 2" }, { "team": "7617", "name": "Scout 3" }], "redMatchScouts": [{ "team": "3031", "name": "Scout 4" }, { "team": "1074", "name": "Scout 5" }, { "team": "1251", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "4101", "name": "Scout 1" }, { "team": "725", "name": "Scout 2" }, { "team": "6660", "name": "Scout 3" }], "redMatchScouts": [{ "team": "940", "name": "Scout 4" }, { "team": "4016", "name": "Scout 5" }, { "team": "8597", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "5631", "name": "Scout 1" }, { "team": "1113", "name": "Scout 2" }, { "team": "1380", "name": "Scout 3" }], "redMatchScouts": [{ "team": "2501", "name": "Scout 4" }, { "team": "3146", "name": "Scout 5" }, { "team": "6967", "name": "Scout 6" }] },
    { "blueMatchScouts": [{ "team": "4459", "name": "Scout 1" }, { "team": "8833", "name": "Scout 2" }, { "team": "5254", "name": "Scout 3" }], "redMatchScouts": [{ "team": "2143", "name": "Scout 4" }, { "team": "816", "name": "Scout 5" }, { "team": "1953", "name": "Scout 6" }] }]);

    /*const [blueMatchScouts, setBlueMatchScouts] = useState([{name: 'Scout 1', team: '8234'}, {name: 'Scout 2', team: '2052'}, {name: 'Scout 3', team: '118'}]);
    const [redMatchScouts, setRedMatchScouts] = useState([{name: 'Scout 4', team: '254'}, {name: 'Scout 5', team: '359'}, {name: 'Scout 6', team: '8033'}]);*/
    const [blueSubjectiveScouts, setBlueSubjectiveScouts] = useState([{ name: 'Scout 7' }]);
    const [redSubjectiveScouts, setRedSubjectiveScouts] = useState([{ name: 'Scout 8' }]);
    const [matches, setMatches] = useState(['Qual #1', 'Qual #2', 'Qual #3', 'Qual #4', 'Qual #5']);
    const [viewMatch, setViewMatch] = useState(-1);

    let current_match = 0;
    let blueMatchScouts = scouts[current_match].blueMatchScouts;
    let redMatchScouts = scouts[current_match].redMatchScouts;
    let indent = Dimensions.get('window').width * .1;

    const styles = {
        container: {
            flex: 1,
            backgroundColor: Colors.primary,
            width: "100%",
            height: "100%",
            paddingTop: 40/Dimensions.get("window").fontScale,
        },
        text: {
            fontFamily: 'Inter',
            color: Colors.text
        },
        switchViewButton: {
            width: (Dimensions.get('window').width / 2) - (indent) - (indent / 4),
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
            <BackgroundGradient />
            <Header title={Lang.admin_home_match.title} backButton={false} hamburgerButton={true} />

            <View style={{height: Dimensions.get('window').height - 60, top: getStatusBarHeight() + 60}}>
            <ScrollView>
                <Text style={[styles.text, {fontSize: indent / 2, top: 15, left: indent}]}>{Lang.admin_home_match.scouting_overview}</Text>

                <View style={{flexDirection: 'row', top: 15, gap: indent / 2}}>
                    <View style={[styles.switchViewButton, {backgroundColor: Colors.accent}]}>
                        <Text style={[styles.onAccent, {fontSize: indent / 2}]}>{Lang.admin_home_match.match}</Text>
                    </View>

                        <Pressable style={[styles.switchViewButton, { backgroundColor: Colors.secondary }]} onPress={() => navigation.navigate('AdminHomePit')}>
                            <Text style={[styles.text, { fontSize: indent / 2 }]}>{Lang.admin_home_match.pit}</Text>
                        </Pressable>
                    </View>

                    <View style={{ alignItems: 'center', top: indent, height: indent * 12/*(4 + (blueMatchScouts.length >= redMatchScouts.length ? blueMatchScouts.length : redMatchScouts.length) + (indent * 1.5))*/ }}>
                        <Text style={[styles.text, { fontSize: indent / 2 }]}>{`${Lang.admin_home_match.current_match}${matches[current_match]}`}</Text>

                        <View style={{ flexDirection: 'row', gap: indent / 2 }}>
                            <View style={[styles.scoutContainer, { backgroundColor: Colors.blueAlliance }]}>
                                <View style={{ top: indent / 4, flexDirection: 'row' }}>
                                    <View style={{ width: indent * 3.75 / 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { fontSize: indent * .4 }]}>{Lang.admin_home_match.scout}</Text>
                                    </View>

                                    <View style={{ width: indent * 3.75 / 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { fontSize: indent * .4 }]}>{Lang.admin_home_match.team}</Text>
                                    </View>
                                </View>
                                {blueMatchScouts.map((scout, index) => (
                                    <View key={index} style={{ flexDirection: 'row' }}>
                                        <View style={{ width: indent * 3.75 / 2, marginTop: indent / 4, alignItems: 'center', justifyContent: 'center' }}>
                                            <MaterialIcons name="person" size={indent * 3.75 / 5} color={Colors.text} />
                                        </View>

                                        <View style={{ marginTop: indent / 4, alignItems: 'center', justifyContent: 'center', width: indent * 3.75 / 2 }}>
                                            <Text style={[styles.text, { fontSize: indent * .5 }]}>{scout.team}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>

                            <View style={[styles.scoutContainer, { backgroundColor: Colors.redAlliance }]}>
                                <View style={{ top: indent / 4, flexDirection: 'row' }}>
                                    <View style={{ width: indent * 3.75 / 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { fontSize: indent * .4 }]}>{Lang.admin_home_match.scout}</Text>
                                    </View>

                                    <View style={{ width: indent * 3.75 / 2, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={[styles.text, { fontSize: indent * .4 }]}>{Lang.admin_home_match.team}</Text>
                                    </View>
                                </View>
                                {redMatchScouts.map((scout, index) => (
                                    <View key={index} style={{ flexDirection: 'row' }}>
                                        <View style={{ width: indent * 3.75 / 2, marginTop: indent / 4, alignItems: 'center', justifyContent: 'center' }}>
                                            <MaterialIcons name="person" size={indent * 3.75 / 5} color={Colors.text} />
                                        </View>

                                        <View style={{ marginTop: indent / 4, alignItems: 'center', justifyContent: 'center', width: indent * 3.75 / 2 }}>
                                            <Text style={[styles.text, { fontSize: indent * .5 }]}>{scout.team}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', gap: indent / 2, marginTop: indent / 2 }}>
                            <View style={[styles.subjectiveScoutContainer, { backgroundColor: Colors.blueAlliance }]}>
                                <Text style={[styles.text, { fontSize: indent * .4 }]}>{Lang.admin_home_match.subjective}</Text>

                                <View style={{ height: indent * 1.4, justifyContent: 'center' }}>
                                    <MaterialIcons name="person" size={indent * 3.75 / 5} color={Colors.text} />
                                </View>
                            </View>

                            <View style={[styles.subjectiveScoutContainer, { backgroundColor: Colors.redAlliance }]}>
                                <Text style={[styles.text, { fontSize: indent * .4 }]}>{Lang.admin_home_match.subjective}</Text>

                                <View style={{ height: indent * 1.4, justifyContent: 'center' }}>
                                    <MaterialIcons name="person" size={indent * 3.75 / 5} color={Colors.text} />
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '100%', top: indent / 4 }}>
                            <Text style={[styles.text, { fontSize: indent / 2, textAlign: 'left', left: indent }]}>{Lang.admin_home_match.matches}</Text>
                        </View>

                        <View style={{ height: indent * 2 }}>
                            <ScrollView horizontal={true} style={{ width: Dimensions.get('window').width - indent, top: indent / 4, left: indent / 2 }}>
                                <View style={{ gap: indent / 2, flexDirection: 'row' }}>
                                    {matches.map((match, index) => (
                                        (index > current_match) && (current_match + 4 > index) && (
                                            <Pressable key={index} style={styles.matches} onPress={() => (setViewMatch(index))}>
                                                <Text style={[styles.text, { fontSize: indent * 0.75 }]}>{match}</Text>
                                            </Pressable>
                                        )
                                    ))}

                                    <Pressable style={styles.matches} onPress={() => { navigation.navigate('AllMatches') }}>
                                        <Text style={[styles.text, { fontSize: indent * 0.75 }]}>{Lang.admin_home_match.show_all}</Text>
                                    </Pressable>

                                    <View />
                                    {/* This to make the show all matches not be cut off by the edge of the screen */}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>

            {viewMatch >= 0 && (
                <Modal
                    transparent={true}
                    visible={viewMatch >= 0}
                    onRequestClose={() => {
                        setViewMatch(-1);
                    }}// I have no idea what this does but don't get rid of it just in case
                    onBackdropPress={() => { setViewMatch(-1) }}
                >
                    <Pressable style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onPress={() => { setViewMatch(-1) }} />
                    {/* This pressable allows you to close it by clicking on the edge of the modal. There probably is a better way to do this but oh well */}
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: indent * 9, height: indent * 9, backgroundColor: Colors.secondary, borderRadius: 10 }}>
                            <View style={{ height: indent * 2, flexDirection: 'row' }}>
                                <View style={{ width: '5%' }} />

                                <View style={{ width: '80%', justifyContent: 'center' }}>
                                    <Text style={[styles.text, { fontSize: indent }]}>{matches[viewMatch]}</Text>
                                </View>

                                <View style={{ width: '15%', justifyContent: 'center' }}>
                                    <Pressable style={{}} onPress={() => { setViewMatch(-1) }}>
                                        <MaterialIcons name="close" size={indent * 1.25} color={Colors.text} />
                                    </Pressable>
                                </View>
                            </View>

                            <MatchScoutView scouts={scouts} current_match={viewMatch} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}