<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <NavBar :title="`${comment.reply_count}条回复`">
      <template #left>
        <Icon name="cross" @click="$emit('close')" />
      </template>
    </NavBar>
    <!-- / 头部信息 -->

    <!-- 当前的评论项 -->
    <CommentItem :comment="comment" />
    <!-- /当前的评论项 -->

    <!-- 所有评论回复 -->
    <Cell title="全部评论" />
    <CommentList :source="comment.com_id" :type="'c'" />
    <!-- /所有评论回复 -->

    <!-- 底部内容 -->
    <div class="footer">
      <Button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</Button
      >
    </div>
    <!--/ 底部内容 -->

    <!-- 发布回复 -->
    <Popup v-model:show="isPostShow" position="bottom">
      <PostComment
        :target="comment.com_id.toString()"
        :art_id="comment.aut_id.toString()"
        @post-success="onPostSuccess"
      />
    </Popup>
    <!--  / 发布回复 -->
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { Icon, NavBar, Cell, Button, Popup } from 'vant'

import PostComment from './post-comment.vue'
import CommentList from './commentList.vue'
import CommentItem from './commentItem.vue'
import { IComment } from '../../../types/comment'

const props = defineProps<{ comment: IComment; articleId: string }>()
const commentList = ref([]) as Ref<IComment[]>

const onPostSuccess = (comment:IComment) => {
  //将发布成功的评论放到评论列表作展示
  commentList.value.unshift(comment)
  //更新评论的回复数量
  props.comment.reply_count++
  //关闭发布回复的弹出层
  isPostShow.value = false
}

const isPostShow = ref(false)

</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .write-btn {
    padding: 0 15px;
    width: 160px;
    height: 33px;
  }
}
</style>
