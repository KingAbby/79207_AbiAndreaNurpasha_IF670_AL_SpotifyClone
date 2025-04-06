import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView, StyleSheet, Button } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { BlurView } from 'expo-blur';

const Settings = () => {
    const navigation = useNavigation();
    const headerHeight = Constants.statusBarHeight + 50;

    return (
        <View className="flex-1 bg-[#121212]">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* Header  BlurView */}
            <BlurView
                intensity={80}
                tint="dark"
                style={[styles.headerContainer, { paddingTop: Constants.statusBarHeight }]}
            >
                <View className="flex-row items-center h-16 px-4 justify-center relative">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute left-4"
                    >
                        <FontAwesome6 name="angle-left" size={24} color="white" />
                    </TouchableOpacity>

                    <Text className="text-white text-lg font-bold">Settings</Text>
                </View>
            </BlurView>

            {/* Main Content */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingTop: headerHeight }}
            >

                {/* Profile section */}
                <View className="flex flex-col gap-7 p-4">
                    <TouchableOpacity
                        className='flex flex-row justify-between items-center'
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <View className="flex flex-row gap-5">
                            <View>
                                <Image
                                    source={require('../assets/sileighty vintage.png')}
                                    className="h-16 w-16 rounded-full"
                                />
                            </View>
                            <View className='flex flex-col gap-1 justify-center'>
                                <Text className="text-white text-lg font-bold">Abii</Text>
                                <Text className="text-gray-400">View Profile</Text>
                            </View>
                        </View>

                        <FontAwesome name='angle-right' size={20} color='white' />
                    </TouchableOpacity>

                    {/* Settings options */}
                    <View className='flex flex-col gap-7'>
                        <TouchableOpacity className='flex flex-row justify-between'>
                            <Text className="text-white text-lg">Account</Text>
                            <FontAwesome name='angle-right' size={20} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row justify-between'>
                            <Text className="text-white text-lg">Data-saving and offline</Text>
                            <FontAwesome name='angle-right' size={20} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row justify-between'>
                            <Text className="text-white text-lg">Playback</Text>
                            <FontAwesome name='angle-right' size={20} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row justify-between'>
                            <Text className="text-white text-lg">Content and Display</Text>
                            <FontAwesome name='angle-right' size={20} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row justify-between'>
                            <Text className="text-white text-lg">Privacy and Social</Text>
                            <FontAwesome name='angle-right' size={20} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row justify-between'>
                            <Text className="text-white text-lg">Audio Quality</Text>
                            <FontAwesome name='angle-right' size={20} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row justify-between'>
                            <Text className="text-white text-lg">Video Quality</Text>
                            <FontAwesome name='angle-right' size={20} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row justify-between'>
                            <Text className="text-white text-lg">Notifications</Text>
                            <FontAwesome name='angle-right' size={20} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row justify-between'>
                            <Text className="text-white text-lg">Apps and devices</Text>
                            <FontAwesome name='angle-right' size={20} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity className='flex flex-row justify-between'>
                            <Text className="text-white text-lg">About</Text>
                            <FontAwesome name='angle-right' size={20} color='white' />
                        </TouchableOpacity>
                    </View>

                    {/* Logout Button */}
                    <View className="items-center mt-8">
                        <TouchableOpacity
                            className='bg-white rounded-full px-12 py-3'
                            onPress={() => console.log('Log out pressed')}
                        >
                            <Text className='text-black text-lg font-bold text-center'>Log out</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'rgba(18, 18, 18, 0.75)'
    },
});

export default Settings;