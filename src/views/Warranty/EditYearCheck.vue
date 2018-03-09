<template lang="html">
	<section class="content">
    <div class="box">
        <!-- form start -->
        <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="record">
            <div class="box-header with-border">
                <h4 class="box-title">电梯信息</h4>
            </div>
            <div class="box-body">
                <div class="form-group">
	                  <label for="" class="col-sm-2 control-label">电梯工号</label>
	                  <div class=" col-sm-8 col-md-6">
	                      <input type="text" class="form-control" v-model="form.ladderNumber" placeholder="请输入" disabled>
	                  </div>
	              </div>
	              <div class="form-group">
	                  <label for="" class="col-sm-2 control-label">具体位置别名</label>

	                  <div class=" col-sm-8 col-md-6">
	                      <input type="text" class="form-control" v-model="form.alias" placeholder="请输入" disabled>
	                  </div>
	              </div>
	              <div class="form-group">
	                  <label for="" class="col-sm-2 control-label">使用单位名称</label>

	                  <div class=" col-sm-8 col-md-6">
	                      <input type="text" class="form-control" v-model="form.userCompanyName" disabled placeholder="请输入">
	                  </div>
	              </div>
	              <div class="form-group">
	                  <label for="" class="col-sm-2 control-label">安装单位</label>

	                  <div class=" col-sm-8 col-md-6">
	                      <input type="text" class="form-control" v-model="form.installCompanyName" disabled placeholder="请输入">
	                  </div>
	              </div>
	              <div class="form-group">
	                  <label for="" class="col-sm-2 control-label">维保单位</label>

	                  <div class=" col-sm-8 col-md-6">
	                      <input type="text" class="form-control" v-model="form.maintenanceCompanyName" disabled placeholder="请输入">
	                  </div>
	              </div>
                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">上次年检日期</label>
                    <div class=" col-sm-8 col-md-6">
											<vue-datepicker-local v-model="last.checkTime" disabled/>
                    </div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label">年检记录状态</label>

                    <div class=" col-sm-8 col-md-6">
                        <div class="checkbox">
                            <label class="ml10">
                                <input type="radio" :value="0" v-model="record.status"> 待领取通知书
                            </label>
                            <label class="ml10">
                                <input type="radio" :value="1" v-model="record.status"> 待取缴费单
                            </label>
														<label class="ml10">
                                <input type="radio" :value="2" v-model="record.status"> 待预约技监
                            </label>
                            <label class="ml10">
                                <input type="radio" :value="3" v-model="record.status"> 质监完成
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
	components:{
		VueDatepickerLocal
	},
  data() {
    return {
      form: {
        ladderNumber: '',
        alias: '',
        userCompanyName: '',
        installCompanyName: '',
        maintenanceCompanyName: '',
      },
			last:{
				checkTime:''
			},
      record: {
				ladderNo:'',
				status:'',
				checkTime:''
			},
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getData()
    }
  },
  methods: {
    async getData() {
      let res = await this.$api.maintenance({
        id: this.$route.params.id
      })
      this.form = res.data.data.list[0]
			this.record.ladderNo = this.form.ladderNumber
    },
    submit() {
      this.$validator.validateAll('record').then(async (result) => {
        if (result) {
          let res = null
          // if (this.$route.params.id) {
            // res = await this.$api.updateErrorCode(this.form)
          // } else {
						this.record.checkTime = moment(new Date()).format('YYYY-MM-DD')
            res = await this.$api.addYearCheck(this.record)
          // }
          if (res.data.code == 0) {
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
