/*
 * @Description: 常量存放文件
 */

/**
 * @description ENV 当前项目运行环境
 * @property WeChat 微信
 * @property DingDing 钉钉
 * @property AliPay 支付宝
 * @property Web  Web
 */
export const ENV = {
  WeChat: process.env.TARO_ENV === 'weapp',
  DingDing: process.env.TARO_ENV === 'alipay' && typeof dd !== 'undefined',
  AliPay: process.env.TARO_ENV === 'alipay',
  Web: process.env.TARO_ENV === 'h5'
};
