import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import { Toast, Dialog, Uploader, Field, Picker, Tab, Tabs, Icon, List, PullRefresh, SwipeCell, Button } from 'vant'

Vue.config.productionTip = false
// 将会在Vue实例上挂载成员，以$开头，如下面的use,将来可以this.$toast来使用
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Uploader)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(SwipeCell)
Vue.use(Button)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
