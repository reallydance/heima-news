<template>
  <div class="tab-manage">
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="title">点击删除以下频道</div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) in activeTabs"
          :key="item.id"
          @click="del(index)"
        >{{item.name}}</div>
      </div>
      <div class="title">点击添加以下频道</div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) in deactiveTabs"
          :key="item.id"
          @click="add(index)"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import HmHeader from 'components/hm-header'
export default {
  components: {
    HmHeader,
  },
  created() {
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    const deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
    if (activeTabs && deactiveTabs) {
      this.activeTabs = activeTabs
      this.deactiveTabs = deactiveTabs
    } else {
      this.getTabList()
    }
  },
  data() {
    return {
      activeTabs: [],
      deactiveTabs: [],
    }
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeTabs = data
      }
    },
    del(index) {
      if (index === 0 || index === 1) {
        this.$toast('该栏目无法移除')
        return
      }
      this.deactiveTabs.push(this.activeTabs[index])
      this.activeTabs.splice(index, 1)
    },
    add(index) {
      this.activeTabs.push(this.deactiveTabs[index])
      this.deactiveTabs.splice(index, 1)
    },
  },
  watch: {
    activeTabs() {
      localStorage.setItem('activeTabs', JSON.stringify(this.activeTabs))
      localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
    },
  },
}
</script>

<style lang='less' scoped>
.tab-manage {
  height: 100vh;
  padding: 50px 0;
  .content {
    padding: 0 10px;
    .title {
      color: #888;
      padding: 10px 0;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ccc;
        background-color: #ddd;
        margin-right: 8px;
        margin-bottom: 6px;
        font-size: 14px;
      }
    }
  }
}
</style>