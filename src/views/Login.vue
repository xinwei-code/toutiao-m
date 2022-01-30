<template>
  <NavBar
    class="app-nav-bar"
    title="注册/登录"
    left-arrow
    @click-left="$router.back()"
  />

  <!-- 登录表单 -->
  <!-- 
      基于 Vant 的表单验证
      1.使用Form组件包裹所有的表单项 Field
      2.表单提交的时候会触发submit事件 
      3.使用 Field 的 rules 属性定义校验规则。
   -->

  <Form
    :show-error="false"
    :show-error-message="false"
    validate-first
    @submit="onLogin"
    @failed="onFailed"
    ref="loginForm"
  >
    <Field
      icon-prefix="icon"
      left-icon="shouji"
      clearable
      v-model="loginInfo.mobile"
      placeholder="请输入手机号"
      :rules="formRules.mobile"
      name="mobile"
      center
    />
    <Field
      icon-prefix="icon"
      left-icon="yanzhengma"
      clearable
      v-model="loginInfo.code"
      placeholder="请输入验证码"
      :rules="formRules.code"
      name="code"
      center
    >
      <template #button>
        <CountDown
          format="ss s"
          :time="60 * 1000"
          v-if="isCountDownShow"
          @finish="isCountDownShow = false"
        />
        <Button
          :loading="isSendSmsLoading"
          size="mini"
          class="send-btn"
          round
          @click="onSendSms"
          v-else
          >发送验证码</Button
        >
      </template>
    </Field>
    <div class="login-btn-wrap">
      <Button class="login-btn" block native-type="submit">登录</Button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, NavBar, Field, Button, Toast, CountDown } from 'vant'
import { useRouter } from 'vue-router'

import { useUserStore } from '../store/user'
import useCurrentInstance from '../hooks/useCurrentInstance'
import { login, sendSms } from '../api/user'
import { ILoginInfo } from '../types/loginInfo'
import { FormExpose } from 'vant/lib/form/types'

const userStore = useUserStore()
const router = useRouter()
//获取当前实例
const { proxy } = useCurrentInstance()

// 表单校验规则
const formRules = {
  mobile: [
    { required: true, message: '请填写手机号' },
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
      message: '手机号格式不正确',
    },
  ],
  code: [
    { required: true, message: '请填写验证码' },
    { pattern: /^\d{6}$/, message: '验证码格式不正确' },
  ],
}
//用户信息
const loginInfo = reactive<ILoginInfo>({
  mobile: '',
  code: '',
})

//控制倒计时组件和发送短信验证码的显示与隐藏
const isCountDownShow = ref(false)

//发送短信验证码按钮的loading状态
const isSendSmsLoading = ref(false)

//用户登录
const onLogin = async () => {
  Toast.loading({
    message: '登录中...',
    forbidClick: true,
    duration: 0, //展示时长(ms)，值为 0 时，toast 不会消失
  })
  try {
    const { data } = await login(loginInfo)
    console.log(data)
    //新的Toast提示会覆盖旧的提示
    Toast.success('登录成功')

    //将后端返回的用户登录状体（token等数据 放到Pinia 容器中）
    // this.store.commit('setUser', data.data)

    //登陆成功，跳转首页
    router.back()
    userStore.setUser(data.data)
  } catch (error) {
    console.log(error)
    Toast.fail('登录失败，手机号或验证码错误')
  }
}

// 表单验证失败的回调
const onFailed = (errMsg: { errors: any[] }) => {
  if (errMsg.errors[0]) {
    Toast({ message: errMsg.errors[0].message, position: 'top' })
  }
}

//发送短信验证码
const onSendSms = async () => {
  try {
    //展示按钮的Loading状态，防止网络慢用户多次点击触发发送行为
    isSendSmsLoading.value = true

    //校验手机号码
    const loginForm = proxy?.$refs['loginForm'] as FormExpose
    await loginForm.validate('mobile')
    //捕获自己异常，代码依旧会往下执行
    //因此判断逻辑只能写在下方catch中
    /*     .catch(error => {
      Toast({
        message: error.message,
        position: 'top',
      })
    }) */

    //验证通过，请求发送验证码
    const res = await sendSms(loginInfo.mobile)
    console.log(res)

    //短信发送成功，隐藏发送按钮，显示倒计时

    isCountDownShow.value = true
  } catch (error: any) {
    //try里面任何代码的错误都会进入catch
    //不同的错误需要不用的提示，就需要判断
    let message = ''
    if (error && error.response && error.response.status === 429) {
      //发送短信失败的提示
      message = '发送太频繁，请稍后重试。'
    } else if (error.name === 'mobile') {
      //表单验证失败的提示
      message = error.message
    } else {
      //未知错误
      message = '发送失败，请稍后重试'
    }
    Toast({
      message,
      position: 'top',
    })
  }
  //无论发送成功或或者失败都要关闭loading
  isSendSmsLoading.value = false
  //验证通过 --> 请求发送验证码 -> 用户接收短信 -> 输入验证码
  // -->请求登录
  //发送验证码 -> 隐藏发送按钮,显示倒计时组件
  //倒计时结束 -> 隐藏倒计时,显示发送按钮
}
</script>

<style lang="less">
.send-btn {
  background-color: #ededed;
  width: 76px;
  height: 23px;
  color: #666666;
  font-size: 11px;
}

.login-btn-wrap {
  padding: 26px 16px;

  .login-btn {
    background-color: #6db4fb;
    border-radius: 8px;
    border: none;
    font-size: 15px;
    color: #fff;
  }
}
</style>
