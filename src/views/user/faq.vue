<template lang="pug">
.user-faq
  van-cell-group(:border="false")
    van-field(
      v-model="faqPhone"
      type="tel"
      label="联系电话"
      placeholder="请输入联系电话"
      required
    )
    van-field(
      v-model="faqContent"
      type="textarea"
      rows="4"
      autosize
      required
      placeholder="请尽量描述细节，我们将尽快和您联系"
    )
    hk-upload(v-model="images")
  van-button(
    class="hk-main-button"
    size="large"
    @click="submit"
  ) 提交
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserFaq',
  data () {
    return {
      faqPhone: '',
      faqContent: '',
      images: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    submit () {
      if (this.faqContent === '') {
        this.$toast('请输入内容')
        return false
      }
      if (this.faqPhone === '') {
        this.$toast('请输入联系方式')
        return false
      }
      let postData = {
        title: '维消宝WECHAT',
        username: this.user.phoneNumber,
        contact: this.faqPhone,
        content: this.faqContent,
        feedbackType: 'APP',
        images: this.images.join()
      }
      this.$api.postFeedbackApi(postData).then(() => {
        this.$toast.success('反馈成功')
        this.faqPhone = ''
        this.faqContent = ''
        this.images = []
      }).catch(() => {
        this.$toast('提交失败，请稍后重试')
      })
    }
  }
}
</script>

<style lang="stylus">
.user-faq
  display flex
  flex-direction column
  justify-content space-between
  .hk-main-button
    margin 0 16px 16px
</style>
