<template>
  <div class="hm-header">
    <div class="left">
      <slot name="left">
        <i class="iconfont iconjiantou2" @click="$router.go(-1)"></i>
      </slot>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.hm-header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  position: fixed;
  z-index: 10;
  top: 0;
  background-color: #f2f2f2;
  .left,
  .right {
    height: 50px;
    width: 50px;
    line-height: 50px;
    text-align: center;
    i {
      display: block;
    }
  }
  .center {
    flex: 1;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
  }
}
</style>