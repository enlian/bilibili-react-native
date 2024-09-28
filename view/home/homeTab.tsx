import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import LiveBroadcast from './liveBroadcast/LiveBroadcast'
import Recommend from './recommend/Recommend'
const FirstRoute = () => (
    <LiveBroadcast/>
);

const SecondRoute = () => (
    <Recommend/>
);

const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#7bb843' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});

export default function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: '直播' },
        { key: 'second', title: '推荐' },
        { key: 'third', title: '热门' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}
