import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

//Vant组件
// import { Button } from 'vant'

//引入路由
import router from './router'


//自动设置 rem 基准值（html标签的字体大小）
import 'amfe-flexible'

//全局样式
import './styles/index.less'

const pinia = createPinia()

const app = createApp(App)
// app.use(Button)
app.use(router)
app.use(pinia)
app.mount('#app')
