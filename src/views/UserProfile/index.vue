<template>
  <!-- 导航栏 -->
  <NavBar
    class="app-nav-bar"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
  />
  <!--/ 导航栏 -->

  <!-- 头像上传，表单元素默认有hidden属性 -->
  <input
    type="file"
    hidden
    ref="fileInput"
    accept="image/*"
    @change="onFileChange"
  />
  <Cell title="头像" is-link center @click="fileInput?.click()">
    <Image width="30" height="30" fit="cover" round :src="user.data.photo" />
  </Cell>
  <Cell
    title="昵称"
    is-link
    :value="user.data.name"
    @click="isUpdateNameShow = true"
  ></Cell>
  <Cell
    title="性别"
    is-link
    :value="user.data.gender === 0 ? '男' : '女'"
    @click="isUpdateGenderShow = true"
  ></Cell>
  <Cell
    title="生日"
    is-link
    :value="user.data.birthday"
    @click="isUpdateBirthdayShow = true"
  ></Cell>

  <!-- 弹出层 -->
  <div class="popup-wrap">
    <!-- 姓名 -->
    <Popup
      v-model:show="isUpdateNameShow"
      position="bottom"
      style="height: 100%"
    >
      <!-- 
        当传递给子组件的数据既要给子组件做展示，又要修改源数据时
        可以通过自定义事件，让父组件修改
       @update-name="user.data.name = $event"
        或者使用v-model这个语法糖(vue3中 :value 不能省略)
      v-model:value = user.data.name ==== :value="user.data.name"
      默认传递一个叫value的数据
      默认监听input事件 @input="user.data.name = $event"
 -->
      <!--       <UpdateName
        :name="user.data.name"
        @close="isUpdateNameShow = false"
        @update-name="user.data.name = $event"
      /> -->

      <!-- 
          如果有多个数据需要保持同步
          需使用 .sync 修饰符
          :abc="efg"
          @update-abc="efg = $event"

          :abc.sync="efg"
          
          父组件默认监听：
          @update:abc="efg = $event"
          @update:属性名称="abc = $event"

          子组件触发事件：
          emit('update:abc', newValue)

          一般把最常用的数据设计为 v-model绑定
          把不太常用的数据设计为 .sync

          在 3.x 中，自定义组件上的 v-model 相当于传递了 
          modelValue prop 并接收抛出的 update:modelValue 事件：
       -->
      <UpdateName
        v-if="isUpdateNameShow"
        v-model="user.data.name"
        @close="isUpdateNameShow = false"
      />
    </Popup>
    <!-- / 姓名 -->

    <!-- 修改性别 -->
    <Popup v-model:show="isUpdateGenderShow" position="bottom">
      <UpdateGender
        v-model:gender="user.data.gender"
        @close="isUpdateGenderShow = false"
      />
    </Popup>
    <!-- 修改性别 -->

    <!-- 修改生日 -->
    <Popup v-model:show="isUpdateBirthdayShow" position="bottom">
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        v-model="user.data.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </Popup>
    <!-- /修改生日 -->

    <!-- 修改头像 -->
    <Popup
      style="height: 100%"
      v-model:show="isUpdateAvatarShow"
      position="bottom"
      class="update-avatar-popup"
    >
      <UpdateAvatar
      v-if="isUpdateAvatarShow"
        :file="(previewImage as File)"
        @update-avatar="user.data.photo = $event"
        @close="isUpdateAvatarShow = false"
      />
    </Popup>
    <!-- /修改头像 -->
  </div>
  <!-- /弹出层 -->
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { NavBar, Cell, Image, Popup } from 'vant'

import UpdateName from './components/UpdateName.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'
import UpdateAvatar from './components/UpdateAvatar.vue'

import { getUserProfile } from '../../api/user'
import { IUserProfile } from '../../types/user'

const user = reactive({
  data: {} as IUserProfile,
})

onBeforeMount(() => {
  loadUserProfile()
})

//获取用户个人资料
const loadUserProfile = async () => {
  const { data } = await getUserProfile()
  console.log(data)
  user.data = data.data
}
//修改昵称的显示状态
const isUpdateNameShow = ref(false)
//修改性别的显示状态
const isUpdateGenderShow = ref(false)
//修改生日的显示状态
const isUpdateBirthdayShow = ref(false)
//修改头像的显示状态
const isUpdateAvatarShow = ref(false)

//上传预览图片
const previewImage = ref<File>()

//file类型的input
// const fileInput = ref() as Ref<HTMLInputElement>
// const fileInput = ref(null as HTMLInputElement | null)
const fileInput = ref<HTMLInputElement | any>(null)

//选择的文件发生改变触发
const onFileChange = () => {
  //展示弹出层
  isUpdateAvatarShow.value = true

  //图片预览
  const file:File = fileInput.value.files[0]
  previewImage.value = file
  //为了解决相同文件不触发 change事件，
  //所以在这里手动清空file 的value
  ;(fileInput.value as HTMLInputElement).value = ''
}
</script>

<style lang="less" scoped>
.popup-wrap {
  /deep/.van-popup {
    background-color: #f5f7f9;
  }
  /deep/ .update-avatar-popup {
    background-color: #000;
  }
}
</style>
