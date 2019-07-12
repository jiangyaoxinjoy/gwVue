import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'
import { treeData } from './data/tree-select'
import { alarmData } from './data/alarm.js'
import { alarmInfo } from './data//alarmInfo.js'
import { openData } from './data/open.js'
import { pressureHistory } from './data/pressure-history.js'
import { results } from './data/results.js'
import { alarmHistory } from './data/alarmHistory.js'
import { alarmDetailTel } from './data/alarmDetailTel.js'
import { alarmDetail } from './data/alarmDetail.js'
const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}

export const getTreeSelectData = req => {
  return treeData
}

export const getTreeAlarmData = req => alarmData

export const getAlarmInfo = req => alarmInfo

export const getOpenData = req => openData

export const getPressureHistory = req => pressureHistory

// export const getResults = req => results

export const getResults = req => {
  let resultList = {}
  doCustomTimes(5, () => {
    resultList = results
  })
  return resultList
}

export const getAlarmTrace = req => alarmHistory

export const getAlarmDetail = req => { detail: alarmDetail; tel: alarmDetailTel }
