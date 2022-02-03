<template>
  <div class="article-list">
    <PullRefresh
      :success-duration="1000"
      :success-text="refreshSuccessText"
      v-model="isRefreshLoading"
      @refresh="onRefresh"
    >
      <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in articles.results"
          :key="index"
          :article="article"
        />
        <!--         <Cell
          v-for="(article, index) in articles.results"
          :key="index"
          :title="article.title"
        ></Cell> -->
      </List>
    </PullRefresh>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, reactive } from 'vue'
import { IChannel } from '../types/user'
import { List, Cell, PullRefresh } from 'vant'

import ArticleItem from './ArticleItem.vue'
import { getArticles } from '../api/article'
import { IArticle } from '../types/article'

const { channel } = defineProps<{ channel: IChannel }>()

//刷新成功后的文本
const refreshSuccessText = ref('')
//下拉刷新的状态
const isRefreshLoading = ref(false)
//下拉刷新的回调
const onRefresh = async () => {
  //1.请求获取数据
  const {
    data: { data: res },
  } = await getArticles({
    // timestamp: Date.now(),
    timestamp: Date.now(),
    channel_id: channel.id,
    with_top: 1,
  })

  //2.把数据放到数据列表中（往顶部追加）
  articles.results.unshift(...res.results)

  //3.关闭刷新状态
  isRefreshLoading.value = false
  refreshSuccessText.value = `更新了${res.results.length}条数据`
}

// 获取下一页的时间错戳
const timestamp = ref(0)

//文章列表
const articles = reactive({
  pre_timestamp: 0,
  results: [] as IArticle[],
})
//上拉加载的状态
const loading = ref(false)
//上拉加载完成
const finished = ref(false)

//列表加载的回调(Vant的list组件默认会撑满列表的高度，所以页面刚加载时发了三次请求，第一次results为 [])
const onLoad = async () => {
  // 异步更新数据
  //1.请求获取数据
  const {
    data: { data: res },
  } = await getArticles({
    // timestamp: Date.now(),
    timestamp: timestamp.value || Date.now(),
    channel_id: channel.id,
    with_top: 1,
  })
  //2.把数据放到list组件中
  articles.results.push(...res.results)
  // timestamp.value = res.pre_timestamp
  // console.log(articles.results)
  timestamp.value = res.pre_timestamp || 0

  //3.设置本次加载结束，他才可以判断是否加载下一次，否则会一直停在这里
  loading.value = false

  //4.数据全部加载完成
  //停止加载更多
  if (timestamp.value === 0) finished.value = true
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
