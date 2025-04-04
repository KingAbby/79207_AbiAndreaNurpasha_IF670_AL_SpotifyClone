import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

const YourLibraryScreen = ({ navigation }) => {
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
                        <Text className="text-white text-3xl font-bold">Your Library</Text>
                    </View>

                    {/* Right Side: Search and Add buttons */}
                    <View className="flex-row">
                        <TouchableOpacity className="mr-5">
                            <Ionicons name="search" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name="plus" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Filter Options */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="px-4 py-3"
                >
                    <TouchableOpacity className="bg-[#333333] rounded-full px-5 py-2 mr-2">
                        <Text className="text-white">Playlists</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#333333] rounded-full px-5 py-2 mr-2">
                        <Text className="text-white">Artists</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#333333] rounded-full px-5 py-2 mr-2">
                        <Text className="text-white">Albums</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#333333] rounded-full px-5 py-2 mr-2">
                        <Text className="text-white">Podcasts & Shows</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>



            {/* Content Area - You can add your playlists, podcasts, etc. here */}
            <View className="flex-1 items-center justify-center">
                <Text className="text-white">Your playlists will appear here</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },
});

export default YourLibraryScreen;