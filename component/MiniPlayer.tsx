import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../navigation/routes';
import { usePlayerContext } from '../context/PlayerContext';

const MiniPlayer = () => {
  const navigation = useNavigation();
  const {
    currentSong,
    currentPlaylist,
    songs,
    currentIndex,
    isPlaying,
    currentTime,
    togglePlayPause,
    handleNext,
    getImageSource
  } = usePlayerContext();

  if (!currentSong) return null;

  const progress = currentSong.duration > 0
    ? (currentTime / currentSong.duration) * 100
    : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      className="bg-[#282828] w-full border-b border-[#333] mb-10 rounded-xl overflow-hidden"
      onPress={() => {
        navigation.navigate(ROUTES.MEDIA_PLAYER, {
          song: currentSong,
          playlist: currentPlaylist || { name: 'Now Playing' },
          index: currentIndex,
          songs: songs
        });
      }}
    >

      <View className="flex-row items-center py-2 px-3">
        {/* Song Image */}
        <Image
          source={getImageSource(currentSong.image)}
          className="w-10 h-10 rounded mr-3"
        />

        {/* Song Info */}
        <View className="flex-1 mr-2">
          <Text
            className="text-white font-medium text-sm"
            numberOfLines={1}
          >
            {currentSong.title}
          </Text>
          <Text
            className="text-[#b3b3b3] text-xs"
            numberOfLines={1}
          >
            {currentSong.artistName || 'Unknown Artist'}
          </Text>
        </View>

        {/* Controls */}
        <View className="flex-row items-center">
          <TouchableOpacity
            className="p-2"
            onPress={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="p-2"
            onPress={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <Ionicons
              name="play-skip-forward"
              size={22}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress bar */}
      <View className="h-1 bg-[rgba(255,255,255,0.1)]">
        <View
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MiniPlayer;