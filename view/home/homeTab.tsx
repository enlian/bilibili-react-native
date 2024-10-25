import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LiveBroadcast from './liveBroadcast/LiveBroadcast';
import CardList from '../commonComponents/CardList'; // 确保路径正确
import { appMainColor } from './../../utils/common';

// 标签内容的映射
const initialLayout = { width: '100%' };
const renderScene = ({ route, navigation }) => {
    switch (route.key) {
        case 'live':
            return <LiveBroadcast navigation={navigation} />;
        case 'recommend':
            return <CardList navigation={navigation} />;  // 显式传递 navigation
        case 'hot':
            return <CardList navigation={navigation} />;  // 显式传递 navigation
        case 'follow':
            return <CardList navigation={navigation} />;  // 显式传递 navigation
        case 'movies':
            return <CardList navigation={navigation} />;  // 显式传递 navigation
        default:
            return null;
    }
};

const App = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'live', title: '直播' },
        { key: 'recommend', title: '推荐' },
        { key: 'hot', title: '热门' },
        { key: 'follow', title: '追番' },
        { key: 'movies', title: '影视' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={(props) => renderScene({ ...props, navigation })}  // 传递 navigation 到 renderScene
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            swipeEnabled={false} // 禁用左右滑动
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    indicatorStyle={styles.indicator} // 设置下划线样式
                    style={styles.tabBar} // TabBar样式
                    renderLabel={({ route, focused }) => (
                        <Text style={[styles.label, focused && styles.activeLabel]}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    );
};

// 样式
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff', // TabBar 背景颜色
        height: 30,
    },
    label: {
        color: '#666', // 未选中时的文字颜色
        fontSize: 12,
        marginTop: -18,
    },
    activeLabel: {
        color: appMainColor, // 选中时的文字颜色
    },
    indicator: {
        backgroundColor: appMainColor, // 下划线颜色
        height: 2, // 下划线高度
        width: 18,
        marginLeft: 28,
    },
});

export default App;
