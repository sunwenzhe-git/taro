import Taro, {
  request,
  getStorageSync,
  hideLoading,
  setStorageSync,
  showToast,
  hideToast,
  reLaunch,
  removeStorageSync
} from '@tarojs/taro';
import { isObject, isSupportWebp } from '@/utils';
import { ENV } from '@/utils/enum';

export interface IRequestData {
  url: string;
  data?: Object;
  contentType?: string;
  dataType?: string;
  headers?: Array<{ key: string; value: string }>;
  method?: RequestMethod;
  options?: any;
}
// 定义可使用的Request方法
type RequestMethod =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';
const expire = { current: false };
class Request {
  async httpRequest({
    url,
    data = {},
    contentType = 'application/json',
    headers = [],
    dataType = 'json',
    method = 'GET',
    options
  }: IRequestData) {
    // const token = getStorageSync('token');
    // Object.keys(data).forEach((item) => {
    //   const key = data[item];
    //   if (key === '' || key === null || key === undefined) {
    //     delete data[item];
    //   }
    // });

    let header = {
      'Content-Type': contentType,
      'X-SS-API-KEY': 'apiKey'
      //   token,
    };
    if (headers) {
      headers.forEach((v) => {
        header[v.key] = v.value;
      });
    }

    return new Promise((resolve, reject) => {
      request({
        url,
        method,
        dataType,
        header,
        data,
        ...options,
        success: (res) => {
          const result = res.data;
          const isSuccess = result?.success;
          if (isSuccess) {
            expire.current = false;
            resolve(result?.data);
          } else {
            const message = this.formatErrorMsg({
              msg: result?.message,
              flag: expire,
              code: result?.code
            });
            reject({
              success: isSuccess,
              msg: message,
              code: result?.code || 500
            });
            ENV.Web && hideLoading();

            if (options?.toastShow) {
              showToast(message);
            }
          }
        },
        fail: (err: Taro.General.CallbackResult) => {
          ENV.Web && hideLoading();
          const { code, message } = err || {};
          if (code === '303' && !expire.current) {
            removeStorageSync('tenantId');
            expire.current = true;
            hideToast();
            reLaunch({ url: '/pages/Main/pages/Index/index' });
          }
          if (code === 'xxx') {
            const accountInfo = ENV.WeChat ? wx.getAccountInfoSync() : {};
            // env类型
            const wxEnv = accountInfo?.miniProgram?.envVersion;
            wxEnv !== 'develop' && hideToast();
            return;
          }
          if (code === 'xxxx') {
            reLaunch({ url: '/pages/Main/pages/Home/index' });
            setStorageSync('balckUser', true);
            return;
          }
          const msg = this.formatErrorMsg({ msg: message, flag: expire, code });
          reject({
            success: false,
            msg,
            code: code ?? 400
          });
          if (options.toastShow) {
            showToast(msg);
          }
        }
      });
    });
  }

  formatErrorMsg({ msg, flag, code }) {
    let result = msg;
    if (String(code) === 'xxx') {
      result = '系统超时';
    }
    if (flag?.current) {
      result = '正在重新连接';
    }
    return result;
  }

  /**
   * @param {*支付宝环境为api,其他环境为url} api
   * @param {*参数} params
   * @param {*支付宝环境为PC预览动态环境,其他环境为http请求method} method
   * @param {*headers} headers
   * @return {*}
   */
  async envRequest(api: string, params, method?, headers?) {
    if ('OssDataSheet'.includes(params.methodName)) {
      const newParam = params?.param ? JSON.parse(params?.param) : {};
      if (isObject(newParam) && !newParam?.ossImgProcessing) {
        newParam.ossImgProcessing = isSupportWebp()
          ? 'image/resize,w_750,m_lfit/format,webp'
          : 'image/resize,w_750,m_lfit';
      }
      params.param = JSON.stringify(newParam);
    }
  }
}

export default Request;
