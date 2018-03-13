<template lang="html">
  <!-- Main content -->
  <section class="content">

      <div class="box">
          <div class="box-body">
              <div class="row">
                  <div class="col-xs-4">
                      <input v-model="options.name" type="text" class="form-control input-sm" placeholder="班组名称">
                  </div>
                  <div class="col-xs-2">
                      <button @click="options.page=1,getList()" class="btn btn-primary btn-sm">搜索</button>
                  </div>
              </div>
              <hr class="mt10 mb10">
              <div class="row mb10">
                  <div class="col-xs-12 text-right">
											<router-link :to="{name:'addteam'}" class="btn btn-success">添加维保班组</router-link>
                      <!-- <button class="btn btn-success open-layer">批量倒入维保班组</button> -->
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
               <!--<table id="dataTable" class="table table-bordered"> 
                  <thead>
                  <tr>
                      <th>班组名称</th>
                      <th>维保单位</th>
                      <th>班组详细地址</th>
                      <th>联系人电话</th>
                      <th>最后更新人</th>
                      <th>最后更新时间</th>
                      <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>某制造商</td>
                      <td>北京朝阳区</td>
                      <td>010000099999</td>
                      <td>张三/18899998888</td>
                      <td>张三/18899998888</td>
                      <td>张三</td>
                      <td>2018-09-09</td>
                      <td>
                          <a href="weibaoguanli-weibaobanzuguanli-tianjia.html"
                             class="btn btn-xs btn-default">查看</a>
                          <a href="weibaoguanli-weibaobanzuguanli-tianjia.html"
                             class="btn btn-xs btn-warning">编辑</a>
                          <a href="javascript:;" class="btn btn-xs btn-danger remove-btn">删除</a>
                      </td>
                  </tr>

                  </tbody>
              </table>-->
          </div>
          <!-- /.box-body -->
      </div>
      <!-- /.box -->
  </section>
  <!-- /.content -->
</template>

<script>
Vue.component('team-operation', {
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
				name:'editteam',
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
							let res = await this.$api.reomveTeam({id:this.rowData.id})
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
      title: '维保班组名称',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'address',
      title: '详细地址',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
			field: 'siteName',
      title: '站点名称',
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
      title: '联系人',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'mobile',
      title: '联系人电话',
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
      componentName: 'team-operation',
      isResize: true
    }],
    list: [],
    options: {
			name:'',
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
      let res = await this.$api.team(this.options)
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
