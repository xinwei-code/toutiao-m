<template>
  <button @click="test">post</button>
  <button @click="get">get</button>
</template>

<script setup lang="ts">
import axios from 'axios'
const test = async () => {
  const {data} = await axios.post('/api/post')
  console.log(data)
}
const get = async () => {
  const {data} = await axios.get('/api/get')
  console.log(data)
}
</script>
