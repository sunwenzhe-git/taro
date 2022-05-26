import React from 'react';
import Taro, { navigateTo } from '@tarojs/taro';

function Home() {
  return (
    <div onClick={() => navigateTo({ url: '/pages/moduleB/pages/test/index' })}>
      Home
    </div>
  );
}

export default Home;
