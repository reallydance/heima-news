import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import './styles/base.css'
import './styles/iconfont.css'
import axios from 'axios'
import { Toast } from 'vant'
import HmNav from 'components/hm-nav.vue'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(Toast)
Vue.component('HmNav', HmNav)
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
