<template lang="jade">
div.layout-content-main
	Form(ref="form",:model="form",:rules="rules",:label-width="100")
		Row(:gutter="18")
			Col(span="10",offset="2")
				Form-item(label="单位名称",prop="companyName")
					Input(v-model="form.companyName",placeholder="请输入物业单位名称")					
				Form-item(label="所在区域",prop="location",data-toggle="distpicker")
					Row(:gutter="18")
						Col(span="6" style="padding-right:10px")
							Select(placeholder="请选择",v-model="query.province")
								Option(v-for="item in locations",:key="item.name",:value="item.name")|{{item.name}}
						Col(span="6" style="padding-right:10px")
							Select(placeholder="请选择",v-model="query.city")
								Option(v-for="item in locations",:key="item.name",:value="item.name")|{{item.name}}
						Col(span="6" style="padding-right:10px")
								Select(placeholder="请选择",v-model="query.district")
									Option(v-for="item in locations",:key="item.name",:value="item.name")|{{item.name}}
				Form-item(label="单位负责人",prop="nicname")
					Input(v-model="form.nicname",placeholder="请输入单位负责人")
				Form-item(label="负责人电话",prop="mobile")
					Input(v-model="form.mobile",placeholder="请输入负责人电话",:maxlength="11")
				Form-item(label="单位位置",prop="siteName")
					Input(v-model="form.siteName",type="textarea",:rows="5",placeholder="请填写单位位置")
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
		query: {
			location: null
		},
		locations: [],
		loading:false,
      form: {
        companyName: '',
		nicname:'',
        mobile: '',
		siteName:'',
		location:''
      },
      rules: {
        companyName: [{
            required: true,
						type: 'string',
            message: '请填写物业单位名称',
            trigger: 'blur'
          }
        ],
				nicname: [{
            required: false,
						type: 'string',
            message: '请填写单位负责人',
            trigger: 'blur'
          }
        ],
				mobile: [{
            required: false,
						type: 'string',
						pattern:/^1(3|4|5|7|8)\d{9}$/,
	          message: '请填写正确的号码',
            trigger: 'blur'
          }
        ],
				siteName: [{
            required: false,
						type: 'string',
            message: '请填写单位位置',
            trigger: 'blur'
          }
        ],
      },
    }
  },
  methods: {
    create(name) {
			this.loading = true
			this.$refs[name].validate(async (valid) => {
        if (valid) {
					let res = await this.$api.register(this.form)
		      // this.$store.dispatch('newKitchen', this.form).then(res => {
					this.loading = false
					if (res.code == 0) {
						this.$refs[name].resetFields();
						this.$Notice.success({
							title: '成功',
							desc: '成功添加维保单位！'
						})
					}else{
						this.loading = false
						this.$Notice.error({
							title: '错误',
							desc: '添加维保单位失败！'
						})
					}
					// })
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
