<template>
  <!-- <div class="article-item">文章列表项</div>
  @click="$router.push(`/article/${article.art_id}`)"
   -->
  <Cell
    class="article-item"
    :to="{ name: 'article', params: { articleId: article.art_id } }"
  >
    <template #title>
      <div class="title van-multi-ellipsis--l3">
        {{ article.title }}
      </div></template
    >
    <template #label>
      <!-- 有三张图片时 -->
      <div class="cover-wrap" v-if="article.cover?.type === 3">
        <div
          class="cover-wrap-img"
          v-for="(image, index) in article.cover?.images"
        >
          <Image class="cover-item" :key="index" fit="cover" :src="image" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ toRelativeTime(article.pubdate) }}</span>
      </div>
    </template>
    <!-- 只有一张图片时，在右侧显示 -->
    <template #value>
      <Image
        v-if="article.cover?.type === 1"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
    /></template>
  </Cell>
</template>

<script lang="ts" setup>
// import { toRefs } from 'vue'
import { Cell, Image } from 'vant'

// import useCurrentInstance from '../hooks/useCurrentInstance'
import { toRelativeTime } from '../../../utils/dayjs'
import { IArticle } from '../../../types/article'

// const { globalProperties } = useCurrentInstance()

const props = defineProps<{ article: IArticle }>()
//如需将props的属性解构，需使用toRefs将响应式对象转为一组ref(模板中使用不需要 props.xxx)
// const { article } = toRefs(props)
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/.van-cell__value {
    flex: unset;
    // width: 116px;
    // height: 73px;
    margin-left: 12px;
  }
  /deep/ .van-cell__label {
    width: 100%;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-wrap-img {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        margin-right: 4px;
      }
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
  }
  .label-wrap span {
    margin-right: 14px;
  }
}
</style>
