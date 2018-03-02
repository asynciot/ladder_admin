<template lang="html">
	<section class="content">
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">角色信息</h3>
        </div>
        <!-- /.box-header -->
        <!-- form start -->
        <form class="form-horizontal">
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">角色名称</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="text" v-model="form.name" class="form-control" id="" placeholder="请输入角色名称">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">角色描述</label>

                    <div class=" col-sm-8 col-md-6">
                        <textarea  v-model="form.description" class="form-control" rows="3" placeholder="请输入"></textarea>
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
	methods: {
		async submit(){
			let res = await this.$api.role(this.form)
		}
	}
}
</script>

<style lang="css">
</style>
