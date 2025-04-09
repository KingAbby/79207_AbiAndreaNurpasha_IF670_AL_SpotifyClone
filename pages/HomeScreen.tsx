import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Platform } from "react-native";

import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import ProfileButton from '../component/ProfileButton';

import musicData from '../data/data.json';
import { ROUTES } from '../navigation/routes';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [activeFilter, setActiveFilter] = useState('All');
    const [playlists, setPlaylists] = useState([]);
    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [topMixes, setTopMixes] = useState([]);

    const getImageSource = (imagePath) => {
        if (!imagePath) return null;

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

                    // Artist covers
                    case 'assets/artistcover/scorpions.png':
                        return require('../assets/artistcover/scorpions.png');
                    case 'assets/artistcover/linkinpark.png':
                        return require('../assets/artistcover/linkinpark.png');

                    default:
                        console.warn("Unknown local asset path:", imagePath);
                        return { uri: 'https://via.placeholder.com/350' };
                }
            } catch (error) {
                console.error("Error loading image:", error);
                return { uri: 'https://via.placeholder.com/350' };
            }
        }

        return { uri: imagePath };
    };

    useEffect(() => {
        setPlaylists(musicData.playlists);
        setArtists(musicData.artists);
        setSongs(musicData.songs);

        const mixes = musicData.artists.map(artist => {
            const artistSongCount = musicData.songs.filter(song => song.artistId === artist.id).length;

            return {
                id: `mix-${artist.id}`,
                title: `${artist.name} Mix`,
                image: artist.image,
                description: `${artistSongCount} songs • Best of ${artist.name}`
            };
        });
        setTopMixes(mixes);

        const recentSongIds = musicData.userLibrary.user1.recentlyPlayed;
        const recent = recentSongIds.map(id => {
            const song = musicData.songs.find(s => s.id === id);
            if (song) {
                const artist = musicData.artists.find(a => a.id === song.artistId);
                return {
                    ...song,
                    artistName: artist ? artist.name : 'Unknown Artist'
                };
            }
            return null;
        }).filter(item => item !== null);

        setRecentlyPlayed(recent);
    }, []);

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    const getArtistById = (artistId) => {
        return artists.find(artist => artist.id === artistId);
    };



    return (
        <SafeAreaView style={styles.container} className="bg-[#121212]">

            {/* Header */}
            <View className="flex-row justify-between items-center px-5 py-3">
                {/* Profile & Filter*/}
                <View className="flex-row items-center">
                    <TouchableOpacity>
                        <ProfileButton onPress={() => navigation.openDrawer()} />
                    </TouchableOpacity>

                    {/* Filter Options */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="px-1"
                    >
                        <TouchableOpacity
                            className={`${activeFilter === 'All' ? 'bg-[#1DB954]' : 'bg-[#333333]'} rounded-full px-5 py-2 mr-2`}
                            onPress={() => handleFilterChange('All')}
                        >
                            <Text className={`${activeFilter === 'All' ? 'text-black' : 'text-white'}`}>All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${activeFilter === 'Music' ? 'bg-[#1DB954]' : 'bg-[#333333]'} rounded-full px-5 py-2 mr-2`}
                            onPress={() => handleFilterChange('Music')}
                        >
                            <Text className={`${activeFilter === 'Music' ? 'text-black' : 'text-white'}`}>Music</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`${activeFilter === 'Podcasts' ? 'bg-[#1DB954]' : 'bg-[#333333]'} rounded-full px-5 py-2 mr-2`}
                            onPress={() => handleFilterChange('Podcasts')}
                        >
                            <Text className={`${activeFilter === 'Podcasts' ? 'text-black' : 'text-white'}`}>Podcasts</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View className='flex-col gap-5 px-5 pt-2'>
                    {/* Playlist Grid */}
                    <View className='flex-col gap-2'>
                        {/* Dynamically create rows of playlists, 2 per row */}
                        {Array.from({ length: Math.ceil(playlists.length / 2) }).map((_, rowIndex) => (
                            <View key={`row-${rowIndex}`} className='flex-row justify-between mb-2'>
                                {playlists[rowIndex * 2] && (
                                    <TouchableOpacity
                                        className='flex-row items-center bg-[#2A2A2A] rounded overflow-hidden w-[48%]'
                                        onPress={() => navigation.navigate(ROUTES.PLAYLIST, { playlistId: playlists[rowIndex * 2].id })}
                                    >
                                        <Image
                                            source={{ uri: playlists[rowIndex * 2].cover }}
                                            className="h-14 w-14 rounded"
                                            resizeMode="cover"
                                        />
                                        <Text className='text-white font-bold ml-3 text-sm' numberOfLines={1}>
                                            {playlists[rowIndex * 2].name}
                                        </Text>
                                    </TouchableOpacity>
                                )}

                                {playlists[rowIndex * 2 + 1] && (
                                    <TouchableOpacity
                                        className='flex-row items-center bg-[#2A2A2A] rounded overflow-hidden w-[48%]'
                                        onPress={() => navigation.navigate(ROUTES.PLAYLIST, { playlistId: playlists[rowIndex * 2 + 1].id })}
                                    >
                                        <Image
                                            source={{ uri: playlists[rowIndex * 2 + 1].cover }}
                                            className="h-14 w-14 rounded"
                                            resizeMode="cover"
                                        />
                                        <Text className='text-white font-bold ml-3 text-sm' numberOfLines={1}>
                                            {playlists[rowIndex * 2 + 1].name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>

                    {/* Your Top Mixes Section */}
                    <View className='flex-col gap-3'>
                        <Text className='text-white text-2xl font-bold'>Your Top Mixes</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingRight: 20 }}
                        >
                            {topMixes.map((mix) => (
                                <TouchableOpacity
                                    key={mix.id}
                                    className='mr-4 w-36'
                                    onPress={() => {
                                        const artistId = mix.id.split('-')[1];

                                        const artist = artists.find(a => a.id === artistId);

                                        if (artist) {
                                            const artistSongs = songs.filter(song => song.artistId === artistId)
                                                .map(song => ({
                                                    ...song,
                                                    artistName: artist.name
                                                }));

                                            const artistPlaylist = {
                                                id: `artist-mix-${artistId}`,
                                                name: mix.title,
                                                description: `Songs by ${artist.name}`,
                                                cover: artist.image,
                                                followers: artist.monthlyListeners || 0,
                                                createdBy: 'spotify'
                                            };

                                            navigation.navigate(ROUTES.PLAYLIST, {
                                                playlistId: artistPlaylist.id,
                                                customPlaylist: artistPlaylist,
                                                customSongs: artistSongs
                                            });
                                        }
                                    }}
                                >
                                    <Image
                                        source={getImageSource(mix.image)}
                                        className="w-36 h-36 rounded mb-2"
                                        resizeMode="cover"
                                    />
                                    <Text className='text-white font-bold' numberOfLines={1}>{mix.title}</Text>
                                    <Text className='text-gray-400 text-xs' numberOfLines={2}>
                                        {mix.description}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Jump Back In Section */}
                    <View className='flex-col gap-3 mt-2'>
                        <Text className='text-white text-2xl font-bold'>Jump Back In</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingRight: 20 }}
                        >
                            {/* Liked Songs */}
                            <TouchableOpacity className='mr-4 w-36'>
                                <Image
                                    source={{ uri: "https://i.scdn.co/image/ab67706f000000025f0ff9251e3cfe641160dc31" }}
                                    className="w-36 h-36 rounded mb-2"
                                    resizeMode="cover"
                                />
                                <Text className='text-white font-bold' numberOfLines={1}>Liked Songs</Text>
                                <Text className='text-gray-400 text-xs' numberOfLines={1}>
                                    {musicData.userLibrary.user1.likedSongs.length} songs
                                </Text>
                            </TouchableOpacity>

                            {/* Recently played songs */}
                            {recentlyPlayed.map((song, index) => (
                                <TouchableOpacity
                                    key={song.id}
                                    className='mr-4 w-36'
                                    onPress={() => {

                                        const rencentPlaylist = {
                                            id: "recently-played-playlist",
                                            name: "Recently Played",
                                            cover: song.image,
                                            followers: musicData.userLibrary.user1.recentlyPlayed.length,
                                            createdBy: "spotify"
                                        };

                                        navigation.navigate(ROUTES.MEDIA_PLAYER, {
                                            song: song,
                                            playlist: rencentPlaylist,
                                            index: index,
                                            songs: recentlyPlayed,
                                        });
                                    }}
                                >
                                    <Image
                                        source={getImageSource(song.image)}
                                        className="w-36 h-36 rounded mb-2"
                                        resizeMode="cover"
                                    />
                                    <Text className='text-white font-bold' numberOfLines={1}>{song.title}</Text>
                                    <Text className='text-gray-400 text-xs' numberOfLines={1}>
                                        {song.artistName}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 50,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        zIndex: 10,
    },
});


export default HomeScreen;