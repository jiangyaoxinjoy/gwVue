(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d228c91"],{db52:function(e,a,t){"use strict";t.r(a);var o=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("Table",{ref:"currentRowTable",attrs:{columns:e.columns,data:e.companyList,"highlight-row":"",height:e.tableHeight},scopedSlots:e._u([{key:"action",fn:function(a){var o=a.row;a.index;return 1==e.comId?[t("Button",{staticClass:"tBtn",attrs:{type:"error",size:"small"},on:{click:function(a){return e.handleCurrenRow(o)}}},[e._v("修改")])]:void 0}}],null,!0)},[t("template",{slot:"header"},[1==e.comId?t("Button",{staticClass:"tbHBtn",attrs:{type:"primary",icon:"md-add-circle"},on:{click:e.handleAddCompany}},[t("span",[e._v("添加公司")])]):e._e()],1)],2),t("Modal",{attrs:{title:"new"==e.modalState?"新增公司":"修改公司信息","footer-hide":!0,"mask-closable":!1},on:{"on-visible-change":e.changeState},model:{value:e.modal,callback:function(a){e.modal=a},expression:"modal"}},[t("Form",{ref:"modalForm",attrs:{model:e.modalForm,"label-width":80,rules:e.ruleValidate}},[t("FormItem",{attrs:{label:"公司名称",prop:"name"}},[t("Input",{attrs:{placeholder:"输入公司名称"},model:{value:e.modalForm.name,callback:function(a){e.$set(e.modalForm,"name",a)},expression:"modalForm.name"}})],1),t("FormItem",{attrs:{label:"公司地址",prop:"address"}},[t("Input",{attrs:{placeholder:"输入公司地址"},model:{value:e.modalForm.address,callback:function(a){e.$set(e.modalForm,"address",a)},expression:"modalForm.address"}})],1),t("FormItem",{attrs:{label:"负责人",prop:"manager"}},[t("Input",{attrs:{placeholder:"输入公司负责人"},model:{value:e.modalForm.manager,callback:function(a){e.$set(e.modalForm,"manager",a)},expression:"modalForm.manager"}})],1),t("FormItem",{attrs:{label:"联系电话",prop:"tel"}},[t("Input",{attrs:{placeholder:"输入公司联系电话"},model:{value:e.modalForm.tel,callback:function(a){e.$set(e.modalForm,"tel",a)},expression:"modalForm.tel"}})],1),t("FormItem",{attrs:{label:"邮箱",prop:"email"}},[t("Input",{attrs:{placeholder:"输入公司邮箱"},model:{value:e.modalForm.email,callback:function(a){e.$set(e.modalForm,"email",a)},expression:"modalForm.email"}})],1),t("FormItem",{attrs:{label:"最低阀值",prop:"value1"}},[t("Input",{attrs:{placeholder:"输入最低阀值"},model:{value:e.modalForm.value1,callback:function(a){e.$set(e.modalForm,"value1",a)},expression:"modalForm.value1"}})],1),t("FormItem",{attrs:{label:"最高阀值",prop:"value2"}},[t("Input",{attrs:{placeholder:"输入最高阀值"},model:{value:e.modalForm.value2,callback:function(a){e.$set(e.modalForm,"value2",a)},expression:"modalForm.value2"}})],1),t("FormItem",[t("Button",{attrs:{type:"primary"},on:{click:function(a){return e.handleSubmit("modalForm")}}},[e._v("提交")]),t("Button",{staticStyle:{"margin-left":"8px"},on:{click:function(a){return e.handleReset("modalForm")}}},[e._v("重置")])],1)],1)],1)],1)},r=[],l=(t("7364"),t("e20c")),n=t("591a"),m={data:function(){var e=this,a=function(e,a,t){""===a&&t(new Error("公司名称不能为空")),t()},t=function(e,a,t){""===a&&t(new Error("公司地址不能为空")),t()},o=function(e,a,t){""===a&&t(new Error("公司负责人不能为空")),t()},r=function(e,a,t){""===a?t(new Error("公司电话不能为空")):/^1[345678]\d{9}$/.test(a)||t(new Error("手机号码有误，请重填")),t()},l=function(e,a,t){""===a&&t(new Error("公司邮箱不能为空")),t()},n=function(a,t,o){""===t?o(new Error("阀值不能为空")):t>=e.modalForm.value2&&o(new Error("数值不能比最高阀值高")),o()},m=function(a,t,o){""===t?o(new Error("阀值不能为空")):t<=e.modalForm.value1&&o(new Error("数值不能比最低阀值低")),o()};return{modal:!1,pageSize:10,modalForm:{name:"",address:"",value1:"",value2:"",manager:"",tel:"",email:""},curId:"",modalState:"",ruleValidate:{name:[{validator:a,trigger:"blur"}],address:[{validator:t,trigger:"blur"}],value1:[{validator:n,trigger:"blur"}],value2:[{validator:m,trigger:"blur"}],manager:[{validator:o,trigger:"blur"}],tel:[{validator:r,trigger:"blur"}],email:[{validator:l,trigger:"blur"},{type:"email",message:"邮箱格式不正确",trigger:"blur"}]},columns:[{type:"index",width:60,align:"center"},{title:"公司名称",key:"name"},{title:"公司地址",key:"address"},{title:"水压阀值1",key:"value1"},{title:"水压阀值2",key:"value2"},{title:"操作",slot:"action",width:180,align:"center"}],selectCompany:""}},computed:Object(l["a"])({},Object(n["e"])({companyList:function(e){return e.user.companyList},tableHeight:function(e){return e.user.windowH-60},comId:function(e){return e.user.comId}})),created:function(){this.initPage()},methods:Object(l["a"])({},Object(n["b"])(["getCompanyList","addCom","editCom"]),{handleCurrenRow:function(e){this.modalState="add",this.modalForm.name=e.name,this.modalForm.address=e.address,this.modalForm.value1=e.value1,this.modalForm.value2=e.value2,this.modalForm.tel=e.tel,this.modalForm.email=e.email,this.modalForm.manager=e.manager,this.curId=e.Id,this.modal=!0},handleSubmit:function(e){var a=this;this.$refs[e].validate(function(e){if(e)if("new"===a.modalState)a.addCom(a.modalForm).then(function(e){0!==e.status?a.$Message.error(e.msg):(a.getCompanyList(),a.$Message.success("新增成功!"),a.modal=!1)});else if("add"===a.modalState){var t=JSON.parse(JSON.stringify(a.modalForm));t.id=a.curId,a.editCom(t).then(function(e){console.log(e),0!==e.status?a.$Message.error(e.msg):(a.getCompanyList(),a.$Message.success("修改成功!"),a.modal=!1)})}})},changeState:function(e){e||this.$refs.modalForm.resetFields()},handleReset:function(e){this.$refs.modalForm.resetFields()},handleAddCompany:function(){this.modalState="new",this.modal=!0},initPage:function(){0===this.companyList.length&&this.getCompanyList()}})},s=m,i=t("17cc"),d=Object(i["a"])(s,o,r,!1,null,"d14c0648",null);a["default"]=d.exports}}]);