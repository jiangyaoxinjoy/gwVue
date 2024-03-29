import { RiQi, RiQiTime, RiQiYear } from '@/libs/util'
// state 转文字
let alarmTypeFilter = val => {
  let type = ''
  switch (val) {
    case '10':
      type = '水压异常'
      break;
    case '20':
      type = '阀门打开'
      break;
    case '30':
      type = '撞到'
      break;
    case '70':
      type = '设备异常'
      break;  
    default:
      type = ''
      break;
  }
  return type
}

//通知状态
let stateFilter = ([time, state]) => {
  if (state === 0 && time === 0) {
    return '发送中'
  } else if (state === 1) {
    return RiQiTime(time)
  } else {
    return '失败'
  }
}


//RiQiTime 时分
let time = (value) => {
  if (value === 0) {
    return ''
  }
  let time = RiQiTime(value)
  return time
};

//RiQi 月天时分
let timeFilter = (value) => {
  return RiQi(value)
};

//RiQiYear 年月天时分
let timeYearFilter = (value) => {
  return RiQiYear(value)
};


let notifyTypeMethod = (value) => {
  let method = ''
  switch (value) {
    case 1:
      method = '短信'
      break
    case 2:
      method = '微信'
      break
    default:
      method = ''
      break
  }
  return method
};

let alarmHistory = (value) => {
  let method = ''
  switch (value) {
    case '10':
      method += '水压历史数据'
      break
    default:
      method += '历史数据'
      break
  }
  return method
};

export default {
  alarmTypeFilter,
  stateFilter,
  alarmHistory,
  notifyTypeMethod,
  timeFilter,
  time,
  timeYearFilter
}