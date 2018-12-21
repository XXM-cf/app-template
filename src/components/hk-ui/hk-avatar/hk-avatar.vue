<template lang="pug">
  .hk-avatar
    .hk-avatar-result
      van-loading(
        v-if="loading"
        type="spinner"
      )
      img(
        v-else-if="url"
        :src="url"
      )
      img(
        v-else
        src="~@/assets/images/logo.png"
      )
      input(
        class="file"
        ref="file"
        type="file"
        accept="image/*"
        @change="uploadChange"
      )
    .hk-avatar-layer(ref="layer")
      .layer-header
        van-button.cancel(
          size="normal"
          type="default"
          round
          @click="cancelHandle"
        ) 取消
        van-button.confirm(
          size="normal"
          type="primary"
          round
          :loading="upLoading"
          @click="confirmHandle"
        ) 裁剪
      img(ref="cropperImg")
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
export default {
  name: 'HkAvatar',
  props: {
    url: String,
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      upLoading: false,
      cropper: {},
      initParam: {
        scale: 4
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化裁剪插件
    init () {
      let cropperImg = this.$refs['cropperImg']
      this.cropper = new Cropper(cropperImg, {
        aspectRatio: 1 / 1,
        dragMode: 'move'
      })
    },
    // 点击上传按钮
    // upload () {
    //   if (!this.upLoading && !this.loading && this.$pm.auth('file', 'file') && this.$pm.auth('account', 'selfMod')) {
    //     this.$refs['file'].click()
    //   }
    // },
    // 选择上传文件
    uploadChange (e) {
      let file = e.target.files[0]
      let URL = window.URL || window.webkitURL
      this.$refs['layer'].style.display = 'block'
      this.cropper.replace(URL.createObjectURL(file))
    },
    // 取消上传
    cancelHandle () {
      this.cropper.reset()
      this.$refs['layer'].style.display = 'none'
      this.$refs['file'].value = ''
    },
    // 确定上传
    confirmHandle () {
      this.upLoading = true
      let cropBox = this.cropper.getCropBoxData()
      let scale = this.initParam['scale'] || 1
      let cropCanvas = this.cropper.getCroppedCanvas({
        width: cropBox.width * scale,
        height: cropBox.height * scale
      })
      let imgData = cropCanvas.toDataURL('image/png')
      let base64 = imgData.split(',')[1]
      let _blob = this.base64ToBlob(base64)
      this.$api.uploadFileApi(_blob).then(data => {
        this.$emit('success', data.url)
        this.upLoading = false
        this.cancelHandle()
      }).catch(() => {
        this.$toast('上传失败，请稍后再试')
        this.upLoading = false
        this.cancelHandle()
      })
    },
    base64ToBlob (base64) {
      const bytes = window.atob(base64)
      const ia = new Uint8Array(bytes.length)
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ia], { type: 'image/png' })
    }
  }
}
</script>

<style lang="stylus">
.hk-avatar
  &-result
    width 3rem
    height 3rem
    min-width 3rem
    border 1px solid #ffffff
    border-radius 50%
    margin-right 20px
    position relative
    display flex
    justify-content center
    align-items center
    img
      width 100%
      height 100%
      border-radius 50%
    .file
      display block
      opacity 0
      position absolute
      width 3rem
      top 0
      right 0
      bottom 0
      left 0
      z-index 3
  &-layer
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background #fff
    z-index 99999
    display none
    .layer-header
      position absolute
      bottom 0
      left 0
      z-index 99999
      background #fff
      width 100%
      height 4rem
      line-height 4rem
      text-align center
      padding 0 .2rem
      box-sizing border-box
    .cancel,
    .confirm
      min-width 100px
    .cancel
      margin-right 12px
    img
      position inherit!important
      border-radius inherit!important
      float inherit!important
</style>
