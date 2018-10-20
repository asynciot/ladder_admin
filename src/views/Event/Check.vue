<template lang="jade">
div.layout-content-main
	Tabs()
		TabPane(:label="label1",name="历史记录")			
		TabPane(:label="label2",name="打印工单")
		TabPane(:label="label3",name="检验报告")

</template>

<script>
export default {
	data() {
		return {
			label1: (h) => {
				return h('div', [
					h('span', '历史记录'),
					h('Badge', {
						props: {
						}
					})
				])
			},
			label2: (h) => {
				return h('div', [
					h('span', '打印工单'),
					h('Badge', {
						props: {
						}
					})
				])
			},
			label3: (h) => {
				return h('div', [
					h('span', '检验报告'),
					h('Badge', {
						props: {
						}
					})
				])
			},
		}
	}
}
</script>

<style lang="css">
</style>
