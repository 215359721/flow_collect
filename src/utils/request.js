import axios from 'axios'
import Vue from 'vue'
import { Message } from 'element-ui'
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: 'http://10.0.1.105/',
  baseURL: 'http://192.168.1.48:2020/aspdev',
  // 超时
  timeout: 10000,
  loading: true,
  validateStatus: function (status) {
    return status >= 200 && status < 300 || status === 403 // 403 后端认为 session 过期了
  },
  withCredentials: true // send cookies when cross-domain requests
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (config.header && config.header.length) {
      config.header.forEach(element => {
        for (const key in element) {
          if (Object.hasOwnProperty.call(element, key)) {
            config.headers[key] = element[key]
          }
        }
      });
    }

    return config
  },
  error => {
    Vue.logs(error, { title: 'request.js', type: 'error' })
    Promise.reject(error)
  }
)


// 响应拦截器
service.interceptors.response.use(res => {
  try {
    // return res.data 
    return Promise.resolve(res)
  } catch (error) {
    Vue.logs(error, { title: 'request.js', type: 'error' })
  }
},
  error => {
    console.log('res:', error.response)
    Vue.logs(error.message, { title: 'request.js', type: 'error' })
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
