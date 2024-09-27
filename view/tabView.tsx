import React from 'react'
import { View, StyleSheet, ListRenderItem } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'

const HEADER_HEIGHT = 100

const DATA = [0, 1, 2, 3, 4]
const identity = (v: unknown): string => v + ''

const Header = () => {
    return <View style={styles.header} />
}

const Example: React.FC = () => {
    const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
        return (
            <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
        )
    }, [])

    return (
        <Tabs.Container
            renderHeader={Header}
            headerHeight={HEADER_HEIGHT} // optional
        >
            <Tabs.Tab name="新闻">
                <Tabs.FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={identity}
                />
            </Tabs.Tab>
            <Tabs.Tab name="视频">
                <Tabs.ScrollView>
                    <View style={[styles.box, styles.boxA]} />
                    <View style={[styles.box, styles.boxB]} />
                </Tabs.ScrollView>
            </Tabs.Tab>
            <Tabs.Tab name="商品">
                <Tabs.ScrollView>
                    <View style={[styles.box, styles.boxA]} />
                    <View style={[styles.box, styles.boxB]} />
                </Tabs.ScrollView>
            </Tabs.Tab>
        </Tabs.Container>
    )
}

const styles = StyleSheet.create({
    box: {
        height: 250,
        width: '100%',
    },
    boxA: {
        backgroundColor: 'white',
    },
    boxB: {
        backgroundColor: '#D8D8D8',
    },
    header: {
        height: HEADER_HEIGHT,
        width: '100%',
        backgroundColor: '#2196f3',
    },
})

export default Example
