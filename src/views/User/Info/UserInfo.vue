<template lang="jade">
div.layout-content-main
	Tabs(value="name1",:animated="false",@on-click="Onchange")
		TabPane(label="基本信息",name="userInfo")		
		TabPane(label="我的关注",name="followList")
		TabPane(label="我的维修",name="maintainList")
		TabPane(label="我的保养",name="upkeepList")				
		TabPane(label="我的评估",name="assessList")
</template>

<script>
export default {
	methods:{
		Onchange: function(val) {
			this.$router.push({
				name: val,
			})
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
