import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet, ScrollView} from 'react-native';
import LiveScrollView from './LiveScrollView'
import CarouselComponent from './CarouselComponent'

//https://api.bilibili.com/pgc/web/timeline/v2?day_before=5&day_after=1&season_type=1
//https://api.bilibili.com/pgc/web/variety/feed?cursor=0&page_size=20
//https://api.live.bilibili.com/xlive/web-interface/v1/webMain/getMoreRecList?platform=web
//https://api.bilibili.com/x/web-interface/dynamic/region?rid=31&pn=1

// 模拟数据
const carouselData = Array(10).fill('https://via.placeholder.com/300x180'); // 10张轮播图
const followedUsers = Array(10).fill({
    name: '用户',
    avatar: 'https://via.placeholder.com/60',
});

const morkData = [{
    "cover": "https://i0.hdslb.com/bfs/bangumi/image/c9c834510dda7470c483969464f8d7eaa20e6fdc.jpg",
    "dms": "2.6万",
    "enable_vt": false,
    "icon_font": {"name": "playdata-square-line@500", "text": "784.4万"},
    "likes": "34.2万",
    "plays": "784.4万",
    "season_id": 48509,
    "sub_title": "一路为伍，向生绽放",
    "title": "我们的歌 第5季"
}]

// 定义 API 响应的数据结构类型
interface ApiResponse {
    code: number;
    data: {
        cursor: number;
        list: Array<Item>;
    } | null;
}

// 定义Item数据结构类型
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
        // 定义一个异步函数来请求数据
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.bilibili.com/pgc/web/variety/feed?cursor=0&page_size=20');
                const result: ApiResponse = await response.json();
                console.log(result)

                // 安全地访问数据并处理 null 情况
                const list = result?.data?.list ?? [];
                // console.log(list);
                setData(list); // 如果 list 是 null，则设置为空数组
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]); // 请求失败时，确保 data 为空数组
            }
        };

        fetchData().then(r => {})
        setLoading(false);
    }, []); // 空数组确保只在组件首次挂载时运行

    if (loading) {
        return <Text>Loading...</Text>;
    } else if (data) {
        return (
            <ScrollView style={styles.container}>
                {/* 轮播图 */}
                {/*<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>*/}
                {/*    {data.map((item, index) => (*/}
                {/*        <Image key={index} source={{uri: item.cover}} style={styles.carouselImage}/>*/}
                {/*    ))}*/}
                {/*</ScrollView>*/}
                <CarouselComponent/>

                {/* 关注的用户 */}
                <FlatList
                    horizontal
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <View style={styles.userContainer}>
                            <Image source={{uri: item.cover}} style={styles.avatar}/>
                            <Text style={styles.userName}> {item.title.length > 4 ? `${item.title.substring(0, 4)}...` : item.title}</Text>
                        </View>
                    )}
                />

                {/* 内容卡片 */}
                <LiveScrollView data={data}/>
            </ScrollView>
        );
    } else {
        return (<Text>暂无数据...</Text>);
    }


};

// 样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
    },
    carousel: {
        height: 100,
        marginBottom: 10,
        marginTop: 10,
    },
    carouselImage: {
        width: 300,
        height: 100,
        marginRight: 10,
        borderRadius: 10,
    },
    userContainer: {
        alignItems: 'center',
        marginRight: 10,
        marginBottom:5
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor:'#a1a1a1'
    },
    userName: {
        marginTop: 5,
        fontSize: 9,
        color: '#333',
    }
});

export default App;
