<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search" @click="$router.push('/search')">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right">
        <i class="iconfont iconwode" @click="$router.push('/profile')"></i>
      </div>
    </div>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item  in tabList" :key="item.id">
        <van-pull-refresh v-model="item.refreshing" @refresh="onRefresh">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            :immediate-check="false"
            finished-text="没有更多了"
            :offset="50"
            @load="onLoad"
          >
            <hm-post v-for="post in item.posts" :key="post.id" :post="post"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import HmPost from 'components/hm-post'
export default {
  components: {
    HmPost,
  },
  data() {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      tabList: [],
      pageSize: 5,
    }
  },
  async created() {
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    if (activeTabs) {
      activeTabs.forEach((item) => {
        item.posts = []
        item.pageIndex = 1
        item.loading = false
        item.finished = false
        item.refreshing = false
      })
      this.tabList = activeTabs
    } else {
      await this.getTabList()
    }
    this.getPostList()
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        data.forEach((item) => {
          item.posts = []
          item.pageIndex = 1
          item.loading = false
          item.finished = false
          item.refreshing = false
        })
        this.tabList = data
      }
    },
    //获取当前分类下的文章
    async getPostList() {
      const index = this.active
      const id = this.tabList[index].id
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.tabList[index].pageIndex,
          pageSize: this.pageSize,
        },
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList[index].posts = [...this.tabList[index].posts, ...data]
        this.tabList[index].loading = false
        if (data.length < this.pageSize) {
          this.tabList[index].finished = true
        }
      }
    },
    onLoad() {
      const index = this.active
      this.tabList[index].pageIndex++
      this.getPostList()
    },
    onRefresh() {
      setTimeout(async () => {
        const index = this.active
        this.tabList[index].posts = []
        this.tabList[index].pageIndex = 1
        this.tabList[index].loading = false
        this.tabList[index].finished = false
        await this.getPostList()
        this.tabList[index].refreshing = false
        this.$toast('刷新成功')
      }, 1000)
    },
  },
  watch: {
    active(index) {
      this.tabList[index].loading = false
      this.tabList[index].finished = false
      if (this.tabList[index].posts.length > 0) return
      this.getPostList()
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  .header {
    height: 50px;
    line-height: 50px;
    display: flex;
    background-color: #ff0000;
    color: #fff;
    text-align: center;
    .left {
      width: 70px;
      .iconnew {
        font-size: 50px;
      }
    }
    .search {
      flex: 1;
      background-color: rgba(255, 255, 255, 0.5);
      height: 36px;
      line-height: 36px;
      margin-top: 7px;
      border-radius: 18px;
      span {
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .right {
      width: 70px;
      .iconwode {
        font-size: 24px;
      }
    }
  }
}
</style>