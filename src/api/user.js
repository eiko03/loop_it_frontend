import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function Register(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/me/',
    method: 'get',
    header: token
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post',
    header: localStorage.getItem('token')
  })
}
export function Refresh() {
  return request({
    url: '/auth/refresh',
    method: 'post',
    header: localStorage.getItem('token')
  })
}
