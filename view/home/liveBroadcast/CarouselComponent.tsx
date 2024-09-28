import React from 'react';
import {Text, Dimensions, StyleSheet, View,Image} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

interface AppProps {
}

const App: React.FC<AppProps> = ({ data }) => {

    const limitedData = data.slice(0, 5);

    return (
        <View style={styles.container}>
            <SwiperFlatList
                autoplay={false}
                autoplayDelay={10}
                autoplayLoop={false}
                index={0}
                showPagination
                data={limitedData}
                paginationStyle={styles.paginationContainer}
                paginationStyleItemActive={styles.activeDot}
                paginationStyleItemInactive={styles.inactiveDot}
                paginationStyleItem={styles.paginationStyleItem}
                paginationTapDisabled={false}
                renderItem={({item}) => {
                    console.log(item.pic)
                    return (
                        <View style={[styles.child]}>
                            <Image source={{uri:item.pic}} style={styles.child}/>
                            {/*<Text style={styles.text}>React Native</Text>*/}
                        </View>
                    )
                }}
            />
        </View>
    )
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 7,
        marginVertical:7,
        backgroundColor: 'white',
        height: 120,
        borderRadius:7,
        overflow:"hidden"
    },
    child: {width:width-14, justifyContent: 'center',height: 120,
    backgroundColor:'#ccc'
    },
    text: {fontSize: width * 0.1, textAlign: 'center'},
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:8
    },
    paginationStyleItem:{
      marginHorizontal:4,
        borderWidth: 1, // 圆点的边框宽度
        borderColor: 'rgba(255,255,255,0.65)', // 圆点的边框颜色
    },
    activeDot: {
        width:8,
        height:8,
        borderRadius:4,
        backgroundColor: 'rgba(0,0,0,0.74)', // 活跃圆点颜色
    },
    inactiveDot: {
        width:8,
        height:8,
        borderRadius:4,
        backgroundColor: 'rgba(155,155,155,0.75)', // 非活跃圆点颜色
    },
});

export default App;
