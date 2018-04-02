<template lang="html">
  <!-- Main content -->
  <section class="content">
      <div class="box">
          <div class="box-body">
              <div class="row">
                  <div class="col-xs-4">
                      <input type="text" v-model="options.groupType" class="form-control input-sm" placeholder="群类别">
                  </div>
                  <div class="col-xs-4">
                      <input type="text" v-model="options.groupName" class="form-control input-sm" placeholder="群名称">
                  </div>
                  <div class="col-xs-2">
                      <button @click="options.page=1,getList()" class="btn btn-primary btn-sm">搜索</button>
                  </div>
              </div>
              <hr class="mt10 mb10">
              <!-- <div class="row">
                  <div class="col-xs-12 text-right">
                      <button class="btn btn-success open-layer">批量倒入年检登记</button>
                  </div>
              </div> -->
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
const status = {
	0:'待领取通知书',
	1:'待取缴费单',
	2:'待预约技监',
	3:'质监完成',
}
Vue.component('inspetion-operation', {
  template: `<span>
				<button @click.stop.prevent="add()" class="btn btn-xs btn-default">年检登记</button>
				<button @click.stop.prevent="history()" class="btn btn-xs btn-warning">年检历史</button>
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
    add() {
			this.$router.push({
				name:'addyearcheck',
				params:{
					ladderNo:this.rowData.ladderNo
				}
			})
    },
		history() {
			this.$router.push({
				name:'yearcheckhistory',
				params:{
					id:this.rowData.ladderNo
				}
			})
    },
  }
})
export default {
  data: () => ({
    loading: false,
    columns: [{
      field: 'groupType',
      title: '群类别',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'groupName',
      title: '群名称',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'userName',
      title: '姓名',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'companyName',
      title: '单位名称',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'address',
      title: '单位所在地',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    },{
      field: 'operation',
      title: '操作',
      width: 150,
      titleAlign: 'center',
      columnAlign: 'center',
      componentName: 'inspetion-operation',
      isResize: true
    }],
    list: [],
    options: {
			groupType:'',
			groupName:'',
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
      let res = await this.$api.yearCheck(this.options)
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
