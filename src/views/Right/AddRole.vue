<template lang="html">
	<section class="content">
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">角色信息</h3>
        </div>
        <!-- /.box-header -->
        <!-- form start -->
        <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">角色名称</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="name" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.name') }" v-model="form.name" class="form-control"  placeholder="请输入角色名称">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">角色描述</label>

                    <div class=" col-sm-8 col-md-6">
                        <textarea name="description" :class="{'form-control': true, 'is-error': errors.has('form.description') }" v-model="form.description" class="form-control" rows="3" placeholder="请输入"></textarea>
                    </div>
                </div>

            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                <div class="col-sm-offset-2">
                    <button type="button" @click="submit()" class="btn btn-success">提交</button>
                </div>
            </div>
            <!-- /.box-footer -->
        </form>
    </div>
	</section>
</template>

<script>
export default {
	data(){
		return {

			form: {
				name: '',
				description: ''
			}
		}
	},
	created(){
		if(this.$route.params.id){
			this.getData()
		}
	},
	methods:{
		async getData(){
			let res = await this.$api.role({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
		},
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
		        if (result) {
		  			let res = null
					if(this.$route.params.id){
						res = await this.$api.updateRole(this.form)
					}else {
						res = await this.$api.addRole(this.form)
					}
					if(res.data.code == 0){
						this.$notify({
							group: 'ok',
							title: '提示',
							text: '操作成功'
						});
						this.$router.back()
					}
		        }
	      	});
		}
	}
}
</script>

<style lang="css">
</style>
