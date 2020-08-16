import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'pages/Login.vue'
import Register from 'pages/Register.vue'
import Profile from 'pages/Profile.vue'
import EditProfile from 'pages/EditProfile.vue'
import Follow from 'pages/Follow.vue'
import MyComments from 'pages/myComments.vue'
import MyFavorite from 'pages/MyFavorite.vue'
import Home from 'pages/Home.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/edit-profile', name: 'edit-profile', component: EditProfile },
  { path: '/follow', name: 'follow', component: Follow },
  { path: '/comments', name: 'comments', component: MyComments },
  { path: '/my-favorite', name: 'my-favorite', component: MyFavorite },
  { path: '/home', name: 'home', component: Home },
]
const originalPush = VueRouter.prototype.push
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes,
})

const AuthUrls = ['/profile', '/edit-profile', '/follow', '/comments', '/my-favorite']
router.beforeEach((to, from, next) => {
  if (AuthUrls.includes(to.path)) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
