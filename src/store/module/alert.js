import {
  getDeviceAlertInfo
} from '@/api/user'

import { Message } from 'iview'

export default {
  state: {
    // token: getToken(),
    curMarker: { lng: 0, lat: 0 },
    alarmTypeList: [
      { 'key': '10', title: '水压异常' },
      { 'key': '20', title: '阀门打开' },
      { 'key': '30', title: '撞到' },
      { 'key': '70', title: '设备异常' }
    ],
    alarmInfo: {},
    curDeviceId: ""
  },
  mutations: {
    setCurMarker (state, payload) {
      state.curMarker = {lng: payload.lng, lat: payload.lat}
      state.curDeviceId = payload.device_id
    },
    setAlarmInfo (state, payload) {
      state.alarmInfo = payload
    }
  },
  actions: {
    // 通过设备id获取设备报警具体信息
    getDeviceAlertInfo ({ state, commit, rootState }, payload) {
      // console.log(rootState)
      return new Promise((resolve, reject) => {
        payload.token = rootState.user.token
        getDeviceAlertInfo(payload).then(res => {
          if (res.data.status === 0) {
            // commit('setAlarmInfo', res.data.data)
            resolve(res.data.data)
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
