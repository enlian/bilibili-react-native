// App.js
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DynamicsScreen from './screens/DynamicsScreen';
import MyScreen from './screens/MyScreen';
import HomeTab from './home/homeTab1'
import appMainColor from './../utils/common'

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    headerShown: false,
                    tabBarActiveTintColor: appMainColor,
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        paddingBottom: 7, // 修改底部边距
                    },
                    tabBarLabel: ({ focused}) => (
                        <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
                            {route.name}
                        </Text>
                    ),
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if (route.name === '首页') {
                            iconName = focused ? 'home-outline' : 'home-outline';
                        } else if (route.name === '动态') {
                            iconName = focused ? 'planet-outline' : 'planet-outline';
                        } else if (route.name === '我的') {
                            iconName = focused ? 'person-outline' : 'person-outline';
                        }
                        return <Ionicons style={styles.icon} name={iconName} size={18} color={color}/>;
                    },
                })}
            >
                <Tab.Screen name="首页" component={HomeTab}/>
                <Tab.Screen name="动态" component={DynamicsScreen}/>
                <Tab.Screen name="我的" component={MyScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    icon:{
        marginTop:5
    },
    tabLabel: {
        fontSize: 10, // 修改文字大小
    },
    tabLabelFocused: {
        color:appMainColor,
        fontSize: 10, // 选中时文字大小
    },
});

export default App;
