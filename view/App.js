// App.js
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DynamicsScreen from './screens/DynamicsScreen';
import MyScreen from './screens/MyScreen';
import HomeTab from './home/homeTab'

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    headerShown: false,
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if (route.name === '首页') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === '动态') {
                            iconName = focused ? 'planet' : 'planet-outline';
                        } else if (route.name === '我的') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>;
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

export default App;
