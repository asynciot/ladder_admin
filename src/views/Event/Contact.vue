<template lang="html">
  <!-- Main content -->
  <section class="content">
      <div class="box">
          <div class="box-body">
              <div class="row">
                  <div class="col-md-4">
                      <input type="text" v-model="options.nicname" class="form-control input-sm" placeholder="联系人名称">
                  </div>
                  <div class="col-md-2">
                      <button @click="options.page=1,getList()" class="btn btn-primary btn-sm">搜索</button>
                  </div>
              </div>
              <hr class="mt10 mb10">
              <div class="row mb10">
                  <div class="col-xs-12 text-right">
                    <router-link :to="{ name: 'addcontact'}" class="btn btn-success">添加故障联系人</router-link>
                  </div>
              </div>
							<v-table
									class="mb10"
									row-hover-color="#eaeaea"
									is-vertical-resize
									is-horizontal-resize
									style="width:100%"
									:is-loading="loading"
									:columns="columns"
									:table-data="list"
									@on-custom-comp="getList"
							/>
							<div class="tr">
								<v-pagination
									size="small"
									:pageSize="options.num"
									@page-change="pageChange"
									:total="options.total"
									:layout="['total', 'prev', 'pager', 'next', 'jumper']" />
							</div>
          </div>
          <!-- /.box-body -->

      </div>
      <!-- /.box -->

  </section>
  <!-- /.content -->
</template>

<script>
Vue.component('contact-operation', {
  template: `<span>
				<button @click.stop.prevent="bind()" class="btn btn-xs btn-default">关联电梯</button>
				<button @click.stop.prevent="deleteRow()" class="btn btn-xs btn-warning remove-btn">删除</button>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
		bind() {
			this.$router.push({
				name:'bindcontact',
				params:{
					id:this.rowData.accountId
				}
			})
		},
		// update() {
		// 	this.$router.push({
		// 		name:'bindcontact',
		// 		params:{
		// 			id:this.rowData.id
		// 		}
		// 	})
    // },
    deleteRow() {
      this.$modal.show('dialog', {
        title: '警告!',
        text: '是否删除此项 ？',
        buttons: [{
            title: '取消',
          },
          {
            title: '删除',
						handler: async () => {
							this.$modal.hide('dialog')
							let res = await this.$api.reomveUser({id:this.rowData.id})
							this.$emit('on-custom-comp');
							if (0 === res.data.code) {
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
            }
          }
        ]
      })
    }
  }
})
export default {
  data: () => ({
    loading: false,
    columns: [{
      field: 'name',
      title: '联系人姓名',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    },{
      field: 'mobile',
      title: '联系人电话',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'email',
      title: '联系人邮箱',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    },{
      field: 'num',
      title: '关联电梯数',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'operation',
      title: '操作',
      width: 150,
      titleAlign: 'center',
      columnAlign: 'center',
      componentName: 'contact-operation',
      isResize: true
    }],
    list: [],
    options: {
      page: 1,
      num: 15,
      total: 0
    }
  }),
  created() {
    this.getList()
  },
  methods: {
    pageChange(val) {
      this.options.page = val
      this.getList()
    },
    async getList() {
      this.loading = true
      let res = await this.$api.msgPerson(this.options)
      this.loading = false
      if (0 === res.data.code) {
        this.list = res.data.data.list
        this.options.total = res.data.data.totalNumber
      }
    }
  }
}
</script>

<style lang="css">
</style>
