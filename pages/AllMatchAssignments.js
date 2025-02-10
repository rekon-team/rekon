import React, { useState } from "react";
import Header from "../components/Header";
import BackgroundGradient from "../components/BackgroundGradient";
import MatchScoutView from "../components/MatchScoutView";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import { Dimensions, View, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

export default function AllMatchAssignments({ navigation }) {
    const { Lang } = useLang();
    const { Colors } = useColors();

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

    let indent = Dimensions.get('window').width * .075;
    
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
            <View style={{height: Dimensions.get('screen').height * .8, top: Dimensions.get('screen').height * .2}}>
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
        </View>
    );
}