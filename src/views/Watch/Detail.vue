<template lang="html">
	<section class="content">
		<ul class="nav nav-tabs">
			<li role="presentation" :class="$route.name==item.link?'active':''" v-for="item in nav">
				<router-link :to="{ name: item.link }">{{item.label}}</router-link>
			</li>
		</ul>
		<div class="box">
			<div class="box-body">
				<router-view />
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data:()=>({
		nav:[{
			link:'position',
			label:'门位置'
		},{
			link:'speed',
			label:'门速度'
		},{
			link:'current',
			label:'门电流'
		},{
			link:'params',
			label:'门参数'
		},]
	}),
	created(){
	},
}
</script>

<style lang="css" scoped>
.box {
	border-top:0;
}
</style>
