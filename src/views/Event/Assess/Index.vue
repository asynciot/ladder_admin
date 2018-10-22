<template lang="jade">
div.layout-content-main
	site(:is="currentTab" keep-alive)		
</template>

<script>
	import assessReport from './Report'
	import assessPrint from './Print'
	import assessHistory from './History'
export default {
	data() {
		return {
			currentTab: 'assessHistory'
		};	
	},
	components: { 
		assessHistory,
		assessPrint,
		assessReport,
 },
 watch: {
		'currentTab':function(val){
			this.currentTab = currentTab
		}
 },
	methods: {
		toggleTab: function(TabPane) {
			this.currentTab = this.TabPane;
		}
	}
}
</script>

<style lang="css">
</style>
