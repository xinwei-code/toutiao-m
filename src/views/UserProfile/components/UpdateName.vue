<template>
  <!-- 导航栏 -->
  <NavBar
    title="修改昵称"
    left-text="取消"
    right-text="完成"
    @click-left="$emit('close')"
    @click-right="onConfirm"
  />
  <!--/ 导航栏 -->

  <!-- 输入框 -->
  <div class="name-wrap">
    <Field
      v-model="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
  <!-- /输入框 -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NavBar, Field, Toast } from 'vant'

import { updateUserProfile } from '../../../api/user'

// const emit = defineEmits(['close', 'updateName'])
const emit = defineEmits(['close','update:modelValue'])

// const props = defineProps<{ name: string }>()
const props = defineProps<{ modelValue: string }>()

const localName = ref(props.modelValue)
//点击完成的回调
const onConfirm = async () => {
  Toast.loading({
    message: '保存中。。。',
    forbidClick: true, //禁止背景点击
  })

  try {
    //请求提交更新用户昵称
    await updateUserProfile({
      name: localName.value,
    })
    Toast.success('更新成功')
    //更新成功  --> 修改父组件的 name -->关闭弹出层
    /* 
    更新后父组件视图未发生变化的解决：
    1.emit('updateName',localName.value)
    2.通知父组件重新请求数据
    */
    emit('update:modelValue', localName.value)
    emit('close')
  } catch (error: any) {
    if (error && error.response && error.response.status === 409) {
      Toast.fail('更新昵称失败,昵称重复')
    }
  }
}
</script>

<style lang="less" scoped>
.name-wrap {
  padding: 10px;
}
</style>
