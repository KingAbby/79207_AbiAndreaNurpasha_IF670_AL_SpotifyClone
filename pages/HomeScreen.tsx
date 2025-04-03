import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container} className='bg-[#121212]'>
            <Text className='text-white'>This is Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;