import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Foundation, Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ROUTES } from '../navigation/routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePlayerContext } from '../context/PlayerContext';
import MiniPlayer from './MiniPlayer';

const TabBarScreenWrapper = ({ children }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { currentSong } = usePlayerContext();

  const showMiniPlayer = Boolean(currentSong);

  const navigateToTab = (routeName) => {
    navigation.navigate('MainDrawer', {
      screen: ROUTES.MAIN,
      params: {
        screen: routeName
      }
    });
  };

  return (
    <View className="flex-1 bg-[#121212]">
      {/* Main content */}
      <View className="flex-1">
        {children}
      </View>

      {/* Mini Player */}
      {showMiniPlayer && (
        <View className="absolute left-0 right-0 bottom-[49px]">
          <MiniPlayer />
        </View>
      )}

      <View
        className="flex-row bg-[#121212] border-t-0"
        style={{
          height: 49 + insets.bottom,
          paddingBottom: insets.bottom
        }}
      >
        <TouchableOpacity
          className="flex-1 justify-center items-center py-1"
          onPress={() => navigateToTab(ROUTES.HOME)}
        >
          <Octicons name="home" size={22} color="#B3B3B3" />
          <Text className="text-[#B3B3B3] text-[10px] mt-[2px]">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 justify-center items-center py-1"
          onPress={() => navigateToTab(ROUTES.SEARCH)}
        >
          <Octicons name="search" size={22} color="#B3B3B3" />
          <Text className="text-[#B3B3B3] text-[10px] mt-[2px]">Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 justify-center items-center py-1"
          onPress={() => navigateToTab(ROUTES.LIBRARY)}
        >
          <Ionicons name="library-outline" size={22} color="#B3B3B3" />
          <Text className="text-[#B3B3B3] text-[10px] mt-[2px]">Your Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabBarScreenWrapper;