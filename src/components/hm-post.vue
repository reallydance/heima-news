<template>
  <div class="hm-post" @click="$router.push(`/post-detail/${post.id}`)">
    <!-- type为2, 说明是视频类文章 -->
    <div class="video-post" v-if="post.type === 2">
      <div class="title txt-cut">{{ post.title }}</div>
      <div class="video">
        <img :src="post.cover[0].url" alt />
        <i class="iconfont iconshipin"></i>
      </div>
      <div class="bottom">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </div>
    </div>
    <!-- 单图片的文章展示 -->
    <div class="single-img-post" v-else-if="post.cover.length<3">
      <div class="info">
        <div class="title txt-cut">{{ post.title }}</div>
        <div class="bottom">
          <span>{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </div>
      </div>
      <div class="img-box">
        <img :src="post.cover[0].url" alt />
      </div>
    </div>
    <div class="multiple-img-post" v-else>
      <div class="title txt-cut">{{ post.title }}</div>
      <div class="imgs">
        <img :src="item.url" v-for="item in post.cover" :key="item.id" />
      </div>
      <div class="bottom">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
}
</script>

<style lang="less" scoped>
.hm-post {
  .title {
    font-size: 14px;
  }
  .bottom {
    color: #888;
    span:first-child {
      margin-right: 10px;
    }
  }
}
.single-img-post {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .info {
    flex: 1;
    display: flex;
    // 默认主轴水平的, 希望是往下排布, 需要修改主轴的方向
    flex-direction: column;
    // 控制主轴的对其方式 0 盒子 1 盒子 0
    justify-content: space-between;
    .title {
      font-size: 14px;
    }
    .bottom {
      color: #888;
      span:first-child {
        margin-right: 10px;
      }
    }
  }
  .img-box {
    width: 120px;
    height: 75px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.multiple-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .imgs {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    img {
      width: 112px;
      height: 75px;
      object-fit: cover;
    }
  }
}
.video-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .video {
    padding: 10px 0;
    position: relative;
    .iconshipin {
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 50px;
      border-radius: 50%;
      color: rgba(255, 255, 255, 0.8);
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>