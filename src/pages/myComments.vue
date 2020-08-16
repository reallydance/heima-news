<template>
  <div class="my-comments">
    <hm-header>我的跟帖</hm-header>
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      :offset="50"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="items" v-for="item in commentList" :key="item.id">
        <div class="time">{{item.create_date|time}}</div>
        <!-- 父级跟帖数据 -->
        <div class="parent" v-if="item.parent">
          <p>回复： {{item.parent.user.nickname}}</p>
          <p>{{item.parent.content}}</p>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="origin">
          <p class="one-txt-cut">{{item.post.title}}</p>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </van-list>
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
      commentList: [],
      pageIndex: 1,
      pageSize: 5,
      finished: false,
      loading: false,
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      this.pageIndex++
      this.getCommentList()
    },
  },
}
</script>

<style lang='less' scoped>
.van-list {
  margin-top: 50px;
}
.items {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  line-height: 30px;
  .time {
    color: #888;
    font-size: 12px;
  }
  .content {
    color: #000;
    font-size: 14px;
  }
  .origin {
    color: #888;
    font-size: 12px;
    display: flex;
    margin-top: 10px;
    .one-txt-cut {
      flex: 1;
    }
  }
  .parent {
    margin: 10px 0;
    background-color: #ddd;
    padding: 10px;
    border-radius: 5px;
    p:first-child {
      font-size: 12px;
    }
  }
}
</style>