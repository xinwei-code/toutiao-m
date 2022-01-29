import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',
  timeout: 5000,
})

//请求拦截器

//响应拦截器

export default instance
