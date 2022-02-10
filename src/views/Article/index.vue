<template>
  <!-- 导航栏 -->
  <div class="article-containner">
    <NavBar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <div class="article-wrap">
      <!-- 标题 -->
      <h1 class="title">{{ article.data.title }}</h1>
      <!-- 用户信息 -->
      <Cell center class="user-info">
        <template #title>
          <span class="name">{{ article.data.aut_name }}</span>
        </template>
        <template #>
          <Image
            class="avatar"
            round
            width="35"
            height="35"
            fit="cover"
            :src="article.data.aut_photo"
          />
        </template>
        <template #label>
          <span class="pubdate">{{
            toRelativeTime(article.data.pubdate)
          }}</span>
        </template>
        <template #value>
          <Button
            :icon="article.data.is_followed ? undefined : 'plus'"
            round
            class="follow-btn"
            type="primary"
            size="small"
            :loading="isFollowLoading"
            @click="onFollow"
            >{{ article.data.is_followed ? '已关注' : '关注' }}</Button
          >
        </template>
      </Cell>
      <!-- /用户信息 -->

      <!-- 文本内容 -->
      <div
        class="content markdown-body"
        v-html="article.data.content"
        ref="articleContent"
      ></div>
      <!-- / 文本内容 -->

      <!-- 评论内容区域 -->
      <span style="font-size: 16px">全部评论</span>
      <commentList
        v-if="article.data.art_id"
        :source="article.data.art_id"
        @updateTotalCount="commentCount = $event"
        @replyClick="onReplyClick"
      />
      <!-- / 评论内容区域 -->
    </div>

    <!-- 底部内容 -->
    <div class="footer">
      <Button
        @click="isPostShow = true"
        class="write-btn"
        type="default"
        round
        size="small"
        >写评论</Button
      >
      <Icon class="comment-" name="comment-o" :badge="commentCount" />
      <Icon
        :color="article.data.is_collected ? 'orange' : ''"
        :name="article.data.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <Icon
        :color="article.data.attitude === 1 ? '#e5645f' : ''"
        :name="article.data.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <!-- <Icon class="share-" name="share" /> -->
    </div>
    <!--/ 底部内容 -->

    <!-- 发布评论 -->
    <Popup v-model:show="isPostShow" position="bottom">
      <postComment
        :target="articleId"
        :art_id="article.data.art_id.toString()"
        @postSuccess="onPostSuccess"
    /></Popup>
    <!--/发布评论 -->

    <!-- 评论回复 -->
    <Popup
      v-model:show="isReplyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 这里使用v-if的目的是让组件随着弹出层的显示
    进行条件渲染和销毁，防止加载过的组件不重新渲染导致数据不会重新
    加载的问题
    -->
      <commentReply
        v-if="isReplyShow"
        :articleId="article.data.art_id.toString"
        :comment="replyComment"
        @close="isReplyShow = false"
      />
    </Popup>
    <!-- /评论回复 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, reactive, nextTick, Ref } from 'vue'
import {
  Image,
  NavBar,
  Cell,
  Button,
  ImagePreview,
  Icon,
  Toast,
  Popup,
} from 'vant'

import commentReply from './components/comment-reply.vue'
import postComment from './components/post-comment.vue'
import commentList from './components/commentList.vue'
import { toRelativeTime } from '../../utils/dayjs'
import { IDetailArticle } from '../../types/article'
import { IComment } from '../../types/comment'

import {
  getArticleById,
  deleteCollect,
  addCollect,
  deleteLike,
  addLike,
} from '../../api/article'

import { deleteFollow, addFollow } from '../../api/user'

//Github风格的文本样式
import './github-markdown.css'

const props = defineProps<{ articleId: string }>()

//评论的总数量
const commentCount = ref(0)

onBeforeMount(() => {
  loadArticle()
})

//文章内容的 DOM 容器
const articleContent = ref<Document | null>(null)

//文章数据对象
const article = reactive({
  data: {} as IDetailArticle,
})
//加载文章数据
const loadArticle = async () => {
  const { data } = await getArticleById(props.articleId)
  article.data = data.data
  // console.log(data)

  //获取文章内容DOM容器
  /*
  数据的改变影响视图的更新（DOM数据）不是立即的
  所以如果需要在修改数据后马上操作被该数据影响的视图 DOM, 需要把这个代码放到$nextTick中
  */
  nextTick(() => {
    handlePreviewImage()
  })
}

//图片预览
const handlePreviewImage = () => {
  //得到所有img标签
  const imgs = articleContent.value?.querySelectorAll('img')
  const imgsPath: string[] = []
  //循环 img 列表， 给img注册点击事件
  imgs?.forEach((img, index) => {
    imgsPath.push(img.src)
    //在事件处理程序中调用 ImagePreview()预览
    img.onclick = () => {
      ImagePreview({
        images: imgsPath, //预览图品路径列表
        startPosition: index, //起始位置
      })
    }
  })
}

//关注用户按钮的 loading 状态
const isFollowLoading = ref(false)

//点击关注的回调
const onFollow = async () => {
  isFollowLoading.value = true
  if (article.data.is_followed) {
    //取消关注（接口有问题）
    // await deleteFollow(String(article.data.aut_id))
  } else {
    //添加关注
    await addFollow(String(article.data.aut_id))
  }
  article.data.is_followed = !article.data.is_followed
  isFollowLoading.value = false
}

//收藏文章
const onCollect = async () => {
  // isCollectLoading.value = true
  Toast.loading({
    message: '操作中...',
    forbidClick: true, //禁止点击
  })
  if (article.data.is_collected) {
    //取消收藏(接口有问题)
    // await deleteCollect(String(article.data.art_id))
  } else {
    //添加收藏
    await addCollect(String(article.data.art_id))
  }
  article.data.is_collected = !article.data.is_collected
  Toast.success(`${article.data.is_collected ? '' : '取消'}收藏成功`)
}

//点赞文章
const onLike = async () => {
  // isCollectLoading.value = true
  Toast.loading({
    message: '操作中...',
    forbidClick: true, //禁止点击
  })
  if (article.data.attitude === 1) {
    //已点赞，取消点赞(接口有问题)
    // await deleteLike(String(article.data.art_id))
    article.data.attitude = -1
  } else {
    //未点赞，添加点赞
    await addLike(String(article.data.art_id))
    article.data.attitude = 1
  }

  Toast.success(`${article.data.attitude === 1 ? '' : '取消'}点赞成功`)
}

//控制发布评论的显示状态
const isPostShow = ref(false)

//评论成功
const onPostSuccess = (msg: IComment) => {
  //把发布成功的评论数据对象放到评论列表顶部
  // commentList.value.unshift(msg)
  //关闭弹出层
  isPostShow.value = false
}

//评论回复弹出层的显示状态
const isReplyShow = ref(false)

const replyComment = ref({}) as Ref<IComment>

//点击评论的回复
const onReplyClick = (comment: IComment) => {
  replyComment.value = comment
  //显示弹出层
  isReplyShow.value = true
}
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
// 用户信息
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    color: #b4b4b4;
    font-size: 11px;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
}

.article-wrap {
  top: 46px;
  position: fixed;
  bottom: 44px;
  left: 0;
  right: 0;
  overflow-y: auto;
}

//底部导航栏
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
    width: 160px;
  }
  .Icon {
    font-size: 20px;
  }
  .comment- {
    bottom: -2px;
  }
  .share- {
    bottom: -2px;
  }
}
</style>
