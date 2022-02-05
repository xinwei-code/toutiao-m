<template>
  <div class="post-container">
    <Field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />

    <Button
      size="mini"
      class="post-btn"
      :disabled="message === ''"
      @click="onPost"
      >发布</Button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Field, Button, Toast } from 'vant'

import { addComment } from '../../../api/comment'

const emit = defineEmits(['postSuccess'])

const props = defineProps<{ target: string; art_id: string }>()

//输入框内容
const message = ref('')

//发布评论
const onPost = async () => {
  Toast.loading({
    forbidClick: true,
    message: '评论中。。。',
  })
  //接口失效（返回的数据不是comment类型）
  /* 
  实际操作应该是将接口返回的数据通过emit的方式传给父组件
  父组件传给孙组件做展示
  */
/*   console.log(message.value)
  console.log(props.target)
  console.log(props.art_id) */

  await addComment({
    content: message.value, //评论内容
    target: props.target, //文章id
    art_id: props.art_id, //文章id， 对文章进行评论时不需要传此参数， 对评论内容发表回复时传递
  })

  //处理响应数据
  emit('postSuccess')
  Toast.success({
    message: '评论成功',
  })
  //清空文本框
  message.value = ''
}
</script>

<style lang="less" scoped>
.post-container {
  padding: 14px;
  display: flex;
  align-items: center;
  .post-btn {
    width: 40px;
  }
}
</style>
