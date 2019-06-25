import {
  login,
  getCompanyList,
  getUserList,
  // logout,
  getUserInfo,
  getauthList,
  addUser,
  editUser,
  addCom,
  editCom,
  // deviceList,
  addDevice,
  editDevice,
  importDevice,
  getAlertList,
  getDevicePressurehistory,
  getDeviceOpenhistory,
  getUserNotifyHistory,
  getAlertHistory,
  getDeviceAlertEvent,
  getDeviceAlertOriginData,
  getDeviceAlertDetail,
  changePsd
  // exportDeviceList
} from '@/api/user'

import { setToken, getToken } from '@/libs/util'
import { getClientHeight } from '@/libs/tools'
import { Message } from 'iview'
// import styleJson from '@/assets/json/custom_map_config.json'
// var styleJson = require('@/assets/json/custom_map_config.json')
import config from '@/config/index.js'
var url = ''
process.env.NODE_ENV === 'development' ? url = config.baseUrl.dev : url = config.baseUrl.pro

export default {
  state: {
    baseUrl: url,
    userName: '',
    userId: '',
    comId: '',
    companyList: [],
    token: getToken(),
    access: [],
    hasGetInfo: false,
    unreadCount: 0,
    // curMarker: {},
    // alarmInfo: {},
    windowH: '',
    authList: [],
    comNav: '',
    routerTransform: 'fade'
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setComId (state, cid) {
      state.comId = cid
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    // setAlarmInfo (state, payload) {
    //   state.alarmInfo = payload
    // },
    setStatusResults (state, payload) {
      state.statusResults = payload
    },
    setAlarmTrace (state, payload) {
      state.alarmTrace = payload
    },
    getWindowH (state) {
      state.windowH = getClientHeight()
    },
    setCompanyList (state, payload) {
      state.companyList = payload
    },
    setAuthList (state, payload) {
      state.authList = payload
    }
  },
  getters: {
    comNavset: state => {
      let nav = state.access
      let comNav = []
      nav.forEach(function (element, index) {
        switch (element) {
          case 'manage_user':
            comNav.push({ label: '人员管理', path: '/manage/user', name: 'manage-user' })
            break
          case 'manage_device':
            comNav.push({ label: '设备管理', path: '/manage/device', name: 'manage-device' })
            break
          case 'manage_company':
            comNav.push({ label: '公司管理', path: '/manage/company', name: 'manage-company' })
            break
          default:
            break
        }
      })
      return comNav
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload).then(res => {
          console.log(res)
          if (res.data.status === 0) {
            commit('setToken', res.data.data.token)
            resolve()
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户列表
    getUserList ({ state }, payload) {
      payload.token = state.token
      return new Promise((resolve, reject) => {
        getUserList(payload).then(res => {
          if (res.data.status === 0) {
            resolve(res.data.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          Message.error(err)
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            console.log(data)
            if (data.status === 0) {
              commit('setUserName', data.data.name)
              commit('setUserId', data.data.Id)
              commit('setComId', data.data.company_id)
              commit('setAccess', data.data.access)
              commit('setHasGetInfo', true)
              resolve(data.data)
            } else {
              Message.error('登录错误')
            }
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 获取公司列表
    getCompanyList ({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        getCompanyList({ token: state.token, companyId: id }).then(res => {
          commit('setCompanyList', res.data.data)
          resolve(res.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取所有权限
    getauthList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getauthList({ token: state.token }).then(res => {
          commit('setAuthList', res.data.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 添加用户
    addUser ({ state }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        addUser(payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 编辑用户信息
    editUser ({ state }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        editUser(payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 添加公司
    addCom ({ state }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        addCom(payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 编辑公司
    editCom ({ state }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        console.log(payload)
        editCom(payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // // 获取设备列表
    // deviceList ({ state }, payload) {
    //   return new Promise((resolve, reject) => {
    //     payload.token = state.token
    //     deviceList(payload).then(res => {
    //       resolve(res.data)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // 导出设备列表
    // exportDeviceList ({ state }, payload) {
    //   return new Promise((resolve, reject) => {
    //     exportDeviceList(payload).then(res => {
    //       resolve(res)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // 导出设备事件
    // exportDeviceEvent ({ state }, payload) {
    //   return new Promise((resolve, reject) => {
    //     exportDeviceList(payload).then(res => {
    //       resolve(res)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // 添加设备
    addDevice ({ state }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        addDevice(payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 编辑设备
    editDevice ({ state }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        editDevice(payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 批量上传设备
    importDevice ({ state }, payload) {
      return new Promise((resolve, reject) => {
        importDevice(payload).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取报警列表
    getAlertList ({ state }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        getAlertList(payload).then(res => {
          if (res.data.status === 0) {
            resolve(res.data.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取设备压力历史
    getDevicePressurehistory ({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        getDevicePressurehistory(payload).then(res => {
          if (res.data.status === 0) {
            resolve(res.data.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取设备阀门打开记录
    getDeviceOpenhistory ({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        getDeviceOpenhistory(payload).then(res => {
          if (res.data.status === 0) {
            resolve(res.data.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户收到的某个设备的通知
    getUserNotifyHistory ({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        getUserNotifyHistory(payload).then(res => {
          if (res.data.status === 0) {
            resolve(res.data.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAlertHistory ({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        getAlertHistory(payload).then(res => {
          if (res.data.status === 0) {
            resolve(res.data.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取设备事件
    getDeviceAlertEvent ({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        getDeviceAlertEvent(payload).then(res => {
          if (res.data.status === 0) {
            resolve(res.data.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取设备事件原始数据
    getDeviceAlertOriginData ({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        getDeviceAlertOriginData(payload).then(res => {
          if (res.data.status === 0) {
            resolve(res.data.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取设备告警详情
    getDeviceAlertDetail ({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        getDeviceAlertDetail(payload).then(res => {
          if (res.data.status === 0) {
            resolve(res.data.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 修改密码
    changePsd ({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        payload.token = state.token
        changePsd(payload).then(res => {
          if (res.data.status === 0) {
            commit('setToken', '')
            commit('setCompanyList', [])
            commit('setAccess', [])
            resolve(res.data)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      commit('setToken', '')
      // commit('setAuthList',[])
      commit('setCompanyList', [])
      commit('setAccess', [])
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('setToken', '')
      //     commit('setAccess', [])
      //     resolve()
      //   }).catch(err => {
      //     reject(err)
      //   })
      //   // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
      //   // commit('setToken', '')
      //   // commit('setAccess', [])
      //   // resolve()
      // })
    }

    // // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    // getUnreadMessageCount ({ state, commit }) {
    //   getUnreadCount().then(res => {
    //     const { data } = res
    //     commit('setMessageCount', data)
    //   })
    // },
    // // 获取消息列表，其中包含未读、已读、回收站三个列表
    // getMessageList ({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     getMessage().then(res => {
    //       const { unread, readed, trash } = res.data
    //       commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
    //       commit('setMessageReadedList', readed.map(_ => {
    //         _.loading = false
    //         return _
    //       }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
    //       commit('setMessageTrashList', trash.map(_ => {
    //         _.loading = false
    //         return _
    //       }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // // 根据当前点击的消息的id获取内容
    // getContentByMsgId ({ state, commit }, { msg_id }) {
    //   return new Promise((resolve, reject) => {
    //     let contentItem = state.messageContentStore[msg_id]
    //     if (contentItem) {
    //       resolve(contentItem)
    //     } else {
    //       getContentByMsgId(msg_id).then(res => {
    //         const content = res.data
    //         commit('updateMessageContentStore', { msg_id, content })
    //         resolve(content)
    //       })
    //     }
    //   })
    // },
    // // 把一个未读消息标记为已读
    // hasRead ({ state, commit }, { msg_id }) {
    //   return new Promise((resolve, reject) => {
    //     hasRead(msg_id).then(() => {
    //       commit('moveMsg', {
    //         from: 'messageUnreadList',
    //         to: 'messageReadedList',
    //         msg_id
    //       })
    //       commit('setMessageCount', state.unreadCount - 1)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // // 删除一个已读消息到回收站
    // removeReaded ({ commit }, { msg_id }) {
    //   return new Promise((resolve, reject) => {
    //     removeReaded(msg_id).then(() => {
    //       commit('moveMsg', {
    //         from: 'messageReadedList',
    //         to: 'messageTrashList',
    //         msg_id
    //       })
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // // 还原一个已删除消息到已读消息
    // restoreTrash ({ commit }, { msg_id }) {
    //   return new Promise((resolve, reject) => {
    //     restoreTrash(msg_id).then(() => {
    //       commit('moveMsg', {
    //         from: 'messageTrashList',
    //         to: 'messageReadedList',
    //         msg_id
    //       })
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // // 获取报警列表
    // getAlarmData ({ commit, dispatch }) {
    //   return new Promise((resolve, reject) => {
    //     getTreeAlarmData().then(res => {
    //       dispatch('getAlarmInfoById', res.data.rows[0].id)
    //       commit('setAlarmData', res.data)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // // 获取报警信息
    // getAlarmInfoById ({ commit }, alarm_id) {
    //   return new Promise((resolve, reject) => {
    //     getAlarmInfo(alarm_id).then(res => {
    //       // console.log(res.data)
    //       commit('setAlarmInfo', res.data)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // // 获取阀门打开数据
    // getOpenData ({ commit }, alarm_id) {
    //   return new Promise((resolve, reject) => {
    //     getOpenData(alarm_id).then(res => {
    //       resolve(res.data)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // // 获取水压异常数据
    // // getOpenData({commit}, alarm_id) {
    // //   return new Promise((resolve, reject) => {
    // //     getOpenData(alarm_id).then(res => {
    // //       resolve(res.data)
    // //     }).catch(err => {
    // //       reject(err)
    // //     })
    // //   })
    // // },
    // getResultsData ({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     getResults().then(res => {
    //       // console.log(res.data.rows[0])
    //       commit('setStatusResults', res.data)
    //       resolve()
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // getAlarmTrace ({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     getAlarmTrace().then(res => {
    //       commit('setAlarmTrace', res.data)
    //       resolve()
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // getAlarmDetail () {
    //   return new Promise((resolve, reject) => {
    //     getAlarmDetail().then(res => {
    //       resolve(res.data)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // }
  }
}
