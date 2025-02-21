import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Pressable, ScrollView, Modal } from 'react-native';
import PieChart from 'react-native-pie-chart';

import Header from '../components/Header';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLang } from '../components/Lang';
import { useColors } from '../components/Colors';
import { MaterialIcons } from '@expo/vector-icons'

export default function AdminHomePit({ navigation }) {
    const { Lang } = useLang();
    const { Colors } = useColors();

    let indent = Dimensions.get('window').width * .1;

    //This is just placeholder data
    const [teammates, setTeammates] = useState([
        {name: 'Jonas', teamsScouted: [8234, 2052, 118], teamsNotScouted: [254, 359, 8033]},
        {name: 'Jonas', teamsScouted: [8234, 2052, 118], teamsNotScouted: [254, 359, 8033, 2846]},
        {name: 'Jonas', teamsScouted: [8234, 2052, 118], teamsNotScouted: [254, 359, 8033, 5996]},
        {name: 'Jonas', teamsScouted: [8234, 2052, 118], teamsNotScouted: [254, 359, 8033, 3926]},
        {name: 'Jonas', teamsScouted: [8234, 2052, 118], teamsNotScouted: [254, 359, 8033, 2530]},
    ]);
    const [viewTeammate, setViewTeammate] = useState(-1);
    const [allTeamsScouted, setAllTeamsScouted] = useState(0);
    const [allTeamsNotScouted, setAllTeamsNotScouted] = useState(0);

    useEffect(() => {
        let allTeamsScouted = 0;
        let allTeamsNotScouted = 0;
        for (let i = 0; i < teammates.length; i++) {
            allTeamsScouted += teammates[i].teamsScouted.length;
            allTeamsNotScouted += teammates[i].teamsNotScouted.length;
            //console.log(allTeamsScouted, allTeamsNotScouted);
        }
        setAllTeamsScouted(allTeamsScouted);
        setAllTeamsNotScouted(allTeamsNotScouted);
    }, [teammates]);

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
            width: (Dimensions.get('window').width / 2 ) - (indent) - (indent / 4),
            height: 1.25 * indent, //test was 50 and indent was 41.2, so 50 / 41.2 ~= 1.25
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            left: indent
        },
        pieChartContainer: {
            height: indent * 6,
            width: Dimensions.get('window').width - (indent * 2),
            left: indent,
            borderRadius: 10,
            alignItems: 'center',
            backgroundColor: Colors.secondary,
        },
        teammates: {
            width: indent * 3.75,
            height: indent * 2,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.secondary,
        },
        teamsLeft: {
            width: indent * 4,
            height: indent * 2,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.secondaryContainer,
        }
    }

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header title={Lang.admin_home_pit.title} navigation={navigation} hamburgerButton={true} />

            <View style={{height: Dimensions.get('window').height - 60, top: 60}}>
            <ScrollView>
                <Text style={[styles.text, {fontSize: indent / 2, top: 15, left: indent}]}>{Lang.admin_home_pit.scouting_overview}</Text>

                <View style={{flexDirection: 'row', top: 15, gap: indent / 2}}>
                    <Pressable style={[styles.switchViewButton, {backgroundColor: Colors.secondary}]} onPress={() => navigation.navigate('Overview')}>
                        <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.admin_home_pit.match}</Text>
                    </Pressable>

                    <View style={[styles.switchViewButton, {backgroundColor: Colors.accent}]}>
                        <Text style={[styles.text, {fontSize: indent / 2, color: Colors.onAccent}]}>{Lang.admin_home_pit.pit}</Text>
                    </View>
                </View>

                <Text style={[styles.text, {fontSize: indent / 2, left: indent, marginTop: indent}]}>{Lang.admin_home_pit.teams_scouted}</Text>

                {/* The whole pie chart section is really scuffed so try not to mess with it too much */}
                <View style={styles.pieChartContainer}>
                    {/* This is to make it so the pie chart doesn't decide to break */}
                    {allTeamsScouted + allTeamsNotScouted > 0 && (<PieChart widthAndHeight={indent * 5} series={[allTeamsNotScouted, allTeamsScouted]} sliceColor={[Colors.uncompletedRed, Colors.completedGreen]} style={{marginTop: indent * .3}} />)}
                    
                    <View style={{flexDirection: 'row', justifyContent: 'center', width: indent * 8, marginTop: indent * .1}}>
                        <View style={{width: indent * 4, justifyContent: 'center', flexDirection: 'row'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <PieChart widthAndHeight={indent * .4} series={[1]} sliceColor={[Colors.completedGreen]} />
                            </View>

                            <View style={{justifyContent: 'center'}}>
                                <Text style={[styles.text, {fontSize: indent * .4, marginLeft: indent * .1}]}>{`${allTeamsScouted} ${Lang.admin_home_pit.completed}`}</Text>
                            </View>
                        </View>

                        <View style={{width: indent * 4, justifyContent: 'center', flexDirection: 'row'}}>
                            <View style={{justifyContent: 'center'}}>
                                <PieChart widthAndHeight={indent * .4} series={[1]} sliceColor={[Colors.uncompletedRed]} />
                            </View>

                            <View style={{justifyContent: 'center'}}>
                                <Text style={[styles.text, {fontSize: indent * .4, marginLeft: indent * .1}]}>{`${allTeamsNotScouted} ${Lang.admin_home_pit.uncompleted}`}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Text style={[styles.text, {fontSize: indent / 2, left: indent, marginTop: indent / 2}]}>{Lang.admin_home_pit.teammates}</Text>

                <View style={{height: indent * 2}}>
                    <ScrollView horizontal={true} style={{width: indent * 9, left: indent}}>
                        <View style={{gap: indent / 2, flexDirection: 'row'}}>
                            {teammates.map((teammate, index) => (
                                <Pressable style={styles.teammates} key={index} onPress={() => setViewTeammate(index)}>
                                    <View style={{flexDirection: 'row', gap: indent / 4}}>
                                        <MaterialIcons name="person" size={indent} color={Colors.text} />

                                        <Text style={[styles.text, {fontSize: indent * .75}]}>{teammate.name}</Text>
                                    </View>
                                    
                                    <Text style={[styles.text, {fontSize: indent * .33}]}>{`${Lang.admin_home_pit.teams_left} ${teammate.teamsNotScouted.length}`}</Text>
                                </Pressable>
                            ))}

                            <View />
                            {/* I stole this from when I did this in AdminHomeMatch */}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
            </View>

            {viewTeammate >= 0 && (
                <Modal
                    transparent={true}
                    visible={viewTeammate >= 0}
                    onRequestClose={() => setViewTeammate(-1)}
                    onBackDropPress={() => setViewTeammate(-1)}
                >
                    <Pressable style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)'}} onPress={() => setViewTeammate(-1)} />
                    {/* Stealing stuff from AdminHomeMatch that should probably be changed */}
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: indent * 9, height: indent * 11.5, backgroundColor: Colors.secondary, borderRadius: 10}}>
                            <View style={{height: indent * 2, flexDirection: 'row'}}>
                                <View style={{width: '5%'}} />

                                <View style={{width: '20%', justifyContent: 'center'}}>
                                    <MaterialIcons name="person" size={indent} color={Colors.text} />
                                    {/* At some point this will be the person's profile picture but for now, it is just the material icon */}
                                </View>

                                <View style={{width: '60%', justifyContent: 'center'}}>
                                    <Text style={[styles.text, {fontSize: indent}]}>{teammates[viewTeammate].name}</Text>
                                </View>

                                <View style={{width: '15%', justifyContent: 'center', alignItems: 'center'}}>
                                    <Pressable onPress={() => setViewTeammate(-1)}>
                                        <MaterialIcons name="close" size={indent * 1.25} color={Colors.text} />
                                    </Pressable>
                                </View>
                            </View>

                            <View style={{height: indent * 5, alignItems: 'center', justifyContent: 'center'}}>
                                <PieChart widthAndHeight={indent * 3} series={[teammates[viewTeammate].teamsNotScouted.length, teammates[viewTeammate].teamsScouted.length]} sliceColor={[Colors.uncompletedRed, Colors.completedGreen]} style={{marginTop: indent * .3}} />
                                
                                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: indent * 5, marginTop: indent * .1}}>
                                    <PieChart widthAndHeight={indent / 2} series={[1]} sliceColor={[Colors.completedGreen]} />
                                    <Text style={[styles.text, {fontSize: indent / 2, marginLeft: indent * .3}]}>{`${teammates[viewTeammate].teamsScouted.length} ${Lang.admin_home_pit.completed}`}</Text>
                                </View>

                                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: indent * 5, marginTop: indent * .1}}>
                                    <PieChart widthAndHeight={indent / 2} series={[1]} sliceColor={[Colors.uncompletedRed]} />
                                    <Text style={[styles.text, {fontSize: indent / 2, marginLeft: indent * .3}]}>{`${teammates[viewTeammate].teamsNotScouted.length} ${Lang.admin_home_pit.uncompleted}`}</Text>
                                </View>
                            </View>

                            <Text style={[styles.text, {fontSize: indent / 2, marginTop: indent, left: indent / 2}]}>{Lang.admin_home_pit.teams_left}</Text>

                            <View style={{height: indent * 2}}>
                                <ScrollView horizontal={true} style={{width: indent * 8, left: indent / 2}}>
                                    <View style={{gap: indent / 2, flexDirection: 'row'}}>
                                        {teammates[viewTeammate].teamsNotScouted.map((team, index) => (
                                            <View style={styles.teamsLeft} key={index}>
                                                <Text style={[styles.text, {fontSize: indent, color: Colors.secondary}]}>{team}</Text>
                                                <Text style={[styles.text, {fontSize: indent / 2, color: Colors.secondary, marginTop: -indent / 2}]}>Placeholder</Text>
                                            </View>
                                        ))}

                                        <View />
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}