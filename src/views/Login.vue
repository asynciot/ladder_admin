<template lang="jade">
div.account
	h3.account-title|宁波申菱 管理系统
	Form.account-form(ref='form',:model="form",:rules="rules",:label-width="80")
		Form-item(prop="username")
			Input(type="text",v-model="form.username",placeholder="用户名")
				Icon(type="ios-person-outline",size="20",slot="prepend")
		Form-item(prop="password")
			Input(type="password",v-model="form.password",placeholder="密码",@keyup.enter="login('form')")
				Icon(type="ios-locked-outline",size="18",slot="prepend")
		Form-item
			Button(type="primary",long,@click="login('form')",:loading="loading")|登录
</template>

<script>
import {
  api,
	ladderApi,
	formatDate
} from '@/utils'
export default {
  data() {
    return {
			ladderApi: ladderApi,
      loading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
            required: true,
            message: '请填写用户名',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 5,
            message: '用户名长度不能小于6位',
            trigger: 'blur'
          }
        ],
        password: [{
            required: true,
            message: '请填写密码',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: '密码长度不能小于6位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async login(name) {
      this.loading = true;
      this.$refs[name].validate(async (valid) => {
        if (valid) {
					let res = await this.$http.post(`${this.ladderApi}/v1/accounts/login`, this.form)
          if (!res.data.code) {
            this.loading = false;
            this.$Message.success({
              content: '登录成功，正在跳转!',
              duration: 0.5,
              onClose: () => {
								this.$router.push({
									name: 'menu'
								})
              }
            })
          } else {
            this.loading = false;
            this.$Message.error('登录失败!');
          }
        } else {
          this.loading = false;
          this.$Message.error('请完善登录信息!');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.account {
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #333333;
    .account-title {
        color: #fff;
        font-size: 30px;
        line-height: 100px;
        height: 100px;
    }
    .account-form {
        display: block;
        width: 350px;
        margin-left: -80px;
    }
    .register-form {
        width: 270px;
        display: block;
    }
}
</style>
