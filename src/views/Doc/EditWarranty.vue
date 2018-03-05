<template lang="html">
	<section class="content">
    <div class="box">
        <!-- form start -->
        <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
            <div class="box-header with-border">
                <h4 class="box-title">电梯信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">电梯工号</label>
										<div class=" col-sm-8 col-md-6">
												<input type="text" name="ladderNumber" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.ladderNumber') }" v-model="form.ladderNumber"  placeholder="请输入" :disabled="$route.params.id">
										</div>
                </div>
								<div class="form-group">
                    <label for="" class="col-sm-2 control-label">具体位置别名</label>
										<div class=" col-sm-8 col-md-6">
												<input type="text" name="alias" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.alias') }" v-model="form.alias"  placeholder="请输入">
										</div>
                </div>
                <!-- <div class="form-group">
                    <label for="" class="col-sm-2 control-label">电梯使用状态</label>
                    <div class=" col-sm-8 col-md-6">
                        <select type="text" class="form-control" id="">
                            <option value="">正常</option>
                            <option value="">临时停用</option>
                            <option value="">长期停用</option>
                            <option value="">拆除</option>
                        </select>
                    </div>
                </div> -->
            </div>
            <div class="box-header with-border">
                <h4 class="box-title">使用单位信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">产权单位</label>
                    <div class=" col-sm-8 col-md-6">
											<select name="ownerCompanyId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.ownerCompanyId') }" v-model="form.ownerCompanyId" >
											  <option v-for="item in ownerList" :value="item.id" v-text="item.name"></option>
											</select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">使用单位</label>
                    <div class=" col-sm-8 col-md-6">
											<select name="userCompanyId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.userCompanyId') }" v-model="form.userCompanyId" >
											  <option v-for="item in userList" :value="item.id" v-text="item.name"></option>
											</select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">物业单位</label>
                    <div class=" col-sm-8 col-md-6">
											<select name="propertyCompanyId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.propertyCompanyId') }" v-model="form.propertyCompanyId" >
											  <option v-for="item in propertyList" :value="item.id" v-text="item.name"></option>
											</select>
                    </div>
                </div>
								<div class="form-group">
                    <label for="" class="col-sm-2 control-label">维保单位</label>
                    <div class=" col-sm-8 col-md-6">
											<select name="maintenanceCompanyId" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.maintenanceCompanyId') }" v-model="form.maintenanceCompanyId" >
											  <option v-for="item in maintenanceList" :value="item.id" v-text="item.name"></option>
											</select>
                    </div>
                </div>
            </div>
            <div class="box-header with-border">
                <h4 class="box-title">联系人信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">维保联系人</label>
                    <div class=" col-sm-8 col-md-6">
											<input type="text" name="contactor" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.contactor') }" v-model="form.contactor"  placeholder="请输入">
                    </div>
                </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">维保联系人电话</label>
                    <div class=" col-sm-8 col-md-6">
											<input type="tel" name="mobile" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.mobile') }" v-model="form.mobile"  placeholder="请输入">
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
				ladderNumber:'',
				alias: '',
				ownerCompanyId:'',
				userCompanyId:'',
				propertyCompanyId:'',
				maintenanceCompanyId:'',
				contactor:'',
				mobile:'',
			},
			maintenanceList:[],
			ownerList:[],
			userList:[],
			propertyList:[],
		}
	},
	created(){
		if(this.$route.params.id){
			this.getData()
		}
		this.getOption()
	},
	methods:{
		async getData(){
			let res = await this.$api.setInfo({ id: this.$route.params.id})
			this.form = res.data.data.list[0]
		},
		getOption(){
			this.$api.company({ type:1, page:1, num:100}).then(res=>{
				this.maintenanceList = res.data.data.list
			})
			this.$api.company({ type:2, page:1, num:100}).then(res=>{
				this.ownerList = res.data.data.list
			})
			this.$api.company({ type:3, page:1, num:100}).then(res=>{
				this.userList = res.data.data.list
			})
			this.$api.company({ type:4, page:1, num:100}).then(res=>{
				this.propertyList = res.data.data.list
			})
		},
		submit(){
			this.$validator.validateAll('form').then(async (result) => {
        if (result) {
					let res = null
					if(this.$route.params.id){
						res = await this.$api.updateSetInfo(this.form)
					}else {
						res = await this.$api.addSetInfo(this.form)
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
