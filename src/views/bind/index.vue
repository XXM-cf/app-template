<template lang="pug">
.bind
  van-cell-group(:border="false")
    van-field(
      :value="code"
      label="设备ID"
      readonly
    )
    van-field(
      :value="user.name"
      label="当前账号"
      readonly
    )
    van-field(
      :value="companyName"
      label="当前单位"
      readonly
    )
    van-field(
      v-model="info.deviceName"
      label="设备名称"
      :maxLength="15"
      placeholder="请输入设备名称"
      required
    )
    van-field(
      v-model="curProject.name"
      label="所属项目"
      placeholder="请选择所属项目"
      is-link
      readonly
      required
      @click="selectProject"
    )
    van-field(
      v-model="curPositions.address"
      label="所属地址"
      placeholder="请选择所属地址"
      is-link
      readonly
      required
      @click="selectAddress"
    )
    van-field(
      v-model="info.installationSite"
      label="详细地址"
      :maxLength="30"
      placeholder="请输入详细地址"
      required
    )
    van-field(
      v-model="info.simCode"
      label="SIM Code"
      :maxLength="30"
      placeholder="请输入SIM Code"
    )
    van-field(
      v-model="info.desc"
      label="设备描述"
      type="textarea"
      rows="2"
      autosize
      :maxLength="128"
      placeholder="请输入设备描述"
    )
    hk-upload(
      v-model="info.imageList"
      title="现场照片"
    )
  van-button(
    class="hk-main-button"
    size="large"
    @click="saveInfo"
  ) 立即绑定
  hk-map(
    v-model="showMapPop"
    :positions="curPositions"
    @cancel="closeMapPop"
    @confirm="changeAddress"
  )
  project-select(
    v-model="showProjectPop"
    :project="curProject"
    @cancel="closeProjectPop"
    @confirm="changeProject"
  )
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectSelect from '~/page/project-select'
export default {
  name: 'Bind',
  components: {
    ProjectSelect
  },
  data () {
    return {
      info: {},
      showMapPop: false,
      showProjectPop: false,
      curPositions: {},
      curProject: {}
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'isAppUser',
      'positions'
    ]),
    code () {
      return this.$route.query.code
    },
    password () {
      return this.$route.query.password
    },
    companyName () {
      return (this.user.companyInfo || {}).companyName || '--'
    }
  },
  watch: {
    showMapPop () {
      if (this.showMapPop === true) {
        this.pushHistory('/select/project')
      }
    },
    showProjectPop () {
      if (this.showProjectPop === true) {
        this.pushHistory('/select/project')
      }
    }
  },
  mounted () {
    this.$hekr.setTitle('绑定设备')
    this.curPositions = this.positions
    window.addEventListener('popstate', this.backListener, false)
  },
  methods: {
    backListener (e) {
      this.showMapPop = false
      this.showProjectPop = false
    },
    pushHistory (path) {
      var state = {
        title: '',
        url: path
      }
      window.history.pushState(state, state.title, state.url)
    },
    closeMapPop () {
      this.showMapPop = false
      this.$router.back()
    },
    closeProjectPop () {
      this.showProjectPop = false
      this.$router.back()
    },
    selectAddress () {
      this.showMapPop = true
    },
    selectProject () {
      this.showProjectPop = true
    },
    changeAddress (data) {
      this.curPositions = data
      this.showMapPop = false
      this.$router.back()
    },
    changeProject (data) {
      this.curProject = data
      this.showProjectPop = false
      this.$router.back()
    },
    saveInfo () {
      if (!this.info.deviceName) {
        this.$toast('设备名不能为空')
        return false
      }
      if (!this.curProject.id) {
        this.$toast('所属项目不能为空')
        return false
      }
      if (!this.curPositions.address) {
        this.$toast('所属地址不能为空')
        return false
      }
      if (!this.info.installationSite) {
        this.$toast('详细地址不能为空')
        return false
      }
      this.bindDevice()
        .then(resp => {
          this.bindSuccess()
        })
        .catch(({ response }) => {
          this.bindError(response)
        })
    },
    bindDevice () {
      return new Promise((resolve, reject) => {
        let params = {
          ...this.info,
          code: this.code,
          password: this.password,
          projectId: this.curProject.id,
          detailedAddress: this.curPositions.address,
          addressCode: this.curPositions.adcode,
          latitude: this.curPositions.lat,
          longitude: this.curPositions.lng
        }
        this.$api.bindDeviceApi(params)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * 绑定成功，跳到设备页面
     */
    bindSuccess () {
      this.$toast.success('绑定成功')
      this.$router.replace({ name: 'device' })
    },
    /**
     * 绑定失败，跳转失败页面
     */
    bindError (response) {
      let rspData = (response || {}).data || {}
      if (rspData.code) {
        this.$router.replace({ name: 'bindError', query: { code: rspData.code, desc: rspData.desc } })
      } else {
        this.$router.replace({ name: 'bindError' })
      }
    }
  }
}
</script>

<style lang="stylus">
.bind
  height 100vh
  display flex
  flex-direction column
  justify-content space-between
</style>
