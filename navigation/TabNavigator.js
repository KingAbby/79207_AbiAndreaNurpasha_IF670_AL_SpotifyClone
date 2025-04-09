import React from 'react';
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Foundation, Octicons } from '@expo/vector-icons';
import { usePlayerContext } from '../context/PlayerContext';

import HomeScreen from '../pages/HomeScreen';
import SearchScreen from '../pages/SearchScreen';
import YourLibraryScreen from '../pages/YourLibraryScreen';
import { ROUTES } from './routes';
import MiniPlayer from '../component/MiniPlayer';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const tabBarStyle = {
  backgroundColor: '#121212',
  borderTopWidth: 0,
  zIndex: 1000
};

const TabNavigator = () => {
  const { currentSong } = usePlayerContext();
  const route = useRoute();

  const showMiniPlayer = Boolean(currentSong) && route.name !== ROUTES.MEDIA_PLAYER;

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            ...tabBarStyle,
            elevation: 8, 
            shadowOpacity: 0.3, 
            shadowRadius: 2,
            shadowOffset: { height: -1, width: 0 }
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#B3B3B3',
          contentStyle: {
            backgroundColor: '#121212'
          }
        }}
      >
        <Tab.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              focused ?
                <Foundation name="home" size={size} color={color} /> :
                <Octicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.SEARCH}
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              focused ?
                <Ionicons name="search-sharp" size={size} color={color} /> :
                <Octicons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.LIBRARY}
          component={YourLibraryScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              focused ?
                <Ionicons name="library" size={size} color={color} /> :
                <Ionicons name="library-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

      {showMiniPlayer && (
        <View style={{ 
          position: 'absolute',
          bottom: 49,
          left: 0, 
          right: 0,
          zIndex: 1,
          pointerEvents: 'box-none'
        }}>
          <MiniPlayer />
        </View>
      )}
    </View>
  );
};

export default TabNavigator;