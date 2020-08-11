<template>
  <div class="hm-button" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="less" scoped>
.hm-button {
  width: 100%;
  height: 48px;
  background-color: #cc3300;
  border-radius: 24px;
  color: #fff;
  text-align: center;
  line-height: 48px;
  font-size: 20px;
  margin-top: 30px;
}
</style>
