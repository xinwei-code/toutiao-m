import { createRouter, createWebHistory } from 'vue-router'
import { Dialog } from 'vant'

import { routes } from './routes'
import { useUserStore } from '../store/user'

/* 
// ❌ Depending on the order of imports this will fail
不能在这里使用store
const store = useStore()
*/

// 1. 定义路由组件.
// 也可以从其他文件导入

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
//配置路由映射关系
// const routes = []

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单

//分别暴露
const router = createRouter({
  history: createWebHistory(),
  routes,
})

//beforeEach不支持链式调用
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  /* 
to:要访问的页面路由信息
from:来自哪个页面的路由信息
next:放行的标记
*/
  //判断页面是否需要登录才能访问
  if (to.meta.requiresAuth) {
    //已登陆，直接放行
    if (userStore.user) {
      return next()
    }
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登陆吗？',
    })
      .then(() => {
        // on confirm,跳转到登陆页面
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.value.fullPath,
          },
        })
      })
      .catch(() => {
        // on cancel， 中断路由导航
        next(false)
      })
  } else {
    //不需要登陆的页面，直接过去
    next()
  }
  // 返回 false 以取消导航
  return false
})

export default router

//默认暴露
/* export default createRouter({
  history: createWebHistory(),
  routes,
}) */
