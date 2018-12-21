<template lang="pug">
.hk-upload
  van-row(
    type="flex"
    justify="space-between"
    class="hk-upload-title"
  )
    span {{ title }}
  van-row(
    class="hk-upload-content"
  )
    van-col(
      v-for="(item, index) in value"
      :key="index"
      span="8"
    )
      .hk-upload-box
        img(:src="item" preview="0")
        van-icon.close(
          v-if="!disabled"
          name="caozuoshanchu2"
          @click="deleteImg(index, $event)"
        )
    van-col(span="8" v-if="!disabled && imgNum > 0")
      .hk-upload-box(@click="addImages")
        .add-box
          van-loading(
            v-if="imgLoading"
            type="spinner"
            color="#666666"
          )
          van-icon(
            v-else
            name="caozuo_tianjia"
          )
</template>

<script>
export default {
  name: 'hk-upload',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 9
    },
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      defalut: false
    }
  },
  data () {
    return {
      imgLoading: false
    }
  },
  computed: {
    imgNum () {
      return this.max - this.value.length
    }
  },
  mounted () {
    document.addEventListener('photo', this.photoListener, false)
  },
  destroyed () {
    document.removeEventListener('photo', this.photoListener, false)
  },
  methods: {
    addImages () {
      if (!this.showCheck && this.imgNum > 0) {
        window.Matrix.takePhoto('faq', this.imgNum)
      }
    },
    photoListener (data) {
      console.log('photo data', data)
      this.imgLoading = true
      let json = JSON.parse(data.detail)
      // let base64 = 'data:image/png;base64,' + json.image
      let _blob = this.base64ToBlob(json.image)
      this.$api.uploadFileApi(_blob).then(data => {
        let images = this.value
        images.push(data.url)
        this.$emit('input', images)
        this.$previewRefresh()
        this.imgLoading = false
      }).catch(err => {
        console.log('上传失败', err)
        this.$toast('上传失败，请稍后再试')
        this.imgLoading = false
      })
    },
    base64ToBlob (base64) {
      const bytes = window.atob(base64)
      // console.log(bytes)
      // 处理异常,将ascii码小于0的转换为大于0
      // const ab = new ArrayBuffer(bytes.length)
      const ia = new Uint8Array(bytes.length)
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ia], { type: 'image/png' })
    },
    deleteImg (index, e) {
      e.stopPropagation()
      let images = this.value
      images.splice(index, 1)
      this.$emit('input', images)
    }
  }
}
</script>

<style lang="stylus">
.hk-upload
  &-title
    padding 12px 6px 6px
    font-size 14px
    .actions
      &-delete
        color red
        margin-left 12px
  .van-col
    padding 6px
  &-box
    width 100%
    padding-bottom 100%
    background #e8e8e8
    position relative
    img
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      z-index 8
    .close
      position absolute
      right 4px
      top 0
      font-size 20px
      color #ccc
      z-index 10
    .add-box
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      .van-icon
        font-size 40px
        color #666666
</style>
