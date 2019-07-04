import vue from 'vue'
import WindowInfo from '@/view/alarm_monitor/components/windowInfo.vue'

const InfoConstructor = vue.extend(WindowInfo)

function appendWindowInfo(data) {
  const infoDom = new InfoConstructor({
    el: document.createElement('div'),
    data() {
      return {
        alarmInfo: data
      }
    }
  })
  // document.body.appendChild(toastDom.$el)
  document.getElementById('windowInfo').innerHTML = "";
  document.getElementById('windowInfo').appendChild(infoDom.$el);
}

function registryWindowInfo (){
    //把showToast这个方法添加到uve的原型中，可以直接调用，当调用的时候就是执行函数内的内容
    vue.prototype.$windowinfo = appendWindowInfo
}

export default registryWindowInfo