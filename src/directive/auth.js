import store from '@/store'

/*
* v-auth 自定义权限按钮指令，可应用于确切的标签元素中
* v-auth:every 每个权限都需要满足
* v-auth:some 部分权限需要满足
*/

const auth = (el, binding) => {
  let valueArr = binding.value
  let authorities = store.getters.authorities
  let rules = true
  let arg = binding.arg || 'every'
  if (arg === 'every') {
    rules = valueArr.every(item => {
      return authorities.includes(item)
    })
  } else if (arg === 'some') {
    rules = valueArr.some(item => {
      return authorities.includes(item)
    })
  }
  !rules && el.parentNode.removeChild(el)
}

export default auth
