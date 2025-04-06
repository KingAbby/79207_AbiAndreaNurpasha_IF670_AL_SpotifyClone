import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign, Octicons, MaterialIcons, Feather } from '@expo/vector-icons';
import ProfileButton from "../component/ProfileButton";

const YourLibraryScreen = ({ navigation }) => {

    const [viewMode, setViewMode] = useState('list');

    const playlists = [
        { id: '1', title: 'Liked Songs', coverImage: require('../assets/sileighty vintage.png'), creator: 'Spotify', description: 'Liked Songs' },
        { id: '2', title: 'Daily Mix 1', coverImage: require('../assets/sileighty vintage.png'), creator: 'Spotify', description: 'Personalized mix for you' },
        { id: '3', title: 'Discover Weekly', coverImage: require('../assets/sileighty vintage.png'), creator: 'Spotify', description: 'New discoveries every Monday' },
        { id: '4', title: 'Release Radar', coverImage: require('../assets/sileighty vintage.png'), creator: 'Spotify', description: 'New releases from artists you follow' },
        { id: '5', title: 'Top Hits 2023', coverImage: require('../assets/sileighty vintage.png'), creator: 'User', description: 'Popular hits collection' },
        { id: '6', title: 'Chill Vibes', coverImage: require('../assets/sileighty vintage.png'), creator: 'User', description: 'Relaxing playlist' },
        { id: '7', title: 'Workout Mix', coverImage: require('../assets/sileighty vintage.png'), creator: 'User', description: 'High energy music' },
        { id: '8', title: 'Road Trip', coverImage: require('../assets/sileighty vintage.png'), creator: 'User', description: 'Perfect for long drives' },
        { id: 'add-artists', title: 'Add artists', coverImage: null, creator: '', description: 'Follow the artists you like', type: 'add-button' },
        { id: 'add-podcasts', title: 'Add podcasts & shows', coverImage: null, creator: '', description: 'Follow podcasts & shows', type: 'add-button' },
    ];

    // Toggle between list and grid view
    const toggleViewMode = () => {
        setViewMode(viewMode === 'list' ? 'grid' : 'list');
    };

    // Render item based on view mode
    const renderItem = ({ item, index }) => {
        // Item untuk add button
        if (item.type === 'add-button') {
            const isArtistButton = item.id === 'add-artists';
            const buttonStyle = isArtistButton ? "rounded-full" : "rounded-lg";

            if (viewMode === 'list') {
                // Tampilan list untuk add button
                return (
                    <TouchableOpacity className="flex-row items-center px-5 py-3">
                        <View className={`h-20 w-20 bg-[#2a2a2a] ${buttonStyle} justify-center items-center`}>
                            <AntDesign name="plus" size={30} color="#b3b3b3" />
                        </View>
                        <View className="ml-3 flex-1">
                            <Text className="text-white font-medium">{item.title}</Text>
                            <Text className="text-gray-400 text-sm mt-1">{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                );
            } else {
                // Tampilan grid untuk add button
                return (
                    <TouchableOpacity
                        className="p-2"
                        style={{ width: '33.33%' }}
                    >
                        <View className="items-center">
                            <View className={`h-28 w-28 bg-[#2a2a2a] ${buttonStyle} mb-2 justify-center items-center`}>
                                <AntDesign name="plus" size={80} color="#b3b3b3" />
                            </View>
                            <Text className="text-white text-center justify-center text-sm" numberOfLines={1}>
                                {item.title}
                            </Text>

                        </View>
                    </TouchableOpacity>
                );
            }
        }

        if (viewMode === 'list') {
            // List View 
            return (
                <TouchableOpacity className="flex-row items-center px-5 py-3">
                    <Image
                        source={item.coverImage}
                        className="h-20 w-20 rounded-sm"
                    />
                    <View className="ml-3 flex-1">
                        <Text className="text-white font-medium">{item.title}</Text>
                        <View className="flex-row items-center mt-1">
                            <Text className="text-gray-400 text-sm">Playlist</Text>
                            <Text className="text-gray-400 text-sm"> • {item.creator}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        } else {
            // Grid View 
            return (
                <TouchableOpacity
                    className="p-2"
                    style={{ width: '33.33%' }}
                >
                    <View className="items-center">
                        <View className="items-center">
                            <Image
                                source={item.coverImage}
                                className="h-28 w-28 rounded-sm mb-2"
                            />
                        </View>
                        <Text className="text-white text-sm" numberOfLines={1}>
                            {item.title}
                        </Text>
                        <View className="flex-row mt-1">
                            <Text className="text-gray-400 text-xs mt-1" numberOfLines={1}>Playlist</Text>
                            <Text className="text-gray-400 text-center text-xs mt-1" numberOfLines={1}> • {item.creator}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    };


    return (
        <SafeAreaView style={styles.container} className="bg-[#121212]">
            {/* Header */}
            <View style={styles.bottomShadow} className="flex flex-col gap-5 bg-[#121212]">
                <View className="flex-row justify-between items-center px-5 pt-3">
                    {/* Left Side: Profile and Title */}
                    <View className="flex-row items-center">
                        <TouchableOpacity>
                            <ProfileButton onPress={() => navigation.openDrawer()} />
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
                </ScrollView>
            </View>

            {/* Content Area */}
            <View className="flex-1">
                <View className="flex-row justify-between py-3 px-5">
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity>
                            <Octicons name="arrow-switch" size={20} color="white" />
                        </TouchableOpacity>
                        <Text className="text-white">Recents</Text>
                    </View>

                    { /* View Mode Toggle */}
                    <TouchableOpacity onPress={toggleViewMode}>
                        {viewMode === 'list' ? (
                            <Feather name="grid" size={20} color="white" />
                        ) : (
                            <MaterialIcons name="format-list-bulleted" size={20} color="white" />
                        )}
                    </TouchableOpacity>

                </View>

                <FlatList
                    data={playlists}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    numColumns={viewMode === 'grid' ? 3 : 1}
                    key={viewMode} // Important: Forces re-render when switching layouts
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: 5,
                        paddingBottom: viewMode === 'list' ? 0 : 20
                    }}
                />
            </View>

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },
    bottomShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default YourLibraryScreen;