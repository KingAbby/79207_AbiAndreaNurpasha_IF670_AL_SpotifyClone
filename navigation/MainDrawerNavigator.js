import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileSideMenu from '../component/ProfileSideMenu';
import TabNavigator from './TabNavigator';
import { ROUTES } from './routes';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
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
      <Drawer.Screen name={ROUTES.MAIN} component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;