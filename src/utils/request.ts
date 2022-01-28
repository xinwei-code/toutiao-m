import axios from 'axios'

axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/',
  timeout: 2000,
})



//请求拦截器


//响应拦截器


export default axios