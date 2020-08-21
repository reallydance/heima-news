<template>
  <div class="post-detail" v-if="!loading">
    <div class="header">
      <div class="left" @click="$router.go(-1)">
        <i class="iconfont iconjiantou2"></i>
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div class="btn-followed" v-if="post.has_follow" @click="unfollow">已关注</div>
        <div class="btn-follow" v-else @click="follow">关注</div>
      </div>
    </div>
    <!-- 新闻内容 -->
    <div class="main">
      <div class="post-title">{{post.title}}</div>
      <div class="post-info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.created_time|time}}</span>
      </div>
      <div class="video" v-if="post.type===2">
        <video :src="post.content" controls></video>
      </div>
      <div class="content" v-html="post.content"></div>
    </div>
    <div class="btns">
      <div class="good" :class="{like:post.has_like}" @click="like">
        <i class="iconfont icondianzan"></i>
        <span>{{post.like_length}}</span>
      </div>
      <div class="wechat">
        <i class="iconfont iconweixin"></i>
        <span>微信</span>
      </div>
    </div>
    <div class="footer">
      <div class="comment-input" v-if="!isFocus">
        <input type="text" placeholder="写跟帖" @focus="handleFocus" />
        <div class="icon-comment">
          <i class="iconfont"></i>
          <i class="iconfont iconpinglun-"></i>
          <span class="num">12</span>
        </div>
        <i class="iconfont iconshoucang" @click="star" :class="{star:post.has_star}"></i>
        <i class="iconfont iconfenxiang"></i>
      </div>
      <div class="comment-textarea" v-else>
        <textarea rows="3" v-focus :placeholder="placeholder" @blur="handleBlur" v-model="content"></textarea>
        <div class="send" @click="send">发送</div>
      </div>
    </div>
    <div class="post-comment">
      <div class="title">精彩跟帖</div>
      <p class="no-comment" v-if="commentList.length===0">暂无跟帖</p>
      <hm-comment v-else v-for="item in commentList" :key="item.id" :comment="item" @reply="reply"></hm-comment>
    </div>
  </div>
</template>

<script>
import HmComment from 'components/hm-comment.vue'
export default {
  components: {
    HmComment,
  },
  data() {
    return {
      post: {},
      loading: true,
      isFocus: false,
      commentList: [],
      placeholder: '回复',
      parentId: '',
      content: '',
    }
  },
  created() {
    this.getPostDetail()
    this.getCommentList()
  },
  methods: {
    async getPostDetail() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        this.loading = false
      }
    },
    async getCommentList() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
      }
    },
    async follow() {
      const id = this.post.user.id
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        this.getPostDetail()
      }
    },
    async unfollow() {
      const id = this.post.user.id
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getPostDetail()
      }
    },
    async like() {
      const id = this.post.id
      const res = await this.$axios.get(`/post_like/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getPostDetail()
        this.$toast(message)
      }
    },
    async star() {
      const id = this.post.id
      const res = await this.$axios.get(`/post_star/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getPostDetail()
        this.$toast(message)
      }
    },
    handleFocus() {
      this.isFocus = true
    },
    handleBlur() {
      if (this.content) return
      this.placeholder = '回复'
      this.parentId = ''
      this.isFocus = false
    },
    reply(id, nickname) {
      this.isFocus = true
      this.placeholder = '回复@' + nickname
      this.parentId = id
    },
    async send() {
      if (this.content.trim === '') return
      const id = this.$route.params.id
      const res = await this.$axios.post(`post_comment/${id}`, {
        content: this.content,
        parent_id: this.parentId,
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.content = ''
        this.parentId = ''
        this.placeholder = '回复'
        this.isFocus = false
        this.getCommentList()
      }
    },
  },
  watch: {
    $route() {
      this.getPostDetail()
    },
  },
}
</script>

<style lang='less' scoped>
.post-detail {
  padding-bottom: 70px;
  .header {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    .left {
      i {
        vertical-align: middle;
      }
      .iconnew {
        font-size: 50px;
      }
    }
    .right {
      .btn-followed,
      .btn-follow {
        height: 26px;
        line-height: 23px;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 0 10px;
        text-align: center;
      }
      .btn-follow {
        background-color: red;
        color: #fff;
      }
    }
  }
  .main {
    padding: 0 15px;
    .post-title {
      font-size: 18px;
      color: #333;
      font-weight: 700;
    }
    .post-info {
      color: #666;
      span:first-child {
        margin-right: 10px;
      }
    }
    video {
      width: 100%;
    }
  }
  .btns {
    display: flex;
    justify-content: space-around;
    padding: 25px 15px;
    .good,
    .wechat {
      border: 1px solid #ccc;
      height: 30px;
      line-height: 26px;
      border-radius: 30px;
      padding: 0 15px;
    }
    .iconfont {
      font-size: 18px;
      margin-right: 5px;
    }
    .iconweixin {
      color: #00c800;
    }
    .like {
      background-color: red;
      color: #fff;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    background-color: #f2f2f2;
    padding: 10px 0;
    .comment-input {
      justify-content: space-around;
      display: flex;
      input {
        width: 180px;
        height: 30px;
        background-color: #d7d7d7;
        border-radius: 15px;
        padding-left: 20px;
        color: #000;
      }
      .iconfont {
        font-size: 20px;
      }
      .icon-comment {
        position: relative;
        .num {
          position: absolute;
          left: 12px;
          top: -5px;
          background-color: red;
          border-radius: 10px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          font-size: 10px;
          padding: 0 5px;
        }
      }
      .star {
        color: red;
      }
    }
    .comment-textarea {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      textarea {
        background: #ddd;
        width: 260px;
        height: 90px;
        border-radius: 10px;
        padding: 10px;
      }
      .send {
        width: 60px;
        height: 26px;
        line-height: 26px;
        background-color: red;
        color: #fff;
        border-radius: 13px;
        text-align: center;
      }
    }
  }
  .post-comment {
    .title {
      font-size: 18px;
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>