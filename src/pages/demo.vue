<template>
  <div class="demo2">
    <demo2 v-if="comment.parent" :comment="comment.parent"></demo2>
    <p>{{comment.content}}</p>
  </div>
</template>

<script>
export default {
  name: 'demo2',
  props: {
    comment: Object,
  },
}
</script>

<style lang='less' scoped>
.demo2 {
  border: 1px solid #000;
  padding: 10px;
}
</style>