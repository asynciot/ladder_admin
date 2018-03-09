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
													<h5>联系人姓名 ：{{user.nicname}}</h5>
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
    user: {},
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
		this.getUser()
    this.getData()
    this.getList()
  },
  methods: {
		async getUser(){
			let res = await this.$api.user({
        id: this.$route.params.id,
      })
			this.user = res.data.data.list[0]
		},
    async getData() {
      let list = await this.$api.msgPerson({
        userId: this.$route.params.id,
				page: 1,
				num: 20
      })
			this.selectList = list.data.data.list
    },
    async deleteSelect(data) {
      let index = this.selectList.findIndex(item => item.ladderNo == data.ladderNo)
      let listIndex = this.list.findIndex(item => item.ladderNumber == data.ladderNo)
      let list = [].concat(this.list)
			if(index > -1){
				let res = await this.$api.reomveMsgPerson({id: this.selectList[index].id})
				this.selectList.splice(index, 1)
				if (res.data.code == 0) {
					if (listIndex > -1) {
		        list[listIndex].selected = false
		        this.list = list
		      }
				}
			}
    },
    columnCellClass(rowIndex, columnName, rowData) {
      if (rowData.selected) {
        return 'selected'
      }
    },
    async select(rowIndex, data) {
      let index = this.selectList.findIndex(lift => data.ladderNumber == lift.ladderNo)
      let list = [].concat(this.list)
      if (index == -1) {
        let res = await this.$api.addMsgPerson({
          accountId: this.user.id,
          ladderNo: data.ladderNumber
        })
				if (0 === res.data.code) {
					this.getData()
          list[rowIndex].selected = true
          this.list = list
        }
      } else {
        let res = await this.$api.reomveMsgPerson({id: this.selectList[index].id})
        if (0 === res.data.code) {
          list[rowIndex].selected = false
          this.list = list
          this.selectList.splice(index, 1)
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
					let index = this.selectList.findIndex(lift =>lift.ladderNo == item.ladderNumber)
          if (index>-1) {
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
