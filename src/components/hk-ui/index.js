import HkButton from './hk-button'
import HkTabbar from './hk-tabbar'
import HkNavbar from './hk-navbar'
import HkTimeline from './hk-timeline'
import HkCode from './hk-code'
import HkNodata from './hk-nodata'
import HkRealtime from './hk-realtime'
import HkMap from './hk-map'
import HkUpload from './hk-upload'
import HkPanel from './hk-panel'
import HkDatepicker from './hk-datepicker'
import HkEcharts from './hk-echarts'
import HkAvatar from './hk-avatar'

export const install = (Vue) => {
  Vue.component(HkButton.name, HkButton)
  Vue.component(HkTabbar.name, HkTabbar)
  Vue.component(HkNavbar.name, HkNavbar)
  Vue.component(HkTimeline.name, HkTimeline)
  Vue.component(HkCode.name, HkCode)
  Vue.component(HkNodata.name, HkNodata)
  Vue.component(HkRealtime.name, HkRealtime)
  Vue.component(HkMap.name, HkMap)
  Vue.component(HkUpload.name, HkUpload)
  Vue.component(HkPanel.name, HkPanel)
  Vue.component(HkDatepicker.name, HkDatepicker)
  Vue.component(HkEcharts.name, HkEcharts)
  Vue.component(HkAvatar.name, HkAvatar)
}

export default install
