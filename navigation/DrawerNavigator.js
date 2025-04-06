import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import components and screens
import ProfileSideMenu from '../component/ProfileSideMenu';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../pages/ProfileScreen';
import Settings from '../pages/Settings';
import LoginScreen from '../pages/LoginScreen';
import SignupForm from '../pages/Auth/SignupFormScreen';
import LoginForm from '../pages/Auth/LoginFormScreen';
import LoginAuth from '../pages/Auth/LoginAuth';
import { ROUTES } from './routes';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
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
      <Drawer.Screen name="Auth" component={StackNavigator} options={{ swipeEnabled: false }} />
      <Drawer.Screen name={ROUTES.MAIN} component={TabNavigator} />
      <Drawer.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      <Drawer.Screen name={ROUTES.SETTINGS} component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;