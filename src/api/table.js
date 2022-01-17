import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/car',
    method: 'get',
    params,
    header: localStorage.getItem('token')
  })
}
