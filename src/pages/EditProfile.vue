<template>
  <div class="edit-profile">
    <hm-header>编辑资料</hm-header>

    <!-- 头像 -->
    <div class="avatar">
      <img :src="imgSrc" />
      <van-uploader :after-read="afterRead" />
    </div>

    <!-- nav导航 -->
    <div class="list">
      <hm-nav name="昵称" :desc="profile.nickname" @click="showNickname"></hm-nav>
      <hm-nav name="密码" desc="******" @click="showPwd"></hm-nav>
      <hm-nav name="性别" :desc="profile.gender===1?'男':'女'" @click="showGender"></hm-nav>
    </div>
    <van-dialog v-model="isShowNickname" @confirm="editNickname" title="编辑昵称" show-cancel-button>
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>
    <van-dialog v-model="isShowPwd" @confirm="editPwd" title="修改密码" show-cancel-button>
      <van-field
        v-model="password"
        @click-right-icon="changeIcon"
        :right-icon="showPassword?'closed-eye' : 'eye-o'"
        :type="showPassword?'text':'password'"
        placeholder="请输入密码"
      />
    </van-dialog>
    <van-dialog v-model="isShowGender" @confirm="editGender" title="编辑性别" show-cancel-button>
      <van-radio-group v-model="gender" direction="horizontal">
        <van-radio :name="1">男</van-radio>
        <van-radio :name="0">女</van-radio>
      </van-radio-group>
    </van-dialog>
    <!-- 图片剪裁 -->
    <div class="mask" v-show="isShowMask">
      <vue-cropper
        ref="cropper"
        :img="option.img"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
      ></vue-cropper>
      <van-button class="crop" type="primary" @click="crop">确认裁剪</van-button>
      <van-button class="cancel" type="danger" @click="cancel">取消选择</van-button>
    </div>
  </div>
</template>

<script>
import HmHeader from 'components/hm-header'
import { stat } from 'fs'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    HmHeader,
    VueCropper,
  },
  computed: {
    imgSrc() {
      return this.$axios.defaults.baseURL + this.profile.head_img
    },
  },
  data() {
    return {
      profile: {},
      isShowNickname: false,
      isShowPwd: false,
      isShowGender: false,
      isShowMask: false,
      nickname: '',
      password: '',
      nickRules: /^[\u4e00-\u9fa5]{2,6}$/,
      passRules: /^\w{3,11}$/,
      showPassword: false,
      gender: '',
      option: {
        img: '', // 这个img应该要是上传的那张图片------ 必填
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框 ------- 需要
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [2, 2], // 截图框的宽高比例
      },
    }
  },

  created() {
    this.getProfile()
  },
  methods: {
    async getProfile() {
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user/${userId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.profile = data
      }
    },
    async editProfile(data) {
      const id = this.profile.id
      const token = localStorage.getItem('token')
      const res = await this.$axios.post(`/user_update/${id}`, data, {
        headers: {
          Authorization: token,
        },
      })
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast('修改成功')
        this.getProfile()
      }
    },
    showNickname() {
      this.isShowNickname = true
      this.nickname = this.profile.nickname
    },
    showPwd() {
      this.isShowPwd = true
      this.password = this.profile.password
    },
    showGender() {
      this.isShowGender = true
      this.gender = this.profile.gender
    },
    async editNickname() {
      if (!this.nickRules.test(this.nickname)) {
        this.$toast('操作失败, 请输入正确的昵称(2-6位中文)')
        return
      }
      const dataObj = { nickname: this.nickname }
      this.editProfile(dataObj)
    },
    async editPwd() {
      if (!this.passRules.test(this.password)) {
        this.$toast('请输入正确的密码(3-11位数字)')
        return
      }
      const dataObj = { password: this.password }
      this.editProfile(dataObj)
    },
    async editGender() {
      const dataObj = { gender: this.gender }
      this.editProfile(dataObj)
    },
    changeIcon() {
      this.showPassword = !this.showPassword
    },
    crop() {
      this.$refs.cropper.getCropBlob(async (imgData) => {
        const fd = new FormData()
        fd.append('file', imgData)
        const res = await this.$axios.post('upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editProfile({ head_img: data.url })
        }
      })
      this.isShowMask = false
    },
    cancel() {
      this.isShowMask = false
    },
    async afterRead(file) {
      this.isShowMask = true
      this.option.img = file.content
      //创建formData对象，用于上传文件
    },
  },
}
</script>

<style lang="less" scoped>
.edit-profile {
  height: 100vh;
  background-color: #f2f2f2;
  .avatar {
    padding: 30px 0;
    text-align: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto;
    }
  }
  .list {
    padding: 0 20px;
  }
  .van-dialog {
    padding: 0 20px;
    box-sizing: border-box;
    .van-field {
      margin: 20px 0;
      background-color: #f2f2f2;
      border-radius: 10px;
    }
    .van-radio-group {
      display: flex;
      justify-content: space-around;
      padding: 20px 0;
    }
  }
  .avatar {
    .van-uploader {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 70px;
      opacity: 0;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    .crop {
      position: absolute;
      left: 30px;
      bottom: 10px;
    }
    .cancel {
      position: absolute;
      right: 30px;
      bottom: 10px;
    }
  }
}
</style>