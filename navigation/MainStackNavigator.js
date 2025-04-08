import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from './routes';

// Import screens and navigators
import MainDrawerNavigator from './MainDrawerNavigator';
import PlaylistScreen from '../pages/PlaylistScreen';
import ProfileScreen from '../pages/ProfileScreen';
import AllPlaylistScreen from '../pages/AllPlaylistScreen';
import AllArtistScreen from '../pages/AllArtistScreen';
import Settings from '../pages/Settings';
import MediaPlayer from '../pages/MediaPlayer';
import SearchDetail from '../pages/SearchDetailScreen';
import TabBarScreenWrapper from '../component/TabBarScreenWrapper';

const MainStack = createStackNavigator();

const WrappedPlaylistScreen = (props) => (
  <TabBarScreenWrapper>
    <PlaylistScreen {...props} />
  </TabBarScreenWrapper>
);

const WrappedProfileScreen = (props) => (
  <TabBarScreenWrapper>
    <ProfileScreen {...props} />
  </TabBarScreenWrapper>
);

const WrappedSearchDetail = (props) => (
  <TabBarScreenWrapper>
    <SearchDetail {...props} />
  </TabBarScreenWrapper>
);

const WrappedAllPlaylistScreen = (props) => (
  <TabBarScreenWrapper>
    <AllPlaylistScreen {...props} />
  </TabBarScreenWrapper>
);

const WrappedAllArtistScreen = (props) => (
  <TabBarScreenWrapper>
    <AllArtistScreen {...props} />
  </TabBarScreenWrapper>
);

const WrappedSettings = (props) => (
  <TabBarScreenWrapper>
    <Settings {...props} />
  </TabBarScreenWrapper>
);

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainDrawer" component={MainDrawerNavigator} />
      <MainStack.Screen name={ROUTES.PLAYLIST} component={WrappedPlaylistScreen} />
      <MainStack.Screen name={ROUTES.MEDIA_PLAYER} component={MediaPlayer} />
      <MainStack.Screen name={ROUTES.PROFILE} component={WrappedProfileScreen} />
      <MainStack.Screen name={ROUTES.SEARCH_DETAIL} component={WrappedSearchDetail} />
      <MainStack.Screen name={ROUTES.ALL_PLAYLIST} component={WrappedAllPlaylistScreen} />
      <MainStack.Screen name={ROUTES.ALL_ARTIST} component={WrappedAllArtistScreen} />
      <MainStack.Screen name={ROUTES.SETTINGS} component={WrappedSettings} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;