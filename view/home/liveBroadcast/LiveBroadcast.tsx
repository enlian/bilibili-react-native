import React from 'react';
import { View, Text, Image, ScrollView, FlatList, StyleSheet, Dimensions } from 'react-native';

//https://api.bilibili.com/pgc/web/variety/feed?cursor=0&page_size=14

const AVATARS = [
    { id: '1', name: 'Alice', uri: 'https://random.imagecdn.app/50/50' },
    { id: '2', name: 'Bob', uri: 'https://random.imagecdn.app/50/50' },
    { id: '3', name: 'Charlie', uri: 'https://random.imagecdn.app/50/50' },
    { id: '4', name: 'David', uri: 'https://random.imagecdn.app/50/50' },
    { id: '5', name: 'Eve', uri: 'https://random.imagecdn.app/50/50' },
];

const IMAGES = [
    { id: '1', uri: 'https://random.imagecdn.app/300/200', title: 'Image 1', description: 'Description for Image 1' },
    { id: '2', uri: 'https://random.imagecdn.app/300/200', title: 'Image 2', description: 'Description for Image 2' },
    { id: '3', uri: 'https://random.imagecdn.app/300/200', title: 'Image 3', description: 'Description for Image 3' },
    { id: '4', uri: 'https://random.imagecdn.app/300/200', title: 'Image 4', description: 'Description for Image 4' },
    { id: '5', uri: 'https://random.imagecdn.app/300/200', title: 'Image 3', description: 'Description for Image 3' },
    { id: '6', uri: 'https://random.imagecdn.app/300/200', title: 'Image 4', description: 'Description for Image 4' },
];

const LiveBroadcast = () => {
    return (
        <View style={styles.container}>
            {/* Top Section: Avatar List */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarList}>
                {AVATARS.map((avatar) => (
                    <View key={avatar.id} style={styles.avatarContainer}>
                        <Image source={{ uri: avatar.uri }} style={styles.avatar} />
                        <Text style={styles.avatarName}>{avatar.name}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom Section: Image List */}
            <FlatList
                data={IMAGES}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.uri }} style={styles.image} />
                        <Text style={styles.imageTitle}>{item.title}</Text>
                        <Text style={styles.imageDescription}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    avatarList: {
        marginBottom: 16,
    },
    avatarContainer: {
        alignItems: 'center',
        marginRight: 16,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 4,
    },
    avatarName: {
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('window').width / 2 - 16, // Dynamic width based on screen size
        height: 100,
        borderRadius: 8,
    },
    imageTitle: {
        fontWeight: 'bold',
        marginVertical: 4,
    },
    imageDescription: {
        textAlign: 'center',
    },
});

export default LiveBroadcast;
