import { createApp } from 'vue'

import App from './App.vue'

import router from '@router/index'

import { createPinia } from 'pinia'

import piniaPluginPersist from 'pinia-plugin-persist'

import moment from 'moment'

import momentZh from '@/utils/momentZh'

import './style/common.scss'

import vant from 'vant' // eslint-disable-line

import 'vant/lib/index.css' // eslint-disable-line

import 'amfe-flexible'

const app = createApp(App)

app.config.globalProperties.$moment = moment

const pinia = createPinia()

pinia.use(piniaPluginPersist)

app
  .use(pinia)
  .use(router)
  .use(momentZh as any)
  .use(vant)
  .mount('#app')
