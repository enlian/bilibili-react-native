import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

// 轮播图数据
const data = [
    {
        id: '1',
        image: 'https://i0.hdslb.com/bfs/bangumi/image/3d6f183f24c41242443a30c4e33b325d0346fb65.png',
    },
    {
        id: '2',
        image: 'https://i0.hdslb.com/bfs/bangumi/image/be4aad1e81278893d2ac59433b9a23c3b725b837.png',
    },
    {
        id: '3',
        image: 'https://i0.hdslb.com/bfs/bangumi/image/6dea8f9d886cba298b1d3407dba791de5f8d78ab.png',
    },
];

const CarouselComponent: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // 当前索引
    const flatListRef = useRef<FlatList<any>>(null); // 引用 FlatList
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // 引用定时器

    const renderItem = ({ item }: { item: { image: string } }) => {
        return (
            <View style={styles.slide}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
        );
    };

    const handleScroll = (event: any) => {
        const index = Math.floor(event.nativeEvent.contentOffset.x / viewportWidth);
        setCurrentIndex(index);
    };

    // 自动播放功能
    /*useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % data.length;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                return nextIndex;
            });
        }, 3000); // 每3秒切换一次

        // 清理定时器
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);*/

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={handleScroll}
            />
            <View style={styles.pagination}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { opacity: currentIndex === index ? 1 : 0.4 }, // 当前页的点为不透明
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop:5,
        marginBottom:10,
    },
    slide: {
        width: viewportWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        marginTop: 10,
    },
    pagination: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        flexDirection: 'row',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#000',
        marginHorizontal: 5,
    },
});

export default CarouselComponent;
