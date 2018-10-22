<template>
	<div class="layout">
		<Layout :style="{minHeight: '100vh'}">
			<Sider  hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" >
				<Menu :class="menuitemClasses" theme="dark" width="auto" @on-select="go" :active-name="active">
					<div class="layout-logo-left"  v-on:click="gethome()">
						首页 
					</div>
					<template v-for="item in menu" v-if="!item.sub" >
						<Menu-item :key="item.name" :name="item.name" >
							<Icon :type="item.icon" size="16" ></Icon>
							{{isCollapsed?'':item.label}}
						</Menu-item>
					</template>
					<template v-else>
						<Submenu :name="item.name">
							<template slot="title">
								<Icon :type="item.icon" size="16"></Icon>
								<Badge v-if="item.count" :count="item.count" class-name="badge-sub-alone" :dot="true">
									{{isCollapsed?'':item.label}}
								</Badge>
								<i v-else>{{isCollapsed?'':item.label}}</i>
							</template>
							<Menu-item class="submenu" v-for="sub in item.sub" :key="sub.name" :name="sub.name">
								<Badge class-name="badge-alone" overflow-count="99" :count="sub.count?sub.count:0">{{sub.label}}</Badge>
							</Menu-item>
						</Submenu>
					</template>
				</Menu>
			</Sider>
			<Layout>
				<Header class="clearfix" :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
					<h2 class="header-title fl">宁波申菱 管理系统</h2>
					<Dropdown class="layout-header-user fr" @on-click="logout" trigger="click" style="margin-left: 20px">
						<Button type="ghost" long>
							{{role[$cookie.get('role')]}}
							<Icon type="ios-contact"></Icon>
						</Button>
						<Dropdown-menu slot="list">
							<Dropdown-item :name="4">个人信息</Dropdown-item>
							<Dropdown-item :name="3">退出</Dropdown-item>
						</Dropdown-menu>
					</Dropdown>
				</Header>
				<Content :style="{padding: '0 16px 16px',position:'relative'}">
					<div class="layout-breadcrumb noprint">
						<Breadcrumb>
							<Breadcrumb-item>{{$route.meta.name}} {{$route.params.id}}</Breadcrumb-item>
						</Breadcrumb>
					</div>
					<div class="layout-content">
						<transition name="fade">
							<router-view></router-view>
						</transition>
					</div>
				</Content>
			</Layout>
		</Layout>
	</div>
</template>

<script>
	export default {
		data() {
			const validateOldPassCheck = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.password.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				isCollapsed: false,
				modal: false,
				modalType: 0,
				info: {
					nicname: '',
					phone: ''
				},
				password: {
					oldPassword: '',
					password: ''
				},
				passwordRules: {
					oldPassword: [{
						required: true,
						message: '旧密码不能为空',
						trigger: 'blur'
					}, {
						min: 5,
						message: '密码不能少于6个字符',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '新密码不能为空',
						trigger: 'blur'
					}, {
						min: 5,
						message: '密码不能少于6个字符',
						trigger: 'blur'
					}],
					confirm: [{
						validator: validateOldPassCheck,
						required: true,
						trigger: 'blur'
					}],
				},
				role: {
					0: '管理员',
				},
				count: null,
				active: this.$route.path.split('/')[1],
				menu: [{
						name: 'menu',
						icon: 'cube',
						label: '运行监控',
						sub:[{
							name:'map',
							label:'运行状态'
						},{
							name:'evolution',
							label:'更新状态',
						}
						]
					},{
						name: 'maintain',
						icon: 'settings',
						label: '维保管理',
						sub: [{
								name: 'fault',
								label: '故障信息',
							},
							{
								name: 'maintainInfo',
								label: '维修信息',
							},
							{
								name: 'upkeepInfo',
								label: '保养信息',
							},
							{
								name: 'faultRank',
								label: '故障等级',
							}
						],
					},{
						name: 'company',
						icon: 'home',
						label: '单位管理',
						sub: [{
								name: 'contractor',
								label: '安装单位',
							},
							{
								name: 'maintainCompany',
								label: '维保单位',
							},
							{
								name: 'usedep',
								label: '使用单位',
							},
							{
								name: 'property',
								label: '物业单位',
							}
						],
					}, {
						name: 'event',
						icon: 'ios-list',
						label: '档案管理',
						sub: [{
								name: 'elevatorFiles',
								label: '设备信息',
							},
							{
								name: 'assessIndex',
								label: '评估管理',
							},
							{
								name: 'settingIndex',
								label: '出厂设置',
							},
							{
								name: 'checkIndex',
								label: '检验记录',
							}
						],
					},
					{
						name: 'system',
						icon: 'ios-settings',
						label: '系统管理',
						sub: [{
								name: 'userManage',
								label: '用户管理',
							},
							{
								name: 'inform',
								label: '通知记录',
							},{
								name: 'notice',
								label: '公告记录',
							}
						],
					},
				]
			}
		},
		computed: {
			menuitemClasses: function() {
				return [
					'menu-item',
					this.isCollapsed ? 'collapsed-menu' : ''
				]
			}
		},
		created() {},
		methods: {
			gethome(){
				this.$router.push({
					name:'index'
				})
			},
			async logout(index) {
				this.modalType = parseInt(index)
				switch (parseInt(index)) {
					case 1:
						let user = await this.$api.user(this.$cookie.get('id'))
						this.info = user.data.account.data
						this.modal = true
						break;
					case 2:
						this.modal = true
						break;
						break;
					case 3:
						let res = await this.$api.logout({})
						window.$cookie.delete('id')
						window.$cookie.delete('role')
						this.$router.replace({
							name: 'login'
						})
						break;
					case 4:
						let resp = await this.$api.user({})
						this.$router.push({
							name: 'userInfo'
						})
				}
			},
			go(name) {
				if (typeof name === 'string')
					this.$router.push({
						name: name
					});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.layout-breadcrumb {
		padding: 10px 15px 0;
	}

	.laycontent {
		position: relative;
	}

	.layout-content {
		// position: relative;
		position: absolute;
		top: 30px;
		left: 0;
		right: 0;
		bottom: 10px;
		margin: 15px;
		overflow: hidden;
		background: #fff;
		border-radius: 4px;
		// min-height: 500px;
		// min-height: 100%;
	}

	.layout-copy {
		position: absolute;
		left: 0;
		right: 0;
		text-align: center;
		padding: 0 0 15px;
		color: #9ea7b4;
		bottom: 0;
	}

	.ivu-row-flex {
		height: 100%;
	}

	.layout-menu-left {
		background: #464c5b;
		// overflow-y: scroll;
	}

	.layout-menu-ul {
		padding-top: 1px;
	}

	.layout-header {
		height: 60px;
		background: #fff;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
	}

	.layout-header-user {
		height: 40px;
	}

	.layout-logo-left {
		width: 90%;
		height: 30px;
		line-height: 30px;
		background: #5b6270;
		border-radius: 3px;
		margin: 15px auto 36px;
		color: #fff;
		font-size: 18px;
		font-weight: bold;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item {
		color: #FDFEFC;
	}

	.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
		// color: #39f;
	}

	.submenu {
		padding: 8px 24px;
	}

	.header-title {
		line-height: 60px;
		padding-left: 20px;
	}

	.info {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}
</style>
