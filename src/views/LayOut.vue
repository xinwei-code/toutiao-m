<template>
  <!-- 路由出口 -->
  <router-view></router-view>
  <!-- 底部导航栏 -->
  <Tabbar v-model="active" route>
    <TabbarItem icon="home-o" :to="{name:'home'}">首页</TabbarItem>
    <TabbarItem icon="comment-o" to="/qa">问答</TabbarItem>
    <TabbarItem icon="video-o" to="/video">视频</TabbarItem>
    <TabbarItem icon="manager-o" to="/my">我的</TabbarItem>
  </Tabbar>
</template>

<script lang="ts" setup>
import { Tabbar, TabbarItem } from 'vant'
import { ref } from 'vue'
const active = ref(0)
</script>
