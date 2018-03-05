<template lang="html">
	<section class="content">
	    <div class="box">
	        <div class="box-header with-border">
	            <h3 class="box-title">用户对应角色信息</h3>
	        </div>
	        <!-- /.box-header -->
	        <!-- form start -->
	        <form class="form-horizontal">
	            <div class="box-body">
	                <div class="form-group">
	                    <label for="" class="col-sm-2 control-label">用户名</label>
	                    <div class=" col-sm-8 col-md-6">
	                        <input type="text" v-model="form.nicname" class="form-control" id="" placeholder="请输入" readonly>
	                    </div>
	                </div>

	                <div class="form-group">
	                    <label for="" class="col-sm-2 control-label">角色名称</label>
	                    <div class=" col-sm-8 col-md-6">
	                        <div class="radio">
	                            <label class="ml10" v-for="item in list">
	                                <input type="radio" v-model="form.roleType" :value="item.id"> {{item.name}}
	                            </label>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <!-- /.box-body -->
	            <div class="box-footer">
	                <div class="col-sm-offset-2">
	                    <button type="button" @click="submit" class="btn btn-success">提交</button>
	                </div>
	            </div>
	            <!-- /.box-footer -->
	        </form>
	    </div>
	</section>
</template>

<script>
export default {
	data:()=>({
		form:{
			nicname:''
		},
		authorityId:0,
		list:[]
	}),
	created(){
		this.getData()
		this.getList()
	},
	methods:{
		async getData() {
      let res = await this.$api.user({
        id: this.$route.params.id
      })
			this.form = res.data.data.list[0]
		},
		async getList() {
      let res = await this.$api.role({
				page:1,
				num:100
      })
			this.list = res.data.data.list
		},
		async submit(){
      let res = await this.$api.updateUser(this.form)
			if(res.data.code == 0) {
				this.$notify({
					group: 'ok',
					title: '提示',
					text: '操作成功'
				});
				this.$router.back()
			}
		}
	}
}
</script>

<style lang="css">
</style>
