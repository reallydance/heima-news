<template>
  <div class="hm-nav" @click="handleClick">
    <div class="left">{{name}}</div>
    <div class="center">{{desc}}</div>
    <div class="right">
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'desc'],
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>

<style lang='less' scoped>
.hm-nav {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .left {
    font-size: 14px;
    color: #000;
  }
  .center {
    flex: 1;
    text-align: right;
    font-size: 12px;
  }
  .right {
    padding: 0 5px;
  }
}
</style>