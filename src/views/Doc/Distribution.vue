<template lang="html">
	<section class="content">
	  <div class="row">
	      <div class="col-sm-8">
	          <div class="box">
	              <div class="box-header with-border">
	                  <h4 class="box-title">已选的单位</h4>
	              </div>
	              <div class="box-body">
	                  <div class="select-tag">
	                      <span v-if="!selectList.length" style="color: #ccc">请从右边列表选择</span>
												<button v-for="item in selectList" @click="deleteSelect(item)" type="button" class="btn btn-xs label-success ml10">
													<i v-text="`${item.name}`"></i>
													<span class="glyphicon glyphicon-remove"></span>
												</button>
	                  </div>
	              </div>
	          </div>
	          <div class="box">
	              <div class="box-header with-border">
	                  <h4 class="box-title">电梯信息</h4>
	              </div>
	              <div class="box-body">
	                  <div class="content">
	                      <div class="row mb10">
	                          <div class="col-sm-4">
	                              电梯工号 ：{{form.ladderNumber}}
	                          </div>
	                          <div class="col-sm-4">
	                              具体位置别名 ：{{form.alias}}
	                          </div>
	                      </div>
	                  </div>
	              </div>
	          </div>
	      </div>
	      <div class="col-sm-4">
	          <div class="box">
	              <div class="box-header with-border">
	                  <h4 class="box-title">请从下面列表选择单位</h4>
	              </div>
	              <div class="box-body">
	                  <div class="row">
	                      <div class="col-md-4">
	                          <input type="text" class="form-control input-sm" placeholder="电梯工号">
	                      </div>
	                      <div class="col-md-4">
													<select name="type" class="form-control" v-model="options.type">
															<option value="">请选择单位</option>
															<option v-for="item in types" :value="item.id" v-text="item.name"></option>
													</select>
	                      </div>
	                      <div class="col-sm-4">
	                          <button @click="getList()" class="btn btn-primary btn-sm">搜索</button>
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
	                  <table id="dataTable" class="table table-bordered select-table">
	                      <thead>
	                      <tr>
	                          <th>单位名称</th>
	                          <th>单位类型</th>
	                      </tr>
	                      </thead>
	                      <tbody>
	                      <tr>
	                          <td>哇哈哈</td>
	                          <td>北京朝阳区</td>
	                      </tr>
	                      <tr>
	                          <td>选择单位</td>
	                          <td>北京朝阳区</td>
	                      </tr>
	                      <tr>
	                          <td>选择单位</td>
	                          <td>北京朝阳区</td>
	                      </tr>
	                      </tbody>
	                  </table>
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
  data: () => {
		let type = [{
				id: 0,
				name: '安装单位'
			},
			{
				id: 1,
				name: '维保单位'
			},
			{
				id: 2,
				name: '产权单位'
			},
			{
				id: 3,
				name: '使用单位'
			},
			{
				id: 4,
				name: '物业单位'
			},
		]
    return {
      types: type,
      form: {},
      loading: false,
      selectList: [],
      list: [],
      columns: [{
        field: 'name',
        title: '单位名称',
        width: 50,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true
      }, {
        field: 'type',
        title: '单位类型',
        width: 70,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true,
        formatter: function(rowData) {
          return type.filter(item => item.id == rowData.type)[0].name
        },
      }],
      options: {
        type: '',
        page: 1,
        num: 15,
        total: 0
      }
    }
  },
  created() {
    this.getData()
    this.getList()
  },
  methods: {
    async getData() {
      let res = await this.$api.maintenance({
        id: this.$route.params.id
      })
      this.form = res.data.data.list[0]
			res = await this.$api.ladderBinder({id:this.$route.params.id})
    },
    deleteSelect(data) {
      let index = this.selectList.findIndex(item => item.id == data.id)
      let listIndex = this.list.findIndex(item => item.id == data.id)
      let list = [].concat(this.list)
      if (index > -1) {
        this.list = list
      }
      if (listIndex > -1) {
        this.selectList.splice(index, 1)
        list[listIndex].selected = false
        this.list = list
      }
    },
    columnCellClass(rowIndex, columnName, rowData) {
      if (rowData.selected) {
        return 'selected'
      }
    },
    async select(rowIndex, data) {
      let index = this.selectList.findIndex(lift => data.id == lift.id)
      let list = [].concat(this.list)
      if (index == -1) {
        let res = await this.$api.addLadderBinder({
          ladderNo: this.form.ladderNumber,
          companyId: data.id
        })
        if (0 === res.data.code) {
          list[rowIndex].selected = true
          this.list = list
          this.selectList.push(data)
        }
      } else {
        let res = await this.$api.reomveDevice({
          deviceNo: this.form.id,
          ladderNo: data,
          id
        })
        if (0 === res.data.code) {
          list[rowIndex].selected = false
          this.list = list
          this.selectList.splice(index, 1)
        }
      }
      // data.forEach(item=>{
      // 	let index = this.selectList.findIndex(lift => item.id == lift.id)
      // 	if (index == -1) {
      //     this.selectList.push(item)
      //   }
      // })
    },
    pageChange(val) {
      this.options.page = val
      this.getList()
    },
    async getList() {
      if (!isNaN(parseInt(this.options.type))) {
        this.loading = true
        let res = await this.$api.company(this.options)
        this.loading = false
        if (0 === res.data.code) {
          this.list = res.data.data.list.map(item => {
            let index = this.selectList.findIndex(lift => lift.id == item.id)
            if (index > -1) {
              item.selected = true
            }
            return item
          })
          this.options.total = res.data.data.totalNumber
        }
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
