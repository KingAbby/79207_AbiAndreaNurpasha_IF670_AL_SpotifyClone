import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import { PlayerProvider } from '../context/PlayerContext';

const Navigation = () => {
  return (
    <PlayerProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PlayerProvider>
  );
};

export default Navigation;