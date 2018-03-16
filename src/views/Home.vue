<template lang="html">
    <div>
        <div class="wrapper">
            <header class="main-header">
                <!-- Logo -->
                <router-link :to="{name:'index'}" class="logo">
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini">电梯管理</span>
                    <!-- logo for regular state and mobile devices -->
                    <span class="logo-lg">电梯管理系统</span>
                </router-link>
                <!-- Header Navbar: style can be found in header.less -->
                <nav class="navbar navbar-static-top">
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <!-- <li class="dropdown messages-menu"><router-link
															:to="{name:'lift'}" class="dropdown-toggle"> 全部 <span
                                        class="label label-info">4</span> </router-link></li>
                            <li class="dropdown messages-menu"><router-link
															:to="{name:'lift'}" class="dropdown-toggle"> 离线 <span
                                        class="label label-default">4</span> </router-link ></li>
                            <li class="dropdown messages-menu"><router-link
															:to="{name:'lift'}" class="dropdown-toggle"> 故障 <span
                                        class="label label-danger">4</span> </router-link ></li>
                            <li class="dropdown messages-menu"><router-link
															:to="{name:'lift'}" class="dropdown-toggle"> 检修 <span
                                        class="label label-warning">4</span> </router-link ></li>
                            <li class="dropdown messages-menu"><router-link
															:to="{name:'lift'}" class="dropdown-toggle"> 正常 <span
                                        class="label label-success">4</span> </router-link ></li> -->
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="../assets/img/headimg.jpg" class="user-image" alt="User Image">
                                    <span class="hidden-xs">admin</span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li class="user-footer">
                                        <div class="pull-left">
																						<router-link class="btn btn-default btn-flat btn-sm" :to="{name:'edituser',params:{id:$cookie.get('userId')}}">个人信息修改</router-link>
																						<router-link class="btn btn-default btn-flat btn-sm" :to="{name:'edituser',params:{id:$cookie.get('userId')}}">密码修改</router-link>
                                        </div>
                                        <div class="pull-right">
                                            <span @click="logout()" class="btn btn-danger btn-flat btn-sm">退出登录</span>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <!-- Left side column. contains the sidebar -->
            <aside class="main-sidebar">
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">
                    <!-- Sidebar user panel -->
                    <div class="user-panel">
                        <div class="pull-left image">
                            <img src="../assets/img/headimg.jpg" class="img-circle" alt="User Image">
                        </div>
                        <div class="pull-left info">
                            <p v-text="account.nicname"></p>
                            <a href="javascript:void(0)" v-text="account.roleName"></a>
                        </div>
                    </div>
                    <!-- sidebar menu: : style can be found in sidebar.less -->
                    <ul class="sidebar-menu" data-widget="tree">
                        <li :class="['treeview', currentRoute.breadcrumb.label == '首页'?'active':'']">
													<router-link :to="{name: 'index'}">
															<i class="fa fa-dashboard"></i>
															<span>首页</span>
													</router-link>
                        </li>
                        <li
													v-for="nav in menu"
													:class="['treeview', currentRoute.breadcrumb.label1 == nav.label?'active':'']">
                            <a href="#">
                                <i :class="['fa', nav.icon]"></i> <span v-text="nav.label"></span>
                                <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                            </a>
                            <ul class="treeview-menu menu-open">
                                <li
																	v-for="item in nav.sub"
																	:class="['treeview', (currentRoute.breadcrumb.label2 == item.label)||(currentRoute.breadcrumb.label == item.label)?'active':'']">
                                    <router-link v-if="!item.sub" :to="{name: item.link}">
                                        <i class="fa fa-circle-o"></i>{{item.label}}
                                    </router-link>
                                    <a href="#" v-if="item.sub">
                                        <i class="fa fa-circle-o"></i>{{item.label}}
                                        <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                                    </a>
                                    <ul
																			v-if="item.sub"
																			class="treeview-menu menu-open">
                                        <li :class="{'active':currentRoute.breadcrumb.label == sub.label}" v-for="sub in item.sub">
                                            <router-link :to="{name: sub.link}">
                                                <i class="fa fa-circle-o"></i>{{sub.label}}
                                            </router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>
                <!-- /.sidebar -->
            </aside>
            <!-- =============================================== -->
            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <section class="content-header">
                    <h1 v-text="currentRoute.name"></h1>
                    <ol class="breadcrumb">
                        <li v-if="currentRoute.breadcrumb.label1" v-text="currentRoute.breadcrumb.label1"></li>
												<li v-if="currentRoute.breadcrumb.label2" v-text="currentRoute.breadcrumb.label2"></li>
                        <li v-if="currentRoute.breadcrumb.label" class="active" v-text="currentRoute.breadcrumb.label"></li>
                    </ol>
                </section>
                <router-view />

                </section>
                <!-- /.content -->
            </div>
            <!-- /.content-wrapper -->
            <footer class="main-footer">
                <div class="pull-right hidden-xs"> 地址：浙江省宁波市</div>
                <strong>Copyright &copy; 2014-2018
									<!-- <a href="#">xxx Studio</a>. -->
								</strong>
									宁波申菱电梯配件有限公司
            </footer>
        </div>
				<notifications classes="n-light" position="top right" group="ok" />
				<notifications classes="n-light n-error" position="top right" group="error" />
				<v-dialog />
    </div>
</template>

<script>
let breadcrumbs = []

const breadcrumb = (name) => {
	let data = breadcrumbs.filter(nav => nav.link == name) || null
	return data
}
export default {
  data() {
    return {
			isActive: true,
			account:{
				nicname:'admin',
			},
      currentRoute: {
        name: '首页',
        breadcrumb: {label:'首页'}
      },
      menu: []
    }
  },
	created(){
		this.account = JSON.parse(this.$cookie.get('account'))
		this.getMenu()
	},
  mounted() {
    $('[data-toggle="control-sidebar"]').controlSidebar()
    $('[data-toggle="push-menu"]').pushMenu()
		let nav = this.$route.fullPath.split("/")
		if(this.$route.name != 'index') {
			this.currentRoute.name = this.$route.meta.name
			this.currentRoute.breadcrumb = breadcrumb(nav[1])[0]
		}
  },
  watch: {
    '$route' (val) {
			let nav = val.fullPath.split("/")
			if(val.name != 'index') {
				this.currentRoute.name = val.meta.name
				this.currentRoute.breadcrumb = breadcrumb(nav[1])[0]
			}else {
				this.currentRoute = {
	        name: '首页',
	        breadcrumb: {label:'首页'}
	      }
			}
    }
  },
  methods: {
		getMenu(){
			let menu = JSON.parse(this.$storage.get('roleMenu'))
			this.menu = menu
			menu.forEach(item => {
			  item.sub.forEach(sub=>{
					sub.label1 = item.label
					if (sub.sub) {
						sub.sub.forEach(nav=>{
							nav.label1 = item.label
							nav.label2 = sub.label
							breadcrumbs.push(nav)
						})
					}else {
						breadcrumbs.push(sub)
					}
				})
			})
		},
    async logout() {
      let res = await this.$api.logout({});
      if (0 === res.data.code) {
				this.$storage.remove('roleMenu')
        this.$cookie.delete('userId');
				this.$cookie.delete('account');
	      this.$router.replace({
	        name: "login"
	      });
      }
    }
  }
};
</script>

<style lang="css">

</style>
