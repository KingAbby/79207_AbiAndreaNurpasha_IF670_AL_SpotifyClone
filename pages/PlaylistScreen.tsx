import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons, MaterialCommunityIcons, AntDesign, Entypo, FontAwesome6, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';

import musicData from '../data/data.json';
import { ROUTES } from '../navigation/routes';

const PlaylistScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { playlistId, customPlaylist } = route.params;
    const headerHeight = Constants.statusBarHeight + 55;
    const scrollY = useRef(new Animated.Value(0)).current;
    const [username, setUsername] = useState('User');

    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [createdBy, setCreatedBy] = useState('');

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

                    // Artist covers
                    case 'assets/artistcover/scorpions.png':
                        return require('../assets/artistcover/scorpions.png');
                    case 'assets/artistcover/linkinpark.png':
                        return require('../assets/artistcover/linkinpark.png');

                    // Tambahkan kasus lain untuk setiap asset lokal
                    default:
                        console.warn("Unknown local asset path:", imagePath);
                        return { uri: 'https://via.placeholder.com/350' };
                }
            } catch (error) {
                console.error("Error loading image:", error);
                return { uri: 'https://via.placeholder.com/350' };
            }
        }

        // Handle URL
        return { uri: imagePath };
    };

    useEffect(() => {
        // Gunakan customPlaylist jika ada, atau temukan dari data JSON
        const playlistData = customPlaylist || musicData.playlists.find(p => p.id === playlistId);
        setPlaylist(playlistData);

        if (playlistData) {
            // ...kode yang sudah ada...
        }
    }, [playlistId, customPlaylist, username]);

    const headerNameOpacity = scrollY.interpolate({
        inputRange: [0, 140, 180],
        outputRange: [0, 0.5, 1],
        extrapolate: 'clamp'
    });

    // Cover image animations - fade out and move away faster
    const coverImageOpacity = scrollY.interpolate({
        inputRange: [0, 80, 120],
        outputRange: [1, 0.3, 0],
        extrapolate: 'clamp'
    });

    const coverImageScale = scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [1, 0.8],
        extrapolate: 'clamp'
    });

    const coverImageTranslateY = scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [0, -30],
        extrapolate: 'clamp'
    });

    // Playlist info (name and description) animations - stay longer
    const playlistInfoOpacity = scrollY.interpolate({
        inputRange: [0, 140, 180],
        outputRange: [1, 0.5, 0],
        extrapolate: 'clamp'
    });

    const playlistInfoTranslateY = scrollY.interpolate({
        inputRange: [0, 140, 180],
        outputRange: [0, -10, -20],
        extrapolate: 'clamp'
    });

    const headerBorderColor = scrollY.interpolate({
        inputRange: [0, 140, 180],
        outputRange: [
            'rgba(40, 40, 40, 0)', // Transparent initially
            'rgba(40, 40, 40, 0.3)', // Slightly visible
            'rgba(40, 40, 40, 0.8)' // More visible
        ],
        extrapolate: 'clamp'
    });

    const headerBackgroundOpacity = scrollY.interpolate({
        inputRange: [0, 100, 140],
        outputRange: [0, 0.5, 0.9],
        extrapolate: 'clamp'
    });

    const headerBorderOpacity = scrollY.interpolate({
        inputRange: [0, 140, 180],
        outputRange: [0, 0.3, 0.8],
        extrapolate: 'clamp'
    });

    useEffect(() => {
        // Load the username when component mounts
        const loadUsername = async () => {
            try {
                const storedName = await AsyncStorage.getItem('userDisplayName');
                if (storedName) {
                    setUsername(storedName);
                }
            } catch (error) {
                console.error('Error loading username:', error);
            }
        };

        loadUsername();

        // Refresh username when screen comes into focus
        const unsubscribe = navigation.addListener('focus', loadUsername);
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (route.params?.customPlaylist && route.params?.customSongs) {
            setPlaylist(route.params.customPlaylist);
            setSongs(route.params.customSongs);

            // Determine creator's name for custom playlist
            if (route.params.customPlaylist.createdBy === 'spotify') {
                setCreatedBy('Spotify');
            } else {
                setCreatedBy(username);
            }
            return; // Exit early - we already have all data we need
        }
        // Find the playlist by id
        const playlistData = musicData.playlists.find(p => p.id === playlistId);
        setPlaylist(playlistData);

        if (playlistData) {
            // Get all songs in this playlist
            const playlistSongs = playlistData.songs.map(songId => {
                const song = musicData.songs.find(s => s.id === songId);
                if (song) {
                    const artist = musicData.artists.find(a => a.id === song.artistId);
                    return {
                        ...song,
                        artistName: artist ? artist.name : 'Unknown Artist'
                    };
                }
                return null;
            }).filter(song => song !== null);

            setSongs(playlistSongs);

            // Determine creator's name
            if (playlistData.createdBy === 'spotify') {
                setCreatedBy('Spotify');
            } else {
                setCreatedBy(username);
            }
        }
    }, [playlistId, username]);

    if (!playlist) {
        return (
            <View className="flex-1 justify-center items-center bg-[#121212]">
                <Text className="text-white text-base">Loading...</Text>
            </View>
        );
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const formatFollowers = (followers) => {
        if (followers >= 1000000) {
            return (followers / 1000000).toFixed(1) + 'M';
        } else if (followers >= 1000) {
            return (followers / 1000).toFixed(1) + 'K';
        } else {
            return followers.toString();
        }
    };


    const headerBackgroundColor = '#121212';

    return (
        <View className="flex-1 bg-[#121212]">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* Header with BlurView */}
            <Animated.View
                className="absolute top-0 left-0 right-0 z-10"
                style={{
                    paddingTop: Constants.statusBarHeight,
                    borderBottomWidth: 1,
                    borderBottomColor: headerBorderColor
                }}
            >
                {/* Animated background that fades in when scrolling */}
                <Animated.View
                    className="absolute top-0 left-0 right-0 bottom-0"
                    style={{
                        opacity: headerBackgroundOpacity
                    }}
                >
                    <BlurView
                        intensity={80}
                        tint="dark"
                        className="absolute inset-0 bg-[rgba(18,18,18,0.85)]"
                    />
                </Animated.View>

                <View className="flex-row items-center h-16 px-4 justify-center relative">
                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute left-4 z-10"
                    >
                        <FontAwesome6 name="angle-left" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Playlist name that appears when scrolling */}
                    <Animated.Text
                        style={{ opacity: headerNameOpacity }}
                        className="text-white text-lg font-bold"
                        numberOfLines={1}
                    >
                        {playlist.name}
                    </Animated.Text>

                </View>
            </Animated.View>

            {/* Main Content */}
            <Animated.ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingTop: headerHeight }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            >

                {/* Playlist Cover and Info */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.8)', '#121212']}
                    className="px-5 pb-5"
                >
                    <View className="items-center pt-3">
                        {/* Image with its own animation */}
                        <Animated.View
                            style={{
                                opacity: coverImageOpacity,
                                transform: [
                                    { scale: coverImageScale },
                                    { translateY: coverImageTranslateY }
                                ]
                            }}
                        >
                            <Image
                                source={getImageSource(playlist.cover)}
                                className="w-[180px] h-[180px] mb-5 shadow-lg"
                            />
                        </Animated.View>

                        {/* Title, description and creator info with different animation */}
                        <Animated.View
                            className="w-full px-5 gap-3"
                            style={{
                                opacity: playlistInfoOpacity,
                                transform: [
                                    { translateY: playlistInfoTranslateY }
                                ]
                            }}
                        >
                            <Text className="text-white text-2xl font-bold">
                                {playlist.name}
                            </Text>

                            {/* Description & Users */}
                            <View className='flex-col'>
                                <Text className="text-[#b3b3b3] text-sm">
                                    {playlist.description}
                                </Text>

                                {/* Username & Profile */}
                                <View className='flex-row gap-2 items-center'>
                                    <Image
                                        source={require('../assets/sileighty vintage.png')}
                                        className="h-5 w-5 rounded-full"
                                    />
                                    <Text className="text-white text-xs font-bold mr-2">
                                        {createdBy}
                                    </Text>
                                </View>
                            </View>

                            <View className="flex-row items-center">
                                <Feather name="globe" size={14} color="#b3b3b3" />
                                <Text className="text-[#b3b3b3] text-xs ml-1">
                                    {formatFollowers(playlist.followers)} followers
                                </Text>
                            </View>
                        </Animated.View>
                    </View>
                </LinearGradient>

                {/* Action Bar */}
                <View className="flex-row justify-between items-center px-5 py-4">
                    <View className="flex-row items-center">
                        <TouchableOpacity className="mr-4">
                            <Feather name="wifi" size={18} color="#b3b3b3" />
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-4">
                            <SimpleLineIcons name="arrow-down-circle" size={18} color="#b3b3b3" />
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-4">
                            <SimpleLineIcons name="user-follow" size={18} color="#b3b3b3" />
                        </TouchableOpacity>
                        <TouchableOpacity className="mr-4">
                            <Feather name="more-horizontal" size={18} color="#b3b3b3" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center">
                        <TouchableOpacity className="mr-4">
                            <Ionicons name="shuffle" size={24} color="#1DB954" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-[#1DB954] w-[42px] h-[42px] rounded-full justify-center items-center"
                            onPress={togglePlayPause}
                        >
                            {isPlaying ? (
                                <Ionicons name="pause" size={24} color="black" />
                            ) : (
                                <Ionicons name="play" size={24} color="black" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Secondary actions */}
                <View className="flex-row items-center px-5 pb-4 gap-2">
                    <TouchableOpacity className="flex-row items-center px-4 py-2 rounded-full bg-[#2A2A2A]">
                        <AntDesign name="plus" size={18} color="white" />
                        <Text className="text-white ml-1.5 text-xs font-bold">Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center px-4 py-2 rounded-full bg-[#2A2A2A]">
                        <MaterialCommunityIcons name="sort" size={18} color="white" />
                        <Text className="text-white ml-1.5 text-xs font-bold">Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center px-4 py-2 rounded-full bg-[#2A2A2A]">
                        <Feather name="edit-2" size={18} color="white" />
                        <Text className="text-white ml-1.5 text-xs font-bold">Edit</Text>
                    </TouchableOpacity>
                </View>

                {/* Songs list */}
                <View className="px-5">
                    {songs.map((song, index) => (
                        <TouchableOpacity
                            key={song.id}
                            className="flex-row items-center py-2.5"
                            onPress={() => {
                                navigation.navigate(ROUTES.MEDIA_PLAYER, {
                                    song: song,
                                    playlist: playlist,
                                    index: index,
                                    songs: songs
                                });
                            }}
                        >
                            <Image
                                source={getImageSource(song.image)}
                                className="w-[50px] h-[50px] mr-2.5"
                            />
                            <View className="flex-1">
                                <Text className="text-white text-base mb-1">{song.title}</Text>
                                <Text className="text-[#b3b3b3] text-sm">{song.artistName}</Text>
                            </View>
                            <TouchableOpacity className="p-1.5">
                                <Feather name="more-horizontal" size={20} color="#b3b3b3" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bottom spacer */}
                <View className="h-[100px]" />
            </Animated.ScrollView>
        </View>
    );
};

export default PlaylistScreen;