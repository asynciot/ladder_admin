import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/views/Login'], resolve)
const Home = resolve => require(['@/views/Home'], resolve)
const Index = resolve => require(['@/views/Index'], resolve)
const Settings = resolve => require(['@/views/Settings'], resolve)

const Focus = resolve => require(['@/views/Watch/Focus'], resolve)
const Map = resolve => require(['@/views/Watch/Map'], resolve)
const Data = resolve => require(['@/views/Watch/Data'], resolve)
const DataDetail = resolve => require(['@/views/Watch/Detail'], resolve)
const Video = resolve => require(['@/views/Watch/Video'], resolve)
const Bug = resolve => require(['@/views/Watch/Bug'], resolve)
const Fix = resolve => require(['@/views/Watch/Fix'], resolve)
const Info = resolve => require(['@/views/Watch/Info'], resolve)

const History = resolve => require(['@/views/Event/History'], resolve)
const Level = resolve => require(['@/views/Event/Level'], resolve)
const Strategy = resolve => require(['@/views/Event/Strategy'], resolve)
const Code = resolve => require(['@/views/Event/Code'], resolve)
const AddCode = resolve => require(['@/views/Event/AddCode'], resolve)
const Contact = resolve => require(['@/views/Event/Contact'], resolve)
const AddContact = resolve => require(['@/views/Event/AddContact'], resolve)
const Message = resolve => require(['@/views/Event/Message'], resolve)

const Lift = resolve => require(['@/views/Doc/Lift'], resolve)
const Factory = resolve => require(['@/views/Doc/Factory'], resolve)
const AddFactory = resolve => require(['@/views/Doc/AddFactory'], resolve)
const Install = resolve => require(['@/views/Doc/Install'], resolve)
const AddInstall = resolve => require(['@/views/Doc/AddInstall'], resolve)
const Warranty = resolve => require(['@/views/Doc/Warranty'], resolve)
const AddWarranty = resolve => require(['@/views/Doc/AddWarranty'], resolve)

const Contractor = resolve => require(['@/views/Doc/Contractor'], resolve)
const AddContractor = resolve => require(['@/views/Doc/AddContractor'], resolve)
const WarrantyDep = resolve => require(['@/views/Doc/WarrantyDep'], resolve)
const AddWarrantyDep = resolve => require(['@/views/Doc/AddWarrantyDep'], resolve)
const Rights = resolve => require(['@/views/Doc/Rights'], resolve)
const AddRights = resolve => require(['@/views/Doc/AddRights'], resolve)
const UseDep = resolve => require(['@/views/Doc/UseDep'], resolve)
const AddUseDep = resolve => require(['@/views/Doc/AddUseDep'], resolve)
const Property = resolve => require(['@/views/Doc/Property'], resolve)
const AddProperty = resolve => require(['@/views/Doc/AddProperty'], resolve)

const Building = resolve => require(['@/views/Doc/Building'], resolve)
const AddBuilding = resolve => require(['@/views/Doc/AddBuilding'], resolve)
const Client = resolve => require(['@/views/Doc/Client'], resolve)
const BindLift = resolve => require(['@/views/Doc/BindLift'], resolve)
const LiftManage = resolve => require(['@/views/Doc/LiftManage'], resolve)
const Distribution = resolve => require(['@/views/Doc/Distribution'], resolve)
const ContractorManage = resolve => require(['@/views/Doc/ContractorManage'], resolve)
const AddManufacture = resolve => require(['@/views/Doc/AddManufacture'], resolve)

const LiftWarranty = resolve => require(['@/views/Warranty/LiftWarranty'], resolve)
const AnnualInspetion = resolve => require(['@/views/Warranty/AnnualInspetion'], resolve)
const Site = resolve => require(['@/views/Warranty/Site'], resolve)
const Team = resolve => require(['@/views/Warranty/Team'], resolve)
const AddTeam = resolve => require(['@/views/Warranty/AddTeam'], resolve)
const People = resolve => require(['@/views/Warranty/People'], resolve)
const AddPeople = resolve => require(['@/views/Warranty/AddPeople'], resolve)
const WarrantyItem = resolve => require(['@/views/Warranty/WarrantyItem'], resolve)
const AddItem = resolve => require(['@/views/Warranty/AddItem'], resolve)
const WarrantyCategory = resolve => require(['@/views/Warranty/WarrantyCategory'], resolve)
const AddCategory = resolve => require(['@/views/Warranty/AddCategory'], resolve)

