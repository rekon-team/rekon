import React, { useState } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';

import Header from '../components/Header';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLang } from '../components/Lang';
import { useColors } from '../components/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';

export default function AssignTeammates() {
    const { Lang } = useLang();
    const { Colors } = useColors();

    const [matchForm, setMatchForm] = useState('');
    const [pitForm, setPitForm] = useState('');
    const [objectiveForm, setObjectiveForm] = useState('');
    const [forms, setForms] = useState([]);
    const [subjectiveScouts, setSubjectiveScouts] = useState(false);

    let indent = Dimensions.get('window').width * .1/Dimensions.get("window").fontScale;

    const equallyDistribute = () => {
        console.log('Placeholder, please somebody finish later');
    }

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
        distributeContainer: {
            width: '80%',
            height: indent * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.accent,
            position: 'absolute',
            left: indent,
            bottom: indent,
            // yet again, check in with actual device to see if this is correct
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        scrollViewContainer: {
            height: indent * 2,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: indent / 2
        },
        formContainer: {
            width: indent * 3,
            height: indent * 2,
            borderRadius: 10,
            backgroundColor: Colors.secondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: indent / 2
        },
        sliderContainer: {
            width: indent,
            height: indent,
            borderRadius: 7.5,
            backgroundColor: Colors.accent,
            justifyContent: 'center',
            alignItems: 'center'
        },
        pitOrMatchContainer: {
            width: '45%',
            height: indent * 1.5,
            borderRadius: 10,
            backgroundColor: Colors.secondary,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }

    return(
        <View style={styles.container}>
            <BackgroundGradient />
            <Header title={Lang.assign_teammates.title} backButton={false} hamburgerButton={true} />

            <View style={{height: Dimensions.get('window').height - 60, top: 60}}>
                <ScrollView>
                    <View style={{height: Dimensions.get('window').height - 60}}>
                        <Text style={[styles.text, {fontSize: indent / 2, top: indent, left: indent}]}>{Lang.assign_teammates.form_uploads}</Text>
                        <View style={{height: indent * 2, top: indent}}>
                            <ScrollView horizontal={true}>
                                <View style={styles.scrollViewContainer}>
                                    <Pressable style={styles.formContainer}>
                                        <MaterialIcons name='upload' size={indent} color={Colors.text} />
                                        <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.assign_teammates.match}</Text>
                                    </Pressable>

                                    <Pressable style={styles.formContainer}>
                                        <MaterialIcons name='upload' size={indent} color={Colors.text} />
                                        <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.assign_teammates.pit}</Text>
                                    </Pressable>

                                    <Pressable style={styles.formContainer}>
                                        <MaterialIcons name='upload' size={indent} color={Colors.text} />
                                        <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.assign_teammates.subjective}</Text>
                                    </Pressable>
                                </View>
                            </ScrollView>
                        </View>

                        <Text style={[styles.text, {fontSize: indent / 2, top: indent * 1.25, left: indent}]}>{Lang.assign_teammates.settings}</Text>

                        <View style={{top: indent * 1.6, width: '75%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: indent}}>
                            <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.assign_teammates.subjective_scouts}</Text>

                            <Switch style={{transform:[{scaleX: 1.2}, {scaleY: 1.2}]}} color={Colors.accent} value={subjectiveScouts} onValueChange={(value) => {setSubjectiveScouts(value)}} />
                        </View>

                        <Pressable onPress={() => equallyDistribute()} style={styles.distributeContainer}>
                            <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.assign_teammates.equally_distribute}</Text>
                        
                            <MaterialIcons name="send" size={indent * .75} color={Colors.text} style={{left: indent / 2}} />
                        </Pressable>

                        <Text style={[styles.text, {fontSize: indent / 2, top: indent * 2, left: indent}]}>{Lang.assign_teammates.manual_assign}</Text>

                        <View style={{width: '80%', left: indent, flexDirection: 'row', top: indent * 2, justifyContent: 'space-between'}}>
                            <Pressable style={styles.pitOrMatchContainer}>
                                <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.assign_teammates.pit}</Text>
                                <MaterialIcons name='open-in-new' style={{position: 'absolute', left: indent * 2.85, bottom: indent * .85}} size={indent / 2} color={Colors.text} />
                            </Pressable>

                            <Pressable style={styles.pitOrMatchContainer}>
                                <Text style={[styles.text, {fontSize: indent / 2}]}>{Lang.assign_teammates.match}</Text>
                                <MaterialIcons name='open-in-new' style={{position: 'absolute', left: indent * 2.85, bottom: indent * .85}} size={indent / 2} color={Colors.text} />
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}