<template>
  <img class="image" :src="image" alt="" ref="img" />
  <NavBar
    left-text="取消"
    right-text="确认"
    class="tool-bar"
    @click-left="$emit('close')"
    @click-right="onConfirm"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue'
import { NavBar, Toast } from 'vant'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import { updateUserAvatar } from '../../../api/user'

onMounted(() => {
  // const image = document.getElementById('image')
  cropper.value = new Cropper(img.value as HTMLImageElement, {
    aspectRatio: 1, //1:1的裁剪框
    viewMode: 1, //限制裁剪框不超过画布的大小。
    dragMode: 'move',
    cropBoxMovable: false, //框是否可以拖动
    cropBoxResizable: false, //框是否可以改变大小
    background: false, //是否显示默认背景
    movable: true, //图片是否可以移动
  })
  // console.log(cropper.value)
})
const emit = defineEmits(['updateAvatar', 'close'])
const props = defineProps<{ file: File }>()

//预览的图片
const image = ref(window.URL.createObjectURL(props.file))
//图片元素
const img = ref<HTMLImageElement>()

//裁切器实例
const cropper = ref()

//获取裁剪后的图片二进制数据 Blob
const getCropperCanvas = (): Promise<Blob> => {
  return new Promise(resolve => {
    cropper.value.getCroppedCanvas().toBlob((file: Blob) => {
      resolve(file)
    })
  })
}

const onConfirm = async () => {
  Toast.loading({
    message: '保存中。。。',
    forbidClick: true,
    duration: 0, //0表示持续展示
  })
  try {
    const blob = await getCropperCanvas()
    // const fileBlob = new File([blob], props.file.name)
    const fd = new FormData()
    fd.append('photo', blob)
    //如果要求 Content-Type 是 multipart/form-data,
    // 则一定要提交 FormData数据对象，专门用于文件上传的，不能提交普通{}， 没用
    /*   const fd = new FormData()
  fd.append('photo', props.file) */
    await updateUserAvatar(fd)
    Toast.success('保存成功')

    //通知父组件更新头像
    // emit('updateAvatar', image.value)
    // emit('updateAvatar', window.URL.createObjectURL(fileBlob as Blob))
    emit('updateAvatar', window.URL.createObjectURL(blob))
    //关闭弹出层
    emit('close')
    Toast.clear()
  } catch (error: any) {
    Toast.fail('更新头像失败，图片体积过大。')
  }
}
</script>

<style lang="less" scoped>
.tool-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
}
.image {
  /* Ensure the size of the image fit the container perfectly */
  img {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
