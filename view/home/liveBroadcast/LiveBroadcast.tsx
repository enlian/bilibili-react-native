import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet,ScrollView } from 'react-native';
import CardList from '../../commonComponents/cardList.tsx';
import CarouselComponent from './CarouselComponent';
import AvatarList from './../../commonComponents/avatarList';

//https://api.bilibili.com/x/web-interface/dynamic/region?rid=23&ps=20&pn=1
//https://api.bilibili.com/pgc/web/variety/feed?cursor=0&page_size=20

// 定义 API 响应的数据结构类型
interface ApiResponse {
    code: number;
    data: {
        archives: Array<{
            owner: {
                name: string;
                face: string;
            };
            stat: {
                view: number;
            };
            pic: string;
            title: string; // 添加 title 字段
        }>;
    } | null;
}

const App = () => {
    const [data, setData] = useState<any[]>([]); // 数据类型为 Item 数组
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // 刷新状态

    useEffect(() => {
        fetchData();
    }, []); // 空数组确保只在组件首次挂载时运行

    // 获取数据的函数
    const fetchData = async () => {
        setRefreshing(true); // 开始刷新
        try {
            const response = await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=23&ps=20&pn=1');
            const result: ApiResponse = await response.json();
            const list = result?.data?.archives ?? [];
            setData(list); // 如果 list 是 null，则设置为空数组
        } catch (error) {
            console.error('Error fetching data:', error);
            setData([]); // 请求失败时，确保 data 为空数组
        } finally {
            setLoading(false); // 确保在请求结束后将 loading 设置为 false
            setRefreshing(false); // 结束刷新
        }
    };

    // FlatList 的头部组件
    const renderHeader = () => (
        <View>
            <CarouselComponent />
            <AvatarList/>
        </View>
    );

    if (loading) {
        return <Text>Loading...</Text>;
    } else if (data.length > 0) {
        return (
            <FlatList
                style={styles.container}
                data={[]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={null} // 内容部分的渲染项
                ListHeaderComponent={renderHeader} // 使用自定义的头部组件
                ListFooterComponent={refreshing?null:<CardList/>} // 传递事件通知给 CardList
                onRefresh={fetchData} // 下拉刷新时调用 fetchData
                refreshing={refreshing} // 控制刷新状态
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
});

export default App;
