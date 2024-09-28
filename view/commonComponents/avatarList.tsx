import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

interface User {
    name: {
        first: string;
        last: string;
    };
    picture: {
        medium: string;
    };
}

const App = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // 获取随机用户数据
    const fetchRandomUsers = async () => {
        try {
            const response = await fetch('https://randomuser.me/api/?results=20'); // 获取 20 个随机用户
            const data = await response.json();
            setUsers(data.results);
        } catch (error) {
            console.error('Error fetching random users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomUsers(); // 组件挂载时获取数据
    }, []);

    // 渲染单个用户信息
    const renderUserItem = ({ item }: { item: User }) => (
        <View style={styles.userContainer}>
            <Image source={{ uri: item.picture.medium }} style={styles.avatar} />
            <Text style={styles.userName} numberOfLines={1}>
                {item.name.first.length > 10 ? `${item.name.first.substring(0, 10)}...` : item.name.first}
            </Text>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#ccc" />;
    }

    return (
        <FlatList
            horizontal
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false} // 隐藏水平滚动条
            style={styles.flatList}
        />
    );
};

// 样式
const styles = StyleSheet.create({
    flatList: {
        marginHorizontal: 8,
    },
    userContainer: {
        alignItems: 'center',
        marginRight: 15,
        width: 34,
    },
    avatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#a1a1a1',
    },
    userName: {
        marginTop: 5,
        fontSize: 9,
        color: '#333',
    },
});

export default App;
