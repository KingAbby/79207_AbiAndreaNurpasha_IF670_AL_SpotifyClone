import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pages/LoginScreen';
import LoginFormScreen from '../pages/Auth/LoginFormScreen';
import LoginAuth from '../pages/Auth/LoginAuth';
import SignupFormScreen from '../pages/Auth/SignupFormScreen';
import { ROUTES } from './routes';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.LOGIN_FORM} component={LoginFormScreen} />
            <Stack.Screen name={ROUTES.LOGIN_AUTH} component={LoginAuth} />
            <Stack.Screen name={ROUTES.SIGNUP_FORM} component={SignupFormScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;