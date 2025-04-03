import React from "react";
import { View, StyleSheet, Text } from "react-native";

const YourLibraryScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>This is Your Library</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default YourLibraryScreen;