/**
 * Created by kaixunwx 2021.09.01
 */


/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isValidUsername(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入正确的手机号码或邮箱'))
  } else if (validPhone(value) || validEmail(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号码或邮箱'))
  }
}

export function isValidPhone(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入手机号码'))
  } else if (validPhone(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号码'))
  }
}

export function validPhone(phone) {
  const reg = /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/
  return reg.test(phone)
}

export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}



