import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {appMainColor}from './../../utils/common'
import LiveBroadcast from './liveBroadcast/LiveBroadcast'
import Recommend from './recommend/Recommend'

const Hot = () => (
    <View style={styles.scene}><Text>Hot Content</Text></View>
);
const Follow = () => (
    <View style={styles.scene}><Text>Follow Content</Text></View>
);
const Movies = () => (
    <View style={styles.scene}><Text>Movies Content</Text></View>
);

// 标签内容的映射
const initialLayout = { width: '100%' };
const renderScene = SceneMap({
    live: LiveBroadcast,
    recommend: Recommend,
    hot: Hot,
    follow: Follow,
    movies: Movies,
});

const App = () => {
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
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
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
    },
    label: {
        color: '#666', // 未选中时的文字颜色
    },
    activeLabel: {
        color: appMainColor, // 选中时的文字颜色
    },
    indicator: {
        backgroundColor: appMainColor, // 下划线颜色
        height: 3, // 下划线高度
    },
    scene: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
