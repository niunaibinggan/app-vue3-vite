import { defineStore } from 'pinia'

export const useMessageStore = defineStore({
  id: 'message',
  state: () => {
    return {
      isLoading: false
    }
  },
  actions: {
    setLoadingShow() {
      this.isLoading = true
    },
    setLoadingClose() {
      this.isLoading = false
    }
  }
})
