import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, TextInput, ScrollView } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: '1', name: 'Podcasts', color: '#006450', image: require('../assets/sileighty vintage.png') },
        { id: '2', name: 'Live Events', color: '#8400E7', image: require('../assets/sileighty vintage.png') },
        { id: '3', name: 'Made For You', color: '#1E3264', image: require('../assets/sileighty vintage.png') },
        { id: '4', name: 'New Releases', color: '#E8115B', image: require('../assets/sileighty vintage.png') },
        { id: '5', name: 'Pop', color: '#148A08', image: require('../assets/sileighty vintage.png') },
        { id: '6', name: 'Hip-Hop', color: '#BC5900', image: require('../assets/sileighty vintage.png') },
        { id: '7', name: 'Rock', color: '#E91429', image: require('../assets/sileighty vintage.png') },
        { id: '8', name: 'Mood', color: '#DC148C', image: require('../assets/sileighty vintage.png') },
        { id: '9', name: 'Charts', color: '#8D67AB', image: require('../assets/sileighty vintage.png') },
        { id: '10', name: 'Chill', color: '#0D73EC', image: require('../assets/sileighty vintage.png') },
    ];

    return (
        <SafeAreaView style={styles.container} className="bg-[#121212]">
            {/* Header */}
            <View className="flex flex-col gap-5">
                <View className="flex-row justify-between items-center px-5 pt-3">
                    {/* Left Side: Profile and Title */}
                    <View className="flex-row items-center">
                        <TouchableOpacity className="mr-3">
                            <Image
                                source={require('../assets/sileighty vintage.png')}
                                className="h-8 w-8 rounded-full"
                            />
                        </TouchableOpacity>
                        <Text className="text-white text-3xl font-bold">Search</Text>
                    </View>

                    {/* Right Side: Search and Add buttons */}
                    <View>
                        <TouchableOpacity>
                            <Feather name="camera" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}

                <View className="px-4 py-2 bg-[#121212]">
                    <View className="flex-row items-center bg-white rounded-md px-5 py-4">
                        <Octicons name="search" size={25} color="#121212" />
                        <TextInput
                            placeholder="What do you want to listen to?"
                            placeholderTextColor="#000000"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            className="flex-1 ml-2 text-black font-semibold"
                            returnKeyType="search"
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <AntDesign name="close" size={20} color="#121212" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
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
                                    source={category.image}
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