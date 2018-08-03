<template lang="jade">
div.layout-content-main
	div.form
		Form(ref='form',:model="query",label-position="left",:label-width="80")
			Row(:gutter="16")
				Col(span="6")
					Form-item(label="维保单位：")
						Input(v-model="query.companyName",placeholder="请输入维保单位名")
				Col(span="6")
					Form-item(label="手机号码：")
						Input(v-model="query.mobile",placeholder="请输入手机号码")
				Col(span="6")
					Button.mr-10(type="primary",icon="search",:loading="loading",@click="options.page=1,getList()")|搜索
					router-link.mr-10(:to="{ name: 'maintainCompanyNew'}")
						Button(type="success",icon="plus",:loading="loading")|添加维保单位
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
				nicname: ''
			},
			column: [
				{
					title: '维保单位',
					key: 'companyName',
				},
// 				{
// 					title: '人员账号',
// 					key: 'username',
// 				},
				{
					title: '负责人',
					key: 'nicname',
				},
				{
					title: '联系方式',
					key: 'mobile',
				},
// 				{
// 					title: '维保班组',
// 					key: 'groupName',
// 				},
// 				{
// 					title: '维保站点',
// 					key: 'siteName',
// 				},
				{
					title: '操作',
					key: 'companyName',
					width: 180,
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
									}
								}
							}, '删除')
						]);
					}
				}
			],
			list: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		async getList() {
			this.loading = false
		}
	}
}
</script>

<style lang="css">
</style>
