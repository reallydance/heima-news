<template>
  <div class="reg">
    <i class="iconfont iconicon-test"></i>
    <i class="iconfont iconnew"></i>
    <div class="username">
      <hm-input
        placeholder="用户名/手机号码"
        type="text"
        v-model="username"
        :rules="userRules"
        err-msg="请输入正确的账号(5-11位数字)"
      ></hm-input>
    </div>
    <div class="nickname">
      <hm-input
        placeholder="昵称"
        type="text"
        v-model="nickname"
        :rules="nickRules"
        err-msg="昵称必须是2-6位的中文字符"
      ></hm-input>
    </div>
    <div class="password">
      <hm-input
        placeholder="密码"
        type="password"
        v-model="password"
        :rules="passRules"
        err-msg="请输入正确格式的密码(3-11位字符)"
      ></hm-input>
    </div>
    <div class="hm-login">
      <hm-button @click="register">注册</hm-button>
    </div>
  </div>
</template>

<script>
import HmInput from 'components/hm-input.vue'
import HmButton from 'components/hm-button.vue'
import axios from 'axios'
export default {
  components: {
    HmInput,
    HmButton,
  },
  data() {
    return {
      username: '',
      nickname: '',
      password: '',
      userRules: /^1\d{4,10}$/,
      nickRules: /^[\u4e00-\u9fa5]{2,6}$/,
      passRules: /^\w{3,11}$/,
    }
  },
  methods: {
    async register() {
      if (!this.userRules.test(this.username)) {
        this.$toast('请输入正确的用户名')
        return
      }
      if (!this.nickRules.test(this.nickname)) {
        this.$toast('请输入正确的昵称')
        return
      }
      if (!this.passRules.test(this.password)) {
        this.$toast('请输入正确的密码')
        return
      }
      const res = await axios.post('/register', {
        username: this.username,
        nickname: this.nickname,
        password: this.password,
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: {
            user: this.username,
            pwd: this.password,
          },
        })
      } else {
        this.$toast.fail(message)
      }
    },
  },
}
</script>
<style lang="less">
.reg {
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
