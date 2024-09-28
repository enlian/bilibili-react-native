import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

// 模拟数据
const contentCards = Array(20).fill({
    title: '视频标题',
    image: 'https://via.placeholder.com/150x100',
    views: '32.1万',
    comments: 99,
    duration: '0:22',
    author: 'UP 作者名',
});

const App = () => {
    return (
        <FlatList
            numColumns={2}
            data={contentCards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    {/* 视频缩略图 */}
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.image }} style={styles.cardImage} />
                        <Text style={styles.duration}>{item.duration}</Text>
                    </View>
                    {/* 视频信息 */}
                    <View style={styles.infoContainer}>
                        <Text style={styles.stats}>
                            {item.views} 播放 · {item.comments} 评论
                        </Text>
                        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.author}>{item.author}</Text>
                    </View>
                </View>
            )}
        />
    );
};

// 样式
const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    duration: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        paddingHorizontal: 5,
        borderRadius: 3,
        fontSize: 12,
    },
    infoContainer: {
        padding: 10,
    },
    stats: {
        fontSize: 12,
        color: '#999',
        marginBottom: 5,
    },
    cardTitle: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    author: {
        fontSize: 12,
        color: '#666',
    },
});

export default App;
