import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, ScrollView, StyleSheet } from "react-native";
import { FontAwesome6, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { ROUTES } from '../navigation/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import musicData from '../data/data.json';
import { BlurView } from 'expo-blur';

const AllPlaylistsScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('User');
    const [allPlaylists, setAllPlaylists] = useState([]);
    const headerHeight = Constants.statusBarHeight + 50;

    const formatNumberWithDots = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const getImageSource = (imagePath) => {
        if (!imagePath) return require('../assets/sileighty vintage.png');

        if (imagePath.startsWith('assets/')) {
            try {
                switch (imagePath) {
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

        return { uri: imagePath };
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
            .map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                cover: playlist.cover,
                saves: playlist.followers || 0,
                creator: playlist.createdBy === 'spotify' ? 'Spotify' : username
            }));

        setAllPlaylists(playlists);
    }, []);

    return (
        <View className="flex-1 bg-[#121212]">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* Header dengan BlurView */}
            <BlurView
                intensity={80}
                tint="dark"
                style={styles.headerContainer}
            >
                <View className="flex-row items-center h-16 px-4 justify-center relative">
                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute left-4"
                    >
                        <FontAwesome6 name="angle-left" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text className="text-white text-lg font-bold">
                        Playlists
                    </Text>
                </View>
            </BlurView>

            {/* Main Content */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingTop: headerHeight, paddingHorizontal: 16 }}
            >
                <View className="flex flex-col gap-5 pt-4 pb-20">
                    <View className="flex flex-col gap-4">
                        {allPlaylists.length > 0 ? (
                            allPlaylists.map((playlist, index) => (
                                <TouchableOpacity
                                    key={playlist.id}
                                    className="flex flex-row gap-5"
                                    onPress={() => navigation.navigate(ROUTES.PLAYLIST, { playlistId: playlist.id })}
                                >
                                    <Image
                                        source={getImageSource(playlist.cover)}
                                        className="h-16 w-16"
                                    />
                                    <View className="flex flex-col justify-center">
                                        <Text className="text-white text-lg">{playlist.name}</Text>
                                        <View className="flex flex-row items-center">
                                            <Text className="text-zinc-400 text-sm">
                                                {formatNumberWithDots(playlist.saves)} saves
                                            </Text>
                                            <Entypo name="dot-single" size={13} color="gray" style={{ marginHorizontal: 1 }} />
                                            <Text className="text-zinc-400 text-sm">{username}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text className="text-zinc-400 text-sm">No playlists available</Text>
                        )}
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'rgba(18, 18, 18, 0.75)',
        paddingTop: Constants.statusBarHeight,
    },
});


export default AllPlaylistsScreen;