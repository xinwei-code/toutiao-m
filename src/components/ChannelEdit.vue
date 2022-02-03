<template>
  <div class="channel-edit">
    <!-- 我的频道区域 -->
    <Cell center :border="false">
      <template #title>
        <div class="channel-title">我的频道</div>
      </template>
      <Button plain type="danger" size="mini" round @click="isEdit = !isEdit">{{
        isEdit ? '完成' : '编辑频道'
      }}</Button>
    </Cell>
    <Grid :gutter="10" :border="false">
      <!-- :class="{active:index === 当前激活项}" -->
      <GridItem
        class="grid-item"
        :class="{ active: index === props.active }"
        v-for="(channel, index) in userChannel"
        :key="index"
        :text="channel.name"
        :icon="isEdit && index !== 0 ? 'clear' : undefined"
        @click="onUserChannelClick(channel, index)"
      />
    </Grid>

    <!-- 推荐频道区域 -->
    <Cell center :border="false">
      <template #title>
        <div class="channel-title">频道推荐</div>
      </template>
    </Cell>
    <Grid :gutter="10" :border="false">
      <GridItem
        class="grid-item"
        v-for="(channnel, index) in recommendChannels"
        :key="index"
        :text="channnel.name"
        @click="onAdd(channnel)"
      />
    </Grid>
  </div>
</template>

<script setup lang="ts">
import { Cell, Button, Grid, GridItem } from 'vant'
import { defineProps, ref, onBeforeMount, computed } from 'vue'

import { useUserStore } from '../store/user'
import { setItem } from '../utils/storage'
import { IChannel } from '../types/user'
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from '../api/channel'

const userStore = useUserStore()
const props = defineProps<{ userChannel: IChannel[]; active: number }>()
const emit = defineEmits(['close', 'updateActive', 'syncActive'])

//所有频道列表数据
const allChannels = ref<IChannel[]>([])

//加载所有频道数据
const loadAllChannels = async () => {
  const { data } = await getAllChannels()
  console.log(data.data.channels)
  allChannels.value = data.data.channels
}

//计算出推荐频道  --->  = 全部频道 - 已有频道
//计算属性会根据内部依赖的数据的变化而重新求职
const recommendChannels = computed(() => {
  //简写方式
  return allChannels.value.filter(channel => {
    return !props.userChannel.find(uChannel => {
      return channel.id === uChannel.id
    })
  })
  //普通写法
  /*   const arr = [] as any[]
  allChannels.value.forEach(item => {
    let flag = false
    for (let i = 0; i < props.userChannel.length; i++) {
      if (props.userChannel[i].id === item.id) {
        //所有频道中的频道项属于用户频道
        flag = true
        break
      }
    }
    if (!flag) {
      arr.push(item)
    }
  })
  return arr */
})

//添加频道
const onAdd = async (channel: IChannel) => {
  props.userChannel.push(channel)

  //数据持久化
  if (userStore.user) {
    //用户登陆了，数据存到线上
    const res = await addUserChannel({
      channels: [
        {
          id: channel.id,
          seq: props.userChannel.length,
        },
      ],
    })
    console.log(res)
  } else {
    //没有登录，数据存到本地
    setItem('user-channels', props.userChannel)
  }
}

//控制编辑的显示状态
const isEdit = ref(false)

//用户频道被点击的回调(删除频道)
const onUserChannelClick = (channel: IChannel, index: number) => {
  if (isEdit.value && index !== 0) {
    //编辑状态，删除频道
    deleteChannel(channel, index)
  } else {
    //非编辑状态，切换频道
    switchChannel(index)
  }
}
// 删除频道
const deleteChannel = async (channel: IChannel, i: number) => {
  //如果删除的是当前激活频道之前的频道
  if (i <= props.active) {
    emit('syncActive', props.active - 1)
  }
  props.userChannel.splice(i, 1)

  console.log('删除频道')

  //数据持久化
  if (userStore.user) {
    //用户登陆了，持久化到线上
    await deleteUserChannel(channel.id)
  } else {
    //用户没有登陆了，持久化到本地
    setItem('user-channels', props.userChannel)
  }
}

//切换频道
const switchChannel = (i: number) => {
  //切换频道
  emit('updateActive', i)
  //关闭弹出层
  emit('close')
}

onBeforeMount(() => {
  loadAllChannels()
})
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 43px;

    /deep/.van-grid-item__content {
      background-color: #e4e5e6;
      font-size: 14px;
      color: #222;
      position: relative;
      .van-grid-item__text {
        margin-top: 0;
      }
      .van-icon {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 20px;
        color: #ccc;
      }
    }
  }

  // 当前激活项
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
