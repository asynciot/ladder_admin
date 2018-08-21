import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/views/Login'], resolve)
const Home = resolve => require(['@/views/Home'], resolve)
const Menu = resolve => require(['@/views/Menu/Index'], resolve)
const Map = resolve => require(['@/views/Map/Index'], resolve)
const Device = resolve => require(['@/views/Device/Index'], resolve)

const Maintain = resolve => require(['@/views/Maintain/Index'], resolve)
const Member = resolve => require(['@/views/Maintain/Member'], resolve)
const Group = resolve => require(['@/views/Maintain/Group'], resolve)
const GroupDetail = resolve => require(['@/views/Maintain/GroupDetail'], resolve)

const Contractor = resolve => require(['@/views/Doc/Contractor'], resolve)
const ContractorDetail = resolve => require(['@/views/Doc/ContractorDetail'], resolve)
const Company = resolve => require(['@/views/Doc/Company'], resolve)
const CompanyDetail = resolve => require(['@/views/Doc/CompanyDetail'], resolve)
const UseDep = resolve => require(['@/views/Doc/UseDep'], resolve)
const UseDepDetail = resolve => require(['@/views/Doc/UseDepDetail'], resolve)
const Property = resolve => require(['@/views/Doc/Property'], resolve)
const PropertyDetail = resolve => require(['@/views/Doc/PropertyDetail'], resolve)

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
			meta:{name:'登录'},
      component: Login
    },
    {
      path: '/menu',
      name: 'home',
			meta:{name:'首页'},
      component: Home,
      children: [
        {
          path: '/',
          name: 'menu',
					meta:{name:'版本更新'},
          component: Menu
        },{
          path: '/map',
          name: 'map',
					meta:{name:'地图'},
          component: Map
        },
				{
          path: '/device/:id/:type',
          name: 'device',
					meta:{name:'设备'},
          component: Device
        },
				{
          path: '/maintain/member',
          name: 'maintainMember',
					meta:{name:'维保人员'},
          component: Maintain
        },
				{
					path: '/maintain/member/new',
					name: 'maintainMemberNew',
					meta:{name:'添加维保人员'},
					component: Member
				},
				{
					path: '/maintain/group',
					name: 'maintainGroup',
					meta:{name:'维保群组管理'},
					component: Group
				},				
				{
					path: '/maintain/group/new',
					name: 'maintainGroupNew',
					meta:{name:'添加维保群组'},
					component: GroupDetail
				},
				{
					path: '/doc/company',
					name: 'maintainCompany',
					meta:{name:'维保单位管理'},
					component: Company
				},				
				{
					path: '/doc/company/new',
					name: 'maintainCompanyNew',
					meta:{name:'添加维保单位'},
					component: CompanyDetail
				},
				{
					path: '/doc/company/edit/:id',
					name: 'editCompany',
					meta:{name:'编辑维保单位'},
					component: CompanyDetail
				},
				{
					path: '/doc/contractor',
					name: 'contractor',
					meta:{name:'安装单位管理'},
					component: Contractor
				},
				{
					path: '/doc/contractor/new',
					name: 'maintainContractorNew',
					meta:{name:'添加安装单位'},
					component: ContractorDetail
				},
				{
					path: '/doc/contractor/edit/:id',
					name: 'editContractor',
					meta:{name:'编辑安装单位'},
					component: ContractorDetail
				},
				{
					path: '/doc/usedep',
					name: 'usedep',
					meta:{name:'故障联系人'},
					component: UseDep
				},
				{
					path: '/doc/usedep/new',
					name: 'maintainUseDepNew',
					meta:{name:'添加联系人'},
					component: UseDepDetail
				},
				{
					path: '/doc/usedep/edit/:id',
					name: 'editUseDep',
					meta:{name:'编辑联系人'},
					component: UseDepDetail
				},
				{
					path: '/doc/property',
					name: 'property',
					meta:{name:'物业单位管理'},
					component: Property
				},
				{
					path: '/doc/usedep/new',
					name: 'maintainPropertyNew',
					meta:{name:'添加物业单位'},
					component: PropertyDetail
				},
				{
					path: '/doc/usedep/edit/:id',
					name: 'editProperty',
					meta:{name:'编辑物业单位'},
					component: PropertyDetail
				},
      ],
    },
		{ path: '*', redirect: '/' }
  ]
})
