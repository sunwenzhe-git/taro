export default {
  pages: ['pages/index/index', 'pages/home/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#A40000',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'public/favicon.png',
        selectedIconPath: 'public/favicon.png'
      },
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'public/favicon.png',
        selectedIconPath: 'public/favicon.png'
      }
    ],
    position: 'bottom',
    custom: false
  }
};
