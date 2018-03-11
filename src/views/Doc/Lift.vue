<template lang="html">
  <!-- Main content -->
  <section class="content">

      <div class="box">
          <div class="box-body">
              <div class="row">
                  <div class="col-xs-2">
                      <input type="text" v-model="options.number" class="form-control input-sm" placeholder="电梯工号">
                  </div>
                  <!-- <div class="col-xs-2">
                      <input type="text" class="form-control input-sm" placeholder="具体位置别名">
                  </div> -->
                  <div class="col-xs-2">
                      <input type="text" v-model="options.code" class="form-control input-sm" placeholder="电梯编号">
                  </div>
                  <div class="col-xs-2">
                      <input type="text" v-model="options.serviceCode" class="form-control input-sm" placeholder="电梯服务编码">
                  </div>
                  <div class="col-xs-2">
                      <button @click="options.page=1,getList()" class="btn btn-primary btn-sm">搜索</button>
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
let type = {
	0:'直梯',
	1:'扶梯',
}
export default {
	data: () => ({
    loading: false,
    columns: [{
      field: 'number',
      title: '电梯工号',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'code',
      title: '电梯编号',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'serviceCode',
      title: '电梯服务编码',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'model',
      title: '电梯型号',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    },{
      field: 'type',
      title: '电梯类型',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'floor',
      title: '层/站/门',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    },{
      field: 'weight',
      title: '额定载重',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    },{
      field: 'speed',
      title: '速度',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'qualifiedDate',
      title: '整体合格证日期',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    },{
      field: 'produceDate',
      title: '出厂日期',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'warrantYears',
      title: '三包年限',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    },{
      field: 'productNumber',
      title: '电梯出厂编号',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
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
      let res = await this.$api.product(this.options)
      this.loading = false
      if (0 === res.data.code) {
        this.list = res.data.data.list.map(item=>{
					item.qualifiedDate = moment(item.qualifiedDate).format('YYYY-MM-DD')
					item.produceDate = moment(item.produceDate).format('YYYY-MM-DD')
					item.type = type[item.type]
					return item
				})
        this.options.total = res.data.data.totalNumber
      }
    }
  }
}
</script>

<style lang="css">
</style>
