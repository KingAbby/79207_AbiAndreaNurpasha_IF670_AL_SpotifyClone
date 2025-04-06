import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from './routes';

// Import screens and navigators
import MainDrawerNavigator from './MainDrawerNavigator';
import ProfileScreen from '../pages/ProfileScreen';
import Settings from '../pages/Settings';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainDrawer" component={MainDrawerNavigator} />
      <MainStack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <MainStack.Screen name={ROUTES.SETTINGS} component={Settings} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;