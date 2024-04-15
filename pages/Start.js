import { StyleSheet, View, Text } from "react-native";

export default function Start() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    return (
        <View style={styles.container}>
            <Text>Start Page</Text>
        </View>
    );
}   