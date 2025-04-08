import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, TextInput, ScrollView } from "react-native";
import { AntDesign, Octicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ProfileButton from "../component/ProfileButton";
import musicData from '../data/data.json';
import { ROUTES } from '../navigation/routes';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        // Load categories from data.json
        setCategories(musicData.categories);
    }, []);

    return (
        <SafeAreaView style={styles.container} className="bg-[#121212]">
            {/* Header */}
            <View className="flex flex-col gap-5">
                <View className="flex-row justify-between items-center px-5 pt-3">
                    {/* Left Side: Profile and Title */}
                    <View className="flex-row items-center">
                        <TouchableOpacity>
                            <ProfileButton onPress={() => navigation.openDrawer()} />
                        </TouchableOpacity>
                        <Text className="text-white text-3xl font-bold">Search</Text>
                    </View>

                    {/* Right Side: Camera buttons */}
                    <View>
                        <TouchableOpacity>
                            <Feather name="camera" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}
                <TouchableOpacity
                    className="px-4 py-2 bg-[#121212]"
                    onPress={() => navigation.navigate(ROUTES.SEARCH_DETAIL)}
                >
                    <View className="flex-row items-center bg-white rounded-md px-5 py-4">
                        <Octicons name="search" size={25} color="#121212" />
                        <Text
                            className="flex-1 ml-2 text-gray-500 font-semibold"
                        >
                            What do you want to listen to?
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                className="flex-1"
            >
                {/* Browse Categories */}
                <View className="px-4 pt-4">
                    <Text className="text-white text-xl font-bold mb-4">Browse all</Text>

                    {/* Grid layout untuk kategori */}
                    <View className="flex-row flex-wrap justify-between">
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.categoryItem,
                                    { backgroundColor: category.color },
                                    index % 2 === 0 ? { marginRight: 8 } : {}
                                ]}
                                className="rounded-lg overflow-hidden mb-3"
                            >
                                <Text className="text-white font-bold text-base p-3">{category.name}</Text>
                                <Image
                                    source={{ uri: category.image }}
                                    style={styles.categoryImage}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Extra space di bagian bawah agar konten tidak terpotong tab bar */}
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },
    scrollContent: {
        flexGrow: 1,
    },
    categoryItem: {
        width: '48%',
        height: 100,
        position: 'relative',
        marginBottom: 12,
    },
    categoryImage: {
        width: 80,
        height: 80,
        position: 'absolute',
        bottom: -10,
        right: -20,
        transform: [{ rotate: '30deg' }],
        borderRadius: 5,
    }
});

export default SearchScreen;