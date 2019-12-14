import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Personal from '@/views/Personal.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'Personal',
      path: '/personal/:id',
      component: Personal
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (to.path.indexOf('/personal/') === 0) {
    let token = localStorage.getItem('heima_40_token')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
