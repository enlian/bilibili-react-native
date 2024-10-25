import React, { useEffect, useState } from 'react';
import { FlatList, Image, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // 使用 FontAwesome 图标库

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // 当前页码
  const [hasMore, setHasMore] = useState(true); // 判断是否还有更多数据

  const fetchVideos = async (currentPage) => {
    if (loading) return; // 防止多次触发加载

    setLoading(true);
    try {
      const response = await fetch(`https://api.bilibili.com/x/web-interface/dynamic/region?rid=5&ps=20&pn=${currentPage}`);
      const data = await response.json();
      
      // 检查返回的数据结构
      if (data && data.data && Array.isArray(data.data.archives)) {
        const formattedData = data.data.archives.map((item) => ({
          id: item.aid.toString(),
          title: item.title,
          views: `${(item.stat.view / 10000).toFixed(1)}万`,
          comments: item.stat.reply.toString(),
          up: item.owner.name,
          duration: formatDuration(item.duration), // 格式化时间
          image: item.pic
        }));

        setVideos((prevVideos) => [...prevVideos, ...formattedData]); // 追加到现有数据
        if (data.data.archives.length === 0) {
          setHasMore(false); // 如果本次加载的数据长度为 0，说明没有更多数据了
        }
      } else {
        setHasMore(false); // 错误的数据结构或没有更多数据
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    setLoading(false);
  };

  // 格式化时长为 mm:ss
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    fetchVideos(page); // 初始加载第一页数据
  }, [page]);

  const loadMoreVideos = () => {    
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1); // 加载下一页
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={({ item }) => (
          <View style={styles.videoItemContainer}>
            <View style={styles.videoItem}>
              <View style={styles.thumbnailContainer}>
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
                {/* 视频时长 */}
                <Text style={styles.videoDuration}>{item.duration}</Text>
              </View>
              <View style={styles.videoInfo}>
                {/* 限制标题为一行，超出显示省略号 */}
                <Text style={styles.videoTitle} numberOfLines={1} ellipsizeMode="tail">
                  {item.title}
                </Text>
                <View style={styles.upInfoContainer}>
                  {/* 将图标和文本放入 <Text> 组件中，避免错误 */}
                  <Text style={styles.textWithIcon}>
                    <FontAwesome name="user-o" size={12} color="#666" /> {item.up}
                  </Text>
                </View>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    {/* 更换为中空的播放图标 */}
                    <Text style={styles.textWithIcon}>
                      <FontAwesome name="play-circle-o" size={12} color="#666" /> {item.views}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    {/* 将图标和文本放入 <Text> 组件中 */}
                    <Text style={styles.textWithIcon}>
                      <FontAwesome name="comment-o" size={12} color="#666" /> {item.comments}
                    </Text>
                  </View>
                </View>
              </View>
              {/* "更多" 图标 */}
              <TouchableOpacity style={styles.moreIcon}>
                <Icon name="more-vert" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreVideos} // 当滚动到底部时加载更多
        onEndReachedThreshold={0.5} // 控制何时触发加载更多，0.5表示距离底部还有一半内容时触发
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null} // 底部加载指示器
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // 分割线颜色
    paddingVertical: 10, // 确保分割线在两个 item 之间
  },
  videoItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center', // 使更多按钮对齐
    position: 'relative', // 为了定位more按钮
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: 100,
    height: 60,
    borderRadius: 5,
  },
  videoDuration: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    paddingHorizontal: 5,
    borderRadius: 3,
    fontSize: 10,
  },
  videoInfo: {
    flex: 1, // 占据剩余空间
    marginLeft: 10,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  upInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  videoViews: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  textWithIcon: {
    fontSize: 12,
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

export default VideoList;
