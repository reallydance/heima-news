<template>
  <div class="hm-comment">
    <!-- 这是黑马评论组件 --- {{ comment.content }} -->
    <!-- 标题 -->
    <div class="title">
      <img :src="comment.user.head_img|fixUrl" alt />
      <div class="info">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date|timeCalc}}</div>
      </div>
      <div class="reply" @click="reply(comment.id,comment.user.nickname)">回复</div>
    </div>
    <!-- 内容 -->
    <hm-floor :index="index" v-if="comment.parent" :comment="comment.parent" @reply="reply"></hm-floor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import HmFloor from 'components/hm-floor.vue'
export default {
  data() {
    return {
      index: 0,
    }
  },
  created() {
    let obj = this.comment
    while (obj.parent) {
      this.index++
      obj = obj.parent
    }
  },
  components: {
    HmFloor,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    reply(id, nickname) {
      this.$emit('reply', id, nickname)
    },
  },
}
</script>

<style lang="less" scoped>
.hm-comment {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    display: flex;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .info {
      flex: 1;
      .name {
        font-size: 14px;
      }
      .time {
        color: #888;
      }
    }
  }
  .content {
    padding: 10px 0;
    font-size: 14px;
  }
}
</style>