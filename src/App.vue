<script setup lang="ts">
import { usePageStore } from './store/page'
const pageStore = usePageStore()
</script>

<template>
  <!--使用 router-link 组件进行导航 -->
  <!--通过传递 `to` 来指定链接 -->
  <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
  <!--   <router-link to="/">Go to Home</router-link>
  <router-link to="/login">Go to About</router-link> -->

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <!-- 缓存路由 -->

  <!-- 
[Vue Router warn]: <router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
 -->

<!--   <keep-alive :include="userStore.cachePages">
    <router-view></router-view>
  </keep-alive> -->

  <router-view v-slot="{ Component }">
    <keep-alive :include="pageStore.cachePages">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style></style>
