import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container} className="bg-[#121212]">
            {/* Header */}
            <View className="flex flex-col gap-5">
                <View className="flex-row justify-between items-center px-5 pt-3">
                    {/* Left Side: Profile and Title */}
                    <View className="flex-row items-center">
                        <TouchableOpacity className="mr-3">
                            <Image
                                source={require('../assets/sileighty vintage.png')}
                                className="h-8 w-8 rounded-full"
                            />
                        </TouchableOpacity>
                        {/* Filter Options */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="px-1"
                        >
                            <TouchableOpacity className="bg-[#333333] rounded-full px-5 py-2 mr-2">
                                <Text className="text-white">All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-[#333333] rounded-full px-5 py-2 mr-2">
                                <Text className="text-white">Music</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-[#333333] rounded-full px-5 py-2 mr-2">
                                <Text className="text-white">Podcasts</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </View>


            {/* Content Area - You can add your playlists, podcasts, etc. here */}
            <View className="flex-1 items-center justify-center">
                <Text className="text-white">Home Page</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },
});

export default HomeScreen;