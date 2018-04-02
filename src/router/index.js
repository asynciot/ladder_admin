import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/views/Login'], resolve)
const Home = resolve => require(['@/views/Home'], resolve)

const Index = resolve => require(['@/views/New/Index'], resolve)

const Settings = resolve => require(['@/views/Setting/Settings'], resolve)

const Focus = resolve => require(['@/views/Watch/Focus'], resolve)
const Map = resolve => require(['@/views/Watch/Map'], resolve)
const Data = resolve => require(['@/views/Watch/Data'], resolve)
const Detail = resolve => require(['@/views/Watch/Detail'], resolve)
const Position = resolve => require(['@/views/Watch/Position'], resolve)
const Current = resolve => require(['@/views/Watch/Current'], resolve)
const Speed = resolve => require(['@/views/Watch/Speed'], resolve)
const Params = resolve => require(['@/views/Watch/Params'], resolve)
const DataDetail = resolve => require(['@/views/Watch/Detail'], resolve)
const Video = resolve => require(['@/views/Watch/Video'], resolve)
const Bug = resolve => require(['@/views/Watch/Bug'], resolve)
const Fix = resolve => require(['@/views/Watch/Fix'], resolve)
const Info = resolve => require(['@/views/Watch/Info'], resolve)

const History = resolve => require(['@/views/Event/History'], resolve)
const Level = resolve => require(['@/views/Event/Level'], resolve)
const EditLevel = resolve => require(['@/views/Event/EditLevel'], resolve)
const Code = resolve => require(['@/views/Event/Code'], resolve)
const EditCode = resolve => require(['@/views/Event/EditCode'], resolve)
const Contact = resolve => require(['@/views/Event/Contact'], resolve)
const EditContact = resolve => require(['@/views/Event/EditContact'], resolve)
const BindContact = resolve => require(['@/views/Event/BindContact'], resolve)
const Message = resolve => require(['@/views/Event/Message'], resolve)

const Lift = resolve => require(['@/views/Doc/Lift'], resolve)
const Factory = resolve => require(['@/views/Doc/Factory'], resolve)
const EditFactory = resolve => require(['@/views/Doc/EditFactory'], resolve)
const Install = resolve => require(['@/views/Doc/Install'], resolve)
const EditInstall = resolve => require(['@/views/Doc/EditInstall'], resolve)
const Warranty = resolve => require(['@/views/Doc/Warranty'], resolve)
const EditWarranty = resolve => require(['@/views/Doc/EditWarranty'], resolve)

const Contractor = resolve => require(['@/views/Doc/Contractor'], resolve)
const EditContractor = resolve => require(['@/views/Doc/EditContractor'], resolve)
const WarrantyDep = resolve => require(['@/views/Doc/WarrantyDep'], resolve)
const EditWarrantyDep = resolve => require(['@/views/Doc/EditWarrantyDep'], resolve)
const Rights = resolve => require(['@/views/Doc/Rights'], resolve)
const EditRights = resolve => require(['@/views/Doc/EditRights'], resolve)
const UseDep = resolve => require(['@/views/Doc/UseDep'], resolve)
const EditUseDep = resolve => require(['@/views/Doc/EditUseDep'], resolve)
const Property = resolve => require(['@/views/Doc/Property'], resolve)
const EditProperty = resolve => require(['@/views/Doc/EditProperty'], resolve)


const Building = resolve => require(['@/views/Doc/Building'], resolve)
const EditBuilding = resolve => require(['@/views/Doc/EditBuilding'], resolve)
const Client = resolve => require(['@/views/Doc/Client'], resolve)
const BindLift = resolve => require(['@/views/Doc/BindLift'], resolve)
const LiftManage = resolve => require(['@/views/Doc/LiftManage'], resolve)
const Distribution = resolve => require(['@/views/Doc/Distribution'], resolve)
const ContractorMng = resolve => require(['@/views/Doc/ContractorMng'], resolve)
const EditManufacture = resolve => require(['@/views/Doc/EditManufacture'], resolve)

const NewGroup = resolve => require(['@/views/Warranty/NewGroup'], resolve)
const AddGroup = resolve => require(['@/views/Warranty/AddGroup'], resolve)
const LiftWarranty = resolve => require(['@/views/Warranty/LiftWarranty'], resolve)
const EditRecord = resolve => require(['@/views/Warranty/EditRecord'], resolve)
const AnnualInspetion = resolve => require(['@/views/Warranty/AnnualInspetion'], resolve)
const CheckHistory = resolve => require(['@/views/Warranty/CheckHistory'], resolve)
const EditYearCheck = resolve => require(['@/views/Warranty/EditYearCheck'], resolve)

