import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, ScrollView, StyleSheet } from "react-native";
import { FontAwesome6, Entypo, SimpleLineIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { ROUTES } from '../navigation/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import musicData from '../data/data.json';
import { BlurView } from 'expo-blur';

const AllArtistScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('User');
    const [allArtists, setAllArtists] = useState([]);
    const headerHeight = Constants.statusBarHeight + 50;
    const [followedArtistIds, setFollowedArtistIds] = useState([]);

    const toggleFollow = (artistId) => {
        setFollowedArtistIds(prev => {
            if (prev.includes(artistId)) {
                return prev.filter(id => id !== artistId);
            } else {
                return [...prev, artistId];
            }
        });
    };

    const isArtistFollowed = (artistId) => {
        return followedArtistIds.includes(artistId);
    };

    const formatNumberWithDots = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const getImageSource = (imagePath) => {
        if (!imagePath) return require('../assets/sileighty vintage.png');

        if (imagePath.startsWith('assets/')) {
            try {
                switch (imagePath) {
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

        const artists = musicData.artists
            .map(artist => ({
                id: artist.id,
                name: artist.name,
                image: artist.image,
                monthlyListeners: artist.monthlyListeners || 0
            }));

        setAllArtists(artists);
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
                        Recently played artists
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
                        {allArtists.length > 0 ? (
                            allArtists.map((artist, index) => (
                                <TouchableOpacity
                                    key={artist.id}
                                    className="flex flex-row gap-5 items-center"
                                    onPress={() => {
                                        console.log(`Navigate to artist: ${artist.name}`);
                                    }}
                                >
                                    <Image
                                        source={getImageSource(artist.image)}
                                        className="h-16 w-16 rounded-full"
                                    />
                                    <View className="flex flex-col justify-center">
                                        <Text className="text-white text-lg">{artist.name}</Text>
                                        <Text className="text-zinc-400 text-sm">
                                            {formatNumberWithDots(artist.monthlyListeners)} followers
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        className="absolute right-4"
                                        onPress={() => toggleFollow(artist.id)}
                                    >
                                        {isArtistFollowed(artist.id) ? (
                                            <Octicons name="check" size={24} color="#1DB954" />
                                        ) : (
                                            <SimpleLineIcons name="user-follow" size={24} color="#b3b3b3" />
                                        )}
                                    </TouchableOpacity>

                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text className="text-zinc-400 text-sm">No artists available</Text>
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

export default AllArtistScreen;