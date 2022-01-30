<template>
  <div class="my-container">
    <CellGroup v-if="userStore.user" class="my-info">
      <Cell :border="false" center class="base-info">
        <template #icon>
          <!-- <Image class="avatar" :src="currentUser.photo" round fit="cover" /> -->
          <Image
            class="avatar"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            round
            fit="cover"
          />
        </template>
        <template #title>
          <span class="nickname">{{ currentUser.name }}</span>
        </template>
        <template #right-icon>
          <Button size="small" class="update-btn" round>编辑资料</Button>
        </template>
      </Cell>
      <Grid :border="false" class="data-info">
        <GridItem class="data-info-item">
          <template #text>
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </template>
        </GridItem>
        <GridItem class="data-info-item">
          <template #text>
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </template>
        </GridItem>
        <GridItem class="data-info-item">
          <template #text>
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </template>
        </GridItem>
        <GridItem class="data-info-item">
          <template #text>
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </template>
        </GridItem>
      </Grid>
    </CellGroup>

    <div class="not-login" v-else>
      <div @click="$router.push('/login')">
        <img class="mobile" src="../assets/unlogin-img.png" alt="" />
      </div>
      <div class="text">登录/注册</div>
    </div>

    <Grid :column-num="2" class="nav-grid mb-4">
      <GridItem
        class="nav-grid-item"
        icon-prefix="icon"
        icon="shoucang"
        text="收藏"
      />
      <GridItem
        class="nav-grid-item"
        icon-prefix="icon"
        icon="lishi"
        text="历史"
      />
    </Grid>

    <Cell title="消息通知" to="/" />
    <Cell title="小智同学" to="" class="mb-4" />
    <Cell
      class="logout"
      title="退出登录"
      v-if="userStore.user"
      @click="onLogOut"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { Cell, CellGroup, Button, Image, Grid, GridItem } from 'vant'
import { Dialog } from 'vant'

import { ICurrentUser } from '../types/currentUser'
import { useUserStore } from '../store/user'
import { getCurrentUser } from '../api/user'

const userStore = useUserStore()

//当前登录用户信息
const currentUser = ref<ICurrentUser>({
  photo: '',
  name: '',
  art_count: 0,
  fans_count: 0,
  like_count: 0,
  follow_count: 0,
})

onBeforeMount(() => {
  loadCurrentUser()
})

//获取登录用户信息
const loadCurrentUser = async () => {
  const { data } = await getCurrentUser()
  currentUser.value = data.data
}

//退出登录
const onLogOut = () => {
  //弹框确认是否退出
  Dialog.confirm({
    title: '退出提示',
    message: '确认退出吗？',
  })
    .then(() => {
      // 确认退出，清楚Pinia中的状态
      userStore.setUser(null)
    })
    .catch(() => {
      // 取消退出
    })
}
</script>

<style lang="less" scoped>
.my-container {
  // 登陆后
  .my-info {
    //设置背景图不生效的原因：子元素有背景色
    background: url('../assets/banner.png') no-repeat;
    background-size: cover;

    .base-info {
      box-sizing: border-box;
      background-color: unset; //重置
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      // 头像
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .nickname {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65x;
        color: #fff;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 11px;
        }
      }
    }

    .van-grid-item__content {
      background-color: unset;
    }
  }
  // 未登录状态
  .not-login {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 180px;
    background: url('../assets/banner.png') no-repeat;
    background-size: cover;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
  }
  .nav-grid {
    .nav-grid-item {
      height: 70px;
      .icon {
        font-size: 22px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1b;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  /* 退出登录按钮 */
  .logout {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
