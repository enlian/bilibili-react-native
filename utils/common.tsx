export const  appMainColor= '#fb7299';

const avatars = {
    1: require('../assets/img/avatars/1.jpg'),
    2: require('../assets/img/avatars/2.jpg'),
    3: require('../assets/img/avatars/3.jpg'),
    4: require('../assets/img/avatars/4.jpg'),
    5: require('../assets/img/avatars/5.jpg'),
};

const covers = {
    1: require('../assets/img/covers/1.jpg'),
    2: require('../assets/img/covers/2.jpg'),
    3: require('../assets/img/covers/3.jpg'),
    4: require('../assets/img/covers/4.jpg'),
    5: require('../assets/img/covers/5.jpg'),
    6: require('../assets/img/covers/6.jpg'),
};

export const getRandomAvatar = () => {
    // 随机生成一个 1 到 5 之间的数字
    const randomIndex = Math.floor(Math.random() * 5) + 1;
    return avatars[randomIndex];
};

export const getRandomCover = () => {
    // 随机生成一个 1 到 5 之间的数字
    const randomIndex = Math.floor(Math.random() * 6) + 1;
    return covers[randomIndex];
};
