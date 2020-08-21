<template>
  <div class="search">
    <!-- 头部 -->
    <div class="header">
      <div class="left" @click="back">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="search-box">
        <van-search v-model="keyword" placeholder="请输入搜索关键词" />
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <div class="content">
      <div class="history">
        <h3>历史记录</h3>
        <ul>
          <li v-for="item in history" :key="item" @click="hotSearch(item)">{{item}}</li>
        </ul>
      </div>
      <div class="hot-search">
        <h3>热门搜索</h3>
        <ul>
          <li v-for="item in hotKeys" :key="item" @click="hotSearch(item)">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="post-list" v-if="postList.length>0">
      <hm-post v-for="item in postList" :key="item.id" :post="item"></hm-post>
    </div>
  </div>
</template>

<script>
import HmPost from 'components/hm-post'
export default {
  data() {
    return {
      keyword: '',
      postList: [],
      hotKeys: ['说好不哭', '王祖贤', '性感女歌手'],
      history: [],
    }
  },
  components: {
    HmPost,
  },
  created() {
    const history = JSON.parse(localStorage.getItem('history'))
    this.history = history
  },
  methods: {
    async search() {
      if (this.keyword.trim() === '') {
        this.$toast('请输入搜索内容')
        return
      }
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword,
        },
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data
        this.history = this.history.filter((item) => item !== this.keyword)
        this.history.unshift(this.keyword)
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    },
    hotSearch(item) {
      this.keyword = item
      this.search()
    },
    back() {
      if (this.postList.length > 0) {
        this.keyword = ''
      } else {
        this.$router.go(-1)
      }
    },
  },
  watch: {
    keyword(value) {
      if (value.trim() === '') {
        this.postList = []
      }
    },
  },
}
</script>

<style lang='less' scoped>
.header {
  height: 50px;
  line-height: 50px;
  display: flex;
  border-bottom: 1px solid #ccc;
  .left {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .search-box {
    flex: 1;
    .van-search {
      background-color: transparent;
      padding: 0;
      margin-top: 7px;
      border: 1px solid #ccc;
      border-radius: 18px;
      // 将溢出盒子的底色隐藏掉, 不然会盖住边框
      overflow: hidden;
    }
  }
  .right {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
  }
}
.history,
.hot-search {
  padding: 10px;
  h3 {
    font-size: 16px;
    font-weight: 700;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 5px 10px;
      font-size: 14px;
    }
  }
}
</style>