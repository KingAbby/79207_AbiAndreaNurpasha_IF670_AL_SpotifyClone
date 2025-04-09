import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, FontAwesome5, Entypo, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import Constants from 'expo-constants';
import musicData from '../data/data.json';
import { usePlayerContext } from '../context/PlayerContext';

const MediaPlayer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [artist, setArtist] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const {
    currentSong,
    currentPlaylist,
    currentIndex,
    songs,
    isPlaying,
    currentTime,
    shuffleActive,
    repeatMode,
    getImageSource,
    playSong,
    togglePlayPause,
    handlePrevious,
    handleNext,
    toggleShuffle,
    toggleRepeat,
    formatTime,
    setCurrentTime,
    startTimer
  } = usePlayerContext();

  
  useEffect(() => {
    if (route.params?.song) {
      playSong(
        route.params.song,
        route.params.playlist || { name: 'Now Playing' },
        route.params.index || 0,
        route.params.songs || []
      );
    }
  }, [route.params]);

  useEffect(() => {
    if (currentSong?.artistId) {
      const artistData = musicData.artists.find(a => a.id === currentSong.artistId);
      if (artistData) {
        setArtist(artistData);
      }
    }
  }, [currentSong]);

  const getLyricsArray = () => {
    if (!currentSong?.lyrics) return null;
    return currentSong.lyrics.split(' / ');
  };

  const formatNumber = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (!currentSong) {
    return (
      <View className="flex-1 bg-[#121212] justify-center items-center">
        <Text className="text-white text-lg">No song is currently playing</Text>
        <TouchableOpacity 
          className="mt-8 bg-[#1DB954] px-6 py-3 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          {currentPlaylist?.name || 'Now Playing'}
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
              {currentSong.artistName || 'Unknown Artist'}
            </Text>
          </View>

          <TouchableOpacity className="p-2" onPress={toggleLike}>
            {isLiked ? (
              <Octicons name="check-circle-fill" size={24} color="#1DB954" />
            ) : (
              <Octicons name="plus-circle" size={24} color="white" />
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
            onPress={togglePlayPause}
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
          <View className="p-6 mb-16 bg-slate-600 rounded-2xl">
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