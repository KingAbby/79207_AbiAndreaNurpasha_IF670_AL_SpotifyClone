import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import SearchScreen from './pages/SearchScreen';
import YourLibraryScreen from './pages/YourLibraryScreen';
import ProfileScreen from './pages/ProfileScreen';
import ProfileButton from './component/ProfileButton';
import ProfileSideMenu from './component/ProfileSideMenu';
import Settings from './pages/Settings';
import "./global.css";
import { Ionicons, Foundation, Octicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


// The tab navigator is now a component we'll use inside the drawer
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#B3B3B3',
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
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <ProfileSideMenu {...props} />}
          screenOptions={{
            headerShown: false,
            drawerType: 'front',
            swipeEnabled: true,
            drawerStyle: {
              backgroundColor: '#121212',
              width: '75%',
            }
          }}
        >
          <Drawer.Screen name="Main" component={TabNavigator} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}