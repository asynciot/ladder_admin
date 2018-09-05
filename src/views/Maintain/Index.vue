<template lang="jade">
div.layout-content-main
	div.form
		Form(ref='form',:model="query",label-position="left",:label-width="100")
			Row(:gutter="16")
				Col(span="6")
					Form-item(label="姓名：")
						Input(v-model="query.name",placeholder="请输入姓名")
				Col(span="6")
					Form-item(label="手机号码：")
						Input(v-model="query.mobile",placeholder="请输入手机号码")
				Col(span="6")
					Button.mr-10(type="primary",icon="search",:loading="loading",@click="options.page=1,search()")|搜索
					router-link(:to="{ name: 'maintainMemberNew'}")
						Button.mr-10(type="success",icon="plus",:loading="loading")|添加人员
	Table(:loading="loading",:stripe="true",:columns="column",:data="list",stripe)
</template>

<script>
export default {
	data() {
		return {
			loading: true,
			query: {
				username: '',
				mobile: '',
				name: ''
			},
			column: [
				{
					title: '人员账号',
					key: 'username',
				},
				{
					title: '人员姓名',
					key: 'name',
				},
				{
					title: '手机号码',
					key: 'mobile',
				},
				{
					title: '维保班组',
					key: 'groupName',
				},
				{
					title: '维保站点',
					key: 'siteName',
				},
				{
					title: '维保单位',
					key: 'companyName',
				},
				{
					title: '操作',
					key: 'companyName',
					width: 200,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										// this.$router.push({
										// 	name: 'infoMaterial',
										// 	params: {
										// 		id: params.row.id
										// 	}
										// })
									}
								}
							}, '查看'),
							h('Button', {
								props: {
									type: 'success',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										// this.$router.push({
										// 	name: 'editMaterial',
										// 	params: {
										// 		id: params.row.id
										// 	}
										// })
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								on: {
									click: () => {
										this.$Modal.confirm({
											title: '警告!',
											content: '<p>是否删除此项 ？</p>',
											onOk: () => {
												this.deleteRow(params)											
											},
											onCancel: () => {
											}
										})	
									}
								}
							}, '删除')
						]);
					}
				}
			],
			list: [],
			options: {
				name:'',
				page: 1,
				num: 15,
				total: 0
			}
		}
	},
	created() {
		this.getList()
	},
	methods: {
		async deleteRow(params) {		
				let res = await this.$api.removePeople({id:params.row.id})
				this.$emit('on-custom-comp');
				if (0 === res.data.code) {
					this.$Message.info('操作成功');
				}else {
					this.$Message.info('操作失败');
				}
		},
		pageChange(val) {
			this.options.page = val
			this.getList()
		},
		async getList() {
			this.loading = true
			let res = await this.$api.people(this.options)
			this.loading = false
			if (0 === res.data.code) {
				this.list = res.data.data.list
				this.options.total = res.data.data.totalNumber
			}
		},
		async search() {
			this.loading = true
			let res = await this.$api.people(this.query)
			this.loading = false
			if (0 === res.data.code) {
				this.list = res.data.data.list
				this.options.total = res.data.data.totalNumber
			}
		}		
	}
}
</script>

<style lang="css">
</style>
