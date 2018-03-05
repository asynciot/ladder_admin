<template lang="html">
<!-- Main content -->
<section class="content">
    <div class="box">
        <div class="box-body">
            <div class="row">
                <div class="col-xs-3">
                    <input type="text" class="form-control input-sm" placeholder="请输入角色名称">
                </div>
                <div class="col-xs-3">
                    <button class="btn btn-primary btn-sm">搜索</button>
                </div>
            </div>
            <hr class="mt10 mb10">
            <div class="row mb10">
                <div class="col-xs-12 text-right">
                    <router-link :to="{ name: 'addrole'}" class="btn btn-success">添加角色</router-link>
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
				    ></v-table>
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
Vue.component('role-operation', {
  template: `<span>
				<button @click.stop.prevent="editUser()" class="btn btn-default btn-xs">对应菜单</button>
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
    editUser() {
			this.$router.push({
				name:'rolemenu',
				params: {
					id:this.rowData.id
				}
			})
    },
    update() {
			this.$router.push({
				name:'editrole',
				params: {
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
						handler: async() => {
							this.$modal.hide('dialog')
							let res = null
							if(this.$route.params.id){
								res = await this.$api.updateRole({id:this.rowData.id})
							}else {
								res = await this.$api.reomveRole({id:this.rowData.id})
							}
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
  data() {
    return {
			loading: false,
      columns: [{
          field: 'name',
          title: '角色名称',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
					isResize:true
        },
        {
          field: 'description',
          title: '角色描述',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
					isResize:true
        },
				{
		      field: 'operation',
		      title: '操作',
		      width: 150,
		      titleAlign: 'center',
		      columnAlign: 'center',
		      componentName: 'role-operation',
		      isResize: true
		    }
      ],
      list: [],
			options: {
	      page: 1,
	      num: 15,
	      total: 0
	    }
    }
  },
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
      let res = await this.$api.role(this.options)
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
