import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6, Entypo, FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { ROUTES } from '../../navigation/routes';


const LoginFormScreen = () => {
    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#121212', '#1E1E1E']} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View className="p-4 flex-1">

                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <FontAwesome6 name="angle-left" size={24} color="white" />
                    </TouchableOpacity>

                    <View className="flex-1 justify-center gap-7">
                        <View className="flex-grow flex justify-end">
                            <View className="flex-col items-center gap-7">
                                <Entypo name="spotify" size={50} color="white" />
                                <Text className="text-white text-4xl font-bold">Log in to Spotify</Text>
                            </View>
                        </View>

                        <View className="flex flex-col gap-7">
                            {/* Login Option */}
                            <View className="flex flex-col gap-3 mx-4">
                                <TouchableOpacity className="bg-[#1DB954] py-3 rounded-full" onPress={() => navigation.navigate(ROUTES.LOGIN_AUTH)}>
                                    <View style={styles.buttonInner}>
                                        <FontAwesome name="envelope-o" size={22} color="black" style={styles.icon} />
                                        <Text className="text-base text-center text-black font-bold" style={styles.buttonText}>
                                            Continue with Email
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity className="border border-zinc-500 py-3 rounded-full">
                                    <View style={styles.buttonInner}>
                                        <Feather name="smartphone" size={22} color="white" style={styles.icon} />
                                        <Text className="text-base text-center text-white font-bold" style={styles.buttonText}>
                                            Continue with phone number
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity className="border border-zinc-500 py-3 rounded-full">
                                    <View style={styles.buttonInner}>
                                        <FontAwesome name="google" size={22} color="#DB4437" style={styles.icon} />
                                        <Text className="text-base text-center text-white font-bold" style={styles.buttonText}>
                                            Continue with Google
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity className="border border-zinc-500 py-3 rounded-full">
                                    <View style={styles.buttonInner}>
                                        <FontAwesome name="facebook" size={22} color="#3b5998" style={styles.icon} />
                                        <Text className="text-base text-center text-white font-bold" style={styles.buttonText}>
                                            Continue with Facebook
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity className="border border-zinc-500 py-3 rounded-full">
                                    <View style={styles.buttonInner}>
                                        <FontAwesome name="apple" size={22} color="white" style={styles.icon} />
                                        <Text className="text-base text-center text-white font-bold" style={styles.buttonText}>
                                            Continue with Apple
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View className='flex flex-col gap-5'>
                                <Text className='text-center text-white'>Don't have an Account?</Text>
                                <TouchableOpacity
                                    className='self-center'
                                    onPress={() => navigation.navigate(ROUTES.SIGNUP_FORM)}
                                >
                                    <Text className='text-center text-white font-bold'>Sign up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    buttonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        left: 20,
    },
    buttonText: {
        width: '100%',
        textAlign: 'center',
    }
});

export default LoginFormScreen;