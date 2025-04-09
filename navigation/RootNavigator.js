import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from './routes';
import AuthStack from './StackNavigator';
import MainStack from './MainStackNavigator';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Auth" component={AuthStack} />
        <RootStack.Screen name="MainStack" component={MainStack} />
      </RootStack.Navigator>
    </View>
  );
};

export default RootNavigator;