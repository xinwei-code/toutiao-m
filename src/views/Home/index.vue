<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <NavBar class="app-nav-bar">
      <template #title>
        <Button type="primary" class="search-btn" icon="search" round to="search"
          >搜索</Button
        >
      </template>
    </NavBar>
    <!-- 文章频道列表 -->
    <Tabs class="channels-tabs" v-model:active="active">
      <!-- 标签页组件有一个功能，只有第一次查看标签页的时候才会渲染里面的内容 -->
      <Tab
        :title="channel.name"
        v-for="(channel, index) in homeData.channels"
        :key="index"
        class="tab-item"
      >
        <!-- 文章列表 -->
        <ArticleList :channel="channel"></ArticleList>
      </Tab>
      <!-- 
        汉堡按钮的定位把最后的位置给挡住了，
       解决办法就是在这里添加一个元素占位
         -->
      <template #nav-right>
        <div class="wap-nav-wrap" @click="isChannelEditShow = true">
          <Icon name="wap-nav" />
        </div>
      </template>
    </Tabs>
    <!-- 弹出层 -->
    <!-- 通过 teleport 属性挂载到 body 节点下(推荐) -->
    <Popup
      v-model:show="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      teleport="body"
      style="height: 100%"
    >
      <!-- 弹出层的内容（频道编辑界面） -->
      <!-- 模板中 $event 表示事件的参数 -->
      <ChannelEdit
        :userChannel="homeData.channels"
        :active="active"
        @close="isChannelEditShow = false"
        @updateActive="active = $event"
        @sync-active="active = $event"
      />
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, reactive } from 'vue'
import { NavBar, Button, Tab, Tabs, Popup, Icon } from 'vant'

import { useUserStore } from '../../store/user'
import ChannelEdit from '../../components/ChannelEdit.vue'
import ArticleList from './components/ArticleList.vue'
import { getUserChannels } from '../../api/user'
import { IChannel } from '../../types/user'
import { getItem } from '../../utils/storage'

const userStore = useUserStore()
//控制被激活的tab
const active = ref(0)

//用户频道列表
const homeData = reactive<{ channels: IChannel[] }>({
  channels: [],
})

onBeforeMount(() => {
  loadChannels()
})

//请求频道数据
const loadChannels = async () => {
  /*   const { data } = await getUserChannels()
  homeData.channels = data.data.channels
  if (homeData.channels.length <= 1) {
    const { data } = await getUserChannels()
    homeData.channels = data.data.channels
  }
} */

  let channels = [] as IChannel[]
  if (userStore.user) {
    //用户登陆了，请求获取线上的用户频道列表数据
    const { data } = await getUserChannels()
    channels = data.data.channels
  } else {
    //没有登录，判断是否有本地存储的频道列表数据
    const localChannels = getItem('user-channels')
    if (localChannels) {
      //本地有数据，加载本地数据
      channels = localChannels
    } else {
      //本地无频道数据，请求线上推荐频道列表数据
      const { data } = await getUserChannels()
      channels = data.data.channels
    }
  }
  //供模板使用
  homeData.channels = channels
}
//控制编辑频道的显示状态
const isChannelEditShow = ref(false)
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    /deep/ .van-icon::before {
      color: #fff;
      font-size: 16px;
    }
    .van-button__text {
      color: #fff;
    }
  }
  .channels-tabs {
    padding-right: 15px;
    /deep/.van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 19px;
      width: 15px;
      height: 3px;
      background-color: #5babfb;
    }
  }
  /deep/.channel-edit-popup {
    height: 100%;
    background-color: #fff;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    background-color: #fff;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    .van-icon {
      font-size: 24px;
    }
  }
}
</style>
