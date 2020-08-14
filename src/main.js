import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import './styles/base.css'
import './styles/iconfont.css'
import axios from 'axios'
import HmButton from 'components/hm-button.vue'
import { Toast, Dialog, Button, Field, RadioGroup, Radio, Uploader } from 'vant'
import HmNav from 'components/hm-nav.vue'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.filter('time', function (value) {
  return moment(value).format('YYYY-MM-DD')
})
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Uploader)
Vue.component('HmNav', HmNav)
Vue.component('HmButton', HmButton)
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
axios.interceptors.response.use(function (response) {
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    Toast('登录状态已过期,请重新登录')
    router.push('/login')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
