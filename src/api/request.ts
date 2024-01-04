import axios from 'axios'

import { useMessageStore } from '@/store/message'

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL
})

// 拦截器的添加
request.interceptors.request.use(
  (config) => {
    const messageStore = useMessageStore()

    messageStore.setLoadingShow()

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

//响应拦截器
request.interceptors.response.use(
  (response) => {
    const messageStore = useMessageStore()

    messageStore.setLoadingClose()

    const res = response.data

    if (!Number(res.code)) return res

    return Promise.reject(res)
  },
  (error) => {
    const messageStore = useMessageStore()

    messageStore.setLoadingClose()

    return Promise.reject(error.response.data)
  }
)

export default request
