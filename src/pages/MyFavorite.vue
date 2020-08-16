<template>
  <div class="my-favorite">
    <div class="box"></div>
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
  </div>
</template>

<script>
import HmHeader from 'components/hm-header.vue'
import HmPost from 'components/hm-post'
export default {
  components: {
    HmHeader,
    HmPost,
  },
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getFavoriteList()
  },
  methods: {
    async getFavoriteList() {
      const res = await this.$axios.get('/user_star')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
  },
}
</script>

<style lang='less' scoped>
.my-favorite {
  .box {
    height: 50px;
  }
}
</style>