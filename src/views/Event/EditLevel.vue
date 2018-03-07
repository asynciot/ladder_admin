<template lang="html">
	<!-- Main content -->
  <section class="content">
      <div class="box">
          <div class="box-header with-border">
              <h3 class="box-title">故障级别</h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <form class="form-horizontal" @submit.prevent="submit" data-vv-scope="form">
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">故障级别名称</label>
                      <div class=" col-sm-8 col-md-6">
                          <input type="text" name="name" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.name') }" v-model="form.name" placeholder="请输入">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">故障级别描述</label>
                      <div class=" col-sm-8 col-md-6">
                          <textarea name="description" v-validate="'required'" :class="{'form-control': true, 'is-error': errors.has('form.description') }" v-model="form.description" rows="3" placeholder="请输入"></textarea>
                      </div>
                  </div>
									<div class="form-group">
                      <label for="" class="col-sm-2 control-label">短信通知</label>
                      <div class=" col-sm-8 col-md-6">
                          <div class="checkbox">
                              <label class="ml10">
                                  <input type="checkbox" :value="true" v-model="form.isSendSms">
                              </label>
                          </div>
                          <ul class="list-group list-group-unbordered list-unstyled">
                              <li>
                                  <label class="ml10 font-normal">
                                      <input type="checkbox" checked disabled> 在检修状态下，控制器发生故障，不发送短信
                                  </label>
                              </li>
                              <li>
                                  <label class="ml10 font-normal">
                                      <input type="radio" :value="0" v-model="form.smsType"> 控制器发生某故障，此故障在多次发生并恢复，每次故障都发送短信
                                  </label>
                              </li>
															<li>
                                  <label class="ml10 font-normal">
                                      <input type="radio" :value="1" v-model="form.smsType"> 控制器发生某故障，此故障在一个小时内多次发生并恢复，一个小时内只发送一条短信通知
                                  </label>
                              </li>
															<li>
                                  <label class="ml10 font-normal">
                                      <input type="radio" :value="2" v-model="form.smsType"> 控制器发生某故障，此故障在一个自然天内多次发生并恢复，一个自然天内只发送一条短信通知
                                  </label>
                              </li>
                          </ul>
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
  data() {
    return {
      form: {
        name: '',
        description: '',
        isSendSms: false,
        smsType: '',
      },
      maintenanceList: [],
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getData()
    }
    this.getOption()
  },
  methods: {
    async getData() {
      let res = await this.$api.level({
        id: this.$route.params.id
      })
      this.form = res.data.data.list[0]
    },
    getOption() {
      this.$api.building({
        type: 1,
        page: 1,
        num: 100
      }).then(res => {
        this.buildingList = res.data.data.list
      })
    },
    submit() {
      this.$validator.validateAll('form').then(async (result) => {
        if (result) {
          let res = null
          if (this.$route.params.id) {
            res = await this.$api.updateLevel(this.form)
          } else {
            res = await this.$api.addLevel(this.form)
          }
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
