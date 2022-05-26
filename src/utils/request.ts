import { request } from '@tarojs/taro';

const expire = { current: false };
class ApiHttpRequest {
  async httpRequest(url, data, method, headers?, showToast = true) {
    const dscToken = getStorageSync({ key: 'token' }).data;
    const xcw = getStorageSync({ key: 'isExchange' }).data;
    Object.keys(data).forEach((item) => {
      const key = data[item];
      if (key === '' || key === null || key === undefined) {
        delete data[item];
      }
    });

    const header = {
      ...(headers || {}),
      'Content-Type': 'application/json',
      'xr': String(xcw),
      'asac': 'D8M78F2ILS29TRCXHP70X8',
      dscToken
    };
    return new Promise((resolve, reject) => {
      request({
        headers: header,
        url,
        method,
        dataType: 'json',
        data,
        success: (res) => {
          const result = get(res, 'data', {});
          const isSuccess = get(result, 'success');
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
            ENV.Web && loading.hideLoading();

            if (showToast) {
              toast.showToast(message);
            }
          }
        },
        fail: (err) => {
          ENV.Web && loading.hideLoading();
          const { code, message } = err?.data || {};
          if (code === '303' && !expire.current) {
            removeStorage({ key: 'tenantId' });
            expire.current = true;
            toast.hideToast();
            Navigate.reLaunch({ url: '/pages/Main/pages/Index/index' });
          }
          if (code === '302') {
            const accountInfo = ENV.WeChat ? wx.getAccountInfoSync() : {};
            // env类型
            const wxEnv = accountInfo?.miniProgram?.envVersion;
            wxEnv !== 'develop' && toast.hideToast();
            return;
          }
          if (code === '4003') {
            Navigate.reLaunch({ url: '/pages/Main/pages/Home/index' });
            setStorageSync({
              key: 'balckUser',
              data: true
            });
            return;
          }
          const msg = this.formatErrorMsg({ msg: message, flag: expire, code });
          reject({
            success: false,
            msg,
            code: code ?? 400
          });
          if (showToast) {
            toast.showToast(msg);
          }
        }
      });
    });
  }

  formatErrorMsg({ msg, flag, code }) {
    let result = msg;
    if (String(code) === '3003' || !result || String(code) === '3002') {
      result = CommonErrorCode.DEFAULT_ERROR;
    }
    if (String(code) === '9996') {
      result = '系统超时';
    }
    if (flag?.current) {
      result = '正在重新连接';
    }
    return result;
  }

  async mtop(api: string, params?: any, headers?, PCENV?) {
    return this.mtopRequest(api, params, headers, PCENV);
  }
  async http(url: string, params?: any, method?, headers?) {
    return this.httpRequest(url, params || {}, method, headers, false);
  }

  /**
   * @param {*支付宝环境为api,其他环境为url} api
   * @param {*参数} params
   * @param {*支付宝环境为PC预览动态环境,其他环境为http请求method} method
   * @param {*headers} headers
   * @return {*}
   */
  async envRequest(api: string, params, method?, headers?, showToast = true) {
    if (OssDataSheet.includes(params.methodName)) {
      const newParam = params?.param ? JSON.parse(params?.param) : {};
      if (isObject(newParam) && !newParam?.ossImgProcessing) {
        newParam.ossImgProcessing = isSupportWebp()
          ? 'image/resize,w_750,m_lfit/format,webp'
          : 'image/resize,w_750,m_lfit';
      }
      params.param = JSON.stringify(newParam);
    }
    const ddParams = params ? JSON.stringify(params) : {};

    switch (getEnv()) {
      case 'my':
        return this.mtopRequest(api, params, method, headers);
      case 'wx':
        return this.httpRequest(api, params || {}, method, headers, showToast);
      case 'web':
        return this.httpRequest(api, params || {}, method, headers, showToast);
      case 'dd':
        return this.httpRequest(api, ddParams, method, headers, showToast);
      default:
        return Promise.reject();
    }
  }
}

export default ApiHttpRequest;
