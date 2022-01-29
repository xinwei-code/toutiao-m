import { defineStore } from 'pinia'
import { IUser } from '../types/user'
import { getItem, setItem } from '../utils/storage'

const USER_KEY = 'user'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: getItem(USER_KEY), //当前登录用户的登录状态（token等数据）
    }
  },
  getters: {},
  actions: {
    setUser(data: IUser) {
      this.user = data
      //防止页面刷新导致数据丢失，需要把数据放到本地存储中进行持久化
      //   localStorage.setItem('user', JSON.stringify(this.user))
      setItem(USER_KEY, this.user)
    },
  },
})
