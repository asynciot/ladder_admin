<template lang="html">
  <!-- Main content -->
  <section class="content">

      <div class="box">
          <div class="box-body">
              <div class="row">
                  <div class="col-xs-3">
                      <input type="text" class="form-control input-sm" placeholder="请输入电梯工号">
                  </div>
                  <div class="col-xs-3">
                      <input type="text" class="form-control input-sm" placeholder="请输入具体位置别名">
                  </div>
                  <div class="col-xs-3">
                      <input type="text" class="form-control input-sm" placeholder="请输入详细地址">
                  </div>
                  <div class="col-xs-3">
                      <button class="btn btn-primary btn-sm">搜索</button>
                  </div>
              </div>
              <hr class="mt10 mb10">
              <div class="row mb10">
                  <div class="col-xs-12 text-right">
                      <router-link :to="{name:'addwarranty'}"class="btn btn-success">添加维保信息</router-link>
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
Vue.component('warranty-operation', {
  template: `<span>
        <button @click.stop.prevent="update()" class="btn btn-xs btn-danger btn-warning">编辑</button>
				<button @click.stop.prevent="deleteRow()" class="btn btn-xs btn-danger remove-btn">删除</button>
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
    update() {
			this.$router.push({
				name:'editwarranty',
				params:{
					id:this.rowData.id
				}
			})
    },
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
							let res = await this.$api.reomveMaintenance({id:this.rowData.id})
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
      field: 'ladderNumber',
      title: '电梯工号',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'alias',
      title: '具体位置别名',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'ownerCompanyName',
      title: '产权单位',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'userCompanyName',
      title: '使用单位',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'propertyCompanyName',
      title: '物业单位',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'maintenanceCompanyName',
      title: '维保单位',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'contactor',
      title: '负责人',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'mobile',
      title: '负责人电话',
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
      componentName: 'warranty-operation',
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
      let res = await this.$api.maintenance(this.options)
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
