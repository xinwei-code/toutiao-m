const LayOut = () => import('../views/LayOut.vue')
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
const My = () => import('../views/My.vue')
const Video = () => import('../views/Video.vue')
const Qa = () => import('../views/Qa.vue')
const Search = () => import('../views/Search/index.vue')
const Article = () => import('../views/Article/index.vue')
const UserProfile = () => import('../views/UserProfile/index.vue')
const UserChat = () => import('../views/UserChat/index.vue')

export const routes = [
  {
    path: '/',
    component: LayOut,
    children: [
      { path: '', name: 'home', component: Home }, //默认子路由
      { path: '/my', name: 'my', component: My },
      { path: '/video', name: 'video', component: Video },
      { path: '/qa', name: 'qa', component: Qa },
    ],
    meta: { requiresAuth: false },
  },
  //登录页
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false },
  },
  //搜索页面
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: { requiresAuth: false },
  },
  //文章详情页面(动态路由)
  {
    path: '/article/:articleId',
    name: 'article',
    component: Article,
    //将动态路由参数映射到组件的 props中， 无论是访问还是维护都很方便
    props: true,
    meta: { requiresAuth: false },
  },
  //用户中心
  {
    path: '/user/profile',
    name: 'profile',
    component: UserProfile,
    meta: { requiresAuth: false },
  },
  //小智同学
  {
    path: '/user/chat',
    name: 'chat',
    component: UserChat,
    meta: { requiresAuth: true },
  },
]