const Site = resolve => require(['@/views/Warranty/Site'], resolve)
const EditSite = resolve => require(['@/views/Warranty/EditSite'], resolve)
const Team = resolve => require(['@/views/Warranty/Team'], resolve)
const EditTeam = resolve => require(['@/views/Warranty/EditTeam'], resolve)
const People = resolve => require(['@/views/Warranty/People'], resolve)
const EditPeople = resolve => require(['@/views/Warranty/EditPeople'], resolve)
const WarrantyItem = resolve => require(['@/views/Warranty/WarrantyItem'], resolve)
const EditItem = resolve => require(['@/views/Warranty/EditItem'], resolve)
const WarrantyCategory = resolve => require(['@/views/Warranty/WarrantyCategory'], resolve)
const EditCategory = resolve => require(['@/views/Warranty/EditCategory'], resolve)
const BindCategory = resolve => require(['@/views/Warranty/BindCategory'], resolve)

const Role = resolve => require(['@/views/Right/Role'], resolve)
const AddRole = resolve => require(['@/views/Right/AddRole'], resolve)
const EditRole = resolve => require(['@/views/Right/EditRole'], resolve)
const BindRole = resolve => require(['@/views/Right/BindRole'], resolve)
const User = resolve => require(['@/views/Right/User'], resolve)
const EditUser = resolve => require(['@/views/Right/EditUser'], resolve)
const AddUser = resolve => require(['@/views/Right/AddUSer'], resolve)

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
					meta:{name:'消息通知'},
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
					meta:{name:'地图'},
		      component: Map
		    },
				{
		      path: '/data',
		      name: 'data',
					meta:{name:'实时数据监测'},
		      component: Data
		    },
				// {
		    //   path: '/data/:id',
		    //   name: 'dataDetail',
				// 	meta:{name:'电梯监测详情'},
		    //   component: DataDetail
		    // },
				{
		      path: '/data',
		      name: 'dataDetail',
					meta:{name:'电梯监测详情'},
		      component: Detail,
					children: [
						{
							path: '/data/position/:id',
				      name: 'position',
							meta:{name:'电梯监测详情'},
				      component: Position
						},
						{
							path: '/data/current/:id',
				      name: 'current',
							meta:{name:'电梯监测详情'},
				      component: Current
						},
						{
							path: '/data/speed/:id',
				      name: 'speed',
							meta:{name:'电梯监测详情'},
				      component: Speed
						},
						{
							path: '/data/params/:id',
				      name: 'params',
							meta:{name:'电梯监测详情'},
				      component: Params
						},
					]
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
		      path: '/level/add',
		      name: 'addlevel',
					meta:{name:'添加故障级别'},
		      component: EditLevel
		    },
				{
		      path: '/level/edit/:id',
		      name: 'editlevel',
					meta:{name:'编辑故障级别'},
		      component: EditLevel
		    },
				// {
		    //   path: '/level/:id',
		    //   name: 'strategy',
				// 	meta:{name:'处理策略'},
		    //   component: Strategy
		    // },
				{
		      path: '/code',
		      name: 'code',
					meta:{name:'故障代码查询'},
		      component: Code
		    },
				{
		      path: '/code/add',
		      name: 'addcode',
					meta:{name:'添加故障代码'},
		      component: EditCode
		    },
				{
		      path: '/code/edit/:id',
		      name: 'editcode',
					meta:{name:'编辑故障代码'},
		      component: EditCode
		    },
				{
		      path: '/contact',
		      name: 'contact',
					meta:{name:'其他相关资料'},
		      component: Contact
		    },
				{
		      path: '/contact/add',
		      name: 'addcontact',
					meta:{name:'添加联系人'},
		      component: EditContact
		    },
				{
		      path: '/contact/edit/:id',
		      name: 'editcontact',
					meta:{name:'编辑联系人'},
		      component: EditContact
		    },
				{
		      path: '/contact/bind/:id',
		      name: 'bindcontact',
					meta:{name:'绑定电梯'},
		      component: BindContact
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
		      path: '/lift/add',
		      name: 'addlift',
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
		      component: EditFactory
		    },
				{
		      path: '/factory/edit/:id',
		      name: 'editfactory',
					meta:{name:'编辑出厂信息'},
		      component: EditFactory
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
		      component: EditInstall
		    },
				{
		      path: '/install/edit/:id',
		      name: 'editinstall',
					meta:{name:'编辑安装信息'},
		      component: EditInstall
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
		      component: EditWarranty
		    },
				{
		      path: '/warranty/edit/:id',
		      name: 'editwarranty',
					meta:{name:'编辑维保信息'},
		      component: EditWarranty
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
		      component: EditContractor
		    },
				{
		      path: '/contractor/edit/:id',
		      name: 'editcontractor',
					meta:{name:'编辑安装单位'},
		      component: EditContractor
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
		      component: EditWarrantyDep
		    },
				{
		      path: '/warrantydep/edit/:id',
		      name: 'editwarrantydep',
					meta:{name:'编辑维保单位'},
		      component: EditWarrantyDep
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
		      component: EditRights
		    },
				{
		      path: '/rights/edit/:id',
		      name: 'editrights',
					meta:{name:'编辑产权单位'},
		      component: EditRights
		    },
				{
		      path: '/usedep',
		      name: 'usedep',
					meta:{name:'故障联系人'},
		      component: UseDep
		    },
				{
		      path: '/usedep/add',
		      name: 'addusedep',
					meta:{name:'添加联系人'},	
		      component: EditUseDep
		    },
				{
		      path: '/usedep/edit/:id',
		      name: 'editusedep',
					meta:{name:'编辑使用单位'},
		      component: EditUseDep
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
		      component: EditProperty
		    },
				{
		      path: '/property/edit/:id',
		      name: 'editproperty',
					meta:{name:'编辑物业单位'},
		      component: EditProperty
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
		      component: EditBuilding
		    },
				{
		      path: '/building/add/:id',
		      name: 'editbuilding',
					meta:{name:'编辑楼盘信息'},
		      component: EditBuilding
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
		      path: '/manufacture',
		      name: 'manufacture',
					meta:{name:'制造商管理'},
		      component: ContractorMng
		    },
				{
		      path: '/manufacture/add',
		      name: 'addmanufacture',
					meta:{name:'添加制造商'},
		      component: EditManufacture
		    },
				{
		      path: '/manufacture/edit/:id',
		      name: 'editmanufacture',
					meta:{name:'编辑制造商'},
		      component: EditManufacture
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
					meta:{name:'编辑角色'},
		      component: AddRole
		    },
				{
		      path: '/role/right/:id',
		      name: 'rolemenu',
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
		      path: '/user/edit/:id',
		      name: 'edituser',
					meta:{name:'编辑用户'},
		      component: EditUser
		    },
				{
		      path: '/user/role/:id',
		      name: 'bindrole',
					meta:{name:'对应角色'},
		      component: BindRole
		    },
				{
		      path: '/settings',
		      name: 'settings',
					meta:{name:'自定义设置'},
		      component: Settings
		   	},
		   		{
		      path: '/newgroup',
		      name: 'newgroup',
					meta:{name:'新建群'},
		      component: NewGroup
		    },
		    	{
		      path: '/addgroup',
		      name: 'addgroup',
					meta:{name:'加入群'},
		      component: AddGroup
		    },
		    	{
		      path: '/liftwarranty',
		      name: 'liftwarranty',
					meta:{name:'电梯维保信息'},
		      component: LiftWarranty
		    },
				{
		      path: '/liftwarranty',
		      name: 'liftwarranty',
					meta:{name:'电梯维保信息'},
		      component: LiftWarranty
		    },
				{
		      path: '/liftwarranty/edit/:id',
		      name: 'addrecord',
					meta:{name:'录入维保信息'},
		      component: EditRecord
		    },
				{
		      path: '/annualinspetion',
		      name: 'annualinspetion',
					meta:{name:'电梯年检管理'},
		      component: AnnualInspetion
		    },
				{
		      path: '/annualinspetion/add/:ladderNo',
		      name: 'addyearcheck',
					meta:{name:'录入年检登记'},
		      component: EditYearCheck
		    },
				{
		      path: '/annualinspetion/edit/:id',
		      name: 'edityearcheck',
					meta:{name:'编辑年检登记'},
		      component: EditYearCheck
		    },
				{
		      path: '/annualinspetion/history/:id',
		      name: 'yearcheckhistory',
					meta:{name:'年检登记历史'},
		      component: CheckHistory
		    },
				{
		      path: '/site',
		      name: 'site',
					meta:{name:'维保站点管理'},
		      component: Site
		    },
				{
		      path: '/site/add',
		      name: 'addsite',
					meta:{name:'添加维保站点'},
		      component: EditSite
		    },
				{
		      path: '/site/edit/:id',
		      name: 'editsite',
					meta:{name:'编辑维保站点'},
		      component: EditSite
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
		      component: EditTeam
		    },
				{
		      path: '/team/edit/:id',
		      name: 'editteam',
					meta:{name:'添加维保班组'},
		      component: EditTeam
		    },
				{
		      path: '/people',
		      name: 'people',
					meta:{name:'维保人员管理'},
		      component: People
		    },
				{
		      path: '/people/add',
		      name: 'addpeople',
					meta:{name:'添加维保人员'},
		      component: EditPeople
		    },
				{
		      path: '/people/edit/:id',
		      name: 'editpeople',
					meta:{name:'编辑维保人员'},
		      component: EditPeople
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
		      component: EditItem
		    },
				{
		      path: '/warrantyitem/edit/:id',
		      name: 'edititem',
					meta:{name:'编辑保养项'},
		      component: EditItem
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
					meta:{name:'添加保养类别'},
		      component: EditCategory
		    },
				{
		      path: '/warrantycategory/bind/:id',
		      name: 'bindcategory',
					meta:{name:'对应保养项'},
		      component: BindCategory
		    },
				{
		      path: '/warrantycategory/edit/:id',
		      name: 'editcategory',
					meta:{name:'编辑保养类别'},
		      component: EditCategory
		    },
			]
    }
  ]
})
