import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CardList = ({ navigation }) => {    
    const [data, setData] = useState<any[]>([]); // 数据类型为 archives 数组
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // 页码，初始为 1
    const [refreshing, setRefreshing] = useState(false); // 控制下拉刷新
    const [hasMoreData, setHasMoreData] = useState(true); // 判断是否还有更多数据

    const fetchData = async (pageNumber: number) => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.bilibili.com/x/web-interface/dynamic/region?rid=31&ps=10&pn=${pageNumber}`);
            const result = await response.json();
            const list = result?.data?.archives ?? [];

            if (list.length > 0) {
                setData(prevData => [...prevData, ...list]); // 追加新数据
            } else {
                setHasMoreData(false); // 没有更多数据了
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const loadMoreData = () => {
        if (!loading && hasMoreData) {
            setPage(prevPage => prevPage + 1); // 请求下一页数据
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setPage(1); // 重置为第一页
        setData([]); // 清空现有数据
        fetchData(1).then(() => {
            setRefreshing(false); // 结束刷新状态
            setHasMoreData(true); // 恢复加载更多数据
        });
    };

    // 渲染每一个 item
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation && navigation.navigate('VideoDetail', { video: item })} // 跳转并传递视频详情数据
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.pic }} style={styles.cardImage} />
                <View style={styles.viewsContainer}>
                    <Ionicons name={'eye-outline'} size={12} color={'#fff'} />
                    <Text style={styles.viewsText}>{item.stat.view}</Text>
                </View>
                <View style={styles.imageUsernameContainer}>
                    <Text style={styles.imageUsername}>{item.owner.name}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    <Image source={{ uri: item.owner.face }} style={styles.userImage} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.username} numberOfLines={1}>{item.owner.name}</Text>
                    </View>
                </View>
                <Ionicons style={styles.moreOptions} name={'ellipsis-vertical'} size={12} color={'#464646'} />
            </View>
        </TouchableOpacity>
    );

    const renderFooter = () => {
        return loading && hasMoreData ? (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        ) : null;
    };

    return (
        <FlatList
            numColumns={2}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            onEndReached={loadMoreData} // 到达底部时加载更多数据
            onEndReachedThreshold={0.5} // 距离底部多少时触发
            ListFooterComponent={renderFooter} // 底部加载动画
            refreshing={refreshing}
            onRefresh={handleRefresh} // 下拉刷新
        />
    );
};

// 样式
const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        marginBottom: 3,
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: 120,
        backgroundColor: '#ccc',
    },
    viewsContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 5,
        borderRadius: 3,
        flexDirection: 'row',
    },
    viewsText: {
        color: '#fff',
        fontSize: 9,
        marginLeft: 4,
    },
    imageUsernameContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 5,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageUsername: {
        color: '#fff',
        fontSize: 9,
    },
    infoContainer: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    titleContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 10,
        color: '#333',
        maxWidth: '90%',
    },
    username: {
        fontSize: 9,
        color: '#666',
        maxWidth: '80%',
    },
    moreOptions: {
        backgroundColor: '#fff',
        position: 'absolute',
        right: 2,
        bottom: 5,
    },
    loader: {
        marginVertical: 16,
        alignItems: 'center',
    },
});

export default CardList;
