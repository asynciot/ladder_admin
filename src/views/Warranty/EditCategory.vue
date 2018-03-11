<template lang="html">
	<section class="content">
    <div class="box">
        <form class="form-horizontal"  @submit.prevent="submit" data-vv-scope="form">
            <div class="box-header with-border">
                <h4 class="box-title">添加保养类型</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">保养类型名称</label>
                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="name" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.name') }" v-model="form.name" placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">保养周期</label>

                    <div class=" col-sm-8 col-md-6">
                        <input type="text" name="days" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.days') }" v-model="form.days" placeholder="请输入">
                    </div>
                    <div class="pl0 mt10 col-sm-1">
                        天
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">保养类型分类</label>
                    <div class=" col-sm-8 col-md-6">
											<select name="type" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.type') }" v-model="form.type" >
												<option v-for="item in type" :value="item.id" v-text="item.name"></option>
											</select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">保养项要求</label>
                    <div class=" col-sm-8 col-md-6">
                        <textarea name="comments" :class="{'form-control': true, 'is-error': errors.has('form.comments') }" v-model="form.comments" placeholder="请输入" rows="4"></textarea>
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
        <!-- /.box-body -->
    </div>
    <!-- /.box -->
</section>
</template>

<script>
export default {
	data(){
		return {
			form:{
				name:'',
				days:'',
				type:'',
				comments:'',
			},
			type:[{
				id:0,
				name:'半月保'
			},{
				id:1,
				name:'月保'
			},{
				id:2,
				name:'季度保'
			},{
				id:3,
				name:'年检'
			},],
			itemList:[]
		}
	},
	created(){
		if(this.$route.params.id){
			this.getData()
		}
		// this.getOption()
	},
	methods:{
		async getData(){
			let res = await this.$api.type({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
		},
		getOption(){
			this.$api.item({ page:1, num:100}).then(res=>{
				this.itemList = res.data.data.list
			})
		},
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
        if (result) {
					let res = null
					if(this.$route.params.id){
						res = await this.$api.updateType(this.form)
					}else {
						res = await this.$api.addType(this.form)
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
