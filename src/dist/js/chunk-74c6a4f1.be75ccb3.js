(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74c6a4f1"],{"078d":function(t,a,e){"use strict";var i=e("4ae2"),r=e.n(i);r.a},"0c8f":function(t,a,e){},"14e2":function(t,a,e){"use strict";var i=e("3042"),r=e.n(i);r.a},"2ee7":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("Layout",[e("Sider",{attrs:{"hide-trigger":"",width:"250"}},[e("Form",{staticClass:"sider_form",attrs:{"label-position":"top"}},[e("FormItem",{attrs:{label:"项目名称"}},[e("Select",{staticClass:"search-col",attrs:{placeholder:"全部"},on:{"on-change":t.comChange},model:{value:t.alarmParams.companyId,callback:function(a){t.$set(t.alarmParams,"companyId",a)},expression:"alarmParams.companyId"}},[1!=t.companyList.length?e("Option",{attrs:{value:0}},[t._v("全部")]):t._e(),t._l(t.companyList,function(a){return e("Option",{key:a.Id,attrs:{value:a.Id}},[t._v(t._s(a.name))])})],2)],1),e("FormItem",{staticClass:"status_search",attrs:{label:"告警状态"}},[e("RadioGroup",{attrs:{type:"button"},on:{"on-change":t.alarmStateChange},model:{value:t.alarmParams.alertState,callback:function(a){t.$set(t.alarmParams,"alertState",a)},expression:"alarmParams.alertState"}},[e("Radio",{attrs:{label:0}},[t._v("全部")]),e("Radio",{attrs:{label:1}},[t._v("已解除")]),e("Radio",{attrs:{label:2}},[t._v("未解除")])],1)],1),e("FormItem",{attrs:{label:"地址"}},[e("Input",{staticClass:"search-input",attrs:{clearable:"",placeholder:"输入关键字搜索"},on:{"on-change":t.handleClear},model:{value:t.alarmParams.addkeys,callback:function(a){t.$set(t.alarmParams,"addkeys",a)},expression:"alarmParams.addkeys"}})],1),e("FormItem",{staticClass:"data_search",attrs:{label:"日期范围"}},[e("DatePicker",{attrs:{type:"daterange","split-panels":"",placeholder:"选择日期"},model:{value:t.alarmParams.dataPicker,callback:function(a){t.$set(t.alarmParams,"dataPicker",a)},expression:"alarmParams.dataPicker"}})],1),e("FormItem",{staticClass:"form_search"},[e("Button",{staticClass:"search-btn",attrs:{size:"large",type:"warning"},on:{click:t.handleSearch}},[e("Icon",{attrs:{type:"search"}}),t._v("查询")],1)],1),e("FormItem",{staticClass:"form_search"},[e("Button",{attrs:{size:"large",type:"info"},on:{click:t.handleReset}},[t._v("重置")])],1),e("FormItem",{staticClass:"export_wrap"},[e("form",{attrs:{id:"upload",action:t.url+"exportAlertTrace",method:"post"}},[e("input",{attrs:{type:"text",hidden:"",name:"token"},domProps:{value:t.token}}),e("input",{attrs:{type:"text",hidden:"",name:"addkeys"},domProps:{value:t.alarmParams.addkeys}}),e("input",{attrs:{type:"text",hidden:"",name:"alertState"},domProps:{value:t.alarmParams.alertState}}),e("input",{attrs:{type:"text",hidden:"",name:"companyId"},domProps:{value:t.alarmParams.companyId}}),e("input",{attrs:{type:"text",hidden:"",name:"dataPicker"},domProps:{value:t.alarmParams.dataPicker}}),e("Button",{staticClass:"exportBtn",attrs:{type:"primary","html-type":"submit",size:"large"}},[e("Icon",{attrs:{type:"ios-download-outline"}}),t._v("导出到Excel")],1)],1)])],1)],1),e("Content",[e("Table",{ref:"table",attrs:{columns:t.columns,data:t.tableData,loading:t.loading,height:t.tableHeight},scopedSlots:t._u([{key:"action",fn:function(a){var i=a.row;a.index;return[e("Button",{attrs:{type:"info",size:"small"},on:{click:function(a){return t.show(i)}}},[t._v("告警详情")])]}}])},[e("Page",{attrs:{slot:"footer","class-name":"totalfr",current:t.alarmParams.pageNum,"page-size":t.alarmParams.limit,total:t.dataTotal,"show-total":"",size:"small"},on:{"on-change":t.changePage},slot:"footer"})],1)],1),e("modal",{attrs:{modalShow:t.modalShow,deviceId:t.modalDeviceId},on:{hideModal:function(a){t.modalShow=!1}}})],1)},r=[],n=(e("d4d5"),e("e20c")),o=e("c276"),s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("Modal",{attrs:{title:"告警详情","footer-hide":!0,styles:{top:"20px",width:"90%"}},on:{"on-cancel":t.cancel},model:{value:t.show,callback:function(a){t.show=a},expression:"show"}},[e("Table",{attrs:{"highlight-row":!0,data:t.data1,columns:t.columns,height:t.windowH/2-50},on:{"on-row-click":t.setData2}},[e("Page",{attrs:{slot:"footer",current:t.pageNum,"class-name":"totalfr","page-size":t.tabal1Params.limit,total:t.data1Total,size:"small","show-total":""},on:{"on-change":t.table1changePage},slot:"footer"})],1),e("Table",{attrs:{data:t.data2,columns:t.columns2,height:t.windowH/2-80}})],1)},l=[],c=(e("f763"),e("591a")),d={props:{modalShow:{type:Boolean,default:!1},deviceId:[String]},data:function(){var t=this;return{pageNum:1,tabal1Params:{limit:7,offset:0,device_id:0},data1Total:0,data1:[],data:[],columns:[{title:"事件ID",key:"Id",minWidth:70},{title:"发生时间",key:"sendtime",minWidth:160,render:function(t,a){var e=Object(o["c"])(a.row.sendtime);return t("span",e)}},{title:"事件类别",key:"alert_type",minWidth:120,render:function(t,a){var e="";switch(a.row.alert_type){case"20":e="阀门打开";break;case"30":e="撞倒";break;case"60":e="水压异常";break;case"70":e="失联";break;default:break}return t("span",e)}},{title:"值",key:"cola",minWidth:70},{title:"通知方式",key:"",minWidth:70,render:function(a,e){var i="";return null!=t.data[e.index].notify&&(i="短信"),a("span",i)}},{title:"备注",key:"descrip",minWidth:70}],data2:[],columns2:[{title:"主事件ID",key:"alert_id",minWidth:70},{title:"电话号码",key:"phone",minWidth:80},{title:"姓名",key:"userName",minWidth:70},{title:"通知方式",key:"type",minWidth:70,render:function(t,a){return 1===a.row.type?t("span","短信"):2===a.row.type?t("span","微信"):void 0}},{title:"通知情况",key:"",minWidth:70,render:function(t,a){return 1===a.row.state?t("span","发送成功"):0===a.row.state?0===a.row.receivetime?t("span","发送中"):t("span","发送失败"):void 0}},{title:"开始时间",key:"sendtime",minWidth:120,render:function(t,a){var e=Object(o["c"])(a.row.sendtime);return t("span",e)}},{title:"结束时间",key:"receivetime",minWidth:120,render:function(t,a){if(0!==a.row.receivetime){var e=Object(o["c"])(a.row.receivetime);return t("span",e)}return t("span","")}}]}},watch:{deviceId:function(t){"0"!==t&&(this.tabal1Params.device_id=t,this.resetData(),this.initDeviceAlertDetail())}},computed:{show:{get:function(){return this.modalShow},set:function(){}},windowH:function(){return this.$store.state.user.windowH}},methods:Object(n["a"])({},Object(c["b"])(["getDeviceAlertDetail"]),{cancel:function(){this.$emit("hideModal",!0)},table1changePage:function(t){this.pageNum=t,this.tabal1Params.offset=(t-1)*this.tabal1Params.limit,this.initDeviceAlertDetail()},initDeviceAlertDetail:function(){var t=this;this.getDeviceAlertDetail(this.tabal1Params).then(function(a){t.data1=[],0!=a.data.length&&(t.data=a.data,t.data.forEach(function(a,e){t.data1.push(a.alert)}),t.data1[0]["_highlight"]=!0,t.data1Total=a.total,t.data2=null!==a.data[0].notify?a.data[0].notify:[])})},setData2:function(t,a){this.data2=null!==this.data[a].notify?this.data[a].notify:[]},resetData:function(){this.pageNum=1,this.tabal1Params.offset=0}})},m=d,u=(e("078d"),e("17cc")),h=Object(u["a"])(m,s,l,!1,null,null,null),p=h.exports,f={components:{modal:p},data:function(){return{alarmParams:{companyId:0,alertState:0,addkeys:"",dataPicker:["",""],pageNum:1,limit:20,offset:0},modalDeviceId:"0",modalShow:!1,tableData:[],dataTotal:0,loading:!0,columns:[{title:"项目名称",key:"companyName",minWidth:100},{title:"发生时间",minWidth:150,key:"sendtime",render:function(t,a){var e=Object(o["c"])(a.row.sendtime);return t("div",e)}},{title:"事件类别",key:"alert_type",minWidth:100,render:function(t,a){var e="";switch(a.row.alert_type){case"60":e="水压异常";break;case"20":e="阀门打开";break;case"30":e="撞倒";break;case"70":e="失联";break;default:e="设备异常";break}return 0===a.row.restoretime&&"70"!==a.row.alert_type?t("span",{style:{backgroundColor:"#E97C67",color:"#F4EAE0",display:"inlineBlock",padding:"3px"}},e):0===a.row.restoretime&&"70"===a.row.alert_type?t("span",{style:{backgroundColor:"#F0C866",color:"#222222",display:"inlineBlock",padding:"3px"}},e):t("div",e)}},{title:"告警状态",key:"alertState",minWidth:90,render:function(t,a){var e="";return e=0!==a.row.restoretime&&""!==a.row.restoretime?"已解除":"未解除",t("div",{props:{}},e)}},{title:"通知情况",minWidth:100,key:"notifyStatus",render:function(t,a){var e="";return e=1===a.row.notifyStatus?"通知已到达":"通知未到达",t("div",{props:{}},e)}},{title:"设备号",minWidth:180,key:"device_id"},{title:"地址",minWidth:250,key:"address"},{title:"操作",slot:"action",width:120,align:"center"}]}},computed:Object(n["a"])({},Object(c["e"])({companyList:function(t){return t.user.companyList},token:function(t){return t.user.token},tableHeight:function(t){return t.user.windowH-60},comId:function(t){return t.user.comId},url:function(t){return t.user.baseUrl}})),created:function(){this.initPage()},methods:Object(n["a"])({},Object(c["b"])(["getCompanyList","getAlertHistory"]),{initPage:function(){0===this.companyList.length&&this.getCompanyList(),1!==this.comId&&(this.alarmParams.companyId=this.comId),this.getAlertData()},getAlertData:function(){var t=this,a=JSON.parse(JSON.stringify(this.alarmParams));if(a.offset=(Number(a.pageNum)-1)*Number(a.limit),""!==a.dataPicker[0]&&""!==a.dataPicker[1]){var e=new Date(a.dataPicker[0]);a.dataPicker[0]=String(e.getTime());var i=new Date(a.dataPicker[1]);a.dataPicker[1]=String(i.getTime())}this.getAlertHistory(a).then(function(a){null!=a.list?(t.tableData=a.list,t.dataTotal=a.total):(t.tableData=[],t.dataTotal=0),t.loading=!1})},changePage:function(t){this.loading=!0,this.alarmParams.pageNum=t,this.getAlertData()},exportData:function(t){1===t&&this.$refs.table.exportCsv({filename:"The original data"})},handleClear:function(t){console.log(t.target.value),""===t.target.value&&(this.loading=!0,this.getAlertData())},handleSearch:function(){this.loading=!0,this.getAlertData()},show:function(t){this.modalDeviceId=t.device_id,this.modalShow=!0},comChange:function(){this.loading=!0,this.getAlertData()},alarmStateChange:function(){this.loading=!0,this.getAlertData()},handleReset:function(){this.alarmParams.addkeys="",this.alarmParams.alertState=0,1!==this.comId?this.alarmParams.companyId=this.comId:this.alarmParams.companyId=0,this.alarmParams.dataPicker=["",""],this.alarmParams.pageNum=1,this.getAlertData()},submitForm:function(){return $("#upload").ajaxSubmit(function(t){console.log(t)}),!1}})},g=f,y=(e("94a0"),e("14e2"),Object(u["a"])(g,i,r,!1,null,"05526c36",null));a["default"]=y.exports},3042:function(t,a,e){},"4ae2":function(t,a,e){},"94a0":function(t,a,e){"use strict";var i=e("0c8f"),r=e.n(i);r.a}}]);