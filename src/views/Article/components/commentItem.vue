<template>
  <Cell center class="comment-item">
    <template #icon>
      <Image
        class="avatar"
        width="36"
        height="36"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </template>
    <template #title>
      <div class="title-wrap" @click="onCommentLike">
        <span class="name">{{ comment.aut_name }}</span>
        <div class="like-wrap">
          <Icon
            class="like-icon"
            :class="{ liked: comment.is_liking }"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          />
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <div>
        <span class="pubdate">{{ toDateTime(comment.pubdate) }}</span>
        <Button class="reply-btn" size="mini" round @click="$emit('reply-click',comment)"
          >{{ comment.reply_count }} 回复</Button
        >
      </div>
    </template>
  </Cell>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { Cell, Image, Button, Icon } from 'vant'

import { addCommentLike, deleteCommentLike } from '../../../api/comment'
import { toDateTime } from '../../../utils/dayjs'
import { IComment } from '../../../types/comment'

const props = defineProps<{ comment: IComment }>()

//点赞评论
const onCommentLike = async () => {
  const commentId = props.comment.com_id.toString()
  if (props.comment.is_liking) {
    //已点赞，取消点赞
    // await deleteCommentLike(commentId)
    props.comment.like_count--
  } else {
    //未点赞，添加点赞
    await addCommentLike(commentId)
    props.comment.like_count++
  }
  //更新视图
  props.comment.is_liking = !props.comment.is_liking
}
</script>

<style lang="less">
.avatar {
  width: 36px;
  height: 36px;
}
.name {
  font-size: 14px;
  color: #406599;
}
.content {
  font-size: 16px;
  color: #222222;
}
.pubdate {
  font-size: 10px;
  margin-right: 10px;
}
.title-wrap {
  display: flex;
  justify-content: space-between;
}
.like-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .liked {
    color: #ff69b4;
  }
}
</style>
