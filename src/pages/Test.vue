<template>
  <div class="test">
    <demo2 :comment="comment"></demo2>
  </div>
</template>

<script>
import Demo2 from 'pages/demo.vue'
export default {
  components: {
    Demo2,
  },
  data() {
    return {
      comment: {
        id: 4,
        content: '我是四楼, 嘎嘎, 自己动手丰衣足食',
        parent: {
          id: 3,
          content: '我是三楼, 你们还有火锅吃, 我都吃土好几个礼拜了',
          parent: {
            id: 2,
            content: '我是二楼, 我今天吃的火锅',
            parent: {
              id: 1,
              content: '我是一楼, 你今天吃了啥?',
              parent: null,
            },
          },
        },
      },
    }
  },
}
</script>

<style lang='less' scoped>
</style>