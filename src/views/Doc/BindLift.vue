<template lang="html">
	<section class="content">
      	<div class="row">
    	  	<div class="col-sm-8">
              	<div class="box">
                  	<div class="box-header with-border">
                      	<h4 class="box-title">已选择电梯</h4>
                  	</div>
                  	<div class="box-body">
                      	<div class="select-tag">
                          	<span v-if="!selectList.length" style="color: #ccc">请从右边列表选择</span>
							<button v-for="item in selectList" @click="deleteSelect(item)" type="button" class="btn btn-xs label-success ml10">
								<i v-text="`${item.ladderNo} | ${item.alias}`"></i>
								<span class="glyphicon glyphicon-remove"></span>
							</button>
                      	</div>
                  	</div>
              	</div>
              	<div class="box">
                  	<div class="box-header with-border">
                      	<h4 class="box-title">设备信息</h4>
                  	</div>
                  	<div class="box-body">
                      	<div class="content">
							<h5>采集设备序列号：{{form.id}}</h5>
                          	<!-- <div class="row mb10">
                              	<div class="col-sm-4">
                                  目标设备：巴拉巴拉
                              	</div>
                              	<div class="col-sm-4">
                                  设备类型：控制器
                              	</div>
                              	<div class="col-sm-4">
                                  地址码：目标设备序列号
                              	</div>
                          	</div>
                          	<div class="row mb10">
                              	<div class="col-sm-4">
                                  电梯工号：123123
                              	</div>
                              	<div class="col-sm-4">
                                  具体别名：电梯1
                              	</div>
                              	<div class="col-sm-4">
                                  状态：<span class="label label-success">已连接</span>
                              	</div>
                          	</div> -->
                      	</div>
                  	</div>
              	</div>
          	</div>
          	<div class="col-sm-4">
              	<div class="box">
                  	<div class="box-header with-border">
                      	<h4 class="box-title">请从下面列表选择电梯</h4>
                  	</div>
                  	<div class="box-body">
                      	<div class="row">
                     	 	<div class="col-md-4">
                              	<input type="text" class="form-control input-sm" placeholder="电梯工号">
                          	</div>
                          	<div class="col-md-4">
                              	<input type="text" class="form-control input-sm" placeholder="具体别名">
                          	</div>
                          	<div class="col-sm-4">
                              	<button class="btn btn-primary btn-sm">搜索</button>
                          	</div>
                      	</div>
                      	<hr class="mt10 mb10">
						<v-table
							class="mb10"
							row-hover-color="#eaeaea"
							is-vertical-resize
							is-horizontal-resize
							style="width:100%"
							:is-loading="loading"
							:column-cell-class-name="columnCellClass"
	            			:columns="columns"
							:row-click="select"
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
          	</div>
      	</div>
      	<!-- /.box -->
  	</section>
</template>

<script>
export default {
  data: () => ({
    form: {},
    loading: false,
    selectList: [],
    list: [],
    columns: [{
      field: 'ladderNumber',
      title: '电梯工号',
      width: 50,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'alias',
      title: '具体位置别名',
      width: 70,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }],
    options: {
      page: 1,
      num: 15,
      total: 0
    }
  }),
  created() {
    this.getData()
    this.getList()
  },
  methods: {
    async getData() {
      let res = await this.$api.searchDevice(this.$route.params.id)
      res.data.deviceModel = '控制器'
      this.form = res.data
      if (this.form.deviceMgrId) {
        this.selectList = [{
          deviceMgrId: this.form.deviceMgrId,
          ladderNo: this.form.ladderNo,
          alias: this.form.alias,
        }]
      }else {
      	this.selectList = []
      }
    },
    async deleteSelect(data) {
      let listIndex = this.list.findIndex(item => item.ladderNumber == data.ladderNo)
			console.log(listIndex);
      let list = [].concat(this.list)
      let res = await this.$api.reomveDevice({
        id: data.deviceMgrId
      })
      if (0 === res.data.code) {
        if (listIndex > -1) {
          list[listIndex].selected = false
          this.list = list
        }
        this.getData()
      }
    },
    columnCellClass(rowIndex, columnName, rowData) {
      if (rowData.selected) {
        return 'selected'
      }
    },
    async select(rowIndex, data) {
      if (!this.selectList.length) {
				let list = [].concat(this.list)
        let res = await this.$api.addDevice({
          deviceNo: this.form.id,
          ladderNo: data.ladderNumber
        })
        if (0 === res.data.code) {
          list[rowIndex].selected = true
          this.list = list
          this.getData()
        }
      }
    },
    pageChange(val) {
      this.options.page = val
      this.getList()
    },
    async getList() {
      this.loading = true
      let res = await this.$api.maintenance(this.options)
      this.loading = false
      if (0 === res.data.code) {
        this.list = res.data.data.list.map(item => {
          if (this.selectList[0] && item.ladderNumber == this.selectList[0].ladderNo) {
            item.selected = true
          }
          return item
        })
        this.options.total = res.data.data.totalNumber
      }
    }
  }
}
</script>

<style lang="css" scoped>
.btn > * {
	line-height: 18px;
	font-style: normal;
	vertical-align: middle;
}
.btn > * {
	margin-top: -1px;
}
</style>
