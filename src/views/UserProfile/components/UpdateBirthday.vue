<template>
  <DatetimePicker
    v-model="currentDate"
    type="date"
    :min-date="minDate"
    :max-date="maxDate"
    title="选择年月日"
    @cancel="$emit('close')"
    @confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { DatetimePicker, Toast } from 'vant'
import dayjs from 'dayjs'

import { updateUserProfile } from '../../../api/user'

const emits = defineEmits(['close', 'update:modelValue'])

/* const props = withDefaults(defineProps<{ modelValue: string }>(), {
  modelValue: '2032-01-01',
})
 */
const props = defineProps({
  modelValue: { type: String, required: false, default: '2022-01-02' },
})

onBeforeMount(() => {
  console.log(props.modelValue)
})

//默认日期
const currentDate = ref(new Date(props.modelValue))
//最小可选日期
const minDate = new Date(2020, 0, 1)
//最大可选日期
const maxDate = new Date(2025, 10, 1)

//点击完成的回调
const onConfirm = async () => {
  Toast.loading({
    message: '保存中。。。',
    forbidClick: true, //禁止背景点击
  })

  const date = dayjs(currentDate.value).format('YYYY-MM-DD')
  //请求提交更新用户生日
  await updateUserProfile({
    birthday: date,
  })
  emits('update:modelValue', date)
  emits('close')
  Toast.success('更新成功')
}
</script>
