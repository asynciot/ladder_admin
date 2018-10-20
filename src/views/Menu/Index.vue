<template lang="jade">
div.layout-content-main
	div.form
		Row(:gutter="30" style="padding-bottom:5%")
			Col(span="12")
				Card()
					div(class="box-header with-border" align="center")今日新增故障电梯
						Table(:stripe="true",:columns="column",:data="list",stripe)
			Col(span="12")
				Card()
					div(class="box-header" align="center" )|故障中电梯数量：{{info.count}}
						Table(:stripe="true",:columns="column",:data="list",stripe)
		Row(:gutter="30" style="padding-bottom:5%")
			Col(span="12")
				Card()
					div(class="box-header with-border" align="center")今日维修电梯数量：{{info.count}}
						Table(:stripe="true",:columns="column",:data="list",stripe)
			Col(span="12")
				Card()
					div(class="box-header" align="center" )|历史维修电梯总数：{{info.count}}
						Table(:stripe="true",:columns="column",:data="list",stripe)
		Row(:gutter="30" style="padding-bottom:5%")
			Col(span="12")
				Card()
					div(class="box-header with-border" align="center")过期维保电梯
						Table(:stripe="true",:columns="column",:data="list",stripe)
			Col(span="12")
				Card()
					div(class="box-header" align="center" )|维保即将到期电梯
						Table(:stripe="true",:columns="column",:data="list",stripe)
		Row(:gutter="30" style="padding-bottom:5%")
			Col(span="12")
				Card()
					div(class="box-header with-border" align="center")过期未检电梯
						Table(:stripe="true",:columns="column",:data="list",stripe)
			Col(span="12")
				Card()
					div(class="box-header" align="center" )|即将检验电梯
						Table(:stripe="true",:columns="column",:data="list",stripe)
</template>

<script>
export default{	
	data(){
		return{
			info:{
				count: 100,
			},
			column:[{
				title: '故障问题',
				name:'',
			},{
				title: '安装地址',
				name:'',
			},{
				title: '维修单位',
				name:'',
			}],
			list: [],
			options: {
				name:'',
				type: 1,
				page: 1,
				num: 3,
				total: 0
			}
			
		}
	},
	methods:{
		getlistnum(){
			info.count = this.count
			return count
		},
	}
}
	
</script>

<style lang="scss" scoped>

	.box-header{
		font-size: 20px;
	}
</style>