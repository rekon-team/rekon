import React from "react";
import { View, Text, Dimensions } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useColors } from "./Colors";
import { useLang } from "./Lang";
import { MaterialIcons } from "@expo/vector-icons";

//Ignore the difference between the name of the file and the name of the function
export default function StyledDrawer(props) {
    const { Colors } = useColors();
    const { Lang } = useLang();

    let userName = "Name Here"; //Placeholder
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
            fontSize: Dimensions.get('window').height * .018 / Dimensions.get('window').fontScale,
            height: Dimensions.get('window').height * .06,
            textAlignVertical: 'center',
            //I have no idea why the text isn't fully centered even though I have justifyContent: 'center' in the drawerItem style
        },
        userProfileText: {
            color: Colors.text,
            fontFamily: 'Inter',
            fontSize: Dimensions.get('window').height * .03 / Dimensions.get('window').fontScale,
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
    //correct!
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: Colors.secondary, height: '100%'}}>
                <DrawerItem {...props} label={userName} focused={false} labelStyle={styles.userProfileText} style={styles.userProfile} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER   onPress={() => props.navigation.navigate('Profile')}*/ icon={/*PLACEHOLDER*/ () => (<MaterialIcons name="person" size={Dimensions.get('window').height * 0.045 / Dimensions.get('window').fontScale} color={Colors.text} />)} />
                <DrawerItem {...props} label={currentMode = "Admin" ? Lang.hamburger_menu.scout_mode : Lang.hamburger_menu.admin_mode} focused={false} labelStyle={styles.drawerItemText} style={styles.drawerItem} inactiveBackgroundColor={Colors.tabSelected} onPress={() => props.navigation.navigate('Scout')} icon={() => (<MaterialIcons name="swap-horiz" size={Dimensions.get('window').height * 0.03 / Dimensions.get('window').fontScale} color={Colors.text} />)} />

                <View style={styles.divider} />

                <DrawerItem {...props} label={Lang.hamburger_menu.overview} focused={props.state.index == props.state.routes.findIndex(i => i.name == "Overview")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} onPress={() => props.navigation.navigate('Overview')} icon={() => (<MaterialIcons name="pie-chart" size={Dimensions.get('window').height * 0.03 / Dimensions.get('window').fontScale} color={Colors.text} />)} />
                <DrawerItem {...props} label={Lang.hamburger_menu.team_profile} focused={props.state.index == props.state.routes.findIndex(i => i.name == "TeamProfile")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER onPress={() => props.navigation.navigate('TeamProfile')} */ icon={() => (<MaterialIcons name="person" size={Dimensions.get('window').height * 0.03 / Dimensions.get('window').fontScale} color={Colors.text} />)} />
                <DrawerItem {...props} label={Lang.hamburger_menu.teammates} focused={props.state.index == props.state.routes.findIndex(i => i.name == "Teammates")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} onPress={() => props.navigation.navigate('Teammates')} icon={() => (<MaterialIcons name="group" size={Dimensions.get('window').height * 0.03 / Dimensions.get('window').fontScale} color={Colors.text} />)} />
                <DrawerItem {...props} label={Lang.hamburger_menu.forms} focused={props.state.index == props.state.routes.findIndex(i => i.name == "Forms")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} onPress={() => props.navigation.navigate('Forms')} icon={() => (<MaterialIcons name="add-circle" size={Dimensions.get('window').height * 0.03 / Dimensions.get('window').fontScale} color={Colors.text} />)} />

                <View style={styles.divider} />

                <DrawerItem {...props} label={Lang.hamburger_menu.events} focused={props.state.index == props.state.routes.findIndex(i => i.name == "Events")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} onPress={() => props.navigation.navigate('Events')} icon={() => (<MaterialIcons name="event" size={Dimensions.get('window').height * 0.03 / Dimensions.get('window').fontScale} color={Colors.text} />)} />
                <DrawerItem {...props} label={Lang.hamburger_menu.sync_data} focused={props.state.index == props.state.routes.findIndex(i => i.name == "SyncData")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} /* PLACEHOLDER onPress={() => props.navigation.navigate('SyncData')} */ icon={() => (<MaterialIcons name="sync" size={Dimensions.get('window').height * 0.03 / Dimensions.get('window').fontScale} color={Colors.text} />)} />
                <DrawerItem {...props} label={Lang.hamburger_menu.settings} focused={props.state.index == props.state.routes.findIndex(i => i.name == "Settings")} labelStyle={styles.drawerItemText} style={styles.drawerItem} activeBackgroundColor={Colors.divider} inactiveBackgroundColor={Colors.tabSelected} onPress={() => props.navigation.navigate('Settings')} icon={() => (<MaterialIcons name="settings" size={Dimensions.get('window').height * 0.03 / Dimensions.get('window').fontScale} color={Colors.text} />)} />
            </DrawerContentScrollView>
        </View>
    )
}