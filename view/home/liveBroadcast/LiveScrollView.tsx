import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//https://api.bilibili.com/x/web-interface/dynamic/region?rid=31&ps=20&pn=1

interface ApiResponse {
    code: number;
    data: {
        archives: [{
            owner:{
                name:string
                face:string
            },
            stat:{
                view:number
            }
        }];
    } | null;
}

const App: React.FC<ChildProps> = ({  }) => {

    const [data, setData] = useState<archives[]>([]); // 数据类型为 Item 数组
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 定义一个异步函数来请求数据
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=31&ps=20&pn=1');
                const result: ApiResponse = await response.json();

                // 安全地访问数据并处理 null 情况
                const list = result?.data?.archives ?? [];
                console.log(list.length);
                setData(list); // 如果 list 是 null，则设置为空数组
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]); // 请求失败时，确保 data 为空数组
            }
        };

        fetchData().then(r => {})
        setLoading(false);
    }, []); // 空数组确保只在组件首次挂载时运行

    return (
        <FlatList
            numColumns={2}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    {/* 视频缩略图 */}
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.pic }} style={styles.cardImage} />
                        <View style={styles.viewsContainer}>
                            <Text style={styles.viewsText}>👁 {item.stat.view}</Text>
                        </View>
                        {/* 用户名在图片右下角 */}
                        <View style={styles.imageUsernameContainer}>
                            <Text style={styles.imageUsername}>{item.owner.name}</Text>
                        </View>
                    </View>
                    {/* 下方信息 */}
                    <View style={styles.infoContainer}>
                        <View style={styles.textContainer}>
                            <Image source={{ uri: item.owner.face }} style={styles.userImage} />
                            <View style={styles.titleContainer}>
                                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                                <Text style={styles.username} numberOfLines={1}>{item.owner.name}</Text>
                            </View>
                        </View>
                        {/* 右下角的三个小点 */}
                        <Ionicons style={styles.moreOptions} name={'ellipsis-vertical'} size={12} color={'#464646'}/>
                    </View>
                </View>
            )}
        />
    );
};

// 样式
const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        marginBottom:3,
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: 120,
        backgroundColor:'#ccc'
    },
    viewsContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 5,
        borderRadius: 3,
    },
    viewsText: {
        color: '#fff',
        fontSize: 9,
    },
    imageUsernameContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 5,
        borderRadius: 3,
        justifyContent: 'center', // 垂直居中
        alignItems: 'center', // 水平居中
    },
    imageUsername: {
        color: '#fff',
        fontSize: 9,
    },
    infoContainer: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    titleContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 10,
        color: '#333',
        maxWidth:'90%'
    },
    username: {
        fontSize: 9,
        color: '#666',
        maxWidth:'80%'
    },
    moreOptions: {
        backgroundColor:'#fff',
        position:'absolute',
        right:2,
        bottom:5
    },
});

export default App;
