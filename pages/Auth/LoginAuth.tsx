import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6, Feather } from '@expo/vector-icons';
import { ROUTES } from '../../navigation/routes';
import Constants from 'expo-constants';

const LoginAuth = () => {
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#121212' }}>
            {/* Header Section */}
            <View style={[styles.headerContainer, { paddingTop: Constants.statusBarHeight }]}>
                <View className="flex-row items-center h-16 px-4 justify-center relative">
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute left-4"
                    >
                        <FontAwesome6 name="angle-left" size={24} color="white" />
                    </TouchableOpacity>

                    <Text className="text-white text-lg font-bold">Log In</Text>
                </View>
            </View>

            <View className="p-4">
                <View className='flex flex-col gap-7'>
                    {/* Email & Password */}
                    <View className='flex flex-col gap-7'>
                        <View className='flex flex-col gap-1'>
                            <Text className="text-white text-3xl font-bold">Email or username</Text>
                            <TextInput
                                placeholderTextColor="#888"
                                className="bg-[#2A2A2A] text-white p-4 rounded-md"
                            />
                        </View>

                        <View className='flex flex-col gap-1'>
                            <Text className="text-white text-3xl font-bold">Password</Text>
                            <View className="relative">
                                <TextInput
                                    secureTextEntry={!isPasswordVisible}
                                    placeholderTextColor="#888"
                                    className="bg-[#2A2A2A] text-white p-4 rounded-md pr-12"
                                />
                                <TouchableOpacity
                                    onPress={togglePasswordVisibility}
                                    className="absolute right-4 top-3"
                                >
                                    {isPasswordVisible ?
                                        <Feather name="eye" size={24} color="white" /> :
                                        <Feather name="eye-off" size={24} color="white" />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Button */}
                    <View className="flex flex-col gap-5">

                        {/* Log in Button */}
                        <View className="items-center mt-8">
                            <TouchableOpacity
                                className='bg-white rounded-full px-12 py-3'
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'MainStack' }],
                                    });
                                }}
                            >
                                <Text className='text-black text-lg font-bold text-center'>Log in</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity className="border border-zinc-500 rounded-full px-3 py-1 self-center">
                            <Text className="text-base text-white font-bold">Log in without password</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#121212',
        borderBottomColor: '#333',
    }

});

export default LoginAuth;