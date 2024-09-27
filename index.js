import { AppRegistry } from 'react-native';
import App from './view/App'; // 导入主要的 App 组件
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
enableScreens();
AppRegistry.registerComponent(appName, () => App);
