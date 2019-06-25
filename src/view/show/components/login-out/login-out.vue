<template>
  <!-- <Button type="primary" @click="modal = true">Display dialog box</Button> -->
  <Modal
    v-model="showModal"
    title="修改密码"
    :mask-closable="false"
    :footer-hide="true"
    @on-visible-change="model_change"
  >
    <Form :model="formItem" ref="formItem" :rules="ruleCustom"  :label-width="80">
      <FormItem label="原始密码" prop="originPwd">
        <Input v-model="formItem.originPwd" type="password" v-show="false"></Input>
        <Input autocomplete="off" type="password" :maxlength="12" v-model="formItem.originPwd" placeholder="输入原始密码..."></Input>
      </FormItem>
      <FormItem label="新密码" prop="newPwd">
        <Input v-model="formItem.newPwd" type="password" v-show="false"></Input>
        <Input autocomplete="off" type="password" :maxlength="12" v-model="formItem.newPwd" placeholder="输入新密码..."></Input>
      </FormItem>
      <FormItem label="确认密码" prop="againPwd">
        <Input v-model="formItem.againPwd" type="password" v-show="false"></Input>
        <Input autocomplete="off" ref="againPwd"  type="password" :maxlength="12" v-model="formItem.againPwd" placeholder="再输入一遍新密码..."></Input>
      </FormItem>
      <FormItem>
        <Button  @click="close">取消</Button>
        <Button type="primary" style="margin-left: 8px" @click="handleSubmit('formItem')">提交</Button>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'))
      } else {
        // if (this.formCustom.passwdCheck !== '') {
        //   // 对第二个密码框单独验证
        //   this.$refs.formCustom.validateField('passwdCheck');
        // }
        callback()
      }
    }
    const validatenewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'))
      } else {
        // if (this.formCustom.againPwd !== '') {
        //   // 对第三个密码框单独验证
        //   this.$refs.formCustom.validateField('againPwd');
        // }
        callback()
      }
    }
    const validateagainPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'))
      } else if (value !== this.formItem.newPwd) {
        callback(new Error('The two input passwords do not match!'))
      } else {
        callback()
      }
    }
    return {
      formItem: {
        originPwd: '',
        newPwd: '',
        againPwd: ''
      },
      ruleCustom: {
        originPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPwd: [
          { validator: validatenewPwd, trigger: 'blur' }
        ],
        againPwd: [
          { validator: validateagainPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['changePsd']),
    model_change (val) {
      this.$emit('changeModalState', val)
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          var payload = JSON.parse(JSON.stringify(this.formItem))
          payload.userId = this.$store.state.user.userId
          this.changePsd(payload).then(res => {
            if (res.status === 0) {
              this.$router.push({
                name: 'login'
              })
              this.$Message.info('密码修改成功，请重新登录')
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    close () {
      this.$emit('changeModalState', false)
    }
  },
  computed: {
    showModal: {
      get () {
        return this.modal
      },
      set () {}
    }
  }
}
</script>
