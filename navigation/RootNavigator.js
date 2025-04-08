import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from './routes';
import AuthStack from './StackNavigator';
import MainStack from './MainStackNavigator';


const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Auth" component={AuthStack} />
      <RootStack.Screen name="MainStack" component={MainStack} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;