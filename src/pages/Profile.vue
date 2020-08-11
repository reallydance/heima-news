<template>
  <div class="profile">
    <!-- 头部信息 -->
    <div class="user-info">
      <!-- 头像 -->
      <div class="avatar">
        <img src="~assets/02.jpg" alt />
      </div>
      <!-- 信息 -->
      <div class="info">
        <p class="name">
          <i class="iconfont iconxingbienan"></i>
          <span>火星网友</span>
        </p>
        <p class="time">2020-10-10</p>
      </div>
      <!-- 右箭头 -->
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <!-- 下面列表 -->
    <div class="list">
      <hm-nav name="我的关注" desc="关注的用户"></hm-nav>
      <hm-nav name="我的跟帖" desc="跟帖/回复"></hm-nav>
      <hm-nav name="我的收藏" desc="文章/视频"></hm-nav>
      <hm-nav name="设置"></hm-nav>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.profile {
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
        i {
          color: #7bbcec;
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
}
</style>