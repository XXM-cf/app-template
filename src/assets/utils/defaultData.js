export const defaultData = {
  // 运行状态
  runStateEnum: {
    NORMAL: '正常',
    ALARM: '报警',
    FAULT: '故障'
  },
  // 设备类型
  deviceTypeEnum: {
    GETWAY: '网关设备',
    MAIN: '独立设备',
    NB: 'NB设备'
  },
  // 设备类型
  extDeviceTypeEnum: {
    SMART_ELECTRICITY: '智慧用电',
    SMOKE_DETECTOR: '烟感'
  },
  // 默认地址
  position: {
    lng: 116.397477,
    lat: 39.908692,
    address: '北京市东城区东华门街道天安门',
    adcode: '110101'
  },
  runStateList: [
    {name: '正常设备', key: 'normal', color: '#3cf2c9'},
    {name: '报警设备', key: 'alarm', color: '#f87676'},
    {name: '故障设备', key: 'fault', color: '#ffb749'}
  ],
  onlineStateList: [
    {key: 'online', name: '在线', color: '#347bff'},
    {key: 'offline', name: '离线', color: '#c5c5c5'}
  ],
  solveStateList: [
    {key: 'PROCESSED', name: '已处理', color: '#ff7e8a'},
    {key: 'UNPROCESSED', name: '未处理', color: '#c5c5c5'}
  ]
}
