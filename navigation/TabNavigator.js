import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Foundation, Octicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../pages/HomeScreen';
import SearchScreen from '../pages/SearchScreen';
import YourLibraryScreen from '../pages/YourLibraryScreen';
import { ROUTES } from './routes';

const Tab = createBottomTabNavigator();

export const tabBarStyle = {
  backgroundColor: '#121212',
  borderTopWidth: 0
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarStyle,
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
  );
};

export default TabNavigator;