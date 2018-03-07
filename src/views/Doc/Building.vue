<template lang="html">
  <!-- Main content -->
  <section class="content">

      <div class="box">
          <div class="box-body">
              <div class="row">
                  <div class="col-xs-3">
                      <input type="text" v-model="options.name" class="form-control input-sm" placeholder="请输入楼盘名称">
                  </div>
                  <div class="col-xs-3">
                      <button @click="options.page=1,getList()" class="btn btn-primary btn-sm">搜索</button>
                  </div>
              </div>
              <hr class="mt10 mb10">
              <div class="row mb10">
                  <div class="col-xs-12 text-right">
											<router-link :to="{name:'addbuilding'}" class="btn btn-success">添加楼盘信息</router-link>
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
									@on-custom-comp="operation"
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
			<modal name="lift">

			</modal>
      <!-- /.box -->
  </section>
  <!-- /.content -->
</template>

<script>
Vue.component('building-operation', {
  template: `<span>
				<button @click.stop.prevent="lift()" class="btn btn-default btn-xs">关联电梯</button>
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
    lift() {
      this.$emit('on-custom-comp', 'lift');
    },
    update() {
      this.$router.push({
        name: 'editbuilding',
        params: {
          id: this.rowData.id
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
              let res = await this.$api.reomveUser({
                id: this.rowData.id
              })
              this.$emit('on-custom-comp', 'refresh');
              if (0 === res.data.code) {
                this.$notify({
                  group: 'ok',
                  title: '提示',
                  text: '操作成功'
                });
              } else {
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
      title: '楼盘名称',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'location',
      title: '详细地址',
      width: 160,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true,
      formatter: function(rowData) {
        return `<p>
				${rowData.province?rowData.province:''}
				${rowData.city?rowData.city:''}
				${rowData.district?rowData.district:''}
				${rowData.address}</p>`
      },
    }, {
      field: 'place',
      title: '使用场合',
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
      componentName: 'building-operation',
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
    operation(type) {
      if (type == 'refresh') {
        this.getList()
      }
      if (type == 'lift') {
        this.$modal.show('lift');
      }
    },
    pageChange(val) {
      this.options.page = val
      this.getList()
    },
    async getList() {
      this.loading = true
      let res = await this.$api.building(this.options)
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
