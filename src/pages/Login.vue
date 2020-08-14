<template>
  <div class="login">
    <i class="iconfont iconicon-test"></i>
    <i class="iconfont iconnew"></i>
    <div class="username">
      <hm-input
        placeholder="请输入用户名"
        type="text"
        v-model="username"
        :rules="userRules"
        err-msg="请输入正确的账号(5-11位数字)"
      ></hm-input>
    </div>
    <div class="password">
      <hm-input
        placeholder="请输入密码"
        type="password"
        v-model="password"
        :rules="passRules"
        err-msg="请输入正确格式的密码(3-11位字符)"
        @keyup.enter="login"
      ></hm-input>
    </div>
    <div class="hm-login">
      <hm-button @click="login">登录</hm-button>
    </div>
    <div class="go-reg">
      没有账号?立即
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import HmInput from 'components/hm-input.vue'
import HmButton from 'components/hm-button.vue'
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      userRules: /^1\d{4,10}$/,
      passRules: /^\w{3,11}$/,
    }
  },
  created() {
    const { user, pwd } = this.$route.params
    if (user && pwd) {
      this.username = user
      this.password = pwd
    }
  },
  components: {
    HmInput,
    HmButton,
  },
  methods: {
    async login() {
      if (!this.userRules.test(this.username)) {
        this.$toast('请输入正确的用户名')
        return
      }
      if (!this.passRules.test(this.password)) {
        this.$toast('请输入正确的密码')
        return
      }
      const res = await axios.post('/login', {
        username: this.username,
        password: this.password,
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user.id)
        this.$router.push({
          name: 'profile',
        })
      }
      if (statusCode === 401) {
        this.$toast.fail(message)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  padding: 24px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  .iconicon-test {
    font-size: 27px;
  }
  .iconnew {
    font-size: 126px;
    color: #d81e06;
    display: block;
    text-align: center;
  }
  .go-reg {
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    a {
      color: blue;
    }
  }
}
</style>
