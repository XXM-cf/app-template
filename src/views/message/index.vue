<template lang="pug">
.message
  van-tabs(
    v-model="messageActive"
    class="hekr-tabs--colorful"
    :line-width="60"
    @change="changeType"
  )
    van-tab(
      v-for="(tab, index) in messageTabs"
      :key="index"
      :title="tab.desc"
    )
      hk-nodata(v-if="noInfo" type="message")
  van-pull-refresh(
    v-model="refreshing"
    @refresh="onRefresh"
  )
    van-list(
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    )
      message-card(
        v-for="(info, index) in infos"
        :key="index"
        :type="info.type"
        :info="info"
        icon="xitongxiaoxi"
        @solve="solveMessage"
        @view="viewMessage"
      )
  edit-dialog(
    v-model="showDialog"
    :info="handleData"
    @confirm="solveConfirm"
  )
  tab-bar
</template>

<script>
import MessageCard from './message-card'
import EditDialog from './edit-dialog'
import TabBar from '~/page/tab-bar'
export default {
  name: 'Message',
  components: {
    MessageCard,
    EditDialog,
    TabBar
  },
  data () {
    return {
      messageTabs: [
        {
          key: 'ALL',
          desc: '全部'
        }, {
          key: 'ALARM',
          desc: '报警'
        }, {
          key: 'FAULT',
          desc: '故障'
        }
      ],
      messageActive: 0,
      type: 'ALL',
      infos: [],
      page: 1,
      noInfo: false,
      refreshing: false,
      loading: false,
      finished: false,
      showDialog: false,
      handleData: {}
    }
  },
  computed: {
    title () {
      if (this.type === 'ALARM') {
        return '报警消息'
      } else if (this.type === 'FAULT') {
        return '故障消息'
      } else {
        return '消息中心'
      }
    }
  },
  mounted () {
    this.$hekr.setTitle('消息中心')
    let type = this.$route.query.type
    if (type) {
      this.type = type
      if (type === 'ALARM') {
        this.messageActive = 1
      } else if (type === 'FAULT') {
        this.messageActive = 2
      }
    }
  },
  methods: {
    getParams () {
      if (this.type === 'ALL') {
        return {
          page: this.page
        }
      } else {
        return {
          type: this.type,
          page: this.page
        }
      }
    },
    onLoad () {
      let params = this.getParams()
      this.$api.getMessageListApi(params)
        .then(data => {
          this.loading = false
          if (data.content.length === 0) {
            this.noInfo = true
          } else {
            this.infos.push.apply(this.infos, data.content)
            this.page++
          }
          if (data.last) {
            this.finished = true
          }
        })
    },
    onRefresh () {
      this.loading = true
      this.page = 1
      let params = this.getParams()
      this.$api.getMessageListApi(params)
        .then(data => {
          this.loading = false
          this.refreshing = false
          this.infos = data.content
          if (data.content.length === 0) {
            this.noInfo = true
          }
          if (data.last) {
            this.finished = true
          } else {
            this.finished = false
            this.page++
          }
          if (this.toastLoading) {
            this.toastLoading.clear()
          }
        })
    },
    changeType (index) {
      let key = this.messageTabs[index].key
      this.type = key
      this.noInfo = false
      this.toastLoading = this.$toast.loading('加载中')
      this.onRefresh()
    },
    solveMessage (data) {
      this.showDialog = true
      this.handleData = data
    },
    viewMessage (data) {
      let name = ''
      if (data.extDeviceType === 'SMART_ELECTRICITY') {
        name = data.type === 'ALARM' ? 'eleCtrlAlarm' : 'eleCtrlFault'
      } else if (data.extDeviceType === 'SMOKE_DETECTOR') {
        name = data.type === 'ALARM' ? 'smokeCtrlAlarm' : 'smokeCtrlFault'
      } else {
        this.$toast('暂不支持查看该设备品类消息')
      }
      this.$router.push({ name, query: {ctrlKey: data.ctrlKey, from: 'warn', type: data.type} })
    },
    solveConfirm (info) {
      this.$api.handleMessageApi(info).then(() => {
        this.$toast.success('处理成功')
        this.onRefresh()
      }).catch(err => {
        console.log('err', err)
        this.$toast.fail('处理失败')
      })
    }
  }
}
</script>

<style lang="stylus">
.message
  .van-tabs.hekr-tabs--colorful
    padding-top 0
    .van-tabs__wrap
      position fixed
      top 0
    .van-tabs__content
      position fixed
      top 2.6rem
      width 100%
      text-align center
  .van-pull-refresh
    padding-top 2.6rem
    padding-bottom 2.6rem
    height 100vh
    overflow-y auto
</style>
