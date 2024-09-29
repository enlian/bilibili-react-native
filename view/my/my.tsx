import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // 使用Ionicons
import {appMainColor, getRandomAvatar} from './../../utils/common'

const ProfileScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.headerTopRight}>
                <TouchableOpacity style={styles.headerTopRightIcon}>
                    <Icon name="scan-outline" size={17} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerTopRightIcon}>
                    <Icon name="shirt-outline" size={17} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerTopRightIcon}>
                    <Icon name="moon-outline" size={17} color="#666" />
                </TouchableOpacity>
            </View>

            {/* Profile Header */}
            <View style={styles.profileHeader}>
                <Image
                    source={getRandomAvatar()}  // 替换为实际图片URL
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <View style={styles.nameBox}>
                        <Text style={styles.username}>enlian</Text>
                        <Icon name="create-outline" size={12} color={'#666'} style={styles.membershipIcon} />
                        <Text style={styles.lvNumber}>LV3</Text>
                    </View>

                    <View style={styles.membershipRow}>
                        <Text style={styles.membership}>正式会员</Text>
                    </View>
                    <Text style={styles.score}>B币：199       硬币: 459</Text>
                </View>
                <TouchableOpacity style={styles.spaceLink}>
                    <Text style={styles.spaceText}>空间</Text>
                    <Icon name="chevron-forward-outline" size={14} color="#999" style={{marginLeft:4,marginTop:1}}/>
                </TouchableOpacity>
            </View>

            {/* 动态，关注，粉丝 */}
            <View style={styles.statsRow}>
                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>55</Text>
                    <Text style={styles.statsLabel}>动态</Text>
                </View>

                {/* 竖线 */}
                <View style={styles.verticalDivider} />

                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>159</Text>
                    <Text style={styles.statsLabel}>关注</Text>
                </View>

                {/* 竖线 */}
                <View style={styles.verticalDivider} />

                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>426</Text>
                    <Text style={styles.statsLabel}>粉丝</Text>
                </View>
            </View>


            {/* VIP Button */}
            <TouchableOpacity style={styles.vipButton}>
                <Icon name="medal-outline" size={25} color={appMainColor} />
                <View style={styles.vipButtonTextBox}>
                    <Text style={styles.vipButtonText}>开通大会员</Text>
                    <Text style={styles.vipButtonText1}>了解更多权益</Text>
                </View>
                <Icon style={styles.vipRightMore} name="chevron-forward-outline" size={12} color={appMainColor} />
            </TouchableOpacity>

            {/* Services Row */}
            <View style={styles.servicesRow}>
                <TouchableOpacity style={styles.serviceItem}>
                    <Icon name="cloud-download-outline" size={18} color="#4F8EF7" />
                    <Text style={styles.serviceLabel}>离线缓存</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.serviceItem}>
                    <Icon name="time-outline" size={18} color="#4F8EF7" />
                    <Text style={styles.serviceLabel}>历史记录</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.serviceItem}>
                    <Icon name="star-outline" size={18} color="#4F8EF7" />
                    <Text style={styles.serviceLabel}>我的收藏</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.serviceItem}>
                    <Icon name="play-circle-outline" size={18} color="#4F8EF7" />
                    <Text style={styles.serviceLabel}>稍后再看</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.moreServicesText}>更多服务</Text>

            {/* More Services */}
            <View style={styles.moreServices}>
                <TouchableOpacity style={styles.moreServiceItem}>
                    <Icon name="headset-outline" size={18} color={appMainColor} />
                    <Text style={styles.moreServiceLabel}>联系客服</Text>
                    <Icon name="chevron-forward-outline" size={12} color="#999" style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreServiceItem}>
                    <Icon name="settings-outline" size={18} color={appMainColor} />
                    <Text style={styles.moreServiceLabel}>设置</Text>
                    <Icon name="chevron-forward-outline" size={12} color="#999" style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreServiceItem}>
                    <Icon name="wallet-outline" size={18} color={appMainColor} />
                    <Text style={styles.moreServiceLabel}>我的钱包</Text>
                    <Icon name="chevron-forward-outline" size={12} color="#999" style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreServiceItem}>
                    <Icon name="file-tray-stacked-outline" size={18} color={appMainColor} />
                    <Text style={styles.moreServiceLabel}>稿件管理</Text>
                    <Icon name="chevron-forward-outline" size={12} color="#999" style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreServiceItem}>
                    <Icon name="diamond-outline" size={18} color={'rgba(251,114,153,0.9)'} />
                    <Text style={styles.moreServiceLabel}>我的NFT</Text>
                    <Icon name="chevron-forward-outline" size={12} color="#999" style={styles.arrowIcon} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerTopRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        marginTop:10,
        marginRight:5
    },
    headerTopRightIcon:{
        marginLeft:15
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    profileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginLeft:5
    },
    profileInfo: {
        marginLeft: 15,
    },
    nameBox:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontSize: 14,
        color:'#2c2c2c',
        fontWeight: 'bold',
    },
    lvNumber:{
        backgroundColor:'#37a9ea',
        fontWeight:'bold',
        color:'#fff',
        fontSize:7,
        borderRadius:3,
        paddingHorizontal:2,
        marginLeft:5,
        marginTop:1
    },
    membershipRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:4,
        marginBottom:4
    },
    membership: {
        fontSize: 7,
        color: appMainColor,
        borderWidth:1,
        borderColor:'rgba(251,114,153,0.85)',
        borderRadius:3,
        paddingHorizontal:3,
        opacity:0.9
    },
    membershipIcon: {
        marginLeft: 5,
    },
    score: {
        fontSize: 8,
        color: '#888',
    },
    spaceLink: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
    },
    spaceText: {
        fontSize: 9,
        color: '#888',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', // 确保竖线与文字对齐
        marginVertical: 15,
    },
    statsItem: {
        alignItems: 'center',
        flex: 1, // 使每个统计项平分宽度
    },
    verticalDivider: {
        height: '60%',  // 控制竖线的高度（可以根据你的设计调整）
        width: 1,
        backgroundColor: '#e0e0e0',  // 竖线颜色
    },
    statsNumber: {
        fontSize: 12,
        color:'#111'
    },
    statsLabel: {
        fontSize: 8,
        color: '#888',
    },
    vipButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(251,114,153,0.15)',
        padding: 10,
        marginHorizontal: 13,
        borderRadius: 5,
        borderWidth:1,
        borderColor:'rgba(251,114,153,0.16)'
    },
    vipRightMore:{
        position:'absolute',
        right:10
    },
    vipButtonTextBox:{
        marginLeft: 10,
    },
    vipButtonText: {
        color: appMainColor,
        fontSize: 9,
        fontWeight: 'bold',
    },
    vipButtonText1:{
        fontSize:8,
        color: appMainColor,
        marginTop:3,
        opacity:0.9
    },
    servicesRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    serviceItem: {
        alignItems: 'center',
    },
    serviceLabel: {
        marginTop: 5,
        fontSize: 9,
        color: '#333',
    },
    moreServicesText:{
        fontSize:9,
        color:'#222',
        marginTop:20,
        marginLeft:12
    },
    moreServices: {
        // borderTopWidth: 1,
        // borderColor: '#eee',
        paddingTop: 0,
        marginTop:8,
    },
    moreServiceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical:12,
        paddingLeft:23
        // borderBottomWidth: 1,
        // borderColor: '#eee',
    },
    moreServiceLabel: {
        marginLeft: 10,
        fontSize: 9,
        color: '#333',
    },
    arrowIcon: {
        marginLeft: 'auto',
    },
});

export default ProfileScreen;
