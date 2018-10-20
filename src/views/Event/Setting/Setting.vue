<template lang="jade">
div.layout-content-main
	Tabs(value="name1",:animated="false",@on-click="Onchange")
		TabPane(label="烧录",name="setting")		
		TabPane(label="打印",name="print")
	div.form(padding-top="100")
	<Table class="mb-10" :columns="columns" :data="data" ></Table>
	<Page style="padding-right: 38%;" class="pagination" show-elevator :total="options.total" :page-size="options.num" :current="options.page" @on-change="pageChange" show-total></Page>
</Row>
</template>

<script>
export default {
  data() {
    const type= {
      15: '控制器',
      240: '控制柜',
    };
    const netWork = {
      3: '联通3G',
      40: '移动4G',
      41: '联通4G',
    };
    const status = {
      0: '正常',
      1: '烧录',
      2: '清除',
    };
    return {
      options: {
        page: 1,
        num: 10,
        total: 0
      },
      loading: false,
      columns: [{
          title: '编号',
          key: 'id'
        }, {
          title: '设备名称',
          key: 'deviceName'
        },
        {
          title: '设备类型',
          key: 'typeId',
          render: (h, params) => {
            return h('p',type[params.row.typeId]||'')
          }
        },
        {
          title: '网络类型',
          key: 'networkType',
          render: (h, params) => {
            return h('p',netWork[params.row.networkType]||'')
          }
        },
        {
          title: '协议',
          key: 'contract'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('p',status[params.row.status]||'')
          }
        },
        {
          title: '更新时间',
          key: 'updateTTime',
          render: (h, params) => {
            return h('p',this.$format(params.row.updateTime, 'YYYY-MM-DD HH:mm:ss'))
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          render: (h, params) => {
            return h('p',this.$format(params.row.createTime, 'YYYY-MM-DD HH:mm:ss'))
          }
        },
        {
          title: '操作',
          minWidth: 100,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: "small",
                },
                style: {
                  marginRight: '10px',
                },
                on: {
                  click: () => {
                    this.burn(params.row)
                  }
                }
              }, '烧录'),
                h('Button', {
                props: {
                  type: 'warning',
                  size: "small",
                },
                on: {
                  click: () => {
                    this.clear(params.row)
                  }
                }
              }, '清除')
            ])
          }
        }
      ],
      refreshNum: 0,
      data: [
      ]
    }
  },
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

      let res = await this.$http.get(`${window.location.origin}/devices?page=${this.options.page}&num=${this.options.num}`)
      this.loading = false

      if (res.data.code === 0) {
        this.data = res.data.data.list
        this.options.total = res.data.data.totalNumber
      } else {
        this.$Notice.error({
          title: '错误',
          desc: '获取列表失败'
        });
      }
    },
    async burn(item) {
      let res = await this.$http.put(`${window.location.origin}/devices?id=${item.id}`, {
        id: item.id
      })
      if (res.data.code === 0) {
        this.refreshNum = 2
        this.refresh()
        this.$Notice.success({
          title: '成功',
          desc: '开始烧录！'
        });
      } else {
        this.$Notice.error({
          title: '错误',
          desc: '开始烧录失败'
        });
      }
    },
    refresh() {
      setTimeout(()=>{
        this.getList()
        if (this.refreshNum > 0) {
          this.refresh()
          this.refreshNum--
        }
      }, 5000)
    },
    async clear(item) {
      let res = await this.$http.put(`${window.location.origin}/devices/reset?id=${item.id}`, {
        id: item.id
      })
      if (res.data.code === 0) {
        this.getList()
        this.$Notice.success({
          title: '成功',
          desc: '开始清除'
        });
      } else {
        this.$Notice.error({
          title: '错误',
          desc: '开始清除失败'
        });
      }
    },
		Onchange: function(val) {
			this.$router.push({
				name: val,
			})
		}
  }
}
</script>
<style scoped>
.mb-10 {
  margin-bottom: 20px;
}
.img {
  width: 200px;
  height: 200px;
}
</style>
