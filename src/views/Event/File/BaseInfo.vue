<template lang="jade">
div.layout-content-main
	Tabs()
		TabPane(label="基本信息",name="baseInfo")
		TabPane(label="单位信息",name="companyInfo")
		TabPane(label="附件备注",name="remark")
	div.form
		Row(:gutter="30")
			Col(span="16" style="padding-bottom:20px")
				Card()
					Row(:gutter="30")
						Col(span="12")
							p()|编号:
						Col(span="12")
							p()|名称:
					Row(:gutter="30" style="padding-top:20px")
						Col(span="12")
							p()|梯种:
						Col(span="12")
							p()|品牌:
					Row(:gutter="30" style="padding-top:20px")
						Col(span="12")
							p()|型号:
						Col(span="12")
							p()|注册代码:
			Col(span="7" )
				Card()
					img(src="../../../assets/ladder.jpg" width="100%")
			Col(span="16" class="h1" )				
				Card()
					p(slot="title")|生产
					Row(:gutter="30")
						Col(span="12")
							p()|出厂编号:
						Col(span="12")
							p()|出厂日期:
						Col(span="12")
							p(style="padding-top:20px")|生产批次:	
			Col(span="16"  class="h2")				
				Card()
					p(slot="title")|使用
					Row(:gutter="30")
						Col(span="12")
							p()|使用场所:
						Col(span="12")
							p()|使用单位:
					Row(:gutter="30")
						Col(span="12")
							p(style="padding-top:20px")|楼号:
						Col(span="12")
							p(style="padding-top:20px")|梯号:
					Row(:gutter="30")
						Col(span="12")
							p(style="padding-top:20px")|安装日期:
						Col(span="12")
							p(style="padding-top:20px")|地址:
			Col(span="16"  style="padding-top:85px")				
				Card()
					p(slot="title")|维保
					Row(:gutter="30")
						Col(span="12")
							p()|维保人员:
						Col(span="12")
							p()|维保周期(天):
					p(style="padding-top:30px")|维保类型:	
			Col(span="16"  class="h2")				
				Card()
					p(slot="title")|系统
					Row(:gutter="30")
						Col(span="12")
							p()|入网状态:
						Col(span="12")
							p()|使用单位:
					Row(:gutter="30")
						Col(span="12")
							p(style="padding-top:20px")|楼号:
						Col(span="12")
							p(style="padding-top:20px")|梯号:
					Row(:gutter="30")
						Col(span="12")
							p(style="padding-top:20px")|安装日期:
						Col(span="12")
							p(style="padding-top:20px")|地址:

</template>

<script>
export default {
	data() {
		return {
		}
	}
}
</script>

<style lang="css">
	.h1{
		position: absolute;
		padding-top: 13%;
	}
	.h2{
		position: absolute;
		padding-top: 27%;
	}
</style>
