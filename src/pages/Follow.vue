<template>
  <div class="follow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="items" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="item.head_img|fixUrl" alt />
        </div>
        <div class="center">
          <p class="title">{{item.nickname}}</p>
          <p class="name">{{item.created_date|time}}</p>
        </div>
        <div class="right" @click="cancelFollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
import HmHeader from 'components/hm-header'
export default {
  components: {
    HmHeader,
  },
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getFollow()
  },
  methods: {
    async getFollow() {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async cancelFollow(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.getFollow()
      }
    },
  },
}
</script>

<style lang='less' scoped>
.follow {
  height: 100vh;
  background-color: #f2f2f2;
  .list {
    margin-top: 50px;
  }
  .items {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    .left {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
      }
    }
    .center {
      flex: 1;
      line-height: 20px;
      .title {
        font-size: 16px;
        color: #000;
      }
      .time {
        font-size: 14px;
        color: #999;
      }
    }
    .right {
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      background-color: #e1e1e1;
      border-radius: 15px;
      color: #333;
      font-size: 12px;
    }
  }
}
</style>