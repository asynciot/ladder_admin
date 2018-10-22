import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/views/Login'], resolve)
const Home = resolve => require(['@/views/Home'], resolve)
const Index = resolve => require(['@/views/Menu/Index'], resolve)

const User = resolve => require(['@/views/User/Index'], resolve)
const UserInfo = resolve => require(['@/views/User/Info/UserInfo'], resolve)
const FollowList = resolve => require(['@/views/User/Info/FollowList'], resolve)
const MaintainList = resolve => require(['@/views/User/Info/MaintainList'], resolve)
const UpkeepList = resolve => require(['@/views/User/Info/UpkeepList'], resolve)
const AssessList = resolve => require(['@/views/User/Info/AssessList'], resolve)

const Evolution = resolve => require(['@/views/Watch/Evolution'], resolve)
const Map = resolve => require(['@/views/Watch/Map'], resolve)
const Device = resolve => require(['@/views/Device/Index'], resolve)

const Fault = resolve => require(['@/views/Maintenance/Fault'], resolve)
const MaintainInfo = resolve => require(['@/views/Maintenance/MaintainInfo'], resolve)
const UpkeepInfo = resolve => require(['@/views/Maintenance/UpkeepInfo'], resolve)
const FaultRank = resolve => require(['@/views/Maintenance/FaultRank'], resolve)

const Company = resolve => require(['@/views/Doc/Company'], resolve)
const Member = resolve => require(['@/views/Doc/Maintain/Member'], resolve)
const MemberDetail = resolve => require(['@/views/Doc/Maintain/MemberDetail'], resolve)
const Group = resolve => require(['@/views/Doc/Maintain/Group'], resolve)
const GroupDetail = resolve => require(['@/views/Doc/Maintain/GroupDetail'], resolve)
const Site = resolve => require(['@/views/Doc/Maintain/Site'], resolve)
const SiteDetail = resolve => require(['@/views/Doc/Maintain/SiteDetail'], resolve)
const Contractor = resolve => require(['@/views/Doc/Contractor'], resolve)
const ContractorDetail = resolve => require(['@/views/Doc/ContractorDetail'], resolve)
const Unit = resolve => require(['@/views/Doc/Maintain/Unit'], resolve)
const UnitDetail = resolve => require(['@/views/Doc/Maintain/UnitDetail'], resolve)
const UseDep = resolve => require(['@/views/Doc/UseDep'], resolve)
const UseDepDetail = resolve => require(['@/views/Doc/UseDepDetail'], resolve)
const Property = resolve => require(['@/views/Doc/Property'], resolve)
const PropertyDetail = resolve => require(['@/views/Doc/PropertyDetail'], resolve)

const FileIndex = resolve => require(['@/views/Event/File/Index'], resolve)
const AssessIndex = resolve => require(['@/views/Event/Assess/Index'], resolve)
const AssessHistory = resolve => require(['@/views/Event/Assess/History'], resolve)
const AssessPrint = resolve => require(['@/views/Event/Assess/Print'], resolve)
const AssessReport = resolve => require(['@/views/Event/Assess/Report'], resolve)
const SettingIndex = resolve => require(['@/views/Event/Setting/Index'], resolve)
const Setting = resolve => require(['@/views/Event/Setting/Setting'], resolve)
const Print = resolve => require(['@/views/Event/Setting/Print'], resolve)
const CheckIndex = resolve => require(['@/views/Event/Check/Index'], resolve)
const CheckHistory = resolve => require(['@/views/Event/Check/History'], resolve)
const CheckPrint = resolve => require(['@/views/Event/Check/Print'], resolve)
const CheckReport = resolve => require(['@/views/Event/Check/Report'], resolve)

