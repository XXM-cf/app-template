import dayjs from 'dayjs'
export default {
  /**
   * 设置微信头部
   * @param {*} title 标题
   */
  setTitle (title) {
    document.title = title
  },
  formatDate (value, format = 'YYYY-MM-DD HH:mm') {
    if (value) {
      return dayjs(+value).format(format)
    }
  }
}
