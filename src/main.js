import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import './styles/base.css'
import './styles/iconfont.css'
import axios from 'axios'
import HmButton from 'components/hm-button.vue'
import { Toast, Dialog, Button, Field, RadioGroup, Radio, Uploader, List, Tab, Tabs, PullRefresh, Search } from 'vant'
import HmNav from 'components/hm-nav.vue'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.filter('time', function (value, str = 'YYYY-MM-DD') {
  return moment(value).format(str)
})
Vue.filter('fixUrl', function (value) {
  return axios.defaults.baseURL + value
})
Vue.filter('timeCalc', function (value) {
  moment.locale('zh-cn')
  return moment(value).fromNow()
})
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
Vue.use(Search)
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
