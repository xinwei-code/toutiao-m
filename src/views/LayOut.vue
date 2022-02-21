<template>
  <!-- 路由出口 --> 
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>

  <!-- 底部导航栏 -->
  <Tabbar v-model="active" route>
    <TabbarItem icon="home-o" :to="{ name: 'home' }">首页</TabbarItem>
    <TabbarItem icon="comment-o" to="/qa">问答</TabbarItem>
    <TabbarItem icon="video-o" to="/video">视频</TabbarItem>
    <TabbarItem icon="manager-o" to="/my">我的</TabbarItem>
  </Tabbar>
</template>

<script lang="ts" setup>
import { Tabbar, TabbarItem } from 'vant'
import { ref ,onMounted} from 'vue'
import { usePageStore } from '../store/page';
const pageStore = usePageStore()

const active = ref(0)
onMounted(() => {
  pageStore.addCachePage('LayOut')
})

</script>

<script lang="ts">
export default {
  name: 'LayOut',
}
</script>
