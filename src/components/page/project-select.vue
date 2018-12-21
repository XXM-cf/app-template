<template lang="pug">
van-popup(
  v-model="show"
  position="right"
  class="project-select"
)
  .project-select-content
    van-radio-group(
      v-model="selected"
    )
      van-cell-group
        van-cell(
          v-show="showAll"
          title="全部项目"
          @click="selectAll"
        )
          van-radio(name="all")
        van-cell(
          v-for="(item, index) in items"
          :key="index"
          :title="item.name"
          @click="select(item)"
        )
          van-radio(:name="item.id")
</template>

<script>
import { defaultData } from '@/assets/utils/defaultData.js'
export default {
  name: 'project-select',
  props: {
    value: {
      type: Boolean
    },
    project: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showAll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      items: []
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    selected: {
      get () {
        return this.project.id || 'all'
      },
      set (val) {
      }
    }
  },
  mounted () {
    this.getProjectId()
  },
  methods: {
    goBack () {
      this.$emit('cancel')
    },
    getProjectId () {
      this.$api.getProjectListApi()
        .then(data => {
          this.items = data.content
        })
    },
    select (item) {
      let data = {
        id: item.id,
        name: item.name,
        lng: (item.location || {}).longitude || defaultData.position.lng,
        lat: (item.location || {}).latitude || defaultData.position.lat
      }
      this.$emit('confirm', data)
    },
    selectAll () {
      this.$emit('confirm', {})
    }
  }
}
</script>

<style lang="stylus">
.project-select
  &--bottom,
  &--right
    width 100vw
    height 100vh
  &-content
    width 100vw
    height 100vh
    .van-cell-group
      margin 0
</style>
