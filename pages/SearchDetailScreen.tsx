import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StatusBar, TextInput, ScrollView, StyleSheet } from "react-native";
import { AntDesign, Octicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import musicData from '../data/data.json';
import { ROUTES } from '../navigation/routes';

const SearchDetailScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [allItems, setAllItems] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const textInputRef = useRef(null);

    useEffect(() => {
        // Create mixed results of songs and playlists
        const songsWithType = musicData.songs.map(song => {
            const artist = musicData.artists.find(a => a.id === song.artistId);
            return {
                id: `song-${song.id}`,
                title: song.title,
                subtitle: artist ? artist.name : 'Unknown Artist',
                image: song.image,
                type: 'song',
                originalData: {
                    ...song,
                    artistName: artist ? artist.name : 'Unknown Artist'
                }
            };
        });

        const playlistsWithType = musicData.playlists.map(playlist => ({
            id: `playlist-${playlist.id}`,
            title: playlist.name,
            subtitle: 'Playlist',
            image: playlist.cover,
            type: 'playlist',
            originalData: playlist
        }));

        // Interleave songs and playlists to create a mixed list
        let mixed = [];
        const maxLength = Math.max(songsWithType.length, playlistsWithType.length);

        for (let i = 0; i < 10; i++) {
            if (i < songsWithType.length) mixed.push(songsWithType[i]);
            if (i < playlistsWithType.length) mixed.push(playlistsWithType[i]);
        }

        // Limit results for performance
        setAllItems(mixed);
        setSearchResults(mixed.slice(0, 15));

        // Auto focus search input
        setTimeout(() => {
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
        }, 100);
    }, []);

    // Search function
    const handleSearch = (text) => {
        setSearchQuery(text);

        if (!text.trim()) {
            // If search query is empty, show initial results (limited to 15)
            setSearchResults(allItems.slice(0, 15));
            return;
        }

        // Filter items based on search query
        const filteredItems = allItems.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(text.toLowerCase());
            const subtitleMatch = item.subtitle.toLowerCase().includes(text.toLowerCase());
            return titleMatch || subtitleMatch;
        });

        setSearchResults(filteredItems);
    };

    // Fungsi untuk mengambil sumber gambar
    const getImageSource = (imagePath) => {
        if (!imagePath) return require('../assets/sileighty vintage.png');

        if (imagePath.startsWith('assets/')) {
            try {
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

                    default:
                        console.warn("Unknown local asset path:", imagePath);
                        return require('../assets/sileighty vintage.png');
                }
            } catch (error) {
                console.error("Error loading image:", error);
                return require('../assets/sileighty vintage.png');
            }
        }

        // Handle URL
        return { uri: imagePath };
    };

    // Handle item press
    const handleItemPress = (item) => {
        if (item.type === 'song') {
            // Create a simple playlist for search results
            const searchPlaylist = {
                id: 'search-results',
                name: 'Search Results',
                cover: item.image
            };

            // Get all songs
            const allSongs = searchResults
                .filter(result => result.type === 'song')
                .map(result => result.originalData);

            // Find index of current song
            const songIndex = allSongs.findIndex(song => song.id === item.originalData.id);

            navigation.navigate(ROUTES.MEDIA_PLAYER, {
                song: item.originalData,
                playlist: searchPlaylist,
                index: songIndex >= 0 ? songIndex : 0,
                songs: allSongs
            });
        } else if (item.type === 'playlist') {
            // Extract the actual playlist ID (remove 'playlist-' prefix)
            const playlistId = item.originalData.id;
            navigation.navigate(ROUTES.PLAYLIST, { playlistId });
        }
    };

    return (
        <View className="flex-1 bg-[#121212]">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* Fixed Header with Search Bar */}
            <View style={styles.headerContainer}>
                <View className="flex-row items-center px-4 h-[50px] gap-4">
                    <View className="flex-row items-center flex-1 bg-[#2A2A2A] rounded-xl px-4 py-2">
                        <Octicons name="search" size={20} color="white" />
                        <TextInput
                            ref={textInputRef}
                            placeholder="What do you want to listen to?"
                            placeholderTextColor="lightgray"
                            style={{ fontWeight: 'semibold' }}
                            value={searchQuery}
                            onChangeText={handleSearch}
                            className="flex-1 ml-2 text-white"
                            returnKeyType="search"
                            autoFocus={true}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => handleSearch('')}>
                                <AntDesign name="close" size={18} color="#666" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text className="text-white">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingTop: Constants.statusBarHeight + 50 + 10 }}
            >
                <View className="px-4 pb-20">
                    {/* Search Results Header - Changes based on search state */}
                    {searchQuery ? (
                        <Text className="text-white text-lg font-bold mb-4">Results for "{searchQuery}"</Text>
                    ) : (
                        <Text className="text-white text-lg font-bold mb-4">Recent searches</Text>
                    )}

                    {/* Show message if no results */}
                    {searchResults.length === 0 && searchQuery.trim() !== '' && (
                        <Text className="text-gray-400 text-base text-center py-10">
                            No results found for "{searchQuery}"
                        </Text>
                    )}

                    {/* Mixed Results - one unified list */}
                    <View className="mb-6">
                        {searchResults.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                className="flex-row items-center py-2.5"
                                onPress={() => handleItemPress(item)}
                            >
                                <Image
                                    source={getImageSource(item.image)}
                                    className={`w-[50px] h-[50px] mr-4 ${item.type === 'song' ? 'rounded' : ''}`}
                                />
                                <View className="flex-1">
                                    <Text className="text-white text-base mb-1">{item.title}</Text>
                                    <View className="flex-row items-center">
                                        {item.type === 'playlist' && (
                                            <Text className="text-[#b3b3b3] text-sm">Playlist</Text>
                                        )}
                                        {item.type === 'song' && (
                                            <Text className="text-[#b3b3b3] text-sm">Song • {item.subtitle}</Text>
                                        )}
                                    </View>
                                </View>
                                <TouchableOpacity className="p-1.5">
                                    <AntDesign name="close" size={20} color="#b3b3b3" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#121212',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default SearchDetailScreen;