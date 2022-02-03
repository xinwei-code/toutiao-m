<template>
  <CellGroup>
    <Cell title="搜索历史">
      <div v-if="isDeleteShow">
      <!-- 修改props的数据，通知父组件修改 -->
        <span @click="$emit('updateHistories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <Icon v-else name="delete" @click="isDeleteShow = !isDeleteShow" />
    </Cell>
    <Cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onDelete(item, index)"
    >
      <Icon name="close" v-show="isDeleteShow" />
    </Cell>
  </CellGroup>
</template>

<script setup lang="ts">
import { Cell, CellGroup, Icon } from 'vant'
import { ref } from 'vue'
// import { setItem } from '../../../utils/storage'

const props = defineProps<{ searchHistories: string[] }>()
const emit = defineEmits(['updateHistories', 'search'])

const onDelete = (item: string, index: number) => {
  //先判断是否处于删除状态
  if (isDeleteShow.value) {
    props.searchHistories.splice(index, 1)
    //1.修改本地存储的数据（无论是否登录） **父组件通过watch统一持久化search-histories，此处不需处理**
    // setItem('search-histories', props.searchHistories)
    //2。请求线上接口删除线上数据
    // 线上接口有问题，只能删除全部历史记录，不能删除单个
    return
  }
  //处于非删除状态，点击执行搜索
  emit('search', item)
}

const isDeleteShow = ref(false)
</script>
