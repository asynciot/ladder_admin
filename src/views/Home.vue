<template lang="html">
    <div class="">
        <div class="wrapper">
            <header class="main-header">
                <!-- Logo -->
                <a href="index.html" class="logo">
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini">电梯管理</span>
                    <!-- logo for regular state and mobile devices -->
                    <span class="logo-lg">电梯管理系统</span>
                </a>
                <!-- Header Navbar: style can be found in header.less -->
                <nav class="navbar navbar-static-top">
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li class="dropdown messages-menu"><router-link
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
                                        class="label label-success">4</span> </router-link ></li>
                            <!-- User Account: style can be found in dropdown.less -->
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="../assets/img/headimg.jpg" class="user-image" alt="User Image">
                                    <span class="hidden-xs">admin</span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li class="user-footer">
                                        <div class="pull-left">
																						<router-link class="btn btn-default btn-flat btn-sm" :to="{name:'EditUser'}">个人信息修改</router-link>
                                            <!-- <a href="quanxianguanli-yonghuguanli-tianjiayonghu.html" class="btn btn-default btn-flat btn-sm"></a> <a href="quanxianguanli-yonghuguanli-tianjiayonghu.html" class="btn btn-default btn-flat btn-sm">密码修改</a> -->
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
            <!-- =============================================== -->
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
                            <p>admin</p>
                            <a href="#">系统管理员</a>
                        </div>
                    </div>
                    <!-- sidebar menu: : style can be found in sidebar.less -->
                    <ul class="sidebar-menu" data-widget="tree">
                        <li class="treeview active">
                            <a href="#">
                                <i class="fa fa-dashboard"></i> <span>首页</span>
                            </a>
                        </li>
                        <li class="treeview" v-for="nav in menu">
                            <a href="#">
                                <i :class="['fa', nav.icon]"></i> <span v-text="nav.label"></span>
                                <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                            </a>
                            <ul class="treeview-menu menu-open">
                                <li v-for="item in nav.sub" :class="item.sub?'treeview':''">
                                    <router-link v-if="!item.sub" :to="{name: item.link}">
                                        <i class="fa fa-circle-o"></i>{{item.label}}
                                    </router-link>
                                    <a href="#" v-if="item.sub">
                                        <i class="fa fa-circle-o"></i>{{item.label}}
                                        <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                                    </a>
                                    <ul v-if="item.sub" class="treeview-menu menu-open">
                                        <li v-for="sub in item.sub">
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
                        <li><a href="shijianguanli-lishishijianchaxun.html">事件管理</a></li>
                        <li class="active">历史事件查询</li>
                    </ol>
                </section>
                <router-view/>

                </section>
                <!-- /.content -->
            </div>
            <!-- /.content-wrapper -->
            <footer class="main-footer">
                <div class="pull-right hidden-xs"> 详细地址：陕西省西安市</div>
                <strong>Copyright &copy; 2014-2018 <a href="#">xxx Studio</a>.</strong> 某某管理有限公司
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            currentRoute:{
                name:'首页',
                breadcrumb:[]
            },
            menu:[
                {
                    icon:'fa-eye',
                    label:'监控管理',
                    // link:'watch',
                    sub:[
                        {
                            label:'我关注的电梯',
                            link:'focus'
                        },
                        {
                            label:'实时地图监测',
                            link:'map'
                        },
                        {
                            label:'实时数据监测',
                            link:'data'
                        },
                        {
                            label:'实时视频监测',
                            link:'video'
                        },
                        {
                            label:'实时故障监测',
                            link:'bug'
                        },
                        {
                            label:'实时检修监测',
                            link:'fix'
                        },
                        {
                            label:'电梯信息列表',
                            link:'info'
                        },
                    ]
                },
                {
                    icon:'fa-calculator',
                    label:'事件管理',
                    // link:'watch',
                    sub:[
                        {
                            label:'历史事件查询',
                            link:'history'
                        },
                        {
                            label:'故障级别管理',
                            link:'level'
                        },
                        {
                            label:'故障代码管理',
                            link:'code'
                        },
                        {
                            label:'故障联系人',
                            link:'contact'
                        },
                        {
                            label:'短信预览管理',
                            link:'message'
                        },
                    ]
                },
                {
                    icon:'fa-file-text',
                    label:'档案管理',
                    // link:'watch',
                    sub:[
                        {
                            label:'电梯信息管理',
                            sub:[
                                {
                                    label:'电梯信息查看',
                                    link:'lift'
                                },
                                {
                                    label:'出厂信息管理',
                                    link:'factory'
                                },
                                {
                                    label:'安装信息管理',
                                    link:'install'
                                },
                                {
                                    label:'维保信息管理',
                                    link:'warranty'
                                },
                            ]
                        },
                        {
                            label:'单位管理',
                            // link:'level'
                            sub:[
                                {
                                    label:'安装单位管理',
                                    link:'contractor'
                                },
                                {
                                    label:'维保单位管理',
                                    link:'warrantydep'
                                },
                                {
                                    label:'产权单位管理',
                                    link:'rights'
                                },
                                {
                                    label:'使用单位管理',
                                    link:'usedep'
                                },
                                {
                                    label:'物业单位管理',
                                    link:'property'
                                },
                            ]
                        },
                        {
                            label:'楼盘管理',
                            link:'building'
                        },
                        {
                            label:'智能终端管理',
                            link:'client'
                        },
                        {
                            label:'电梯分配管理',
                            link:'liftmanage'
                        },
                        {
                            label:'制造商管理',
                            link:'contractormanage'
                        },
                    ]
                },
                {
                    icon:'fa-wrench',
                    label:'维保管理',
                    // link:'watch',
                    sub:[
                        {
                            label:'电梯维保信息',
                            link:'liftwarranty'
                        },
                        {
                            label:'电梯年检管理',
                            link:'annualinspetion'
                        },
                        {
                            label:'维保站点管理',
                            link:'site'
                        },
                        {
                            label:'维保班组管理',
                            link:'team'
                        },
                        {
                            label:'维保人员管理',
                            link:'people'
                        },
                        {
                            label:'保养项管理',
                            link:'warrantyitem'
                        },
                        {
                            label:'保养类别管理',
                            link:'warrantycategory'
                        }
                    ]
                },
                {
                    icon:'fa-gear',
                    label:'权限管理',
                    // link:'watch',
                    sub:[
                        {
                            label:'角色管理',
                            link:'role'
                        },
                        {
                            label:'用户管理',
                            link:'user'
                        },
                    ]
                },
                {
                    icon:'fa-wrench',
                    label:'系统管理',
                    // link:'watch',
                    sub:[
                        {
                            label:'自定义设置',
                            link:'settings'
                        },
                    ]
                }
            ]
        }
    },
    mounted(){
        $('[data-toggle="control-sidebar"]').controlSidebar()
        $('[data-toggle="push-menu"]').pushMenu()
        this.currentRoute.name = this.$route.meta.name
    },
    watch:{
        '$route'(val){
            this.currentRoute.name = val.meta.name
        }
    },
    methods: {
        async logout() {
            // let res = await this.$api.logout({});
            // if (0 === res.data.code) {
                this.$router.replace({
                    name: "login"
                });
            // }
        }
    }
};
</script>

<style lang="css">

</style>
