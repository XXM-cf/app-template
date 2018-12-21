<template lang="pug">
van-popup(
  v-model="show"
  position="right"
  class="hk-map"
)
  .hk-map-content
    .search
      van-search(
        v-model="searchText"
        placeholder="请输入搜索关键词"
        @keyup="search"
      )
      .search-result(
        id="temp"
        v-show="showResult"
      )
    el-amap(
      vid="hkmap"
      :center="curMarker"
      :zoom="12"
      :events="events"
    )
      el-amap-marker(
        :position="curMarker"
      )
    .result
      .result-title 已选地址：
      .result-value {{ curAddress }}
      .result-actions
        van-button(
          type="default"
          size="small"
          class="result-cancel"
          @click="goBack"
        ) 取消
        van-button(
          type="primary"
          size="small"
          class="result-confirm"
          @click="confirmAddress"
        ) 确认
</template>

<script>
import { defaultData } from '@/assets/utils/defaultData.js'
export default {
  name: 'hk-map',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    positions: {
      type: Object,
      default: () => {
        return {
          ...defaultData.position
        }
      }
    }
  },
  data () {
    let self = this
    return {
      searchText: '',
      showResult: true,
      searchOption: {
        citylimit: false
      },
      lat: '30.27222',
      lng: '120.12756',
      address: '',
      adcode: '',
      searchData: [],
      positionPicker: null,
      events: {
        init (map) {
          /* eslint-disable no-undef */
          AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
            var positionPicker = new PositionPicker({
              mode: 'dragMarker', // 拖动类型 drapMap dragMarker
              map: map
            })

            // 拖拽选址

            positionPicker.on('success', function (positionResult) {
              // console.log('result', positionResult)
              self.lat = positionResult.position.lat
              self.lng = positionResult.position.lng
              self.address = positionResult.address
              self.adcode = positionResult.regeocode.addressComponent.adcode
            })
            positionPicker.on('fail', function (positionResult) {
              // console.log('resultError', positionResult)
            })
            // console.log(map.getBounds())
            // console.log(map.getBounds().getSouthWest())
            console.log([self.lng, self.lat])
            positionPicker.start(this.curMarker)
            self.positionPicker = positionPicker
          })
        }
      }
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
    curMarker () {
      return [this.lng, this.lat]
    },
    curAddress () {
      return this.address
    }
  },
  watch: {
    positions () {
      this.lng = this.positions.lng || defaultData.position.lng
      this.lat = this.positions.lat || defaultData.position.lat
      this.address = this.positions.address || defaultData.position.address
      this.adcode = this.positions.adcode || defaultData.position.adcode
    },
    searchText () {
      let text = this.searchText.trim()
      if (text !== '') {
        this.showResult = true
        this.positionPicker.stop()
      } else {
        this.showResult = false
        this.positionPicker.start(this.curMarker)
      }
    }
  },
  methods: {
    goBack () {
      this.lng = this.positions.lng || defaultData.position.lng
      this.lat = this.positions.lat || defaultData.position.lat
      this.address = this.positions.address || defaultData.position.address
      this.adcode = this.positions.adcode || defaultData.position.adcode
      this.positionPicker.start(this.curMarker)
      this.$emit('cancel')
    },
    onSearchResult (pois) {
      console.log('pois', pois)
      this.lat = pois[0].lat
      this.lng = pois[0].lng
    },
    search () {
      var _this = this
      AMap.plugin(['AMap.PlaceSearch'], () => {
        var placeSearch = new AMap.PlaceSearch({
          // 构造地点查询类
          pageSize: 12,
          pageIndex: 1,
          cityLimit: false,
          panel: 'temp'
        })
        let searchText = _this.searchText.trim()
        if (searchText !== '') {
          placeSearch.search(searchText)
        } else {
          placeSearch.clear()
        }
        // AMap.event.addListener(placeSearch, 'complete', function (data) {
        //   if (data.poiList.count === 0) {
        //     placeSearch.clear()
        //   }
        // })
        AMap.event.addListener(placeSearch, 'listElementClick', function ({ data }) {
          console.log('data', data)
          _this.lat = data.location.lat
          _this.lng = data.location.lng
          _this.adcode = data.adcode
          _this.address = data.pname + data.cityname + data.adname + data.address + data.name
          _this.positionPicker.start(_this.curMarker)
          placeSearch.clear()
        })
      })
    },
    confirmAddress () {
      let positions = {
        lng: this.lng,
        lat: this.lat,
        address: this.address,
        adcode: this.adcode
      }
      this.$emit('confirm', positions)
    }
  }
}
</script>

<style lang="stylus">
.hk-map
  &--bottom,
  &--right
    width 100vw
    height 100vh
  &-content
    width 100vw
    height 100vh
    .search
      position absolute
      top 0.8rem
      width 90%
      left 5%
      z-index 999999
      &-result
        max-height calc(100vh - 3rem)
        overflow-x hidden
        .poi-more
          display none !important
    .search-box
      font-size 14px
      border 1px solid #ccc
      position absolute
      top 0
      width 90%
      left 5%
    .search-tips
      width 100%
    .result
      width 100%
      height 6rem
      display flex
      flex-direction column
      justify-content center
      align-items center
      font-size 14px
      z-index 99999
      position absolute
      bottom 0
      left 0
      background #ffffff
      padding 0 16px
      &-value
        margin 12px 0
      .result-confirm
        margin-left 12px
</style>
