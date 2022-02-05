import { createRouter,createWebHistory } from 'vue-router'

// 1. 定义路由组件.
// 也可以从其他文件导入
const LayOut = () => import('../views/LayOut.vue')
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
const My = () => import('../views/My.vue')
const Video = () => import('../views/Video.vue')
const Qa = () => import('../views/Qa.vue')
const Search = () => import('../views/Search/index.vue')
const Article = () => import('../views/Article/index.vue')

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
//配置路由映射关系
const routes = [
  {
    path: '/',
    component: LayOut,
    children: [
      { path: '', name: 'home', component: Home }, //默认子路由
      { path: '/my', name: 'my', component: My },
      { path: '/video', name: 'video', component: Video },
      { path: '/qa', name: 'qa', component: Qa },
    ],
  },
  //登录页
  { path: '/login', name: 'login', component: Login },
  //搜索页面
  { path: '/search', name: 'search', component: Search },
  //文章详情页面(动态路由)
  {
    path: '/article/:articleId',
    name: 'article',
    component: Article,
    //将动态路由参数映射到组件的 props中， 无论是访问还是维护都很方便
    props:true
  },
]

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
