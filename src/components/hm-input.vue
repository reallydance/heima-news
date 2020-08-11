<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placeholder"
      class="inp"
      @input="handleInput"
      :value="value"
      :class="[status]"
    />
    <span class="tips" v-show="showTips">{{errMsg}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: '',
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入内容',
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    rules: {
      type: RegExp,
    },
    errMsg: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
      if (!this.rules) return
      if (this.rules.test(e.target.value)) {
        this.status = 'success'
      } else {
        this.status = 'error'
      }
    },
  },
  computed: {
    showTips() {
      return this.status === 'error' && this.errMsg
    },
  },
}
</script>

<style lang="less">
.hm-input {
  position: relative;
  padding-bottom: 20px;
  .inp {
    width: 100%;
    height: 40px;
    background-color: transparent;
    border-bottom: 1px solid #666;
    font-size: 18px;
    &.success {
      border-color: green;
    }
    &.error {
      border-color: red;
    }
  }
  .tips {
    color: red;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
