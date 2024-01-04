export default (router) => {
  router.beforeEach(async (to, from, next) => {
    // 重定向到首页
    if (to.path === '/') return next({ path: '/home', replace: true })

    next()
  })
}
