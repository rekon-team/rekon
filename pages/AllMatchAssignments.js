import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import MatchScoutView from "../components/MatchScoutView";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import { Dimensions, View, Text, Pressable, Modal } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import {Picker} from '@react-native-picker/picker';


export default function AllMatchAssignments({ navigation }) {
    const { Lang } = useLang();
    const { Colors } = useColors();

    let verticalIndent = Dimensions.get("window").height * 0.1;

    const [matches, setMatches] = useState(['Qual #1', 'Qual #2', 'Qual #3', 'Qual #4', 'Qual #5', 'Qual #6', 'Qual #7', 'Qual #8', 'Qual #9', 'Quals #10', 'Quals #11', 'Quals #12', 'Quals #13', 'Quals #14', 'Quals #15']);
    const [openedMatches, setOpenedMatches] = useState(['Qual #1']);
    const [scouts, setScouts] = useState([{"blueMatchScouts":[{"team":"6513","name":"Scout 1"},{"team":"3802","name":"Scout 2"},{"team":"956","name":"Scout 3"}],"redMatchScouts":[{"team":"4629","name":"Scout 4"},{"team":"2801","name":"Scout 5"},{"team":"4303","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"5078","name":"Scout 1"},{"team":"8548","name":"Scout 2"},{"team":"1944","name":"Scout 3"}],"redMatchScouts":[{"team":"2893","name":"Scout 4"},{"team":"1390","name":"Scout 5"},{"team":"8186","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"8303","name":"Scout 1"},{"team":"5976","name":"Scout 2"},{"team":"6658","name":"Scout 3"}],"redMatchScouts":[{"team":"9839","name":"Scout 4"},{"team":"2225","name":"Scout 5"},{"team":"6187","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"2194","name":"Scout 1"},{"team":"5553","name":"Scout 2"},{"team":"1741","name":"Scout 3"}],"redMatchScouts":[{"team":"9255","name":"Scout 4"},{"team":"4876","name":"Scout 5"},{"team":"3952","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"1440","name":"Scout 1"},{"team":"1637","name":"Scout 2"},{"team":"2923","name":"Scout 3"}],"redMatchScouts":[{"team":"9844","name":"Scout 4"},{"team":"9553","name":"Scout 5"},{"team":"9775","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"9452","name":"Scout 1"},{"team":"4646","name":"Scout 2"},{"team":"9420","name":"Scout 3"}],"redMatchScouts":[{"team":"230","name":"Scout 4"},{"team":"4224","name":"Scout 5"},{"team":"4801","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"8505","name":"Scout 1"},{"team":"9870","name":"Scout 2"},{"team":"867","name":"Scout 3"}],"redMatchScouts":[{"team":"5318","name":"Scout 4"},{"team":"5832","name":"Scout 5"},{"team":"9213","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"3263","name":"Scout 1"},{"team":"6504","name":"Scout 2"},{"team":"7241","name":"Scout 3"}],"redMatchScouts":[{"team":"5751","name":"Scout 4"},{"team":"1503","name":"Scout 5"},{"team":"5035","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"3288","name":"Scout 1"},{"team":"8198","name":"Scout 2"},{"team":"9627","name":"Scout 3"}],"redMatchScouts":[{"team":"9757","name":"Scout 4"},{"team":"2712","name":"Scout 5"},{"team":"7146","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"5797","name":"Scout 1"},{"team":"34","name":"Scout 2"},{"team":"3198","name":"Scout 3"}],"redMatchScouts":[{"team":"1332","name":"Scout 4"},{"team":"889","name":"Scout 5"},{"team":"6075","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"3013","name":"Scout 1"},{"team":"1989","name":"Scout 2"},{"team":"5604","name":"Scout 3"}],"redMatchScouts":[{"team":"2037","name":"Scout 4"},{"team":"6207","name":"Scout 5"},{"team":"4869","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"6875","name":"Scout 1"},{"team":"5822","name":"Scout 2"},{"team":"7617","name":"Scout 3"}],"redMatchScouts":[{"team":"3031","name":"Scout 4"},{"team":"1074","name":"Scout 5"},{"team":"1251","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"4101","name":"Scout 1"},{"team":"725","name":"Scout 2"},{"team":"6660","name":"Scout 3"}],"redMatchScouts":[{"team":"940","name":"Scout 4"},{"team":"4016","name":"Scout 5"},{"team":"8597","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"5631","name":"Scout 1"},{"team":"1113","name":"Scout 2"},{"team":"1380","name":"Scout 3"}],"redMatchScouts":[{"team":"2501","name":"Scout 4"},{"team":"3146","name":"Scout 5"},{"team":"6967","name":"Scout 6"}]},
    {"blueMatchScouts":[{"team":"4459","name":"Scout 1"},{"team":"8833","name":"Scout 2"},{"team":"5254","name":"Scout 3"}],"redMatchScouts":[{"team":"2143","name":"Scout 4"},{"team":"816","name":"Scout 5"},{"team":"1953","name":"Scout 6"}]}]);
    
    const [viewScouts, setViewScouts] = useState(false);
    const [matchOpen, setMatchOpen] = useState(false);
    const [match, setMatch] = useState('Qual #1');
    const [team, setTeam] = useState('6513');
    const [teamOpen, setTeamOpen] = useState(false);
    const [scout, setScout] = useState('Scout 1');
    const [scoutOpen, setScoutOpen] = useState(false);
    
    let indent = Dimensions.get('window').width * .075;
    
    const uniqueScouts = new Set();
    const uniqueTeams = new Set();

    const [selectedMatch, setSelectedMatch] = useState(scouts[0]);
    const [selectedTeam, setSelectedTeam] = useState(scouts[0].blueMatchScouts[0].team);
    const [selectedScout, setSelectedScout] = useState(scouts[0].blueMatchScouts[0].name);

    const updateScoutList = () => {
        /* This is where the functionality for updating the scouts array should go. Good luck! */
    };

    
    const styles = {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: Colors.primary,
            width: "100%",
            height: "100%",
        },
        text: {
            fontFamily: 'Inter',
            color: Colors.text,
            textAlign: 'center',
        },
        matchContainer: {
            width: Dimensions.get('window').width - (indent * 2),
            height: Dimensions.get('window').height / 14,
            backgroundColor: Colors.secondary,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: 'center',
            flexDirection: 'row'
        },
        openedMatchViewContainer: {
            height: (Dimensions.get('window').width * .1 * 6.5) + 20,
            backgroundColor: Colors.tabSelected,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
        }
    }

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header backButton={true} title={Lang.match_assignments.title} navigation={navigation} />
            <View style={{height: Dimensions.get('screen').height * .6, top: Dimensions.get('screen').height * .2}}>
                <ScrollView>
                    <View style={{gap: 10}}>
                        {matches.map((match, index) => {
                            return (
                                <View key={index}>
                                    <Pressable style={[styles.matchContainer, {borderRadius: openedMatches.indexOf(match) >= 0 ? 0 : 10}]} onPress={() => {
                                        if (openedMatches.indexOf(match) >= 0) {
                                            setOpenedMatches(openedMatches.filter((openedMatch) => openedMatch != match));
                                        } else {
                                            setOpenedMatches([...openedMatches, match]);
                                        }
                                    
                                    }}>
                                        <View style={{width: '15%'}} />
                                        
                                        <View style={{width: '70%'}}>
                                            <Text style={[styles.text, {fontSize: 20}]}>{match}</Text>
                                        </View>

                                        <View style={{width: '15%'}}>
                                            <MaterialIcons name={openedMatches.indexOf(match) >= 0 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={34} style={{color: Colors.text, }} />
                                        </View>
                                    </Pressable>

                                    {openedMatches.indexOf(match) >= 0 && 
                                        <View style={styles.openedMatchViewContainer}>
                                            <View style={{top: 10}}>
                                                <MatchScoutView scouts={scouts} current_match={index} />
                                            </View>
                                        </View>
                                    }
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>

            <Pressable style={{height: indent * 2, width: Dimensions.get('screen').width * 0.85, borderRadius: indent * 1 / 2, backgroundColor: Colors.accent, position: 'absolute', bottom: indent, justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                setViewScouts(true)
            }}>

                <Text style={[styles.text, {fontSize: indent / 1.5}]}>{Lang.match_assignments.edit_assignments}</Text>
            
            </Pressable>

            {viewScouts && (
                <Modal
                    transparent={true}
                    visible={viewScouts}
                    onRequestClose={() => setViewScouts(false)}
                >

                    <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', height: Dimensions.get('window').height, width: Dimensions.get('window').width, zIndex: 1, rgba: 'rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <View style={{marginTop: indent, height: Dimensions.get('window').height * .8, width: Dimensions.get('window').width * .9, backgroundColor: Colors.secondary, borderRadius: 20, zIndex: 2, elevation: 100}}>
                            <Pressable style={{position: 'absolute', right: 0, top: 0, padding: 10, elevation: 5, }} onPress={() => setViewScouts(false)}>
                                <MaterialIcons name='close' size={indent} color={Colors.text} />
                            </Pressable>

                            <View style={{marginTop: indent * 3 , height: indent * 2, width: Dimensions.get('window').width * .7, backgroundColor: Colors.accent, borderRadius: 7.5, marginLeft: indent*1.3}}>
                                <Picker
                                selectedValue={match}
                                onValueChange={(itemValue, itemIndex) =>
                                    setMatch(itemValue)
                                }>
                                    {matches.map((match, index) => {
                                        return (
                                            <Picker.Item label={matches[index]} value={match} key={index}/>
                                        )
                                    })}
                                </Picker>

                                
                            </View>

                            <View style={{marginTop: indent * 3 , height: indent * 2, width: Dimensions.get('window').width * .7, backgroundColor: Colors.accent, borderRadius: 7.5, marginLeft: indent*1.3}}>
                                <Picker
                                selectedValue={team}
                                onValueChange={(itemValue, itemIndex) =>
                                    setTeam(itemValue)
                                }>
                                    {scouts.flatMap((scout, rowIndex) => 
                                        scout.blueMatchScouts.concat(scout.redMatchScouts).filter((matchScout) => {
                                            if (!uniqueTeams.has(matchScout.team)) {
                                                uniqueTeams.add(matchScout.team);
                                                return true;
                                            }
                                            return false
                                        }).map((matchScout, colIndex) => (
                                            <Picker.Item label={matchScout.team} value={matchScout.team} key={`${rowIndex}-${colIndex}`} />
                                        ))
                                    )}
                                </Picker>
                            </View>

                            <View style={{marginTop: indent * 3 , height: indent * 2, width: Dimensions.get('window').width * .7, backgroundColor: Colors.accent, borderRadius: 7.5, marginLeft: indent*1.3}}>
                                <Picker
                                    selectedValue={scout}
                                    onValueChange={(itemValue, itemIndex) => setScout(itemValue)}
                                >
                                    {scouts.flatMap((scout, rowIndex) => 
                                        scout.blueMatchScouts.filter((blueScout) => {
                                            if (!uniqueScouts.has(blueScout.name)) {
                                                uniqueScouts.add(blueScout.name);
                                                return true;
                                            }
                                            return false;
                                        }).map((blueScout, colIndex) => (
                                            <Picker.Item label={blueScout.name} value={blueScout.name} key={`${rowIndex}-${colIndex}`} />
                                        ))
                                    )}
                                </Picker>
                            </View>

                            <View>
                                <Pressable
                                    style={{marginTop: indent * 3 , height: indent * 2, width: Dimensions.get('window').width * .7, backgroundColor: Colors.accent, borderRadius: 7.5, marginLeft: indent*1.3, justifyContent: 'center', alignItems: 'center'}}
                                    onPress={updateScoutList}
                                >
                                    <Text style={[styles.text, {fontSize: indent / 1.5}]}>{Lang.match_assignments.confirm_assignment}</Text>
                                </Pressable>
                            </View>


                        
                            
                        </View>

                        

                    </View>
                    
                </Modal>
                
            )}

            
        </View>
    );
}