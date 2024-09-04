import React from "react";
import { Dimensions, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useColors } from "./Colors";
import { useLang } from "./Lang";

export default function MatchScoutView(props) {
    const { Colors } = useColors();
    const { Lang } = useLang();

    let indent = Dimensions.get('window').width * .1;
    let blueMatchScouts = props.scouts[props.current_match].blueMatchScouts;
    let redMatchScouts = props.scouts[props.current_match].redMatchScouts;

    const styles = {
        scoutContainer: {
            width: (Dimensions.get('window').width / 2) - (indent) - (indent / 4), //same as indent * 3.75
            height: indent * 4,
            borderRadius: 10,
        },
        subjectiveScoutContainer: {
            width: (Dimensions.get('window').width / 2) - (indent) - (indent / 4), //same as indent * 3.75
            height: indent * 2,
            borderRadius: 10,
            alignItems: 'center',
        },
        text: {
            fontFamily: 'Inter',
            color: Colors.text,
        }
    }

    return (
        <View style={{alignItems: 'center', height: indent * 6.5}}>
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

            <View style={{flexDirection: 'row', gap: indent / 2, top: indent / 2}}>
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
        </View>
    );
}