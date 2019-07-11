(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e925c"],{"8bfb":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Modal",{attrs:{title:"添加人员","mask-closable":!1,"footer-hide":!0},on:{"on-visible-change":e.changeState},model:{value:e.showModal,callback:function(t){e.showModal=t},expression:"showModal"}},[a("Form",{ref:"modalForm",attrs:{model:e.modalForm,"label-width":80,rules:e.ruleValidate},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSubmit(t)}}},[a("FormItem",{attrs:{label:"名称",prop:"name"}},[a("Input",{attrs:{placeholder:"输入名称"},model:{value:e.modalForm.name,callback:function(t){e.$set(e.modalForm,"name",t)},expression:"modalForm.name"}})],1),a("FormItem",{attrs:{label:"密码",prop:"password"}},[a("Input",{attrs:{placeholder:"输入密码"},model:{value:e.modalForm.password,callback:function(t){e.$set(e.modalForm,"password",t)},expression:"modalForm.password"}})],1),a("FormItem",{attrs:{label:"电话号码",prop:"phone"}},[a("Input",{attrs:{placeholder:"输入电话号码"},model:{value:e.modalForm.phone,callback:function(t){e.$set(e.modalForm,"phone",t)},expression:"modalForm.phone"}})],1),a("FormItem",{attrs:{label:"公司名称",prop:"company_id"}},[a("Select",{model:{value:e.modalForm.company_id,callback:function(t){e.$set(e.modalForm,"company_id",t)},expression:"modalForm.company_id"}},e._l(e.companyList,function(t){return a("Option",{key:t.Id,attrs:{value:t.Id}},[e._v(e._s(t.name))])}),1)],1),a("FormItem",{attrs:{label:"权限",prop:"authority"}},[a("CheckboxGroup",{model:{value:e.modalForm.authority,callback:function(t){e.$set(e.modalForm,"authority",t)},expression:"modalForm.authority"}},e._l(e.authList,function(t){return a("Checkbox",{key:t.Id,attrs:{label:t.Id}},[e._v(e._s(t.name))])}),1)],1),a("FormItem",{attrs:{label:"是否禁用"}},[a("RadioGroup",{model:{value:e.modalForm.status,callback:function(t){e.$set(e.modalForm,"status",t)},expression:"modalForm.status"}},[a("Radio",{attrs:{label:-1}},[e._v("禁用")]),a("Radio",{attrs:{label:1}},[e._v("使用")])],1)],1),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:function(t){return e.handleSubmit("modalForm")}}},[e._v("提交")]),a("Button",{staticStyle:{"margin-left":"8px"},on:{click:e.handlerClose}},[e._v("取消")])],1)],1)],1)},r=[],l={name:"addModal",props:{modal:Boolean},data:function(){var e=function(e,t,a){/^[0-9a-zA-Z]+$/.test(t)||a(new Error("你输入的字符不是数字或者字母")),a()},t=function(e,t,a){/^1[345678]\d{9}$/.test(t)||a(new Error("手机号码有误，请重填")),a()};return{modalForm:{name:"",password:"",phone:"",company_id:"",authority:[],status:1},ruleValidate:{name:[{required:!0,message:"名称不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"},{validator:e,trigger:"blur"},{min:6,message:"密码不能少于6个字符",trigger:"blur"}],phone:[{required:!0,message:"电话号码不能为空",trigger:"blur"},{validator:t,trigger:"blur"}],company_id:[{required:!0,type:"number",message:"请选择公司",trigger:"change"}],authority:[{required:!0,type:"array",message:"请选择权限",trigger:"change"}]}}},watch:{modal:function(e){e||this.$refs.modalForm.resetFields()}},computed:{companyList:function(){return this.$store.state.user.companyList},authList:function(){return this.$store.state.user.authList},showModal:{get:function(){return this.modal},set:function(){}}},methods:{changeState:function(e){this.$emit("addState",e)},handleSubmit:function(){var e=this;this.$refs.modalForm.validate(function(t){t?e.$emit("addSubmit",e.modalForm):e.$Message.error("Fail!")})},handlerClose:function(){this.showModal=!1,this.$emit("addState",!1)}}},n=l,s=a("17cc"),m=Object(s["a"])(n,o,r,!1,null,null,null);t["default"]=m.exports}}]);