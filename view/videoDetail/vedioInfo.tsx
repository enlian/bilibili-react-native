import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {appMainColor, getRandomAvatar} from './../../utils/common'

const VideoInfoSection = () => {
  return (
    <View style={styles.container}>
      {/* UP主信息 */}
      <View style={styles.upContainer}>
        <Image
          source={getRandomAvatar()} 
          style={styles.upAvatar}
        />
        <View style={styles.upInfo}>
          <Text style={styles.upName} numberOfLines={1} ellipsizeMode="tail">
            峰哥亡命天涯
          </Text>
          <Text style={styles.upDetails} numberOfLines={1} ellipsizeMode="tail">
            204.3万粉丝  |  598视频
          </Text>
        </View>
        <View style={styles.followButton}>
          <Text style={styles.followButtonText} numberOfLines={1} ellipsizeMode="tail">已关注</Text>
        </View>
      </View>

      {/* 热度和标题 */}
      <View style={styles.hotContainer}>
        <View style={styles.hotTag}>
          <Icon name="fire" size={14} color="#ff6e66" />
          <Text style={styles.hotText} numberOfLines={1} ellipsizeMode="tail">热门</Text>
        </View>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          这是啥动画呀，这么多人看，叫什么名字？
        </Text>
      </View>

      {/* 播放数、评论数、发布时间 */}
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Icon name="play-circle-o" size={14} color="#666" />
          <Text style={styles.statsText} numberOfLines={1} ellipsizeMode="tail">17.1万</Text>
        </View>
        <View style={styles.statsItem}>
          <Icon name="comments-o" size={14} color="#666" />
          <Text style={styles.statsText} numberOfLines={1} ellipsizeMode="tail">5276</Text>
        </View>
        
        <Text style={styles.timeText} numberOfLines={1} ellipsizeMode="tail">2024年10月25日</Text>
        <View style={styles.statsItem}>
          <Icon name="eye" size={14} color="#666" />
          <Text style={styles.statsText} numberOfLines={1} ellipsizeMode="tail">2000+人正在看</Text>
        </View>
      </View>

      {/* 点赞、点踩、收藏、分享 */}
      <View style={styles.actionsContainer}>
        <View style={styles.actionItem}>
          <Icon name="thumbs-up" size={22} color="#666" />
          <Text style={styles.actionText} numberOfLines={1} ellipsizeMode="tail">1.1万</Text>
        </View>
        <View style={styles.actionItem}>
          <Icon name="thumbs-down" size={22} color="#666" />
          <Text style={styles.actionText} numberOfLines={1} ellipsizeMode="tail">5813</Text>
        </View>
        <View style={styles.actionItem}>
          <Icon name="star-o" size={22} color="#666" />
          <Text style={styles.actionText} numberOfLines={1} ellipsizeMode="tail">2380</Text>
        </View>
        <View style={styles.actionItem}>
          <Icon name="share" size={22} color="#666" />
          <Text style={styles.actionText} numberOfLines={1} ellipsizeMode="tail">1744</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  upContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  upAvatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 8,
  },
  upInfo: {
    flex: 1,
  },
  upName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  upDetails: {
    fontSize: 11,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  followButtonText: {
    fontSize: 12,
    color: '#aaa',
  },
  hotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hotTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe7e7',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  hotText: {
    color: '#ff6e66',
    marginLeft: 4,
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 3,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    marginLeft:2,
    marginTop:-2
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 3,
  },
});

export default VideoInfoSection;
