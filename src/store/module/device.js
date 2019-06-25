import {
  deviceList,
  deviceMapList
} from '@/api/user'

import { Message } from 'iview'
// import { getToken } from '@/libs/util'

export default {
  state: {
    // token: getToken(),
    deviceStatusParams: {
      companyId: 0,
      online_state: 0,
      addkeys: '',
      pageNum: 1,
      limit: 100
    },
    centerMark: {
      lng: 0,
      lat: 0
    }
  },
  getters: {
    deviceParams: state => {
      let params = state.deviceStatusParams
      params.offset = (params.pageNum - 1) * params.limit
      return params
    }
  },
  mutations: {
    setDeviceParams (state, payload) {
      state.deviceStatusParams = payload
    },
    setCenterMarker (state, payload) {
      state.centerMark = payload
    }
  },
  actions: {
    // 获取设备列表
    deviceList ({ state, rootState }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = rootState.user.token
        deviceList(payload).then(res => {
          // console.log(res.data)
          if (res.data.status === 0) {
            resolve(res.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取设备地图列表
    deviceMapList ({ state, rootState }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = rootState.user.token
        deviceMapList(payload).then(res => {
          if (res.data.status === 0) {
            resolve(res.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
