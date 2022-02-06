<template>
  <Picker
    :columns="columns"
    :default-index="defaultIndex"
    @cancel="$emit('close')"
    @confirm="onConfirm"
    @change="onGenderChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Picker, Toast } from 'vant'

import { updateUserProfile } from '../../../api/user'

const emit = defineEmits(['close', 'update:gender'])

const props = defineProps({
  gender: {
    type: Number,
    required: true,
  },
})
const columns = ['男', '女']

//默认选中的性别
const defaultIndex = ref(props.gender)

const result = ref('')
const showPicker = ref(false)
//点击完成的回调
const onConfirm = async () => {
  Toast.loading({
    message: '保存中。。。',
    forbidClick: true, //禁止背景点击
  })

  //请求提交更新用户性别
  await updateUserProfile({
    gender: defaultIndex.value,
  })
  emit('update:gender', defaultIndex.value)
  emit('close')
  Toast.success('更新成功')
}

const onGenderChange = (value: any, index: any) => {
  defaultIndex.value = index
}
</script>
