<template lang="html">
	<section class="content">

	            <div class="box">
	                <div class="box-header with-border">
	                    <h3 class="box-title">角色对应菜单信息</h3>
	                </div>
	                <!-- /.box-header -->
	                <!-- form start -->
	                <form class="form-horizontal">
	                    <div class="box-body">
	                        <div class="form-group">
	                            <label for="" class="col-sm-2 control-label">角色名称</label>

	                            <div class=" col-sm-8 col-md-6">
	                                <input type="text" class="form-control" id="inputEmail3" placeholder="请输入角色名称" readonly>
	                            </div>
	                        </div>
	                        <div class="form-group">
	                            <label for="" class="col-sm-2 control-label">菜单名称</label>

	                            <div class=" col-sm-8 col-md-6">
	                                <ul id="treeDemo" class="ztree"></ul>
	                            </div>
	                        </div>

	                    </div>
	                    <!-- /.box-body -->
	                    <div class="box-footer">
	                        <div class="col-sm-offset-2">
	                            <button type="submit" class="btn btn-success">提交</button>
	                        </div>
	                    </div>
	                    <!-- /.box-footer -->
	                </form>
	            </div>

	        </section>
	        <!-- /.content -->
</template>

<script>
export default {
	mounted(){
		let setting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        view: {
            showIcon: false
        }
    };

    let zNodes = [
        {id: 1, pId: 0, name: "随意勾选 1", open: true},
        {id: 11, pId: 1, name: "随意勾选 1-1", open: true},
        {id: 111, pId: 11, name: "随意勾选 1-1-1"},
        {id: 112, pId: 11, name: "随意勾选 1-1-2"},
        {id: 12, pId: 1, name: "随意勾选 1-2", open: true},
        {id: 121, pId: 12, name: "随意勾选 1-2-1"},
        {id: 122, pId: 12, name: "随意勾选 1-2-2"},
        {id: 2, pId: 0, name: "随意勾选 2", checked: true, open: true},
        {id: 21, pId: 2, name: "随意勾选 2-1"},
        {id: 22, pId: 2, name: "随意勾选 2-2", open: true},
        {id: 221, pId: 22, name: "随意勾选 2-2-1", checked: true},
        {id: 222, pId: 22, name: "随意勾选 2-2-2"},
        {id: 23, pId: 2, name: "随意勾选 2-3"}
    ];
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	}
}
</script>

<style lang="css">
</style>
