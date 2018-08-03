<template lang="jade">
div.layout-content-main
	Form(ref="form",:model="form",:rules="rules",:label-width="90")
		Row(:gutter="16")
			Col(span="10",offset="2")
				Form-item(label="门店名称",prop="name")
					Input(v-model="form.name",placeholder="请输入")
				Form-item(label="门店负责人",prop="contactor")
					Input(v-model="form.contactor",placeholder="请输入")
				Form-item(label="门店电话",prop="phone")
					Input(v-model="form.phone",placeholder="请输入",:maxlength="11")
				Form-item(label="门店位置",prop="address")
					Input(v-model="form.address",type="textarea",:rows="5",placeholder="请填写门店位置")
		Row.mb-20
			Col(span="14",offset="2")
				Form-item.tc
					Button.mr-10(icon="close",@click="reset('form')")|取消
					Button(type="success",icon="plus",@click="create('form')",:loading="loading")|创建
</template>

<script>
export default {
  data() {
    return {
			loading:false,
      form: {
        name: '',
				contactor:'',
        phone: '',
				address:''
      },
      rules: {
        name: [{
            required: true,
						type: 'string',
            message: '请填写门店名',
            trigger: 'blur'
          }
        ],
				contactor: [{
            required: false,
						type: 'string',
            message: '请填写门店负责人',
            trigger: 'blur'
          }
        ],
				phone: [{
            required: false,
						type: 'string',
						pattern:/^1(3|4|5|7|8)\d{9}$/,
	          message: '请填写正确的号码',
            trigger: 'blur'
          }
        ],
				address: [{
            required: false,
						type: 'string',
            message: '请填写门店位置',
            trigger: 'blur'
          }
        ],
      },
    }
  },
  methods: {
    create(name) {
			this.loading = true
			this.$refs[name].validate((valid) => {
        if (valid) {
		      this.$store.dispatch('newKitchen', this.form).then(res => {
						this.loading = false
		        if (res.code == 0) {
		          this.$refs[name].resetFields();
		          this.$Notice.success({
		            title: '成功',
		            desc: '成功添加门店！'
		          })
		        }else{
							this.loading = false
							this.$Notice.error({
								title: '错误',
								desc: '添加门店失败！'
							})
						}
					})
				}else{
					this.loading = false
					this.$Notice.error({
						title: '错误',
						desc: '请检查表单是否完整！'
					})
				}
			})
    },
    reset(name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.material-combination {
    position: relative;
}
.cover {
    filter: blur(2px);
}
.material-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
