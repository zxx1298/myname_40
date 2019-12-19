import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Personal from '@/views/Personal.vue'
import editPersonal from '@/views/editPersonal.vue'
import Index from '@/views/Index.vue'
import Register from '@/views/register.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import Follow from '@/views/Follow.vue'
import collect from '@/views/collect.vue'
import Commonts from '@/views/commonts.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'Personal',
      path: '/personal/:id',
      component: Personal
    },
    {
      name: 'editPersonal',
      path: '/editpersonal/:id',
      component: editPersonal
    },
    {
      name: 'ArticleDetail',
      path: '/articleDetail/:id',
      component: ArticleDetail
    },
    {
      name: 'Follow',
      path: '/follow',
      component: Follow
    },
    {
      name: 'collect',
      path: '/collect',
      component: collect
    },
    {
      name: 'Commonts',
      path: '/commonts/:id',
      component: Commonts
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
