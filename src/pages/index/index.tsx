import React, { useState } from 'react';
import Taro, { useReady } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.module.scss';

const Index: React.FC = () => {
  const [detail, setDetail] = useState<String>('');
  // 获取并使用全局变量 "x"
  const app = Taro.getApp();
  console.log(app.x, 333);

  return (
    <View>
      <View style={{ textAlign: 'center' }}>{detail}</View>
      <View>环境参数：</View>
      <View>NODE_ENV: {process.env.NODE_ENV}</View>
      <View>TARO_ENV: {process.env.TARO_ENV}</View>
    </View>
  );
};

export default Index;
