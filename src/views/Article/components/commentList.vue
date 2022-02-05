<template>
  <div class="comment-list">
    <List
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!--       <Cell
        v-for="(commnet, index) in list.results"
        :key="index"
        :title="commnet.content"
      /> -->
      <commentItem
        v-for="(commnet, index) in list.results"
        :key="index"
        :comment="commnet"
        @reply-click="$emit('replyClick', $event)"
      />
    </List>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { List } from 'vant'

import commentItem from './commentItem.vue'
import { getComments } from '../../../api/comment'
import { IComment } from '../../../types/comment'

const emit = defineEmits(['updateTotalCount', 'replyClick'])

const props = withDefaults(defineProps<{ source: number; type: string }>(), {
  source: 1,
  //获取文章评论使用字符 'a'
  //获取评论回复使用字符 'c'
  type: 'a',
})

//评论数据
const list = reactive({
  results: [] as IComment[],
  end_id: 0,
  last_id: 0,
  total_count: 0,
})

//加载中的loading
const loading = ref(false)
//加载更多完成的状态
const finished = ref(false)
//页码
const offset = ref(null)
//每页数量
const limit = ref(10)

//触发上拉加载更多
const onLoad = async () => {
  //第一次调用时，此处获取props为undefined
  // console.log(props.source)

  //1.请求获取数据
  /*   getComments({
    type: 'a',
    source: props.source,
    offset: offset.value,
    limit: limit.value,
  }).then(res => console.log(res)) */

  //初始化时会自动调用onload事件的回调获取数据撑满一屏，此时props为undefined
  //因此需吧List组件的immediate-check属性关闭
  const { data } = await getComments({
    type: props.type,
    source: props.source.toString(),
    offset: offset.value,
    limit: limit.value,
  })
  console.log(data)

  //2.把数据放到列表中
  list.results.push(...data.data.results)
  //更新评论总数
  list.total_count = data.data.total_count
  //把评论数传给父组件做展示
  emit('updateTotalCount', list.total_count)
  //3.关闭本次loading
  loading.value = false
  //4.判断是否有下一页数据
  if (data.data.results.length) {
    // 如果有，更新下一次请求的页码
    offset.value = data.data.last_id
  } else {
    //没有，则停止加载更多（finished = true）
    finished.value = true
  }
}
</script>

<style lang="less" scoped></style>
