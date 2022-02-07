<template>
  <NavBar
    class="app-nav-bar"
    title="小智同学"
    left-arrow
    @click-left="$router.back()"
  />

  <!-- 消息列表 -->
  <CellGroup class="message-wrap">
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
    <Cell title="单元格" />
  </CellGroup>
  <!-- / 消息列表 -->

  <!-- 发送消息 -->
  <CellGroup class="send-message-wrap">
    <Field v-model="message" :border="false" placeholder="请输入消息">
      <template #button>
        <Button type="success" size="small">发送</Button>
      </template>
    </Field>
  </CellGroup>
  <!-- /发送消息 -->
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { NavBar, Cell, CellGroup, Field, Button } from 'vant'
import { io } from 'socket.io-client'

onBeforeMount(() => {
  //建立连接
  const socket = io('http://ttapi.research.itcast.cn')
  // 连接成功的回调
  socket.on('connect', () => {
    console.log(socket.id) // x8WIv7-mJelg7on_ALbx
    console.log('连接成功')
  })

  //断开连接的回调
  socket.on('disconnect', () => {
    console.log(socket.id) // undefined
    console.log('断开连接了')
  })
})

//输入框的数据
const message = ref('')
</script>

<style lang="less" scoped>
.message-wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 52px;
  overflow: auto;
}
.send-message-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
