import axios from 'axios'
import { Toast } from 'vant'
axios.defaults.baseURL = 'http://localhost:3000'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // localStorage.getItem('heima_40_token', )
  localStorage.setItem('heima_40_baseURL', axios.defaults.baseURL)
  console.log(config)
  // 在发送请求之前做些什么
  let token = localStorage.getItem('heima_40_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.message === '用户信息验证失败!' || response.data.message === '用户信息验证失败') {
    // 给出提示
    Toast.fail('用户信息验证失败')
    // 重定向
    window.location.href = '#/login'
  }
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default axios
