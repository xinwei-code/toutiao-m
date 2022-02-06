import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

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
/* export const router = createRouter({
    history: createWebHashHistory(),
    routes
}) */

//默认暴露
export default createRouter({
  history: createWebHistory(),
  routes,
})
