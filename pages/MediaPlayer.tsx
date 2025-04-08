import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, ScrollView, Animated, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, MaterialIcons, FontAwesome5, AntDesign, Entypo, SimpleLineIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';
import musicData from '../data/data.json';
import { ROUTES } from '../navigation/routes';

const { width: screenWidth } = Dimensions.get('window');

const MediaPlayer = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { song, playlist, index, songs } = route.params;
    const [currentSong, setCurrentSong] = useState(song);
    const [currentIndex, setCurrentIndex] = useState(index);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [shuffleActive, setShuffleActive] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat all, 2: repeat one
    const [lyrics, setLyrics] = useState(null);
    const [artist, setArtist] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    // Update time without using animation
    const timerRef = useRef(null);

    // Fungsi untuk mengambil sumber gambar
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

    const getLyricsArray = () => {
        if (!currentSong.lyrics) return null;
        return currentSong.lyrics.split(' / ');
    };

    // Find artist info
    useEffect(() => {
        const artistData = musicData.artists.find(a => a.id === currentSong.artistId);
        if (artistData) {
            setArtist(artistData);
        }


        // Reset time and start playing
        setCurrentTime(0);
        startTimer();

        // Clean up
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [currentSong]);

    const formatNumber = (count) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
    };

    // Handle timer for playback simulation
    const startTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= currentSong.duration) {
                        clearInterval(timerRef.current);
                        // Allow a small delay before moving to next song
                        setTimeout(() => handleNext(), 500);
                        return prev;
                    }
                    return prev + 0.1;
                });
            }, 100);
        }
    };

    // Update timer when play state changes
    useEffect(() => {
        if (isPlaying) {
            startTimer();
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isPlaying]);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handlePrevious = () => {
        if (currentTime > 3) {
            // If more than 3 seconds into the song, restart current song
            setCurrentTime(0);
            return;
        }

        let newIndex;
        if (shuffleActive) {
            newIndex = Math.floor(Math.random() * songs.length);
        } else {
            newIndex = (currentIndex - 1 + songs.length) % songs.length;
        }

        setCurrentIndex(newIndex);
        setCurrentSong(songs[newIndex]);
    };

    const handleNext = () => {
        let newIndex;
        if (repeatMode === 2) {
            // Repeat one
            setCurrentTime(0);
            return;
        } else if (shuffleActive) {
            newIndex = Math.floor(Math.random() * songs.length);
        } else {
            newIndex = (currentIndex + 1) % songs.length;
        }

        setCurrentIndex(newIndex);
        setCurrentSong(songs[newIndex]);
    };

    const toggleShuffle = () => {
        setShuffleActive(!shuffleActive);
    };

    const toggleRepeat = () => {
        setRepeatMode((repeatMode + 1) % 3);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View className="flex-1 bg-[#121212]">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* Header */}
            <View
                style={{ paddingTop: Constants.statusBarHeight + 10 }}
                className="px-4 pb-4 flex-row items-center justify-between"
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-down" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-sm">
                    {playlist.name}
                </Text>
                <TouchableOpacity>
                    <Entypo name="dots-three-horizontal" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6">
                {/* Album Art */}
                <View className="px-8 my-5 items-center justify-center">
                    <Image
                        source={getImageSource(currentSong.image)}
                        className="w-[350px] h-[350px] shadow-2xl rounded"
                    />
                </View>

                {/* Switch to Video button */}
                <View className="mb-2">
                    <TouchableOpacity
                        className="self-start flex-row items-center bg-[rgba(255,255,255,0.1)] rounded-full px-3 py-2"
                    >
                        <Octicons name="video" size={16} color="white" />
                        <Text className="text-white text-xs font-bold ml-2">Switch to video</Text>
                    </TouchableOpacity>
                </View>

                {/* Song Info */}
                <View className="mb-4 flex-row items-start justify-between">
                    <View className="flex-1 pr-4">
                        <Text
                            className="text-white text-2xl font-bold"
                            numberOfLines={1}
                        >
                            {currentSong.title}
                        </Text>
                        <Text className="text-[#b3b3b3] text-base">
                            {currentSong.artistName}
                        </Text>
                    </View>

                    <TouchableOpacity className="p-2" onPress={toggleLike}>
                        {isLiked ? (
                            <Octicons name="plus-circle" size={24} color="white" />
                        ) : (
                            <Octicons name='check-circle-fill' size={24} color={"#1DB954"} />
                        )}

                    </TouchableOpacity>

                </View>

                {/* Progress Bar */}
                <View className="mb-5">
                    <Slider
                        minimumValue={0}
                        maximumValue={currentSong.duration}
                        value={currentTime}
                        minimumTrackTintColor="#1DB954"
                        maximumTrackTintColor="rgba(255,255,255,0.3)"
                        thumbTintColor="#fff"
                        onValueChange={(value) => {
                            setCurrentTime(value);
                        }}
                        onSlidingComplete={(value) => {
                            setCurrentTime(value);
                            // Restart the timer from the new position
                            startTimer();
                        }}
                        style={{ height: 40 }}
                    />

                    <View className="flex-row justify-between">
                        <Text className="text-[#b3b3b3] text-xs">
                            {formatTime(currentTime)}
                        </Text>
                        <Text className="text-[#b3b3b3] text-xs">
                            {formatTime(currentSong.duration)}
                        </Text>
                    </View>
                </View>

                {/* Controls */}
                <View className="flex-row items-center justify-around mb-8">
                    <TouchableOpacity onPress={toggleShuffle}>
                        <Ionicons
                            name="shuffle"
                            size={24}
                            color={shuffleActive ? "#1DB954" : "#b3b3b3"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePrevious}>
                        <Ionicons name="play-skip-back" size={32} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handlePlayPause}
                        className="bg-white w-[64px] h-[64px] rounded-full justify-center items-center"
                    >
                        <Ionicons
                            name={isPlaying ? "pause" : "play"}
                            size={28}
                            color="black"
                            style={isPlaying ? {} : { marginLeft: 4 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleNext}>
                        <Ionicons name="play-skip-forward" size={32} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleRepeat}>
                        {repeatMode === 0 ? (
                            <Ionicons name="repeat" size={24} color="#b3b3b3" />
                        ) : repeatMode === 1 ? (
                            <Ionicons name="repeat" size={24} color="#1DB954" />
                        ) : (
                            <View>
                                <Ionicons name="repeat" size={24} color="#1DB954" />
                                <View
                                    className="absolute top-[-2px] right-[-3px] bg-[#1DB954] rounded-full w-[10px] h-[10px] items-center justify-center"
                                >
                                    <Text className="text-[#121212] text-[6px] font-bold">1</Text>
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Bottom Controls */}
                <View className="flex-row justify-between items-center mb-10">
                    <TouchableOpacity>
                        <Feather name="monitor" size={20} color="#b3b3b3" />
                    </TouchableOpacity>

                    <View className="flex-row items-center">
                        <TouchableOpacity className="mr-6">
                            <Entypo name='share-alternative' size={20} color="#b3b3b3" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="playlist-music" size={22} color="#b3b3b3" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* About Artist Section */}
                {artist && (
                    <View className="p-6 mb-10 bg-zinc-500 rounded-2xl">
                        <Text className="text-white text-lg font-bold mb-4">About the artist</Text>

                        <View className="flex-row items-center mb-4">
                            <Image
                                source={getImageSource(artist.image)}
                                className="w-[64px] h-[64px] rounded-full mr-4"
                            />
                            <View className="flex-1">
                                <Text className="text-white text-base font-bold">{artist.name}</Text>
                                <Text className="text-[#b3b3b3] text-xs">
                                    {formatNumber(artist.monthlyListeners)} monthly listeners
                                </Text>
                            </View>
                            <TouchableOpacity
                                className="border border-[#b3b3b3] rounded-full px-5 py-2"
                            >
                                <Text className="text-white text-sm">Follow</Text>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-[#b3b3b3] text-sm leading-5 text-left">
                            {(artist.about || `${artist.name} is a talented artist with a unique sound. Their music spans multiple genres and has garnered attention from fans worldwide.`)
                                .split('\n')
                                .map(line => line.trim())
                                .join('\n')}
                        </Text>
                    </View>
                )}

                {/* Lyrics Section */}
                {currentSong.lyrics && (
                    <View className="p-6 mb-16 *: bg-slate-600 rounded-2xl">
                        <Text className="text-white text-lg font-bold mb-4">Lyrics</Text>

                        {getLyricsArray().map((line, idx) => (
                            <Text
                                key={idx}
                                className="text-white text-base leading-8"
                            >
                                {line}
                            </Text>
                        ))}
                    </View>
                )}

                {/* Large bottom spacer */}
                <View className="h-[100px]" />
            </ScrollView>
        </View>
    );
};

export default MediaPlayer;