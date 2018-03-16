export const menu = [
  {
    icon: 'fa-eye',
    label: '监控管理',
    id: 1,
    pId: 0,
    // link:'watch',
    sub: [
      {
        id: 11,
        pId: 1,
        label: '我关注的电梯',
        link: 'focus'
      }, {
        id: 12,
        pId: 1,
        label: '实时地图监测',
        link: 'map'
      }, {
        id: 13,
        pId: 1,
        label: '实时数据监测',
        link: 'data'
      },
			// {
      //   id: 14,
      //   pId: 1,
      //   label: '实时视频监测',
      //   link: 'video'
      // },
			{
        id: 15,
        pId: 1,
        label: '实时故障监测',
        link: 'bug'
      }, {
        id: 16,
        pId: 1,
        label: '实时检修监测',
        link: 'fix'
      },
			// {
      //   id: 17,
      //   pId: 1,
      //   label: '电梯信息列表',
      //   link: 'info'
      // }
    ]
  }, {
    id: 2,
    pId: 0,
    icon: 'fa-calculator',
    label: '事件管理',
    // link:'watch',
    sub: [
      {
        id: 21,
        pId: 2,
        label: '历史事件查询',
        link: 'history'
      }, {
				id:22,
				pId:2,
        label: '故障级别管理',
        link: 'level'
      }, {
				id:23,
				pId:2,
        label: '故障代码管理',
        link: 'code'
      }, {
				id:24,
				pId:2,
        label: '故障联系人',
        link: 'contact'
      },
			// {
			// 	id:25,
			// 	pId:2,
      //   label: '短信预览管理',
      //   link: 'message'
      // }
    ]
  }, {
		id:3,
		pId:0,
    icon: 'fa-file-text',
    label: '档案管理',
    // link:'watch',
    sub: [
      {
				id:31,
				pId:3,
        label: '电梯信息管理',
        sub: [
          {
						id:311,
						pId:31,
            label: '电梯信息查看',
            link: 'lift'
          }, {
						id:312,
						pId:31,
            label: '出厂信息管理',
            link: 'factory'
          }, {
						id:313,
						pId:31,
            label: '安装信息管理',
            link: 'install'
          }, {
						id:314,
						pId:31,
            label: '维保信息管理',
            link: 'warranty'
          }
        ]
      }, {
				id:32,
				pId:3,
        label: '单位管理',
        // link:'level'
        sub: [
          {
						id:321,
						pId:32,
            label: '安装单位管理',
            link: 'contractor'
          }, {
						id:322,
						pId:32,
            label: '维保单位管理',
            link: 'warrantydep'
          }, {
						id:323,
						pId:32,
            label: '产权单位管理',
            link: 'rights'
          }, {
						id:324,
						pId:32,
            label: '使用单位管理',
            link: 'usedep'
          }, {
						id:325,
						pId:32,
            label: '物业单位管理',
            link: 'property'
          }
        ]
      }, {
				id:33,
				pId:3,
        label: '楼盘管理',
        link: 'building'
      }, {
				id:34,
				pId:3,
        label: '智能终端管理',
        link: 'client'
      }, {
				id:35,
				pId:3,
        label: '电梯分配管理',
        link: 'liftmanage'
      }, {
				id:36,
				pId:3,
        label: '制造商管理',
        link: 'manufacture'
      }
    ]
  }, {
		id:4,
		pId:0,
    icon: 'fa-wrench',
    label: '维保管理',
    // link:'watch',
    sub: [
      {
				id:41,
				pId:4,
        label: '电梯维保信息',
        link: 'liftwarranty'
      }, {
				id:42,
				pId:4,
        label: '电梯年检管理',
        link: 'annualinspetion'
      }, {
				id:43,
				pId:4,
        label: '维保站点管理',
        link: 'site'
      }, {
				id:44,
				pId:4,
        label: '维保班组管理',
        link: 'team'
      }, {
				id:45,
				pId:4,
        label: '维保人员管理',
        link: 'people'
      }, {
				id:46,
				pId:4,
        label: '保养项管理',
        link: 'warrantyitem'
      }, {
				id:47,
				pId:4,
        label: '保养类别管理',
        link: 'warrantycategory'
      }
    ]
  }, {
		id:5,
		pId:0,
    icon: 'fa-gear',
    label: '权限管理',
    // link:'watch',
    sub: [
      {
				id:51,
				pId:5,
        label: '角色管理',
        link: 'role'
      }, {
				id:52,
				pId:5,
        label: '用户管理',
        link: 'user'
      }
    ]
  }, {
		id:6,
		pId:0,
    icon: 'fa-wrench',
    label: '系统管理',
    // link:'watch',
    sub: [
      {
				id:61,
				pId:6,
        label: '自定义设置',
        link: 'settings'
      }
    ]
  }
];