const Role = resolve => require(['@/views/Right/Role'], resolve)
const AddRole = resolve => require(['@/views/Right/AddRole'], resolve)
const EditRole = resolve => require(['@/views/Right/EditRole'], resolve)
const User = resolve => require(['@/views/Right/User'], resolve)
const AddUser = resolve => require(['@/views/Right/AddUser'], resolve)

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
      path: '/home',
      name: 'home',
      component: Home,
			children: [
				{
		      path: '/index',
		      name: 'index',
					meta:{name:'首页'},
		      component: Index
		    },
				{
		      path: '/focus',
		      name: 'focus',
					meta:{name:'我关注的电梯'},
		      component: Focus
		    },
				{
		      path: '/map',
		      name: 'map',
					meta:{name:'实时地图监测'},
		      component: Map
		    },
				{
		      path: '/data',
		      name: 'data',
					meta:{name:'实时数据监测'},
		      component: Data
		    },
				{
		      path: '/data/:id',
		      name: 'dataDetail',
					meta:{name:'电梯监测详情'},
		      component: DataDetail
		    },
				{
		      path: '/video',
		      name: 'video',
					meta:{name:'实时视频监测'},
		      component: Video
		    },
				{
		      path: '/bug',
		      name: 'bug',
					meta:{name:'实时故障监测'},
		      component: Bug
		    },
				{
		      path: '/fix',
		      name: 'fix',
					meta:{name:'实时检修监测'},
		      component: Fix
		    },
				{
		      path: '/info',
		      name: 'info',
					meta:{name:'电梯信息列表'},
		      component: Info
		    },
				{
		      path: '/history',
		      name: 'history',
					meta:{name:'历史事件查询'},
		      component: History
		    },
				{
		      path: '/level',
		      name: 'level',
					meta:{name:'故障级别管理'},
		      component: Level
		    },
				{
		      path: '/level/:id',
		      name: 'strategy',
					meta:{name:'处理策略'},
		      component: Strategy
		    },
				{
		      path: '/code',
		      name: 'code',
					meta:{name:'故障代码管理'},
		      component: Code
		    },
				{
		      path: '/code/add',
		      name: 'addcode',
					meta:{name:'添加故障代码'},
		      component: AddCode
		    },
				{
		      path: '/contact',
		      name: 'contact',
					meta:{name:'故障联系人'},
		      component: Contact
		    },
				{
		      path: '/contact/add',
		      name: 'addcontact',
					meta:{name:'添加联系人'},
		      component: AddContact
		    },
				{
		      path: '/message',
		      name: 'message',
					meta:{name:'短信预览管理'},
		      component: Message
		    },
				{
		      path: '/lift',
		      name: 'lift',
					meta:{name:'电梯信息查看'},
		      component: Lift
		    },
				{
		      path: '/factory',
		      name: 'factory',
					meta:{name:'出厂信息管理'},
		      component: Factory
		    },
				{
		      path: '/factory/add',
		      name: 'addfactory',
					meta:{name:'添加出厂信息'},
		      component: AddFactory
		    },
				{
		      path: '/install',
		      name: 'install',
					meta:{name:'安装信息管理'},
		      component: Install
		    },
				{
		      path: '/install/add',
		      name: 'addinstall',
					meta:{name:'添加安装信息'},
		      component: AddInstall
		    },
				{
		      path: '/warranty',
		      name: 'warranty',
					meta:{name:'维保信息管理'},
		      component: Warranty
		    },
				{
		      path: '/warranty/add',
		      name: 'addwarranty',
					meta:{name:'添加维保信息'},
		      component: AddWarranty
		    },
				{
		      path: '/contractor',
		      name: 'contractor',
					meta:{name:'安装单位管理'},
		      component: Contractor
		    },
				{
		      path: '/contractor/add',
		      name: 'addcontractor',
					meta:{name:'添加安装单位'},
		      component: AddContractor
		    },
				{
		      path: '/warrantydep',
		      name: 'warrantydep',
					meta:{name:'维保单位管理'},
		      component: WarrantyDep
		    },
				{
		      path: '/warrantydep/add',
		      name: 'addwarrantydep',
					meta:{name:'添加维保单位'},
		      component: AddWarrantyDep
		    },
				{
		      path: '/rights',
		      name: 'rights',
					meta:{name:'产权单位管理'},
		      component: Rights
		    },
				{
		      path: '/rights/add',
		      name: 'addrights',
					meta:{name:'添加产权单位'},
		      component: AddRights
		    },
				{
		      path: '/usedep',
		      name: 'usedep',
					meta:{name:'使用单位管理'},
		      component: UseDep
		    },
				{
		      path: '/usedep/add',
		      name: 'addusedep',
					meta:{name:'添加使用单位'},
		      component: AddUseDep
		    },
				{
		      path: '/property',
		      name: 'property',
					meta:{name:'物业单位管理'},
		      component: Property
		    },
				{
		      path: '/property/add',
		      name: 'addproperty',
					meta:{name:'添加物业单位'},
		      component: AddProperty
		    },
				{
		      path: '/building',
		      name: 'building',
					meta:{name:'楼盘管理'},
		      component: Building
		    },
				{
		      path: '/building/add',
		      name: 'addbuilding',
					meta:{name:'添加楼盘信息'},
		      component: AddBuilding
		    },
				{
		      path: '/client',
		      name: 'client',
					meta:{name:'智能终端管理'},
		      component: Client
		    },
				{
		      path: '/client/:id',
		      name: 'bindlift',
					meta:{name:'绑定电梯'},
		      component: BindLift
		    },
				{
		      path: '/liftmanage',
		      name: 'liftmanage',
					meta:{name:'电梯分配管理'},
		      component: LiftManage
		    },
				{
		      path: '/liftmanage/:id',
		      name: 'distribution',
					meta:{name:'分配电梯'},
		      component: Distribution
		    },
				{
		      path: '/contractormanage',
		      name: 'contractormanage',
					meta:{name:'制造商管理'},
		      component: ContractorManage
		    },
				{
		      path: '/manufacture/add',
		      name: 'addmanufacture',
					meta:{name:'添加制造商'},
		      component: AddManufacture
		    },
				{
		      path: '/role',
		      name: 'role',
					meta:{name:'角色管理'},
		      component: Role
		    },
				{
		      path: '/role/add',
		      name: 'addrole',
					meta:{name:'角色管理'},
		      component: AddRole
		    },
				{
		      path: '/role/edit/:id',
		      name: 'editrole',
					meta:{name:'对应权限'},
		      component: EditRole
		    },
				{
		      path: '/user',
		      name: 'user',
					meta:{name:'用户管理'},
		      component: User
		    },
				{
		      path: '/user/add',
		      name: 'adduser',
					meta:{name:'添加用户'},
		      component: AddUser
		    },
				{
		      path: '/settings',
		      name: 'settings',
					meta:{name:'自定义设置'},
		      component: Settings
		    },
				{
		      path: '/liftwarranty',
		      name: 'liftwarranty',
					meta:{name:'电梯维保信息'},
		      component: LiftWarranty
		    },
				{
		      path: '/annualinspetion',
		      name: 'annualinspetion',
					meta:{name:'电梯年检管理'},
		      component: AnnualInspetion
		    },
				{
		      path: '/site',
		      name: 'site',
					meta:{name:'维保站点管理'},
		      component: Site
		    },
				{
		      path: '/team',
		      name: 'team',
					meta:{name:'维保班组管理'},
		      component: Team
		    },
				{
		      path: '/team/add',
		      name: 'addteam',
					meta:{name:'添加维保班组'},
		      component: AddTeam
		    },
				{
		      path: '/people',
		      name: 'people',
					meta:{name:'维保人员管理'},
		      component: People
		    },
				{
		      path: '/AddPeople',
		      name: 'addpeople',
					meta:{name:'添加维保人员'},
		      component: AddPeople
		    },
				{
		      path: '/warrantyitem',
		      name: 'warrantyitem',
					meta:{name:'保养项管理'},
		      component: WarrantyItem
		    },
				{
		      path: '/warrantyitem/add',
		      name: 'additem',
					meta:{name:'添加保养项'},
		      component: AddItem
		    },
				{
		      path: '/warrantycategory',
		      name: 'warrantycategory',
					meta:{name:'保养类别管理'},
		      component: WarrantyCategory
		    },
				{
		      path: '/warrantycategory/add',
		      name: 'addcategory',
					meta:{name:'保养类别管理'},
		      component: AddCategory
		    },
			]
    }
  ]
})
