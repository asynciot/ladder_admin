<template lang="html">
<!-- Main content -->
<section class="content">

    <div class="box">
        <div class="box-body">
            <div class="row">
                <div class="col-md-2">
                    <input type="text" v-model="options.name" class="form-control input-sm" placeholder="故障级别名称">
                </div>
                <div class="col-md-2">
                    <button @click="options.page=1,getList()" class="btn btn-primary btn-sm">搜索</button>
                </div>
            </div>
						<hr class="mt10 mb10">
            <div class="row mb10">
                <div class="col-xs-12 text-right">
										<router-link :to="{name:'addlevel'}" class="btn btn-success">添加错误级别</router-link>
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
        </div>
        <!-- /.box-body -->
    </div>
    <!-- /.box -->
</section>
<!-- /.content -->
</template>

<script>
Vue.component('code-operation', {
  template: `<span>
				<button @click.stop.prevent="deal()" class="btn btn-xs btn-default">编辑策略</button>
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
		deal() {
      this.$router.push({
        name: 'editlevel',
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
              let res = await this.$api.reomveLevel({
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
      title: '故障级别名称',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    },{
      field: 'description',
      title: '故障级别描述',
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
      componentName: 'code-operation',
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
      let res = await this.$api.level(this.options)
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
