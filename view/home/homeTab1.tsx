import React from 'react'
import {View, StyleSheet, ListRenderItem, Text} from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'
import LiveBroadcast from './liveBroadcast/LiveBroadcast'
import Recommend from './recommend/Recommend'

const HEADER_HEIGHT = 50

const Header = () => {
    return <View style={styles.header} />
}

const HomeTab: React.FC = () => {
    return (
        <Tabs.Container>
            <Tabs.Tab name="直播">
                <Tabs.FlatList data={[]} ListHeaderComponent={<LiveBroadcast/>} renderItem={null}/>
            </Tabs.Tab>
            <Tabs.Tab name="推荐">
                <Tabs.FlatList data={[]} ListHeaderComponent={<Recommend/>} renderItem={null}/>
            </Tabs.Tab>
            <Tabs.Tab name="热门">
                <Text></Text>
            </Tabs.Tab>
            <Tabs.Tab name="追番">
                <Text></Text>
            </Tabs.Tab>
            <Tabs.Tab name="影视">
                <Text></Text>
            </Tabs.Tab>
        </Tabs.Container>
    )
}

const styles = StyleSheet.create({
    header: {
        height: HEADER_HEIGHT,
        width: '100%',
        backgroundColor: '#2196f3',
    }
})

export default HomeTab
