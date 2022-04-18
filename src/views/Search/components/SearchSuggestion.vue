<template>
  <CellGroup>
    <Cell
      @click="$emit('search', item)"
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
    >
      <template #title>
        <div v-html="heightlight(item)"></div>
      </template>
    </Cell>
  </CellGroup>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { Cell, CellGroup } from 'vant'
import * as _ from 'lodash'

import { getSearchSuggestion } from '../../../api/search'

const props = defineProps<{ searchText: string }>()
defineEmits(['search'])

//联想建议列表
const suggestions = ref<string[]>([])

//该回调会在侦听开始之后被立即调用
watch(
  () => {
    return props.searchText
  },
  _.debounce(async () => {
    const { data } = await getSearchSuggestion(props.searchText)
    suggestions.value = data.data.options
  }, 200),
  { immediate: true }
)

/**
 * 文字高亮  
 * @param str string
 */
const heightlight = (str: string) => {
  /* 
  正则表达式中/i,/g,/ig,/gi,/m的区别和含义
/i (忽略大小写)
/g (全文查找出现的所有匹配字符)
/m (多行查找)
/gi(全文查找、忽略大小写)
/ig(全文查找、忽略大小写)
  */
  return str.replace(
    new RegExp(props.searchText, 'gi'),
    `<span style="color:red">${props.searchText}</span>`
  )
}
</script>
