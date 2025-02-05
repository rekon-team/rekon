import React from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useColors } from "./Colors";
import { useLang } from "./Lang";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuActions, renderers } from 'react-native-popup-menu';
import { useState, useEffect } from "react";
import Constants from "./Constants";
import ky from "ky";
import { useSettings } from "./Settings";
import { Image } from "expo-image";

//Ignore the difference between the name of the file and the name of the function
export default function StyledDrawer(props) {
    const { Colors } = useColors();
    const { Lang } = useLang();
    const { Settings, updateSetting } = useSettings();
    const [currentTeamName, setCurrentTeamName] = useState(null);
    const [currentTeam, setCurrentTeam] = useState(null);
    const [teamList, setTeamList] = useState([]);
    const [profileTimestamp, setProfileTimestamp] = useState(Date.now());

    useEffect(() => {
        const runner = async () => {
            let userTeams = [];
            try {
                userTeams = await ky.get(`${Constants.serverUrl}/accounts/getGroups?userToken=${Settings.token}`).json();
                console.log(userTeams);
                setTeamList(userTeams.groups);
                if (Settings.currentTeam == null) {
                    updateSetting("currentTeam", userTeams.groups[0]);
                    setCurrentTeam(userTeams.groups[0]);
                } else {
                    setCurrentTeam(Settings.currentTeam);
                }
            } catch (error) {
                console.error(error);
                setTeamList(['error']);
                setCurrentTeam('error');
                setCurrentTeamName('Unknown Server Error');
            }
            if (Settings.username == null) {
                try {
                    const userInfo = await ky.get(`${Constants.serverUrl}/accounts/getAccountData?account_id=${Settings.accountID}`).json();
                    updateSetting("username", userInfo.accountData.username);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        runner();
    }, []);

    useEffect(() => {
        const runner = async () => {
            try {
                const groupInfo = await ky.get(`${Constants.serverUrl}/groups/groupInfo?groupID=${currentTeam}`).json();
                console.log(groupInfo);
                setCurrentTeamName(groupInfo.groupInfo.group_name + " - #" + groupInfo.groupInfo.team_number);
            } catch (error) {
                console.error(error);
            }
        }
        runner();
    }, [currentTeam]);

    let currentMode = "Admin"; //Placeholder

    const styles = {
        drawerItem: {
            width: '90%',
            height: '6%',
            borderRadius: 10,
            justifyContent: 'center',
        },
        userProfile: {
            width: '90%',
            height: '9%',
            borderRadius: 10,
            justifyContent: 'center',
        },
        drawerItemText: {
            color: Colors.text,
            fontFamily: 'Inter',
            fontSize: Dimensions.get('window').height * .018,
            //I have no idea why the text isn't fully centered even though I have justifyContent: 'center' in the drawerItem style
        },
        userProfileText: {
            color: Colors.text,
            fontFamily: 'Inter',
            fontSize: Dimensions.get('window').height * .03,
        },
        divider: {
            height: '.3%',
            backgroundColor: Colors.divider,
            width: '80%',
            alignSelf: 'center',
            marginVertical: 10,
            borderRadius: 10
        }
    }

    //Awful inline styling time!
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: Colors.secondary, height: '100%'}}>
                <DrawerItem {...props} label={Settings.username} focused={false} labelStyle={styles.userProfileText} style={styles.userProfile} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER   onPress={() => props.navigation.navigate('Profile')}*/ icon={/*PLACEHOLDER*/ () => (<Image source={{
                            uri: `${Constants.serverUrl}/uploads/getProfilePicture?accountID=${Settings.accountID}&t=${profileTimestamp}`
                        }} style={{width: Dimensions.get('window').width * 0.10, height: Dimensions.get('window').width * 0.10, borderRadius: 1000, zIndex: 1, opacity: 1, marginRight: -Dimensions.get('window').width * 0.05}} />)} />

                <DrawerItem {...props} label={currentMode == "Admin" ? Lang.hamburger_menu.scout_mode : Lang.hamburger_menu.admin_mode} focused={false} labelStyle={styles.drawerItemText} style={styles.drawerItem} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER   onPress={() => props.navigation.navigate('Analyze')}*/ icon={() => (<MaterialIcons name="swap-horiz" size={Dimensions.get('window').height * 0.03} color={Colors.text} />)} />

                <View style={styles.divider} />

                <DrawerItem {...props} label={Lang.hamburger_menu.overview} focused={props.state.index == props.state.routes.findIndex(i => i.name == "Overview")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} onPress={() => props.navigation.navigate('Overview')} icon={() => (<MaterialIcons name="pie-chart" size={Dimensions.get('window').height * 0.03} color={Colors.text} />)} />
                <DrawerItem {...props} label={Lang.hamburger_menu.team_profile} focused={props.state.index == props.state.routes.findIndex(i => i.name == "TeamProfile")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER onPress={() => props.navigation.navigate('TeamProfile')} */ icon={() => (<MaterialIcons name="person" size={Dimensions.get('window').height * 0.03} color={Colors.text} />)} />
                <DrawerItem {...props} label={Lang.hamburger_menu.teammates} focused={props.state.index == props.state.routes.findIndex(i => i.name == "Teammates")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER onPress={() => props.navigation.navigate('Teammates')} */ icon={() => (<MaterialIcons name="group" size={Dimensions.get('window').height * 0.03} color={Colors.text} />)} />
                <DrawerItem {...props} label={Lang.hamburger_menu.forms} focused={props.state.index == props.state.routes.findIndex(i => i.name == "Forms")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER onPress={() => props.navigation.navigate('Forms')} */ icon={() => (<MaterialIcons name="add-circle" size={Dimensions.get('window').height * 0.03} color={Colors.text} />)} />

                <View style={styles.divider} />

                <DrawerItem {...props} label={Lang.hamburger_menu.events} focused={props.state.index == props.state.routes.findIndex(i => i.name == "Events")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER onPress={() => props.navigation.navigate('Events')} */ icon={() => (<MaterialIcons name="event" size={Dimensions.get('window').height * 0.03} color={Colors.text} />)} />
                <DrawerItem {...props} label={Lang.hamburger_menu.sync_data} focused={props.state.index == props.state.routes.findIndex(i => i.name == "SyncData")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER onPress={() => props.navigation.navigate('SyncData')} */ icon={() => (<MaterialIcons name="sync" size={Dimensions.get('window').height * 0.03} color={Colors.text} />)} />
                <DrawerItem {...props} label={Lang.hamburger_menu.settings} focused={props.state.index == props.state.routes.findIndex(i => i.name == "Settings")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER onPress={() => props.navigation.navigate('Settings')} */ icon={() => (<MaterialIcons name="settings" size={Dimensions.get('window').height * 0.03} color={Colors.text} />)} />

                <View style={styles.divider} />

                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', width: '100%', flex: 1, paddingBottom: 10}}>
                    <Menu renderer={renderers.NotAnimatedContextMenu}>
                        <MenuTrigger>
                            <View style={{backgroundColor: 'white', zIndex: 400, minWidth: '75%', height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: Colors.tabSelected}}>
                                <Text style={[styles.drawerItemText, {flex: 1, paddingLeft: 10}]}>{currentTeamName}</Text>
                                <MaterialIcons name="group" size={Dimensions.get('window').height * 0.03} color={Colors.text} style={{marginRight: 10}}/>
                            </View>
                        </MenuTrigger>
                        <MenuOptions>
                            {teamList.map(async (team) => {
                                let groupInfo = null;
                                try {
                                    groupInfo = await ky.get(`${Constants.serverUrl}/groups/groupInfo?groupID=${team}`).json();
                                } catch (error) {
                                    console.error(error);
                                    groupInfo = {groupInfo: {group_name: "Server", team_number: "Error"}};
                                }
                                return (
                                    <MenuOption onSelect={() => {
                                        updateSetting("currentTeam", team);
                                        setCurrentTeam(team);
                                    }}>
                                        <Text>{groupInfo.groupInfo.group_name} - #{groupInfo.groupInfo.team_number}</Text>
                                    </MenuOption>
                            )})}
                        </MenuOptions>
                    </Menu>
                    <Pressable style={{backgroundColor: 'white', zIndex: 400, width: '15%', height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: Colors.divider}} onPress={() => {
                        props.navigation.navigate('CreateTeam');
                    }}>
                        <MaterialIcons name="add" size={Dimensions.get('window').height * 0.03} color={Colors.text} />
                    </Pressable>
                </View>
            </DrawerContentScrollView>
        </View>
    )
}