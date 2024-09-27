import React from 'react'
import {View, StyleSheet, ListRenderItem, Text} from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'
import LiveBroadcast from './liveBroadcast/LiveBroadcast'

const HEADER_HEIGHT = 50

const Header = () => {
    return <View style={styles.header} />
}

const HomeTab: React.FC = () => {
    return (
        <Tabs.Container
            renderHeader={Header}
            headerHeight={HEADER_HEIGHT} // optional
        >
            <Tabs.Tab name="直播">
                <Tabs.ScrollView>
                    <LiveBroadcast/>
                </Tabs.ScrollView>
            </Tabs.Tab>
            <Tabs.Tab name="推荐">
                <Text></Text>
            </Tabs.Tab>
            <Tabs.Tab name="热门">
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
    },
})

export default HomeTab
