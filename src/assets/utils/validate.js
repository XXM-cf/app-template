const regRule = {
  // 手机号正则
  mobile: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  // 账号
  account: /^[0-9a-zA-Z]{6,16}$/,
  // 密码
  password: /^.{6,16}$/,
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  // 验证码
  code: /\d{6}/
}

const validate = {
  // 手机号
  mobile: (value) => {
    return regRule.mobile.test(value)
  },
  // 账号
  account: (value) => {
    return regRule.account.test(value)
  },
  // 密码
  password: (value) => {
    return regRule.password.test(value)
  },
  // 邮箱
  email: (value) => {
    return regRule.email.test(value)
  },
  // 验证码
  code: (value) => {
    return regRule.code.test(value)
  }
}

export default validate
