import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', {
  state: () => {
    return {
      cachePages: ['LayOut'],
    }
  },
  actions: {
    //添加缓存页面(组件名)
    addCachePage(pageName: string) {
      if (this.cachePages.includes(pageName)) {
        this.cachePages.push(pageName)
      }
    },
    //移出缓存页面
    removeCachePage(pageName: string) {
      const index = this.cachePages.indexOf(pageName)
      if (index !== -1) {
        this.cachePages.splice(index, 1)
      }
    },
  },
})
