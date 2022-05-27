import { getSystemInfoSync } from '@tarojs/taro';

/**
 * 判断用户浏览器终端信息
 *
 * browser.versions.ios 判断是否是IOS设备
 */
export const browser = () => {
  if (navigator) {
    const u = navigator ? navigator.userAgent : '';
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1 // 是否微信
    };
  }
  return {};
};
export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}
// 是否是ios环境
export function isIOS() {
  return getSystemInfoSync()?.system?.indexOf('iOS') !== -1;
}
/**
 * 判断浏览器是否支持webp格式
 * @return {[Boolean]}
 */
export function isSupportWebp() {
  let support = false;
  const system = getSystemInfoSync();

  try {
    const iosSystemSupport =
      isIOS() && Number(system.system?.split('.')?.[0].split(' ')?.[1]) > 14;
    const androidSystemSupport =
      system?.platform === 'android' &&
      Number(system.system?.split('.')?.[0].split(' ')?.[1]) > 4;

    support =
      system?.platform === 'devtools' ||
      androidSystemSupport ||
      iosSystemSupport;
  } catch (e) {
    console.log(e);
  }

  return support;
}
/**
 * 转换为时间字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(
  time: object | string | number,
  cFormat: string = '{y}-{m}-{d} {h}:{i}',
  dValue = '无'
): string {
  if (!time) {
    return dValue;
  }
  if (arguments.length === 0) {
    return '';
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date: Date;
  if (typeof time === 'object') {
    date = time as Date;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function rangeArray(size: number) {
  let _array: Array<number> = [];
  for (let i = 0; i < size; i++) {
    _array[i] = i;
  }
  return _array;
}

export function queryString(obj?: Object) {
  if (!obj) {
    return '';
  }
  return (
    '?' +
    Object.keys(obj)
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
      })
      .join('&')
  );
}

/**
 * 将http转为https
 * @param url 链接
 */
export const parse2Https = (url: string) => {
  if (!url) return;
  return url.startsWith('https') ? url : url.replace('http', 'https');
};

export const parseDate = function (date: string) {
  var t = Date.parse(date);
  if (typeof t === 'number') {
    return new Date(Date.parse(date.replace(/-/g, '/')));
  } else {
    return new Date();
  }
};

export function parseWeekday(sDate) {
  var dt =
    typeof sDate === 'string' ? new Date(sDate.replace(/-/g, '/')) : sDate;
  var a = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ];
  return a[dt.getDay()];
}
