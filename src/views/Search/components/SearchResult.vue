<template>
  <div class="search-result">
    <List
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </List>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { List, Cell } from 'vant'

import { IArticle } from '../../../types/article'
import { getSearchResult } from '../../../api/search'

const props = defineProps<{ searchText: string }>()

//搜索结果数据
const list = ref<IArticle[]>([])
const loading = ref(false)
const finished = ref(false)

//请求参数
const parmas = reactive({
  page: 1,
  pre_page: 10,
  q: props.searchText,
})

const onLoad = async () => {
  //1.请求接口获取数据
  const { data } = await getSearchResult(parmas)
  const { results } = data.data
  //2.将数据放在列表中
  list.value.push(...data.data.results)
  //3.关闭本次loading
  loading.value = false
  //4.判断是否还有数据
  if (results.length) {
    //如果有，更新获取下一页的页码
    parmas.page++
  } else {
    //如果没有，则把Finnished设置为true，关闭加载更多
    finished.value = true
  }
}
</script>
<style lang="less">
.search-result {
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
