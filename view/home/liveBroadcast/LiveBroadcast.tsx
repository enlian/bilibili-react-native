import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import CardList from './../../commonComponents/CardList';
import CarouselComponent from './CarouselComponent';

// 定义 API 响应的数据结构类型
interface ApiResponse {
    code: number;
    data: {
        cursor: number;
        list: Array<Item>;
    } | null;
}

// 定义 Item 数据结构类型
interface Item {
    cover: string; // 封面图片的 URL
    dms: string; // 数据管理系统的指标
    enable_vt: boolean; // 是否启用 VT
    icon_font: { name: string; text: string }; // 图标信息
    likes: string; // 喜欢的数量
    plays: string; // 播放的数量
    season_id: number; // 季节 ID
    sub_title: string; // 副标题
    title: string; // 标题
}

const App = () => {
    const [data, setData] = useState<Item[]>([]); // 数据类型为 Item 数组
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.bilibili.com/pgc/web/variety/feed?cursor=0&page_size=20');
                const result: ApiResponse = await response.json();
                const list = result?.data?.list ?? [];
                setData(list); // 如果 list 是 null，则设置为空数组
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]); // 请求失败时，确保 data 为空数组
            } finally {
                setLoading(false); // 确保在请求结束后将 loading 设置为 false
            }
        };
        fetchData();
    }, []); // 空数组确保只在组件首次挂载时运行

    const renderUserItem = ({ item }: { item: Item }) => (
        <View style={styles.userContainer}>
            <Image source={{ uri: item.cover }} style={styles.avatar} />
            <Text style={styles.userName}>
                {item.title.length > 4 ? `${item.title.substring(0, 4)}...` : item.title}
            </Text>
        </View>
    );

    // FlatList 的头部组件
    const renderHeader = () => (
        <View>
            <CarouselComponent />
            <FlatList
                horizontal
                data={data} // 使用与内容列表相同的数据
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderUserItem}
                showsHorizontalScrollIndicator={false} // 隐藏水平滚动条
            />
        </View>
    );

    if (loading) {
        return <Text>Loading...</Text>;
    } else if (data.length > 0) {
        return (
            <FlatList
                style={styles.container}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={null} // 内容部分的渲染项
                ListHeaderComponent={renderHeader} // 使用自定义的头部组件
                ListFooterComponent={<CardList/>} // 底部组件
            />
        );
    } else {
        return <Text>暂无数据...</Text>;
    }
};

// 样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 10,
    },
    userContainer: {
        alignItems: 'center',
        marginRight: 5,
        marginBottom: 5,
        width: 55,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#a1a1a1',
    },
    userName: {
        marginTop: 5,
        fontSize: 9,
        color: '#333',
    },
});

export default App;
