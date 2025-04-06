import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView, StyleSheet, Modal, Pressable } from 'react-native';
import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { BlurView } from 'expo-blur';
import { ROUTES } from '../navigation/routes';

const Settings = () => {
    const navigation = useNavigation();
    const headerHeight = Constants.statusBarHeight + 50;
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const handleLogout = () => {
        setLogoutModalVisible(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }]
        });
    };

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
                        onPress={() => navigation.navigate(ROUTES.PROFILE)}
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
                            onPress={() => setLogoutModalVisible(true)}
                        >
                            <Text className='text-black text-lg font-bold text-center'>Log out</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Logout Confirmation Modal */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={logoutModalVisible}
                        onRequestClose={() => setLogoutModalVisible(false)}
                    >
                        <Pressable
                            style={styles.modalOverlay}
                            onPress={() => setLogoutModalVisible(false)}
                        >
                            <View
                                className="bg-[#282828] rounded-2xl w-4/5 mx-auto p-5 gap-10"
                                onStartShouldSetResponder={() => true}
                                onTouchEnd={(e) => e.stopPropagation()}
                            >
                                <View className='flex-col items-center gap-1'>
                                    <Text className="text-white text-xl font-bold">Log out</Text>
                                    <Text className="text-white text-base">Are you sure you want to log out?</Text>
                                </View>


                                <View className="flex-row justify-between gap-5">
                                    <TouchableOpacity
                                        className="flex-1 border border-white rounded-full py-2 "
                                        onPress={() => setLogoutModalVisible(false)}
                                    >
                                        <Text className="text-white text-center font-semibold">Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className="flex-1 bg-white rounded-full py-2 "
                                        onPress={handleLogout}
                                    >
                                        <Text className="text-black text-center font-semibold">Log out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Pressable>
                    </Modal>

                </View>
            </ScrollView >
        </View >
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Settings;