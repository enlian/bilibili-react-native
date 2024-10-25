import React from 'react';
import Video from 'react-native-video';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native'; // 导航
import Ionicons from 'react-native-vector-icons/Ionicons'; // 使用 Ionicons

const VideoPlayerSection = () => {
  const navigation = useNavigation(); // 获取导航对象

  // 返回按钮功能
  const handleBackPress = () => {
    navigation.goBack(); // 返回上一页
  };

  return (
    <View style={styles.videoContainer}>
      <Video
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }} // 示例视频URL
        style={styles.videoPlayer}
        controls={true} // 启用播放器控制
        resizeMode="cover" // 设置视频缩放模式
      />

      {/* 顶部渐变蒙层 */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0)']} // 从黑色到透明
        style={[styles.overlay, styles.topOverlay]}>
        {/* 返回按钮 */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>

        {/* 右上角三个图标 */}
        <View style={styles.topRightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="headphones" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="tv" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="ellipsis-h" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* 底部渐变蒙层 */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']} // 从透明到黑色
        style={[styles.overlay, styles.bottomOverlay]}></LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: 200, // 根据需要调整高度
    position: 'relative',
  },
  videoPlayer: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 50, // 渐变蒙层的高度
  },
  topOverlay: {
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10, // 确保图标不与状态栏重叠
  },
  bottomOverlay: {
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  topRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
});

export default VideoPlayerSection;
