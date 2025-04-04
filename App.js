import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/HomeScreen';
import SearchScreen from './pages/SearchScreen';
import YourLibraryScreen from './pages/YourLibraryScreen';
import "./global.css"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import { StatusBar } from 'expo-status-bar';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            // headerStyle: {
            //   backgroundColor: '#121212', // Spotify dark background
            // },
            // headerTintColor: '#FFFFFF', // White text for headers
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#121212', // Dark background for tab bar
              borderTopWidth: 0 // Menghilangkan border di atas tab bar
            },
            tabBarActiveTintColor: '#FFFFFF', // Spotify green for active tab
            tabBarInactiveTintColor: '#B3B3B3', // Gray for inactive tabs
            // This sets the background color for all screens
            contentStyle: {
              backgroundColor: '#121212'
            }
          }}
        >
          <Tab.Screen
            name="Home"
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
            name="Search"
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
            name="Your Library"
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
      </NavigationContainer >
    </>
    // <View
    //   style={styles.container}
    //   className='bg-gray-900'
    // >

    //   <Text className='text-blue-300'>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}


