import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'pages/Login.vue'
import Register from 'pages/Register.vue'
import Profile from 'pages/Profile.vue'
import EditProfile from 'pages/EditProfile.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/edit-profile', name: 'edit-profile', component: EditProfile }
]

const router = new VueRouter({
  routes,
})

const AuthUrls = ['/profile', '/edit-profile']
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
