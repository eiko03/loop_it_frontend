import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/car',
    method: 'get',
    params,
    header: localStorage.getItem('token')
  })
}
export function deleteList(id) {
  return request({
    url: '/car/' + id,
    method: 'delete',
    header: localStorage.getItem('token')
  })
}

export function createCar(data) {
  return request({
    url: '/car/',
    method: 'post',
    data,
    header: localStorage.getItem('token')
  })
}

export function getCar(carId) {
  return request({
    url: '/car/' + carId,
    method: 'get',
    header: localStorage.getItem('token')
  })
}

export function updateCar(data) {
  const id = data.id
  return request({
    url: '/car/' + id,
    method: 'put',
    data,
    header: localStorage.getItem('token')
  })
}
