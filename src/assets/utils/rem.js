/**
 * rem单位在各种屏幕上的适配代码
 */
export default () => {
  // width用来设置设计稿原型的屏幕宽度（这里是以 Iphone 6为原型的设计稿）
  const width = 375
  // 注册 resize事件
  window.addEventListener('resize', setFontSize, false)
  function setFontSize () {
    let clientWidth = document.documentElement.clientWidth
    // 这里是设置屏幕的最大和最小值时候给一个默认值
    if (clientWidth > 720) clientWidth = 720
    if (clientWidth < 320) clientWidth = 320
    // 设置 rem 大小
    document.documentElement.style.fontSize = `${clientWidth / width * 20}px`
  }
  setFontSize()
}
