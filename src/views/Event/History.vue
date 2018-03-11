<template lang="html">
<!-- Main content -->
<section class="content">
    <div class="box">
        <div class="box-body">
            <div class="row">
                <div class="col-md-2">
                    <input type="text" v-model="options.ladderNo" class="form-control input-sm" placeholder="电梯工号">
                </div>
                <div class="col-md-2">
                    <input type="text" v-model="options.alias" class="form-control input-sm" placeholder="具体位置别名">
                </div>
                <div class="col-md-2">
									<select name="type" class="form-control" v-model="options.event">
											<option value="">请选择事件</option>
											<option v-for="item in types" :value="item.id" v-text="item.name"></option>
									</select>
                </div>
                <div class="col-md-2">
									<select name="type" class="form-control" v-model="options.status">
											<option value="">请选择解除状态</option>
											<option v-for="item in status" :value="item.id" v-text="item.name"></option>
									</select>
                </div>
                <div class="col-md-2">
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
            <table id="dataTable" class="table table-bordered">
                <thead>
                <tr>
                    <th>电梯工号</th>
                    <th>具体位置别名</th>
                    <th>解除状态</th>
                    <th>事件名称</th>
                    <th>故障代码</th>
                    <th>故障代码描述</th>
                    <th>故障上报时间</th>
                    <th>故障解除时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>某制造商</td>
                    <td>某制造商</td>
                    <td><span class="label label-success">已解除</span></td>
                    <td>北京朝阳区</td>
                    <td>010000099999</td>
                    <td>010000099999</td>
                    <td>张三/18899998888</td>
                    <td>2018-09-09</td>
                    <td>
                        <button class="btn btn-xs btn-default">处理</button>
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
Vue.component('history-operation', {
  template: `<span>
				<button @click.stop.prevent="deal()" class="btn btn-xs btn-warning">处理</button>
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
      // this.$router.push({
      //   name: 'editbuilding',
      //   params: {
      //     id: this.rowData.id
      //   }
      // })
    },
  }
})
export default {
  data: () => ({
    loading: false,
		status:[{
			id:0,
			name:'未解除'
		},{
			id:1,
			name:'已解除'
		}],
    types: [{
      id: 0,
      name: '电话呼救'
    }, {
      id: 1,
      name: '手动呼救'
    },{
      id: 2,
      name: '自动呼救'
    },{
      id: 3,
      name: '机房刷卡'
    },{
      id: 4,
      name: '轿顶刷卡'
    },{
      id: 5,
      name: '综合故障'
    },{
      id: 6,
      name: '检修状态'
    },{
      id: 7,
      name: '电梯停电'
    },{
      id: 8,
      name: '电话告警'
    },],
    columns: [{
      field: 'ladderNo',
      title: '电梯工号',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'alias',
      title: '具体位置别名',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'status',
      title: '解除状态',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'event',
      title: '事件名称',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'errCode',
      title: '故障代码',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'errDescription',
      title: '故障代码描述',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, {
      field: 'createTime',
      title: '故障上报时间',
      width: 100,
      titleAlign: 'center',
      columnAlign: 'center',
      isResize: true
    }, , {
      field: 'solveTime',
      title: '故障解决时间',
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
      componentName: 'history-operation',
      isResize: true
    }],
    list: [],
    options: {
			ladderNo:'',
			alias:'',
			event:'',
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
      let res = await this.$api.history(this.options)
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
