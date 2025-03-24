import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Pressable, ScrollView, Modal } from 'react-native';
import PieChart from 'react-native-pie-chart';

import Header from '../components/Header';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLang } from '../components/Lang';
import { useColors } from '../components/Colors';
import { MaterialIcons } from '@expo/vector-icons'

export default function Scout({ navigation }) {
    const { Lang } = useLang();
    const { Colors } = useColors();

    

    let indent = Dimensions.get('window').width * .1;

    const [viewTeammate, setViewTeammate] = useState(-1);
    

    //This is just placeholder data
    const [teams, setTeams] = useState([
        {teamName: 'Jonas', teamNumber: 8234, scouted: true},
        {teamName: 'Joenas', teamNumber: 8235, scouted: false},
        {teamName: 'Gionas', teamNumber: 8236, scouted: false},
        {teamName: 'Janos', teamNumber: 8237, scouted: false},
        {teamName: 'Jones', teamNumber: 8238, scouted: false},
    ]);



    const [allTeamsScouted, setAllTeamsScouted] = useState(0);
    const [allTeamsNotScouted, setAllTeamsNotScouted] = useState(0);

    useEffect(() => {
        let allTeamsScouted = 0;
        let allTeamsNotScouted = 0;
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].scouted == true){
                allTeamsScouted++;
            }
            else{
                allTeamsNotScouted++;
            }
            //console.log(allTeamsScouted, allTeamsNotScouted);
        }
        setAllTeamsScouted(allTeamsScouted);
        setAllTeamsNotScouted(allTeamsNotScouted);
    }, [teams]);

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
        
        teams: {
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
            backgroundColor: Colors.secondary,
        }
    }

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header title={Lang.scout.title} navigation={navigation} hamburgerButton={true} />

            <View style={{height: Dimensions.get('window').height - 60, top: 60}}>
            <ScrollView>
                <Text style={[styles.text, {fontSize: indent / 2, top: 15, left: indent}]}>{Lang.scout.pit_assignments}</Text>
                <Text style={[styles.text, {fontSize: indent / 2.5, top: 15, paddingTop: indent / 2.5, paddingBottom: indent / 2, alignSelf: 'center'}]}>{Lang.scout.teams_scouted}{allTeamsScouted}/{teams.length}</Text>

                {/*changes width based on how many have been done, creates the effect of a progress bar :D */}
                <View style={{left: indent, height: indent / 2.25, backgroundColor: Colors.uncompletedRed, width: Dimensions.get('window').width - indent * 2, borderRadius: 111111}}>
                    <View style={{width: (Dimensions.get('window').width - indent * 2) * (allTeamsScouted/teams.length), backgroundColor: Colors.completedGreen, height: '100%', borderRadius: 11111}}></View>
                </View>

                <View style={{height: indent * 4, paddingTop: indent / 2}}>
                    <ScrollView horizontal={true} style={{width: indent * 8, left: indent / 2}}>
                        <View style={{gap: indent / 2, flexDirection: 'row'}}>
                            {teams.map((team, index) => (
                                <View style={styles.teamsLeft} key={index}>
                                    <Text style={[styles.text, {fontSize: indent, color: Colors.text}]}>{team.teamName}</Text>
                                    <Text style={[styles.text, {fontSize: indent / 2, color: Colors.text, marginTop: -indent / 5}]}>{team.teamNumber}</Text>
                                </View>
                            ))}

                            <View />
                        </View>
                    </ScrollView>
                </View>

                
                <Text style={[styles.text, {fontSize: indent / 2, left: indent, marginTop: indent}]}>{Lang.scout.match_assignments}</Text>

                <View style={{height: indent * 4, paddingTop: indent / 2}}>
                    <ScrollView horizontal={true} style={{width: indent * 8, left: indent / 2}}>
                        <View style={{gap: indent / 2, flexDirection: 'row'}}>
                            {teams.map((team, index) => (
                                <View style={styles.teamsLeft} key={index}>
                                    <Text style={[styles.text, {fontSize: indent, color: Colors.text, top: -4}]}>{team.teamName}</Text>
                                    <View style={{flexDirection: 'row', marginRight: indent / 4}}>
                                        <Text style={[styles.text, {fontSize: indent / 2.5, color: Colors.text, marginTop: -indent / 4, marginRight: indent / 4}]}>Qual #1</Text> {/*Placeholder info. Someone please add the actual functionality later*/}
                                        <Text style={[styles.text, {fontSize: indent / 2.5, color: Colors.text, marginTop: -indent / 4}]}>R3</Text>
                                    </View>
                                </View>
                            ))}

                            <View />
                        </View>
                    </ScrollView>
                </View>
                

                

                
            </ScrollView>
            </View>

            
        </View>
    );
}