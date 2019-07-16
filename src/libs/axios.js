import axios from 'axios'
import { getToken } from '@/libs/util'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    // this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      timeout: 5000, // 超时时间
      retry: 3,
      retryDelay: 1000
    }
    return config
  }
  // destroy (url) {
  //   delete this.queue[url]
  // }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // this.queue[url] = true
      // console.log(this.queue)
      config.headers.common['token'] = getToken();
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      // this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      return Promise.reject(error);
      // console.log(error)
      // var config = error.config;
      // if(!config || !config.retry) return Promise.reject(error);
      // config.__retryCount = config.__retryCount || 0;
      // if(config.__retryCount >= config.retry) {
      //   // Reject with the error
      //   return Promise.reject(error);
      // }
      // config.__retryCount += 1;

      // var backoff = new Promise(function(resolve) {
      //     setTimeout(function() {
      //         resolve();
      //     }, config.retryDelay || 1);
      // });
      
      // // Return the promise in which recalls axios to retry the request
      // return backoff.then(function() {
      //     return axios(config);
      // });

      //  1.判断请求超时
      // if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        
      //   console.log(config)
      //   // Create new promise to handle exponential backoff
      //   var backoff = new Promise(function(resolve) {
      //       setTimeout(function() {
      //           resolve();
      //       }, config.retryDelay || 1);
      //   });            
      //   // Return the promise in which recalls axios to retry the request
      //   return backoff.then(function() {
      //       return axios(config);
      //   });
      //   // return service.request(originalRequest);//例如再重复请求一次
      // } 
      // this.destroy(url)
      
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
