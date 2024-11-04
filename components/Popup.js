import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useColors } from "./Colors";
import { MaterialIcons } from "@expo/vector-icons";
import Error from "./ErrorPopup";
import Info from "./InfoPopup";
import Success from "./SuccessPopup";

export default function Popup(props) {
    return (
        <>
            {props.type == "error" &&
                <Error visible={props.visible} setVisible={props.setVisible} errorText={props.text} />
            }
            {props.type == "info" &&
                <Info visible={props.visible} setVisible={props.setVisible} statusText={props.text} loading={props.loading}/>
            }
            {props.type == "success" &&
                <Success visible={props.visible} setVisible={props.setVisible} statusText={props.text}/>
            }
        </>
    )
}