<template lang="html">
	<section class="content">
      <div class="box">
          <form class="form-horizontal">
              <div class="box-header with-border">
                  <h4 class="box-title">对应保养项</h4>
              </div>
              <div class="box-body">
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">保养类型名称</label>

                      <div class=" col-sm-8 col-md-6">
                          <input type="text" v-model="form.name" class="form-control" placeholder="请输入" readonly>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="" class="col-sm-2 control-label">保养项名称</label>

                      <div class=" col-sm-8 col-md-6">
                          <div class="checkbox" v-for="item in itemList" v-if="item.list.length">
                              <div v-text="item.name"></div>
                              <label class="ml10" v-for="data in item.list">
                                  <input type="checkbox" @change="check(data)" v-model="data.checked" :value="data.id"> {{data.name}}
                              </label>
                          </div>
                      </div>

                  </div>
              </div>
              <!-- /.box-body -->
              <!-- <div class="box-footer">
                  <div class="col-sm-offset-2">
                      <button type="submit" class="btn btn-success">提交</button>
                  </div>
              </div> -->
              <!-- /.box-footer -->
          </form>
          <!-- /.box-body -->
      </div>
      <!-- /.box -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        days: '',
        type: '',
        comments: '',
      },
      type: [{
        id: 0,
        name: '半月保'
      }, {
        id: 1,
        name: '月保'
      }, {
        id: 2,
        name: '季度保'
      }, {
        id: 3,
        name: '年检'
      }, ],
			bindList:[],
      itemList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
		async check(data){
			let res = null
			if (data.checked) {
				res = await this.$api.addBind({
					typeId:data.typeId,
					itemId:data.id
				})
			}else {
				res = await this.$api.reomveBind({
					id: data.bindId,
					typeId:data.typeId,
					itemId:data.id
				})
			}
			if (res.data.code == 0) {
				this.$notify({
					group: 'ok',
					title: '提示',
					text: '操作成功'
				});
			}else {
				this.$notify({
					group: 'error',
					title: '提示',
					text: '操作失败'
				});
			}
			this.getData()
		},
    async getData() {
      let res = await this.$api.type({
        id: this.$route.params.id
      })
			let bind = await this.$api.bind({
        typeId: this.$route.params.id
      })
			this.bindList = bind.data.code == 0?bind.data.data.list:[]
      this.form = res.data.data.list[0]
			this.getOption()
    },
    async getOption() {
      let res = await this.$api.item({page:1, num:100})
      let list = [{
          id: 0,
          name: '轿顶',
          list: []
        },
        {
          id: 1,
          name: '机房',
          list: []
        },
        {
          id: 2,
          name: '底坑',
          list: []
        },
        {
          id: 3,
          name: '扶梯',
          list: []
        },
      ]
      res.data.data.list.forEach(item => {
				let index = list.findIndex(arr=>arr.id == item.area)
				let bindIndex = this.bindList.findIndex(arr=>arr.itemId == item.id)
				if (index > -1) {
					let bindId = null
					if (bindIndex  > -1 ) {
						bindId = this.bindList[bindIndex].id
					}
					list[index].list.push({
						id:item.id,
						bindId:bindId,
						typeId:this.form.id,
						name: item.name,
						checked: bindId?true:false
					})
				}
      })
      this.itemList = list
    },
    submit() {
      this.$validator.validateAll('form').then(async (result) => {
        if (result) {
          let res = null
          if (this.$route.params.id) {
            res = await this.$api.updateType(this.form)
          } else {
            res = await this.$api.addType(this.form)
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
