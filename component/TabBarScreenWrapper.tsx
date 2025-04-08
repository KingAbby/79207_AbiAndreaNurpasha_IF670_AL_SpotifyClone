import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Foundation, Ionicons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../navigation/routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabBarScreenWrapper = ({ children }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // Navigate to specific tabs
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
      {children}
      
      <View 
        className="flex-row bg-[#121212] absolute bottom-0 left-0 right-0 border-t-0"
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