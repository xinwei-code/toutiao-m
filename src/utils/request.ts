import axios from 'axios'
import { useUserStore } from '../store/user'
import { Toast } from 'vant'
import router from '../router'

const userStore = useUserStore()

//刷新token的axios实例
const refreshTokenReq = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',
})

const instance = axios.create({
  //本地
  baseURL: 'http://api-toutiao-web.itheima.net/',
  //线上
  // baseURL: '/api',
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //如如果用户已登录，同一给接口设置 token 信息
    if (userStore.user && config.headers) {
      config.headers.Authorization = `Bearer ${userStore.user.token}`
    }

    //处理完之后，一定要把config返回，否则请求就会停在这里。
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  async function (error) {
    const status = error.response.status
    if (status === 400) {
      //客户端请求参数错误
      Toast.fail('请求参数错误')
    } else if (status === 401) {
      //token失效
      /*
      如果没有 user 或者 user.token,直接去登录
      如果有 refresh_token,则请求获取新的token
      拿到新的token之后把它更新到容器中
      把失败的请求重新发出去
      */
      if (!userStore.user || !userStore.user.token) {
        return redirectLogin()
      }
      try {
        const { data } = await refreshTokenReq({
          method: 'PUT',
          url: '/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${userStore.user.refresh_token}`,
          },
        })

        //拿到新的token之后把它更新到容器中
        userStore.user.token = data.data.token
        //那失败的请求继续发出去
        return instance(error.config)
      } catch (error) {
        //刷新token失败，直接跳转登录页
        redirectLogin()
      }
    } else if (status === 403) {
      //没有权限操作
      Toast.fail('没有权限操作')
    } else if (status >= 500) {
      //服务端异常
      Toast.fail('服务端异常,请稍后重试')
    }
    //抛出异常
    return Promise.reject(error)
  }
)

const redirectLogin = () => {
  router.replace({
    name: 'login',
    //传递查询参数，查询参数会以分隔符放到url后面
    query: {
      //数据名自己取  router.currentRoute.value === $router
      redirect: router.currentRoute.value.fullPath,
    },
  })
}

export default instance