const UserManage = resolve => require(['@/views/System/UserManage'], resolve)
const Inform = resolve => require(['@/views/System/Inform'], resolve)
const Notice = resolve => require(['@/views/System/Notice'], resolve)

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
			meta:{name:'登录'},
      component: Login
    },{
      path: '/',
      name: 'home',
			meta:{name:'首页'},
      component: Home,
      children: [
				{
					path: '/home',
					name: 'index',
					meta:{name:'主页'},
					component: Index
				},
				//user
				{
					path:'/user',
					name: 'user',
					meta:{name:'个人信息'},
					component: User,
				},{
					path:'/user/info',
					name: 'userInfo',
					meta:{name:'个人信息'},
					component: UserInfo
				},{
					path:'/user/followlist',
					name: 'followList',
					meta:{name:'关注列表'},
					component: FollowList
				},{
					path:'/user/maintainlist',
					name: 'maintainList',
					meta:{name:'维修列表'},
					component: MaintainList
				},{
					path:'/user/upkeeplist',
					name: 'upkeepList',
					meta:{name:'保养列表'},
					component: UpkeepList
				},{
					path:'/user/assesslist',
					name: 'assessList',
					meta:{name:'评估列表'},
					component: AssessList
				},
				
				//设备管理
        {
          path: '/Watch/evolution',
          name: 'evolution',
					meta:{name:'版本更新'},
          component: Evolution
        },{
          path: '/Watch/map',
          name: 'map',
					meta:{name:'地图'},
          component: Map
        },{
          path: '/device/:id/:type',
          name: 'device',
					meta:{name:'设备'},
          component: Device
        },
				//维保管理
				{
					path: '/doc/maintain/fault',
					name: 'fault',
					meta:{name:'故障信息'},
					component: Fault
				},{
					path: '/doc/maintain/maintaininfo',
					name: 'maintainInfo',
					meta:{name:'维修信息'},
					component: MaintainInfo
				},{
					path: '/doc/maintain/upkeepinfo',
					name: 'upkeepInfo',
					meta:{name:'保养信息'},
					component: UpkeepInfo
				},{
					path: '/doc/maintain/faultrank',
					name: 'faultRank',
					meta:{name:'故障等级'},
					component: FaultRank
				},												
				//单位管理
					//维保单位
				{
          path: '/doc/maintain/member',
          name: 'maintainMember',
					meta:{name:'维保人员'},
          component: Member
        },{
					path: '/doc/maintain/member/new',
					name: 'maintainMemberNew',
					meta:{name:'添加维保人员'},
					component: MemberDetail
				},{
					path: '/doc/maintain/group',
					name: 'maintainGroup',
					meta:{name:'维保群组管理'},
					component: Group
				},{
					path: '/doc/maintain/group/new',
					name: 'maintainGroupNew',
					meta:{name:'添加维保群组'},
					component: GroupDetail
				},{
					path: '/doc/maintain/site',
					name: 'maintainSite',
					meta:{name:'维保站点管理'},
					component: Site
				},{
					path: '/doc/maintain/site/new',
					name: 'maintainSiteNew',
					meta:{name:'添加维保站点'},
					component: SiteDetail
				},{
					path: '/doc/maintain/site/edit/:id',
					name: 'editSite',
					meta:{name:'编辑维保站点'},
					component: SiteDetail
				},{
					path: '/doc/company',
					name: 'maintainCompany',
					meta:{name:'维保管理'},
					component: Company
				},{
					path: '/doc/maintain/unit',
					name: 'maintainUnit',
					meta:{name:'维保单位管理'},
					component: Unit
				},{
					path: '/doc/maintai/unit/new',
					name: 'maintainUnitNew',
					meta:{name:'添加维保单位'},
					component: UnitDetail
				},{
					path: '/doc/unit/edit/:id',
					name: 'editUnit',
					meta:{name:'编辑维保单位'},
					component: UnitDetail
				},
				//安装单位
				{
					path: '/doc/contractor',
					name: 'contractor',
					meta:{name:'安装单位管理'},
					component: Contractor
				},{
					path: '/doc/contractor/new',
					name: 'maintainContractorNew',
					meta:{name:'添加安装单位'},
					component: ContractorDetail
				},{
					path: '/doc/contractor/edit/:id',
					name: 'editContractor',
					meta:{name:'编辑安装单位'},
					component: ContractorDetail
				},
				//使用单位
				{
					path: '/doc/usedep',
					name: 'usedep',
					meta:{name:'使用单位管理'},
					component: UseDep
				},{
					path: '/doc/usedep/new',
					name: 'maintainUseDepNew',
					meta:{name:'添加使用单位'},
					component: UseDepDetail
				},{
					path: '/doc/usedep/edit/:id',
					name: 'editUseDep',
					meta:{name:'编辑使用单位'},
					component: UseDepDetail
				},
				//物业单位
				{
					path: '/doc/property',
					name: 'property',
					meta:{name:'物业单位管理'},
					component: Property
				},{
					path: '/doc/property/new',
					name: 'maintainPropertyNew',
					meta:{name:'添加物业单位'},
					component: PropertyDetail
				},{
					path: '/doc/property/edit/:id',
					name: 'editProperty',
					meta:{name:'编辑物业单位'},
					component: PropertyDetail
				},		
				//信息管理	
				{
					path: '/evnet/file',
					name: 'elevatorFiles',
					meta:{name:'电梯档案'},
					component: FileIndex
				},{
					path: '/evnet/assess',
					name: 'assessIndex',
					meta:{name:'评估管理'},
					component: AssessIndex
				},{
					path: '/evnet/assess/history',
					name: 'assessHistory',
					meta:{name:'历史记录'},
					component: AssessHistory
				},{
					path: '/evnet/assess/print',
					name: 'assessPrint',
					meta:{name:'打印工单'},
					component: AssessPrint
				},{
					path: '/evnet/assess/report',
					name: 'assessReport',
					meta:{name:'评估报告'},
					component: AssessReport
				},{
					path: '/evnet/setting',
					name: 'settingIndex',
					meta:{name:'出厂设置'},
					component: SettingIndex
				},{
					path: '/evnet/setting/setting',
					name: 'setting',
					meta:{name:'出厂设置/烧录'},
					component: Setting
				},{
					path: '/evnet/setting/print',
					name: 'print',
					meta:{name:'出厂设置/打印'},
					component: Print
				},{
					path: '/evnet/check',
					name: 'checkIndex',
					meta:{name:'检验记录'},
					component: CheckIndex
				},{
					path: '/evnet/check/history',
					name: 'checkHistory',
					meta:{name:'历史记录'},
					component: CheckHistory
				},{
					path: '/evnet/check/print',
					name: 'checkPrint',
					meta:{name:'打印工单'},
					component: CheckPrint
				},{
					path: '/evnet/check/report',
					name: 'checkReport',
					meta:{name:'评估报告'},
					component: CheckReport
				},
				//系统管理
				{
					path: '/system/usermanage',
					name: 'userManage',
					meta:{name:'用户管理'},
					component: UserManage
				},{
					path: '/system/inform',
					name: 'inform',
					meta:{name:'通知记录'},
					component: Inform
				},{
					path: '/system/notice',
					name: 'notice',
					meta:{name:'公告记录'},
					component: Notice
				},
      ],
    },
		{ path: '*', redirect: '/' }
  ]
})
