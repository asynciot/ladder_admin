<template lang="html">
        <!-- Main content -->
        <section class="content">

            <div class="box">
                <div class="box-body">
                    <div class="row">
                        <div class="col-xs-5">
                            <input type="text" class="form-control input-sm" placeholder="电梯工号">
                        </div>
                        <div class="col-xs-5">
                            <input type="text" class="form-control input-sm" placeholder="具体位置别名">
                        </div>
                        <div class="col-xs-2">
                            <button class="btn btn-primary btn-sm">搜索</button>
                        </div>
                    </div>
                    <hr class="mt10 mb10">
                    <div class="row mb10">
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
												@on-custom-comp="getList"
										/>
										<div class="tr">
											<v-pagination
												size="small"
												@page-change="pageChange"
												:total="options.total"
												:layout="['total', 'prev', 'pager', 'next', 'jumper']" />
										</div>
                    <table id="dataTable" class="table table-bordered">
                        <thead>
                        <tr>
                            <th>电梯工号</th>
                            <th>具体位置别名</th>
                            <th>电梯编号</th>
                            <th>安装单位</th>
                            <th>维保单位</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>某制造商</td>
                            <td>北京朝阳区</td>
                            <td>张三/18899998888</td>
                            <td>张三</td>
                            <td>2018-09-09</td>
                            <td>
                                <router-link :to="{name:'distribution',params:{id:'2212'}}" class="btn btn-xs btn-default">分配</router-link>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <!-- /.box-body -->

            </div>
            <!-- /.box -->

        </section>
        <!-- /.content -->
</template>

<script>
Vue.component('user-operation', {
  template: `<span>
				<button @click.stop.prevent="bindRole()" class="btn btn-default btn-xs">对应角色</button>
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
    bindRole() {
      this.$router.push({
				name:'bindrole',
				params:{
					id:this.rowData.id
				}
			})
    },
    update() {
			this.$router.push({
				name:'edituser',
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
							this.$emit('on-custom-comp');
							let res = await this.$api.reomveUser({id:this.rowData.id})
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
      field: 'username',
      title: '用户名',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'nicname',
      title: '员工姓名',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'nicname',
      title: '角色名称',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'company',
      title: '所属公司',
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
      componentName: 'user-operation',
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
      let res = await this.$api.user(this.options)
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
