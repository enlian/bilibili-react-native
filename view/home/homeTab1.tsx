import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import LiveBroadcast from './liveBroadcast/LiveBroadcast';
import Recommend from './recommend/Recommend';

const App = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0); // 保存当前选中的标签索引
    const tabNames = ["直播", "推荐", "热门", "追番", "影视"]; // 定义标签名称

    // 根据索引获取标签名称
    const getTabNameByIndex = (index) => tabNames[index];

    const handleTabPress = (index) => {
        console.log(index,getTabNameByIndex(activeTabIndex))
        setActiveTabIndex(index); // 更新当前选中的标签索引
    };

    return (
        <Tabs.Container
            initialTabName={getTabNameByIndex(activeTabIndex)} // 根据索引获取初始活动标签名称
            onTabChange={(index) => handleTabPress(index)} // 监听标签切换
            renderTabBar={(props) => {
                return (
                    <View style={styles.tabBar}>
                        {props.tabNames.map((tabName, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    handleTabPress(index); // 调用处理函数
                                    props.onTabPress(index); // 触发默认的标签切换
                                }}
                                style={styles.tab}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTabIndex === index ? styles.activeText : styles.inactiveText,
                                    ]}
                                >
                                    {tabName}
                                </Text>
                                {activeTabIndex === index && <View style={styles.activeUnderline} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                );
            }}
        >
            <Tabs.Tab name="直播">
                <Tabs.FlatList data={[]} ListHeaderComponent={<LiveBroadcast />} renderItem={null} />
            </Tabs.Tab>
            <Tabs.Tab name="推荐">
                <Tabs.FlatList data={[]} ListHeaderComponent={<Recommend />} renderItem={null} />
            </Tabs.Tab>
            <Tabs.Tab name="热门">
                <Text>热门内容</Text>
            </Tabs.Tab>
            <Tabs.Tab name="追番">
                <Text>追番内容</Text>
            </Tabs.Tab>
            <Tabs.Tab name="影视">
                <Text>影视内容</Text>
            </Tabs.Tab>
        </Tabs.Container>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    tab: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
    },
    activeText: {
        color: 'pink', // 选中状态的文字颜色
    },
    inactiveText: {
        color: '#000', // 未选中状态的文字颜色
    },
    activeUnderline: {
        marginTop: 5,
        height: 2,
        width: '100%',
        backgroundColor: 'pink', // 选中状态的下划线颜色
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
