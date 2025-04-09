import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Animated, BackHandler } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome6, Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { ROUTES } from '../navigation/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import musicData from '../data/data.json';
import EditProfileDrawer from '../component/EditProfileDrawer';


const ProfileScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('User');
    const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
    const headerHeight = Constants.statusBarHeight + 50;
    const scrollY = useRef(new Animated.Value(0)).current;

    const profileImage = require('../assets/sileighty vintage.png');

    const [userPlaylists, setUserPlaylists] = useState([]);
    const [recentArtists, setRecentArtists] = useState([]);

    const formatNumberWithDots = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const getImageSource = (imagePath) => {
        if (!imagePath) return require('../assets/sileighty vintage.png');

        if (imagePath.startsWith('assets/')) {
            try {
                switch (imagePath) {
                    // Artist covers
                    case 'assets/artistcover/scorpions.png':
                        return require('../assets/artistcover/scorpions.png');
                    case 'assets/artistcover/linkinpark.png':
                        return require('../assets/artistcover/linkinpark.png');

                    default:
                        console.warn("Unknown local asset path:", imagePath);
                        return require('../assets/sileighty vintage.png');
                }
            } catch (error) {
                console.error("Error loading image:", error);
                return require('../assets/sileighty vintage.png');
            }
        }

        return { uri: imagePath };
    };

    const handleSaveProfile = async (newUsername) => {
        try {
            await AsyncStorage.setItem('userDisplayName', newUsername);
            setUsername(newUsername);
            setIsEditDrawerVisible(false);
        } catch (error) {
            console.error('Error saving username:', error);
        }
    };

    useEffect(() => {
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

        const playlists = musicData.playlists
            .slice(0, 3)
            .map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                cover: playlist.cover,
                saves: playlist.followers || 0,
                creator: playlist.createdBy === 'spotify' ? 'Spotify' : username
            }));

        setUserPlaylists(playlists);

        const artists = musicData.artists
            .slice(0, 4)
            .map(artist => ({
                id: artist.id,
                name: artist.name,
                image: artist.image,
                monthlyListeners: artist.monthlyListeners || 0
            }));

        setRecentArtists(artists);

        const unsubscribe = navigation.addListener('focus', loadUsername);
        return unsubscribe;
    }, [username, navigation]);

    const formatNumber = (count) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
    };

    const headerNameOpacity = scrollY.interpolate({
        inputRange: [0, 60, 90],
        outputRange: [0, 0.5, 1],
        extrapolate: 'clamp'
    });

    const profileInfoOpacity = scrollY.interpolate({
        inputRange: [0, 60, 90],
        outputRange: [1, 0.5, 0],
        extrapolate: 'clamp'
    });

    const profileInfoScale = scrollY.interpolate({
        inputRange: [0, 60, 90],
        outputRange: [1, 0.95, 0.9],
        extrapolate: 'clamp'
    });

    const profileInfoTranslateY = scrollY.interpolate({
        inputRange: [0, 60, 90],
        outputRange: [0, -10, -20],
        extrapolate: 'clamp'
    });

    return (
        <View className="flex-1 bg-[#121212]">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* Header dengan BlurView */}
            <BlurView
                intensity={80}
                tint="dark"
                style={[styles.headerContainer, { paddingTop: Constants.statusBarHeight }]}
            >
                <View className="flex-row items-center h-16 px-4 justify-center relative">
                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute left-4"
                    >
                        <FontAwesome6 name="angle-left" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Username */}
                    <Animated.Text
                        style={{ opacity: headerNameOpacity }}
                        className="text-white text-lg font-bold"
                    >
                        {username}
                    </Animated.Text>

                    {/* Icon */}
                    <Animated.View
                        style={{
                            opacity: headerNameOpacity,
                            position: 'absolute',
                            right: 16
                        }}
                    >
                        <TouchableOpacity>
                            <Entypo name='dots-three-horizontal' size={20} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </BlurView>

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
                {/* Profile Info */}
                <View className='p-4 mb-40'>
                    <Animated.View style={{
                        opacity: profileInfoOpacity,
                        transform: [
                            { scale: profileInfoScale },
                            { translateY: profileInfoTranslateY }
                        ]
                    }}>
                        <View className="flex flex-row gap-5 mb-8">
                            <Image
                                source={require('../assets/sileighty vintage.png')}
                                className="h-28 w-28 rounded-full"
                            />
                            <View className='flex flex-col gap-1 justify-center'>
                                <Text className="text-white text-2xl font-bold">{username}</Text>
                                <View className='flex flex-row items-center'>
                                    <Text className="text-gray-400">
                                        <Text className="font-bold text-white">0</Text> followers
                                    </Text>
                                    <Entypo name="dot-single" size={14} color="white" style={{ marginHorizontal: 4 }} />
                                    <Text className="text-gray-400">
                                        <Text className="font-bold text-white">0</Text> following
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Profile Menu */}
                    <View className="flex flex-col gap-10">
                        <View className="flex flex-row gap-5 items-center">
                            <TouchableOpacity
                                className='border border-zinc-500 rounded-full px-4 py-2 self-start'
                                onPress={() => setIsEditDrawerVisible(true)}
                            >
                                <Text className='text-white font-bold'>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Entypo name='share-alternative' size={20} color="gray"></Entypo>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Entypo name='dots-three-horizontal' size={20} color="gray"></Entypo>
                            </TouchableOpacity>
                        </View>

                        {/* Playlist Section */}
                        <View className='flex flex-col gap-5'>
                            <Text className='text-xl text-white font-bold'>Playlists</Text>
                            <View className='flex flex-col gap-4'>
                                {userPlaylists.length > 0 ? (
                                    userPlaylists.map((playlist, index) => (
                                        <TouchableOpacity
                                            key={playlist.id}
                                            className='flex flex-row gap-5'
                                            onPress={() => navigation.navigate(ROUTES.PLAYLIST, { playlistId: playlist.id })}
                                        >
                                            <Image
                                                source={getImageSource(playlist.cover)}
                                                className="h-14 w-14"
                                            />
                                            <View className='flex flex-col'>
                                                <Text className='text-white text-lg'>{playlist.name}</Text>
                                                <View className='flex flex-row items-center'>
                                                    <Text className='text-zinc-400 text-sm'>{formatNumberWithDots(playlist.saves)} saves</Text>
                                                    <Entypo name="dot-single" size={13} color="gray" style={{ marginHorizontal: 1 }} />
                                                    <Text className='text-zinc-400 text-sm'>{playlist.creator}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text className='text-zinc-400 text-sm'>No playlists saved yet</Text>
                                )}
                            </View>
                        </View>

                        {/* See all playlists button */}
                        {userPlaylists.length > 0 && (
                            <View className="items-center">
                                <TouchableOpacity
                                    className='border border-zinc-500 rounded-full px-4 py-2 justify-center'
                                    onPress={() => navigation.navigate(ROUTES.ALL_PLAYLIST)}
                                >
                                    <Text className='text-white text-sm font-bold text-center'>See all playlists</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Artists section */}
                        <View className='flex flex-col gap-5'>
                            <Text className='text-xl text-white font-bold'>Recently played artists</Text>
                            <View className='flex flex-col gap-4'>
                                {recentArtists.length > 0 ? (
                                    recentArtists.map((artist, index) => (
                                        <View key={artist.id} className='flex flex-row gap-5'>
                                            <Image
                                                source={getImageSource(artist.image)}
                                                className="h-14 w-14 rounded-full"
                                            />
                                            <View className="flex-1">
                                                <Text className="text-white text-base font-bold">{artist.name}</Text>
                                                <Text className="text-[#b3b3b3] text-xs">
                                                    {formatNumber(artist.monthlyListeners)} followers
                                                </Text>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <Text className='text-zinc-400 text-sm'>No artists available</Text>
                                )}
                            </View>
                        </View>

                        {/* See all artists button */}
                        {recentArtists.length > 0 && (
                            <View className="items-center">
                                <TouchableOpacity
                                    className='border border-zinc-500 rounded-full px-4 py-2 justify-center'
                                    onPress={() => navigation.navigate(ROUTES.ALL_ARTIST)}
                                >
                                    <Text className='text-white text-sm font-bold text-center'>See all artists</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Animated.ScrollView>
            
            {/* Edit Profile Bottom Drawer */}
            <EditProfileDrawer
                isVisible={isEditDrawerVisible}
                onClose={() => setIsEditDrawerVisible(false)}
                currentUsername={username}
                onSave={handleSaveProfile}
                profileImage={profileImage}
            />
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'rgba(18, 18, 18, 0.75)'
    },
});

export default ProfileScreen;