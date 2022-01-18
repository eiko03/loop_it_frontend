import defaultSettings from '@/settings'
import { getCar, createCar, updateCar } from '@/api/table'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  carCreate({ commit }, carInfo) {
    const { model, brand } = carInfo
    return new Promise((resolve, reject) => {
      createCar({ model: model, brand: brand }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  carUpdate({ commit }, carInfo) {
    return new Promise((resolve, reject) => {
      const { id, model, brand } = carInfo
      updateCar({ id: id, model: model, brand: brand }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  carGet({ commit }, carId) {
    return new Promise((resolve, reject) => {
      getCar(carId).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

