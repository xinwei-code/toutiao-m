<template>
  <!-- 搜索框 -->
  <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
  <form action="/">
    <Search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      background="#3296fa"
      show-action
      @search="onSearch"
      @cancel="$router.back()"
      @focus="isResultShow = false"
    />
  </form>

  <!-- /搜索框 -->

  <!-- 搜索结果 -->
  <SearchResult :searchText="searchText" v-if="isResultShow" />
  <!-- /搜索结果 -->

  <!-- 联想建议 -->
  <SearchSuggestion
    @search="onSearch"
    :searchText="searchText"
    v-else-if="searchText"
  />
  <!-- /联想建议 -->

  <!-- 历史记录 -->
  <SearchHistory
    :searchHistories="searchHistories"
    @search="onSearch"
    @update-histories="searchHistories = $event"
    v-else
  />
  <!-- 历史记录 -->
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { Search } from 'vant'

import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import { setItem, getItem } from '../../utils/storage'
// import { getSearchHistories } from '../../api/search'
// import { useUserStore } from '../../store/user'

// const userStore = useUserStore()

//搜索框的内容
const searchText = ref('')

//是否展示搜索结果
const isResultShow = ref(false)

//搜索历史记录
const searchHistories = ref<string[]>(getItem('search-histories') || [])

watch(
  () => {
    return searchHistories.value
  },
  newValue => {
    setItem('search-histories', newValue)
  }
)

onBeforeMount(() => {
  loadSearchHistories()
})
//加载线上的历史记录(后台接口原因，改为纯本地存储)
/* 
因为线上保存的历史记录只有4条，所以需要将本地的历史记录和线上合并
*/
const loadSearchHistories = async () => {
  //本地数据
  let localHistories = getItem('search-histories') || []
  // if (userStore.user) {
  //   const { data } = await getSearchHistories()
  //   /*     console.log(data.data.keywords)
  //   console.log(localHistories) */
  //   localHistories = [...new Set([...data.data.keywords, ...localHistories])]
  // }
  searchHistories.value = localHistories
  console.log(localHistories)
}

//确认搜索，记录搜索记录
const onSearch = (val: string) => {
  //把输入框设置为你要搜索的文本
  searchText.value = val

  //判断历史记录中是否有重复
  const index = searchHistories.value.indexOf(val)
  if (index !== -1) {
    //如果有，则把重复项移除
    searchHistories.value.splice(index, 1)
  }

  // set数据结构实现(默认去除后出现的一个元素)
  /*  
    searchHistories.value.unshift(val)
   const set = new Set(searchHistories.value)
  // const histories = Array.of(...set)
  const histories = Array.from(set)
  searchHistories.value = histories */

  //添加进去(往前面加)
  searchHistories.value.unshift(val)
  //将搜索记录持久化到本地
  // setItem('search-histories', searchHistories.value)

  //展示搜索结果
  isResultShow.value = true
}
</script>
