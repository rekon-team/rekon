import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { useLang } from "../components/Lang";
import { useColors } from "../components/Colors";
import BackgroundGradient from "../components/BackgroundGradient";
import Header from "../components/Header";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { TextInput } from "react-native-paper";

export default function Events() {
    const { Lang } = useLang();
    const { Colors } = useColors();

    const darkness = useSharedValue(0);
    const position = useSharedValue(0);

    const [currentEvents, setCurrentEvents] = useState([{'name': '10K Lakes'}, {'name': 'North Star'}, {'name': 'Lake Superior'}, {'name': 'Northern Lights'}]);
    const [pastEvents, setPastEvents] = useState([{'name': 'Lake Superior'}, {'name': 'Northern Lights'}]);
    const [searchBarEnabled, setSearchBarEnabled] = useState(false);
    const [searchText, setSearchText] = useState('');

    let indent = Dimensions.get('window').width * .1;
    let verticalIndent = Dimensions.get('window').height * .1;

    useEffect(() => {
        if (searchBarEnabled == true) {
            darkness.value = withTiming(.5);
            position.value = withTiming(0);
        } else {
            darkness.value = withTiming(0);
            position.value = withTiming(-verticalIndent * 4);
        }
    }, [searchBarEnabled]);

    const styles = {
        container: {
            flex: 1,
            backgroundColor: Colors.primary,
            width: '100%',
            height: '100%'
        },
        text: {
            color: Colors.text,
            fontFamily: 'Inter',
        },
        eventsContainer: {
            width: '80%',
            height: verticalIndent * .75,
            borderRadius: 10,
            backgroundColor: Colors.secondary,
            justifyContent: 'center',
            left: indent,
            marginBottom: verticalIndent / 4,
        },
        searchBar: {
            width: '80%',
            height: verticalIndent * .75,
            borderRadius: 10,
            backgroundColor: Colors.accent,
            flexDirection: 'row',
            position: 'absolute',
            left: indent,
            bottom: verticalIndent * .25,
            alignItems: 'center',
            justifyContent: 'center'
        },
        fullScreen: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: Colors.primary,
            opacity: 0
        },
        searchContainer: {
            width: '100%',
            height: verticalIndent * 4,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: Colors.secondary,
            position: 'absolute',
            bottom: -verticalIndent * 4,
            opacity: 1
        },
        searchBarContainer: {
            width: '80%',
            height: verticalIndent * .75,
            borderRadius: 10,
            backgroundColor: Colors.accent,
            flexDirection: 'row',
            position: 'absolute',
            left: indent,
            top: verticalIndent * .25,
            alignItems: 'center',
            justifyContent: 'center'
        },
        input: {
            width: '70%',
            height: verticalIndent * .75,
            margin: 8,
            color: Colors.text,
            backgroundColor: Colors.accent,
            justifyContent: 'center',
            fontSize: indent * .5
        }
    }

    const fullScreenAnimated = useAnimatedStyle(() => ({
        opacity: darkness.value
    }));

    const searchAnimated = useAnimatedStyle(() => ({
        bottom: position.value
    }));

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <Header title={Lang.events.title} backButton={false} hamburgerButton={true} />
            
            <View style={{height: Dimensions.get('window').height - 60, top: 60}}>
                <ScrollView>
                    <Text style={[styles.text, {fontSize: indent * .75, top: verticalIndent, left: indent}]}>{Lang.events.current_events}</Text>

                    <View style={{top: verticalIndent, height: verticalIndent * 2.5}}>
                        <ScrollView>
                            {currentEvents.map((event, index) => (
                                <View style={styles.eventsContainer} key={index}>
                                    <Text style={[styles.text, {fontSize: verticalIndent * .3, left: indent, width: '80%'}]} numberOfLines={1}>{event.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <Text style={[styles.text, {fontSize: indent * .75, top: verticalIndent * 1.5, left: indent}]}>{Lang.events.past_events}</Text>

                    <View style={{top: verticalIndent * 1.5, height: verticalIndent * 2.5}}>
                        <ScrollView>
                            {pastEvents.map((event, index) => (
                                <View style={styles.eventsContainer} key={index}>
                                    <Text style={[styles.text, {fontSize: verticalIndent * .3, left: indent, width: '80%'}]} numberOfLines={1}>{event.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>

            <Pressable style={styles.searchBar} onPress={() => setSearchBarEnabled(true)} >
                <View style={{alignItems: 'center', justifyContent: 'center', width: '20%'}}>
                    <MaterialIcons name="search" size={verticalIndent * .6} color={Colors.text} />
                </View>

                <Text style={[styles.text, {fontSize: indent * .5, width: '80%'}]}>{Lang.events.search_for_events}</Text>
            </Pressable>
            
            <Animated.View style={[fullScreenAnimated, styles.fullScreen]}>
                <Pressable onPress={() => setSearchBarEnabled(false)} style={{width: '100%', height: '100%'}} />
            </Animated.View>

            <Animated.View style={[searchAnimated, styles.searchContainer]}>
                <View style={styles.searchBarContainer}>
                    <View style={{alignItems: 'center', justifyContent: 'center', width: '20%'}}>
                        <MaterialIcons name="search" size={verticalIndent * .6} color={Colors.text} />
                    </View>

                    <TextInput textColor={Colors.text} activeOutlineColor={Colors.text} theme={{colors: {onSurfaceVariant: Colors.text, primary: Colors.text}}} style={styles.input} label={Lang.events.search_for_events} onChangeText={text => {
                        setSearchText(text);
                    }} />
                </View>
            </Animated.View>
        </View>
    )
}