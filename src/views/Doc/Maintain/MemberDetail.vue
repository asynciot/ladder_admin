<template lang="jade">
div.layout-content-main
	Form(ref="form",:model="form",:rules="rules",:label-width="90")
		Row(:gutter="16")
			Col(span="10",offset="1")
				Form-item(label="用户名",prop="username")
					p(v-if="")
					Input(v-model="form.username",placeholder="请输入用户名")
				Form-item(label="用户姓名",prop="name")
					Input(v-model="form.name",placeholder="请填写用户姓名")
				Form-item(label="性别",prop="sex")
					Radio-group(v-model="form.sex")
						Radio(label="0")|男
						Radio(label="1")|女
				Form-item(label="联系人电话",prop="mobile")
					Input(v-model="form.mobile",placeholder="请输入联系方式",:maxlength="11")
				Form-item(label="密码",prop="password")
					Input(type="password",v-model="form.password",placeholder="请输入密码")
				Form-item(label="重复密码",prop="password")
					Input(type="password",v-model="form.confirm",placeholder="请重复输入")
				Form-item(label="维保群组",prop="groupId")
					<!-- Cascader(:data="groupId",:load-data="loadGroup") -->
					Select(placeholder="请选择",v-model="form.groupId" )
						Option(v-for="item in groupList",:key="item.id",:value="item.id" v-text="item.name")|{{item.value}}
				Form-item.tc
					Button.mr-10(icon="close",@click="reset('form')")|取消
					Button(type="success",icon="plus",@click="create('form')",:loading="loading")|创建
</template>

<script>
export default {
	data() {
		const validateOldPassCheck = (rule, value, callback) => {
			if(value == '') {
				callback(new Error('请再次输入密码'));
			} else if(value !== this.form.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			loading: false,
			groupList:[],
			groupName: [{
				value: '1',
				label: '默认单位',
				children: [],
				loading: false
			}],
			form: {
				username: '',
				name: '',
				sex:'',
				mobile: '',
				password:'',
				confirm:'',
				companyId: -1,
				groupId: '',
				groupName:'',
			},
			rules: {
				username: [{
						required: true,
						type: 'string',
						message: '请填写用户名',
						trigger: 'blur'
					},
					{
						min: 6,
						message: '用户名至少6位',
						trigger: 'blur'
					},
				],
				mobile: [{
					required: false,
					type: 'string',
					pattern: /^1(3|4|5|7|8)\d{9}$/,
					message: '请填写正确的手机号码',
					trigger: 'blur'
				}],
				password: [{
					required: true,
					message: '密码不能为空',
					trigger: 'blur'
				}, {
					min: 5,
					message: '密码不能少于6个字符',
					trigger: 'blur'
				}],
				confirm: [{
					validator: validateOldPassCheck,
					required: true,
					trigger: 'blur'
				}],
				groupId: [{
					required: true,
					type: 'string',
					message: '请选择维保群组',
					trigger: 'blur'
				}],
			},
		}
	},
	created(){
		if(this.$route.params.id){
			this.getData()
		}
		this.getOption()
	},
	methods: {
// 		async loadGroup(item, callback) {
// 			item.loading = true
// 			setTimeout(() => {
// 				item.children = [{
// 					value: '2',
// 					label: '默认群组'
// 				}]
// 				item.loading = false
// 				callback();
// 			}, 1000)
// 		},
		async getData() {
			let res = await this.$api.people({
				id: this.$route.params.id
			})
			this.form = res.data.data.list[0]
		},
		getOption() {
			this.$api.team({
				page: 1,
				num: 100
			}).then(res => {
				this.groupList = res.data.data.list
			})
		},
		create(name) {
			this.loading = true
			this.$refs[name].validate(async(valid) => {
				if(valid) {
					let res = null
					if(this.$route.params.id) {
						res = await this.$api.update(this.form)
					} else {
						res = await this.$api.register(this.form)
					}
					this.loading = false
					if(res.data.code == 0) {
						this.form.id = res.data.id;
						res = await this.$api.update(this.form)
						if(res.data.code == 0){
							res = await this.$api.addPeople({
								userId: this.form.id,
								groupId: this.form.groupId,
							})
							if(res.data.code == 0){
								this.$refs[name].resetFields();
								this.$Notice.success({
									title: '成功',
									desc: '成功添加维保人员！',
									onClose: () => {
										this.$router.back()
									}
								})
							}else {
								this.loading = false
								this.$Notice.error({
									title: '错误',
									desc: '添加维保人员失败！'
								})
							}
						}	
					} 
				} else {
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
