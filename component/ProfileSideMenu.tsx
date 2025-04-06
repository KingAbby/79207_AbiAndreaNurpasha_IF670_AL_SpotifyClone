import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { AntDesign, EvilIcons, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileSideMenu = (props) => {
    const navigation = useNavigation();

    return (
        <DrawerContentScrollView {...props} className="flex-1 pt-8">
            <View className='flex flex-col gap-2'>
                <TouchableOpacity
                    className="flex flex-row gap-5 py-5"
                    onPress={() => navigation.navigate('Profile')}
                >
                    <View>
                        <Image
                            source={require('../assets/sileighty vintage.png')}
                            className="h-14 w-14 rounded-full"
                        />
                    </View>
                    <View className='flex flex-col gap-1'>
                        <Text className="text-white text-xl font-bold">Abii</Text>
                        <Text className="text-gray-400">View Profile</Text>
                    </View>
                </TouchableOpacity>

                {/* Dedicated separator */}
                <View className="h-[1px] w-full bg-gray-700" />

                {/* Menu Items */}
                <View className="flex flex-col gap-10 py-5">
                    <TouchableOpacity className="flex-row items-center gap-5">
                        <AntDesign name="pluscircleo" size={24} color="white" />
                        <Text className="text-white text-base">Add Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center gap-5">
                        <Ionicons name="flash-outline" size={24} color="white" />
                        <Text className="text-white text-base">What's New</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center gap-5">
                        <Octicons name="graph" size={24} color="white" />
                        <Text className="text-white text-base">Your Sound Capsule</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center gap-5">
                        <MaterialCommunityIcons name="progress-clock" size={24} color="white" />
                        <Text className="text-white text-base">Recents</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center gap-5" onPress={() => props.navigation.navigate('Settings')}>
                        <EvilIcons name="gear" size={24} color="white" />
                        <Text className="text-white text-base">Settings & Privacy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 50,
//     },
//     profileImage: {
//         height: 45,
//         width: 45,
//     }
// });

export default ProfileSideMenu;