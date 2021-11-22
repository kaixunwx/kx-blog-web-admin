import request from '@/utils/request'

export function login(validation, code, uuid) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: {
      validation,
      code,
      uuid
    }
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

/*
* 获取验证码
* */
export function getCode(validation) {
  return request({
    url: 'auth/code?validation=' + validation,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'auth/logout',
    method: 'get'
  })
}
