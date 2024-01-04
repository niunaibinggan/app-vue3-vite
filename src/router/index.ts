import { createRouter, createWebHashHistory } from 'vue-router'

import { setupLayouts } from 'virtual:generated-layouts'

import routes from 'virtual:generated-pages'

import routerGuards from './router-guards'

const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(routes)
})

routerGuards(router)

export default router
