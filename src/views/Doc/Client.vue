<template lang="html">
  <!-- Main content -->
  <section class="content">
      <div class="box">
          <div class="box-body">
              <div class="row">
                  <div class="col-xs-5">
                      <input type="text" class="form-control input-sm" v-model="query.id" placeholder="采集设备序列号">
                  </div>
                  <!--<div class="col-xs-5">
                      <input type="text" class="form-control input-sm" placeholder="电梯工号">
                  </div>-->
                  <div class="col-xs-2">
                      <button @click="options.page=1,getList()" class="btn btn-primary btn-sm">搜索</button>
                  </div>
              </div>
              <hr class="mt10 mb10">
              <div class="row">
                  <div class="col-xs-12 text-right">
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
							/>
							<div class="tr">
								<v-pagination
									size="small"
									@page-change="pageChange"
									:total="options.total"
									:layout="['total', 'prev', 'pager', 'next', 'jumper']" />
							</div>
              <!-- <table id="dataTable" class="table table-bordered tree_table">
                  <thead>
                  <tr>
                      <th>电梯工号</th>
                      <th>电梯服务编码</th>
                      <th>电梯型号</th>
                      <th>电梯类型</th>
                      <th>层/站/门</th>
                      <th>额定载重</th>
                      <th>楼盘地址</th>
                      <th>状态</th>
                      <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr data-tt-id="1">
                      <td colspan="7">某制造商</td>
                      <td>
                          <span class="label label-success">上线</span>
                      </td>
                      <td>
												<router-link :to="{name:'bindlift',params:{id:'1213'}}" class="btn btn-xs btn-default">绑定电梯</router-link>
												<router-link :to="{name:'bindlift',params:{id:'1213'}}" class="btn btn-xs btn-default">解绑电梯</router-link>
                      </td>
                  </tr>
                  <tr data-tt-id="1.1" data-tt-parent-id="1">
                      <td>某制造商</td>
                      <td>北京朝阳区</td>
                      <td>010000099999</td>
                      <td>010000099999</td>
                      <td>张三/18899998888</td>
                      <td>张三</td>
                      <td>张三</td>
                      <td>
                          <span class="label label-success">已连接</span>
                      </td>
                      <td>
                      </td>
                  </tr>
                  <tr data-tt-id="2">
                      <td colspan="7">某制造商</td>
                      <td>
                          <span class="label label-success">上线</span>
                      </td>
                      <td>
												<router-link :to="{name:'bindlift',params:{id:'1213'}}" class="btn btn-xs btn-default">绑定电梯</router-link>
												<router-link :to="{name:'bindlift',params:{id:'1213'}}" class="btn btn-xs btn-default">解绑电梯</router-link>
                      </td>
                  </tr>
                  <tr data-tt-id="2.1" data-tt-parent-id="2">
                      <td>某制造商</td>
                      <td>北京朝阳区</td>
                      <td>010000099999</td>
                      <td>010000099999</td>
                      <td>张三/18899998888</td>
                      <td>张三</td>
                      <td>2018-09-09</td>
                      <td>
                          <span class="label label-success">已连接</span>
                      </td>
                      <td>
                      </td>
                  </tr>

                  </tbody>
              </table> -->
          </div>
          <!-- /.box-body -->
      </div>
      <!-- /.box -->
  </section>
  <!-- /.content -->
</template>

<script>
Vue.component('client-operation', {
  template: `<span>
        <button @click.stop.prevent="update()" class="btn btn-xs btn-default">关联电梯</button>
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
				name:'bindlift',
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
							let res = await this.$api.reomveCompany({id:this.rowData.id})
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
	data:()=>({
		loading: false,
    columns: [{
      field: 'deviceName',
      title: '设备序列号',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'deviceModel',
      title: '设备类型',
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
      componentName: 'client-operation',
      isResize: true
    }],
		query:{
			id:''
		},
		list:[],
		options:{
			page:1,
			num:15,
			total:0
		}
	}),
//	 	created(){
//	 		this.getData()
//	 	},
//		methods:{
//		async search(){
//			this.loading = true
//			let res = await this.$api.searchDevice(this.query.id)
//			res.data.deviceModel = '控制器'
//			this.list = [res.data]
//			this.loading = false
//		},
//		pageChange(val) {
//    this.options.page = val
//    this.search()
//  },
//	},
//	mounted(){
//		$("#dataTable").treetable({expandable: true});
//	}
//}
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
//    if (0 === res.data.code) {
//      this.list = res.data.data.list
//      this.options.total = res.data.data.totalNumber
//    }
    }
	}
}
</script>

<style lang="css">
</style>
