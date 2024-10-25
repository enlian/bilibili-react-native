import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import VideoPlayerSection from './videoPlayer'; // 导入视频播放器组件
import VideoInfoSection from './vedioInfo'; // 导入视频信息组件
import VideoList from './moreVideos'; // 导入视频列表组件

const VideoPage = () => {
  return (
    <ScrollView style={styles.container}>
      <VideoPlayerSection />
      <VideoInfoSection />
      <VideoList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default VideoPage;
