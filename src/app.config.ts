export default {
  pages: ['pages/Main/pages/index/index', 'pages/Main/pages/home/index'],
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
        pagePath: 'pages/Main/pages/index/index',
        text: '首页',
        iconPath: 'public/favicon.png',
        selectedIconPath: 'public/favicon.png'
      },
      {
        pagePath: 'pages/Main/pages/home/index',
        text: '首页',
        iconPath: 'public/favicon.png',
        selectedIconPath: 'public/favicon.png'
      }
    ],
    position: 'bottom',
    custom: false
  },
  subpackages: [
    {
      root: 'pages/moduleA',
      name: 'moduleA',
      pages: ['pages/test/index']
    },
    {
      root: 'pages/moduleB',
      name: 'moduleB',
      pages: ['pages/test/index']
    }
  ]
};
