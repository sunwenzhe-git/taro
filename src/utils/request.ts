import { request } from '@tarojs/taro';

import { toast, log } from './logger';

export interface IRequestData {
  url: string;
  data?: Object;
  contentType?: string;
  headers?: Array<{ key: string; value: string }>;
  taroOptions?: any;
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

export const httpRequest = function (
  requestData: IRequestData,
  method: RequestMethod = 'GET'
): Promise<any> {
  let contentType = requestData.contentType || 'application/json';
  let headers = {
    'Content-Type': contentType
  };
  if (requestData.headers) {
    requestData.headers.forEach((v) => {
      headers[v.key] = v.value;
    });
  }

  return new Promise<any>((resolve, reject) => {});
};

export default {
  /**
   * @description get request
   * @param url 请求链接
   * @param data 请求requestData
   */
  get(url: string, data = {}, contentType?: string) {
    let requestData = { url, data, contentType };
    return httpRequest(requestData);
  },

  /**
   * @description post request
   * @param url
   * @param data request body
   * @param contentType
   */
  post(url: string, data?: object, contentType?: string) {
    let requestData = { url, data, contentType };
    return httpRequest(requestData, 'POST');
  },

  /**
   * @description put request
   * @param url
   * @param data request body
   */

  put(url: string, data?: object, contentType?: string) {
    let requestData = { url, data, contentType };
    return httpRequest(requestData, 'PUT');
  }
};
