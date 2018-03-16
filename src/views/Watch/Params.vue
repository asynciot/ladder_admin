<template lang="html">
	<section class="row content">
		<div class="col-xs-6 col-sm-8 col-md-7 col-lg-7" style="max-width:800px;">
			<v-collapse-group class="params-collapse" :onlyOneActive="true">
		    <v-collapse-wrapper v-for="data in params" :key="data.label" class="params-collapse-item">
					<div class="params-header" v-collapse-toggle>
			        {{data.label}}.0 菜单
			    </div>
			    <div class="params-content" v-collapse-content>
						<ul class="list-group">
							<li class="list-group-item" v-for="item in data.children">
								{{item.label}}
								<i>{{item.value}}</i>
							</li>
						</ul>
			    </div>
				</v-collapse-wrapper>
			</v-collapse-group>
		</div>
	</section>
</template>

<script>
import base64url from 'base64url';
import { menu } from '@/views/params.js'
const parseMenu = (buffer) => {
  const arr = [];
  const hex = buffer2hex(buffer);
  menu.forEach((item) => {
    item.children.forEach((prop) => {
      arr.push(prop);
    });
  });
  arr.forEach((item, i) => {
    if (i < 86) {
      item.value = parseInt((hex[i * 2] + hex[i * 2 + 1]), 16);
      item.value = (item.value / item.num).toFixed(`${item.num}`.length - 1);
    } else {
      item.value = parseInt(hex[i + 86], 16);
    }
  });
  return menu;
}
export default {
	data:()=>({
		params:menu,
	}),
	created(){
		this.getList()
	},
	methods:{
		async getList(){
			let res = await this.$api.menu(this.$route.params.id)
			if (res.data.code == 0) {
				const buffer = base64url.toBuffer(res.data.data);
				this.params = parseMenu(buffer)
			}
		}
	}
}
</script>

<style lang="css" scoped>
.params-collapse {
	border-radius: 4px;
	border: 1px solid #ddd;
}
.params-collapse-item {
	padding-left: 6px 10px;
	border-bottom: 1px solid #ddd;
}
.params-collapse .params-collapse-item:last-child {
	border-bottom: 0;
}
.v-collapse-content {
	overflow-y: scroll;
}
.params-header {
	padding: 8px;
	color: #2973b7;
	cursor: pointer;
	padding-left: 20px;
	background: #f7f7f7;
}
.list-group {
	margin: 16px;
}
.list-group-item {
	i {
		float: right;
		font-style: normal;
	}
}
</style>
