import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Animated, BackHandler } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome6, Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { ROUTES } from '../navigation/routes';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const headerHeight = Constants.statusBarHeight + 50;
    const scrollY = useRef(new Animated.Value(0)).current;

    // Animasi untuk opacity nama user di header
    const headerNameOpacity = scrollY.interpolate({
        inputRange: [0, 60, 90],
        outputRange: [0, 0.5, 1],
        extrapolate: 'clamp'
    });

    // Animasi untuk opacity profil info (fadeout saat scroll)
    const profileInfoOpacity = scrollY.interpolate({
        inputRange: [0, 60, 90],
        outputRange: [1, 0.5, 0],
        extrapolate: 'clamp'
    });

    // Animasi untuk scaling profil info (mengecil saat scroll)
    const profileInfoScale = scrollY.interpolate({
        inputRange: [0, 60, 90],
        outputRange: [1, 0.95, 0.9],
        extrapolate: 'clamp'
    });

    // Animasi untuk translasi Y profil info (bergerak ke atas saat scroll)
    const profileInfoTranslateY = scrollY.interpolate({
        inputRange: [0, 60, 90],
        outputRange: [0, -10, -20],
        extrapolate: 'clamp'
    });

    

    return (
        <View className="flex-1 bg-[#121212]">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* Header dengan BlurView */}
            <BlurView
                intensity={80}
                tint="dark"
                style={[styles.headerContainer, { paddingTop: Constants.statusBarHeight }]}
            >
                <View className="flex-row items-center h-16 px-4 justify-center relative">
                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute left-4"
                    >
                        <FontAwesome6 name="angle-left" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Nama user yang akan muncul saat scroll */}
                    <Animated.Text
                        style={{ opacity: headerNameOpacity }}
                        className="text-white text-lg font-bold"
                    >
                        Abii
                    </Animated.Text>

                    {/* Icon menu yang muncul saat scroll */}
                    <Animated.View
                        style={{
                            opacity: headerNameOpacity,
                            position: 'absolute',
                            right: 16
                        }}
                    >
                        <TouchableOpacity>
                            <Entypo name='dots-three-horizontal' size={20} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </BlurView>

            {/* Main Content */}

            <Animated.ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingTop: headerHeight }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            >
                {/* Profile Info */}
                <View className='p-4 mb-40'>
                    <Animated.View style={{
                        opacity: profileInfoOpacity,
                        transform: [
                            { scale: profileInfoScale },
                            { translateY: profileInfoTranslateY }
                        ]
                    }}>
                        <View className="flex flex-row gap-5 mb-8">
                            <Image
                                source={require('../assets/sileighty vintage.png')}
                                className="h-28 w-28 rounded-full"
                            />
                            <View className='flex flex-col gap-1 justify-center'>
                                <Text className="text-white text-2xl font-bold">Abii</Text>
                                <View className='flex flex-row items-center'>
                                    <Text className="text-gray-400">
                                        <Text className="font-bold text-white">0</Text> followers
                                    </Text>
                                    <Entypo name="dot-single" size={14} color="white" style={{ marginHorizontal: 4 }} />
                                    <Text className="text-gray-400">
                                        <Text className="font-bold text-white">0</Text> following
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Profile Menu */}
                    <View className="flex flex-col gap-10">
                        <View className="flex flex-row gap-5 items-center">
                            <TouchableOpacity className='border border-zinc-500 rounded-full px-4 py-2 self-start'>
                                <Text className='text-white font-bold'>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Entypo name='share-alternative' size={20} color="gray"></Entypo>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Entypo name='dots-three-horizontal' size={20} color="gray"></Entypo>
                            </TouchableOpacity>
                        </View>

                        {/* Playlist Section */}
                        <View className='flex flex-col gap-5'>
                            <Text className='text-xl text-white font-bold'>Playlists</Text>
                            <View className='flex flex-col gap-4'>
                                <View className='flex flex-row gap-5'>
                                    <Image
                                        source={require('../assets/sileighty vintage.png')}
                                        className="h-14 w-14"
                                    />
                                    <View className='flex flex-col'>
                                        <Text className='text-white text-lg'>Your Top Songs 2023</Text>
                                        <View className='flex flex-row items-center'>
                                            <Text className='text-zinc-400 text-sm'>0 saves</Text>
                                            <Entypo name="dot-single" size={13} color="gray" style={{ marginHorizontal: 1 }} />
                                            <Text className='text-zinc-400 text-sm'>Spotify</Text>
                                        </View>
                                    </View>
                                </View>

                                <View className='flex flex-row gap-5'>
                                    <Image
                                        source={require('../assets/sileighty vintage.png')}
                                        className="h-14 w-14"
                                    />
                                    <View className='flex flex-col'>
                                        <Text className='text-white text-lg'>Road Trip</Text>
                                        <View className='flex flex-row items-center'>
                                            <Text className='text-zinc-400 text-sm'>0 saves</Text>
                                            <Entypo name="dot-single" size={13} color="gray" style={{ marginHorizontal: 1 }} />
                                            <Text className='text-zinc-400 text-sm'>Abii</Text>
                                        </View>
                                    </View>
                                </View>

                                <View className='flex flex-row gap-5'>
                                    <Image
                                        source={require('../assets/sileighty vintage.png')}
                                        className="h-14 w-14"
                                    />
                                    <View className='flex flex-col'>
                                        <Text className='text-white text-lg'>My Music Box</Text>
                                        <View className='flex flex-row items-center'>
                                            <Text className='text-zinc-400 text-sm'>0 saves</Text>
                                            <Entypo name="dot-single" size={13} color="gray" style={{ marginHorizontal: 1 }} />
                                            <Text className='text-zinc-400 text-sm'>Abii</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        </View>

                        {/* See all playlists button */}
                        <View className="items-center">
                            <TouchableOpacity className='border border-zinc-500 rounded-full px-4 py-2 justify-center'>
                                <Text className='text-white text-sm font-bold text-center'>See all playlists</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Recently played artists section */}
                        <View className='flex flex-col gap-5'>
                            <Text className='text-xl text-white font-bold'>Recently played artists</Text>
                            <View className='flex flex-col gap-4'>
                                <View className='flex flex-row gap-5'>
                                    <Image
                                        source={require('../assets/sileighty vintage.png')}
                                        className="h-14 w-14 rounded-full"
                                    />
                                    <View className='flex flex-col'>
                                        <Text className='text-white text-lg'>Linkin Park</Text>
                                        <Text className='text-zinc-400 text-sm'>29.455.500 followers</Text>
                                    </View>
                                </View>

                                <View className='flex flex-row gap-5'>
                                    <Image
                                        source={require('../assets/sileighty vintage.png')}
                                        className="h-14 w-14 rounded-full"
                                    />
                                    <View className='flex flex-col'>
                                        <Text className='text-white text-lg'>Linkin Park</Text>
                                        <Text className='text-zinc-400 text-sm'>29.455.500 followers</Text>
                                    </View>
                                </View>

                                <View className='flex flex-row gap-5'>
                                    <Image
                                        source={require('../assets/sileighty vintage.png')}
                                        className="h-14 w-14 rounded-full"
                                    />
                                    <View className='flex flex-col'>
                                        <Text className='text-white text-lg'>Linkin Park</Text>
                                        <Text className='text-zinc-400 text-sm'>29.455.500 followers</Text>
                                    </View>
                                </View>

                                <View className='flex flex-row gap-5'>
                                    <Image
                                        source={require('../assets/sileighty vintage.png')}
                                        className="h-14 w-14 rounded-full"
                                    />
                                    <View className='flex flex-col'>
                                        <Text className='text-white text-lg'>Linkin Park</Text>
                                        <Text className='text-zinc-400 text-sm'>29.455.500 followers</Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                        {/* See all artists button */}
                        <View className="items-center">
                            <TouchableOpacity className='border border-zinc-500 rounded-full px-4 py-2 justify-center'>
                                <Text className='text-white text-sm font-bold text-center'>See all artists</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Animated.ScrollView>
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

export default ProfileScreen;