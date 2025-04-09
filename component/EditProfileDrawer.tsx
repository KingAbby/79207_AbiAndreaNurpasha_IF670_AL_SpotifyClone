import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Image, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');

interface EditProfileDrawerProps {
    isVisible: boolean;
    onClose: () => void;
    currentUsername: string;
    onSave: (newUsername: string) => void;
    profileImage: any;
}

const EditProfileDrawer = ({
    isVisible,
    onClose,
    currentUsername,
    onSave,
    profileImage
}: EditProfileDrawerProps) => {
    const [username, setUsername] = useState(currentUsername);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setUsername(currentUsername);
            setHasChanges(false);
        }
    }, [isVisible, currentUsername]);

    useEffect(() => {
        setHasChanges(username !== currentUsername);
    }, [username, currentUsername]);

    const handleSave = () => {
        if (hasChanges) {
            onSave(username);
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            swipeDirection="down"
            onSwipeComplete={onClose}
            useNativeDriver={true}
            backdropOpacity={0.6}
            style={{
                margin: 0,
                justifyContent: 'flex-end'
            }}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            deviceHeight={SCREEN_HEIGHT}
        >
            <View className="bg-[#282828] rounded-t-2xl h-[85%]">
                {/* Pull indicator di bagian atas drawer */}
                <View className="items-center pb-2">
                    <View className="w-12 h-1 bg-gray-500 rounded-full my-2" />
                </View>

                <View className="px-4 flex-1"
                    style={{ paddingBottom: Platform.OS === 'ios' ? 40 : 24 }}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between py-4">
                        <TouchableOpacity onPress={onClose}>
                            <Text className="text-white text-base font-normal">Cancel</Text>
                        </TouchableOpacity>

                        <Text className="text-white text-base font-bold">Edit profile</Text>

                        <TouchableOpacity
                            onPress={handleSave}
                            disabled={!hasChanges}
                        >
                            <Text className={`text-base font-bold ${hasChanges ? 'text-white' : 'text-white/30'}`}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Profile Image */}
                    <View className="items-center my-6 relative">
                        <Image
                            source={profileImage}
                            className="w-[100px] h-[100px] rounded-full"
                        />
                        <TouchableOpacity className="absolute -bottom-2 right-[35%] bg-white w-8 h-8 rounded-lg justify-center items-center">
                            <Feather name="edit-2" size={16} color="black" />
                        </TouchableOpacity>
                    </View>

                    {/* Form Fields */}
                    <View className="mt-4">
                        <View className="flex-row items-center gap-20">
                            <Text className="text-white font-bold text-lg">Name</Text>

                            <View className="flex-1">
                                <TextInput
                                    value={username}
                                    onChangeText={setUsername}
                                    className={`text-white text-lg ${Platform.OS === 'ios' ? 'mb-3' : 'mb-0'}`}
                                    placeholderTextColor="#888"
                                    selectionColor="#1DB954"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>
                        <View className="h-[1px] bg-gray-500 mt-2" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EditProfileDrawer;