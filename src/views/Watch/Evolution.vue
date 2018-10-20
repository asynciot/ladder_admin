<template lang="jade">
div.layout-content-main
	div.form
		Form(ref='query',:model="query",label-position="right",:label-width="80")
			Row(:gutter="16")
				Col(span="5")
					Form-item(label="版本选择：")
						Select(placeholder="请选择",v-model="query.version")
							Option(v-for="item in versions",:key="item.name",:value="item.name")|{{item.name}}
				Col(span="8")
					Button.mr-10(type="primary",:disabled="(select.length == 0) || !query.version",@click="update(select)")|更新
	Table(@on-selection-change="selection",border,:columns="columns",:data="data",size="small")
	Page.pagination(:total="options.total",:page-size="options.num",:current="options.page",@on-change="pageChange",show-total)
</template>

<script>
import {
  api,
	ladderApi,
	formatDate
} from '@/utils'
export default {
  created() {
    this.getList()
		this.getVersion()
  },
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
    return {
			query: {
				version: null
			},
			versions: [],
			select: [],
			api: api,
			ladderApi: ladderApi,
			loading:false,
			columns: [{
          type: 'selection',
          align: 'center'
        },{
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
            return h('p',type[params.row.typeId]||'-')
          }
        },
        {
          title: '网络类型',
          key: 'networkType',
          render: (h, params) => {
            return h('p',netWork[params.row.networkType]||'-')
          }
        },
        {
          title: '版本',
          key: 'version'
        },
				{
          title: '状态',
					render: (h, params) => {
            return h('p',params.row.isUpdating ? '更新中':'未在更新')
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          render: (h, params) => {
            return h('p',formatDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'))
          }
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: "small",
								disabled: !this.query.version
              },
              on: {
                click: () => {
                  this.update([params.row.id])
                }
              }
            }, '升级')
          }
        }
      ],
      data: [
      ],
      options: {
        page: 1,
        num: 10,
        total: 0
      }
    }
  },
  methods: {
		pageChange(val) {
      this.options.page = val
      this.getList()
    },
		async getVersion() {
			let res = await this.$http.get(`${this.ladderApi}/v1/maintenance/version?page=${this.options.page}&num=${this.options.num}`)
			if (res.data.code == 0) {
				this.versions = res.data.data.list
			}
		},
    async getList() {
      this.loading = true
      let res = await this.$http.get(`${this.api}/devices?page=${this.options.page}&num=${this.options.num}`)
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
		selection(data) {
      this.select = data.map(item=>item.id);
    },
		async update(val) {
			const ids = val.toString()
			let res = await this.$http.put(`${this.api}/devices/version?ids=${ids}&version=${this.query.version}`, {})
			if (res.data.code === 0) {
				this.getList()
				this.$Notice.success({
					title: '成功',
					desc: '开始升级成功'
				});
			} else {
				this.$Notice.error({
					title: '错误',
					desc: '开始升级失败'
				});
			}
		},
  }
}
</script>

<style lang="scss" scoped>
</style>
