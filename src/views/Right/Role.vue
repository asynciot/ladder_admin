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
            <div class="row">
                <div class="col-xs-12 text-right">
                    <router-link :to="{ name: 'addrole'}" href="quanxianguanli-jueseguanli-tianjiajuese.html" class="btn btn-success">添加角色</router-link>
                </div>
            </div>
						<v-table
								is-vertical-resize
								is-horizontal-resize
								style="width:100%"
		            :columns="columns"
		            :table-data="tableData"
				    ></v-table>
            <table id="dataTable" class="table table-bordered">
                <thead>
                <tr>
                    <th>角色名称</th>
                    <th>角色描述</th>
                    <th>最后更新人</th>
                    <th>最后更时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>张三</td>
                    <td>管理员</td>
                    <td>admin</td>
                    <td>2018-09-08</td>
                    <td>
                        <a href="quanxianguanli-jueseguanli-duiyingcaidan.html" class="btn btn-default btn-xs">对应菜单</a>
                        <button class="btn btn-xs btn-warning">编辑</button>
                        <button class="btn btn-xs btn-danger remove-btn">删除</button>
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
export default {
  data() {
    return {
      columns: [{
          field: 'name',
          title: '角色名称',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
					isResize:true
        },
        {
          field: 'role',
          title: '角色描述',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
					isResize:true
        },
        {
          field: 'is',
          title: '最后更新人',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
					isResize:true
        },
        {
          field: 'time',
          title: '最后更时间',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
					isResize:true
        },
        {
          field: 'op',
          title: '操作',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center',
					isResize:true
        }
      ],
      tableData: [{
          "name": "赵伟",
          "role": "管理员",
          "is": "admin",
					"time": "2018-02-29",
          "op": "操作"
        },
      ]
    }
  },
  mounted() {
    $('#dataTable').DataTable({
      "dom": 'rtip',
      "searching": false,
      //            禁用最后一列排序
      "columns": [
        null,
        null,
        null,
        null,
        {
          "orderable": false
        }
      ],
      //            中文配置，可存为配置文件单独调用
      language: {
        "sProcessing": "处理中...",
        "sLengthMenu": "显示 _MENU_ 项结果",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
          "sFirst": "首页",
          "sPrevious": "上页",
          "sNext": "下页",
          "sLast": "末页"
        },
        "oAria": {
          "sSortAscending": ": 以升序排列此列",
          "sSortDescending": ": 以降序排列此列"
        }
      }
    });
  }
}
</script>

<style lang="css">
</style>
