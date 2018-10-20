<template lang="jade">
div.layout-content-main
	site(:is="currentTab" keep-alive)		
</template>

<script>
import followlist from "./Info/FollowList"
import userinfo from "./Info/UserInfo"
import upkeeplist from "./Info/UpkeepList"
import maintainlist from "./Info/MaintainList"
import assesslist from "./Info/AssessList"
export default {
	data() {
		return {
			currentTab: 'userinfo'
		};	
	},
	components: { 
		userinfo,
		followlist,
		maintainlist,
		upkeeplist,
		assesslist,
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
