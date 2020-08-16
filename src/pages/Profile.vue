<template>
  <div class="profile">
    <hm-header>
      <template v-slot:left>
        <i class="iconfont iconicon-test" @click="$router.push('/home')"></i>
      </template>
      个人中心
    </hm-header>
    <div class="box"></div>
    <!-- 头部信息 -->
    <div class="user-info" @click="$router.push('/edit-profile')">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="headImg" alt />
      </div>
      <!-- 信息 -->
      <div class="info">
        <p class="name">
          <i v-if="profile.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{profile.nickname}}</span>
        </p>
        <p class="time">{{ profile.create_date | time }}</p>
      </div>
      <!-- 右箭头 -->
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <!-- 下面列表 -->
    <div class="list">
      <hm-nav name="我的关注" desc="关注的用户" @click="$router.push('/follow')"></hm-nav>
      <hm-nav name="我的跟帖" desc="跟帖/回复" @click="$router.push('/comments')"></hm-nav>
      <hm-nav name="我的收藏" desc="文章/视频" @click="$router.push('/my-favorite')"></hm-nav>
      <hm-nav name="设置" @click="$router.push('/edit-profile')"></hm-nav>
    </div>
    <!-- 退出按钮 -->
    <div class="exit">
      <van-button type="info" size="large" round @click="logout">退出</van-button>
    </div>
  </div>
</template>

<script>
import HmHeader from 'components/hm-header.vue'
export default {
  components: {
    HmHeader,
  },
  data() {
    return {
      profile: {},
    }
  },

  async created() {
    const id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    const res = await this.$axios.get(`/user/${id}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.profile = data
    }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定要退出吗',
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
      } catch (e) {
        console.log(e)
      }
    },
  },
  computed: {
    headImg() {
      return this.$axios.defaults.baseURL + this.profile.head_img
    },
  },
}
</script>

<style lang='less' scoped>
.profile {
  .box {
    height: 50px;
  }
  height: 100vh;
  background-color: #f2f2f2;
  .user-info {
    display: flex;
    padding: 20px;
    border-bottom: 5px solid #e4e4e4;
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      padding: 10px;
      p {
        height: 25px;
        line-height: 25px;
      }
      .name {
        font-size: 16px;
        color: #000;
        .iconxingbienan {
          color: #7bbcec;
          margin-right: 5px;
        }
        .iconxingbienv {
          color: #fc004c;
          margin-right: 5px;
        }
      }
      .time {
        font-size: 14px;
        color: #999;
      }
    }
    .icon {
      width: 30px;
      height: 70px;
      line-height: 70px;
      text-align: center;
    }
  }
  .list {
    padding: 0 15px;
    box-sizing: border-box;
  }
  .exit {
    padding: 30px 15px;
  }
}
</style>