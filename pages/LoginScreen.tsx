import { LinearGradient } from "expo-linear-gradient";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../navigation/routes";

const LoginScreen = () => {
    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#121212', '#1E1E1E']} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View className="flex-1 flex-col justify-between">

                    <View className="flex-grow flex items-center justify-center">
                        <View className="flex-col gap-7 items-center">
                            <Entypo name="spotify" size={50} color="white" />
                            <View className="flex flex-col gap-1 items-center">
                                <Text className="text-white text-4xl font-bold">Millions of songs.</Text>
                                <Text className="text-white text-4xl font-bold">Free on Spotify.</Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex flex-col gap-3 mx-4 mb-5">

                        <TouchableOpacity
                            className="bg-[#1DB954] py-4 rounded-full"
                            onPress={() => navigation.navigate(ROUTES.SIGNUP_FORM)}
                        >
                            <Text className="text-lg text-center text-black font-bold">Sign up free</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="border border-white px-36 py-4 rounded-full"
                            onPress={() => navigation.navigate(ROUTES.LOGIN_FORM)}
                        >
                            <Text className="text-lg text-center text-white font-bold">Log in</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </SafeAreaView>
        </LinearGradient>
    );
};

export default LoginScreen;