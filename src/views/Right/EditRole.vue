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
                        <input type="text" v-model="form.name" class="form-control" id="inputEmail3" placeholder="请输入角色名称" readonly>
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
                    <button @click="submit()" type="button" class="btn btn-success">提交</button>
                </div>
            </div>
            <!-- /.box-footer -->
        </form>
    </div>
	</section>
<!-- /.content -->
</template>

<script>
import {
  menu
} from '@/views/menu'

let nodes = []
menu.forEach(item => {
  nodes.push({
    id: item.id,
    pId: item.pId,
    name: item.label
  })
  item.sub.forEach(sub => {
    nodes.push({
      id: sub.id,
      pId: sub.pId,
      name: sub.label
    })
    if (sub.sub) {
      sub.sub.forEach(nav => {
        nodes.push({
          id: nav.id,
          pId: nav.pId,
          name: nav.label
        })
      })
    }
  })
})
export default {
  data: () => ({
    ztree: null,
    form: {
      name: '',
      description: '',
      accessRight: ''
    },
    accounts: {}
  }),
  created() {
    this.getData()
  },
  methods: {
		initNode(){
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
	    this.ztree = $.fn.zTree.init($("#treeDemo"), setting, nodes);
		},
    async getData() {
      let res = await this.$api.role({
        id: this.$route.params.id
      })
      this.form = res.data.data.list[0]
			if(this.form.accessRight){
				let checkData = JSON.parse(this.form.accessRight)
				let checkNodes = []
				checkData.forEach(item => {
				  checkNodes.push({
				    id: item.id,
				  })
				  item.list.forEach(sub => {
				    checkNodes.push({
				      id: sub.id,
				    })
				    if (sub.list) {
				      sub.list.forEach(nav => {
				        checkNodes.push({
				          id: nav.id,
				        })
				      })
				    }
				  })
				})
				nodes.forEach(item=>{
					let index = checkNodes.findIndex(obj=>obj.id == item.id)
					if(index > -1){
						item.open = true
						item.checked = true
					}else {
						item.open = false
						item.checked = false
					}
				})
			}
			this.initNode();
    },
    async submit() {
      let checkNodes = this.ztree.getCheckedNodes()
      let list = []
      checkNodes.sort((a, b) => a.id - b.id).forEach(item => {
        if (item.level == 0) {
          list.push({
            id: item.id,
            list: []
          })
        }
        if (item.level == 1) {
          let index = list.findIndex(obj => obj.id == item.pId)
          list[index].list.push({
            id: item.id,
          })
        }
        if (item.level == 2) {
          let index1 = list.findIndex(obj => obj.id == (`${item.id}`).substring(0, 1))
					let index2 = list[index1].list.findIndex(obj => obj.id == item.pId)
					if(!list[index1].list[index2].list) list[index1].list[index2].list = [];
          list[index1].list[index2].list.push({
            id: item.id
          })
        }
      })
			this.form.accessRight = JSON.stringify(list)
			let res = await this.$api.updateRole(this.form)
			if(res.data.code == 0){
				this.$notify({
					group: 'ok',
					title: '提示',
					text: '操作成功'
				});
				this.$router.back()
			}
    }
  }
}
</script>

<style lang="css">
</style>
