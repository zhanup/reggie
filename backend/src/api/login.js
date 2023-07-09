import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: '/api/employee/login',
    method: 'post',
    data,
  })
}

export function logoutApi() {
  return request({
    url: '/api/employee/logout',
    method: 'post',
  })
}
