<template lang="html">
	<section class="content">
    <div class="box">
        <!-- form start -->
        <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
            <div class="box-header with-border">
                <h4 class="box-title">维保人员信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">保养项名称</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="name" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.name') }" v-model="form.name" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">保养项内容</label>

                    <div class=" col-sm-8 col-md-6">
                        <textarea name="content" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.content') }" v-model="form.content" placeholder="请输入" rows="4"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">保养项要求</label>
                    <div class=" col-sm-8 col-md-6">
                        <textarea name="requirement" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.requirement') }" v-model="form.requirement" placeholder="请输入" rows="4"></textarea>
                    </div>
                </div>
                <div :class="{'form-group': true, 'is-error': errors.has('form.area') }">
                    <label for="" class="col-sm-2 control-label">保养区域</label>

                    <div class=" col-sm-8 col-md-6">
                        <div class="checkbox">
                            <label class="ml10">
                                <input type="radio" :value="0" name="area" v-validate="'required'" v-model="form.area"> 轿顶
                            </label>
                            <label class="ml10">
                                <input type="radio" :value="1" name="area" v-model="form.area"> 机房
                            </label>
                            <label class="ml10">
                                <input type="radio" :value="2" name="area" v-model="form.area"> 底坑
                            </label>
                            <label class="ml10">
                                <input type="radio" :value="3" name="area" v-model="form.area"> 扶梯
                            </label>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                <div class="col-sm-offset-2">
                    <button type="submit" class="btn btn-success">提交</button>
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
			form:{
				name:'',
				content:'',
				requirement:'',
				area:'',
			},
		}
	},
	created(){
		if(this.$route.params.id){
			this.getData()
		}
	},
	methods:{
		async getData(){
			let res = await this.$api.item({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
		},
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
				console.log(result);
        if (result) {
					let res = null
					if(this.$route.params.id){
						res = await this.$api.updateItem(this.form)
					}else {
						res = await this.$api.addItem(this.form)
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
