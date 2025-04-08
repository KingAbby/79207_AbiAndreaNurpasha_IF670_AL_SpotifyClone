import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign, Octicons, MaterialIcons, Feather } from '@expo/vector-icons';
import ProfileButton from "../component/ProfileButton";
import { useNavigation } from '@react-navigation/native';
import musicData from '../data/data.json';
import { ROUTES } from '../navigation/routes';

const YourLibraryScreen = ({ navigation }) => {
    const [viewMode, setViewMode] = useState('list');
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [filterOption, setFilterOption] = useState('All');

    // Fungsi untuk mengambil sumber gambar dari path lokal atau URL
    const getImageSource = (imagePath) => {
        if (!imagePath) return null;

        if (imagePath.startsWith('assets/')) {
            try {
                // Penting: Require harus menggunakan path literal, tidak bisa dinamis
                switch (imagePath) {
                    // Song covers
                    case 'assets/songcover/blindinglight.png':
                        return require('../assets/songcover/blindinglight.png');
                    case 'assets/songcover/kissmemore.png':
                        return require('../assets/songcover/kissmemore.png');
                    case 'assets/songcover/rockyoulikeahurricane.png':
                        return require('../assets/songcover/rockyoulikeahurricane.png');
                    case 'assets/songcover/intheend.png':
                        return require('../assets/songcover/intheend.png');
                    case 'assets/songcover/numb.png':
                        return require('../assets/songcover/numb.png');
                    case 'assets/songcover/stilllovingyou.png':
                        return require('../assets/songcover/stilllovingyou.png');
                    case 'assets/songcover/anti-hero.png':
                        return require('../assets/songcover/anti-hero.png');
                    case 'assets/songcover/woman.png':
                        return require('../assets/songcover/woman.png');

                    // Playlist covers
                    case 'assets/playlistcover/liked-songs.png':
                        return require('../assets/playlistcover/liked-songs.png');

                    // Default untuk placeholder image
                    default:
                        console.warn("Unknown local asset path:", imagePath);
                        return require('../assets/sileighty vintage.png'); // Fallback ke image default
                }
            } catch (error) {
                console.error("Error loading image:", error);
                return require('../assets/sileighty vintage.png');
            }
        }

        // Handle URL
        return { uri: imagePath };
    };

    useEffect(() => {
        // Gunakan semua playlist dari data JSON seperti di HomeScreen
        const allPlaylists = musicData.playlists || [];
        const userLibrary = musicData.userLibrary.user1 || {};

        // Transformasi data playlist agar sesuai dengan format yang dibutuhkan
        const formattedPlaylists = allPlaylists.map(playlist => ({
            id: playlist.id,
            title: playlist.name,
            coverImage: playlist.cover,
            creator: playlist.createdBy === 'spotify' ? 'Spotify' : 'You',
            description: playlist.description,
            type: 'playlist'
        }));

        // Tambahkan special playlist Liked Songs
        const likedSongsPlaylist = {
            id: 'liked-songs',
            title: 'Liked Songs',
            coverImage: "https://i.scdn.co/image/ab67706f000000025f0ff9251e3cfe641160dc31",
            creator: 'Playlist',
            description: 'A collection of your liked songs',
            type: 'liked-songs'
        };

        // Tambahkan tombol "Add artists" dan "Add podcasts" di akhir
        const additionalButtons = [
            {
                id: 'add-artists',
                title: 'Add artists',
                coverImage: null,
                creator: '',
                description: 'Follow the artists you like',
                type: 'add-button'
            },
            {
                id: 'add-podcasts',
                title: 'Add podcasts & shows',
                coverImage: null,
                creator: '',
                description: 'Follow podcasts & shows',
                type: 'add-button'
            }
        ];

        // Gabungkan semua data - liked songs di awal, lalu playlists, lalu tombol tambahan
        const combinedPlaylists = [
            likedSongsPlaylist,
            ...formattedPlaylists,
            ...additionalButtons
        ];

        setUserPlaylists(combinedPlaylists);
    }, []);

    // Toggle between list and grid view
    const toggleViewMode = () => {
        setViewMode(viewMode === 'list' ? 'grid' : 'list');
    };

    const handleFilterChange = (filter) => {
        setFilterOption(filter);
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

        // Handle untuk playlist normal
        const navigateToPlaylist = () => {
            // Tidak navigasi untuk tombol "add"
            if (item.type === 'add-button') return;

            // Navigasi ke halaman playlist
            navigation.navigate(ROUTES.PLAYLIST, { playlistId: item.id });
        };

        if (viewMode === 'list') {
            // List View 
            return (
                <TouchableOpacity
                    className="flex-row items-center px-5 py-3"
                    onPress={navigateToPlaylist}
                >
                    <Image
                        source={getImageSource(item.coverImage)}
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
                    onPress={navigateToPlaylist}
                >
                    <View className="items-center">
                        <View className="items-center">
                            <Image
                                source={getImageSource(item.coverImage)}
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
                    <TouchableOpacity
                        className={`${filterOption === 'All' ? 'bg-[#1DB954]' : 'bg-[#333333]'} rounded-full px-5 py-2 mr-2`}
                        onPress={() => handleFilterChange('All')}
                    >
                        <Text className={`${filterOption === 'All' ? 'text-black' : 'text-white'}`}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`${filterOption === 'Playlists' ? 'bg-[#1DB954]' : 'bg-[#333333]'} rounded-full px-5 py-2 mr-2`}
                        onPress={() => handleFilterChange('Playlists')}
                    >
                        <Text className={`${filterOption === 'Playlists' ? 'text-black' : 'text-white'}`}>Playlists</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={`${filterOption === 'Artists' ? 'bg-[#1DB954]' : 'bg-[#333333]'} rounded-full px-5 py-2 mr-2`}
                        onPress={() => handleFilterChange('Artists')}
                    >
                        <Text className={`${filterOption === 'Artists' ? 'text-black' : 'text-white'}`}>Artists</Text>
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

                    {/* View Mode Toggle */}
                    <TouchableOpacity onPress={toggleViewMode}>
                        {viewMode === 'list' ? (
                            <Feather name="grid" size={20} color="white" />
                        ) : (
                            <MaterialIcons name="format-list-bulleted" size={20} color="white" />
                        )}
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={userPlaylists}
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
        </SafeAreaView>
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