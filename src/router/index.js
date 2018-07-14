import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/views/Login'], resolve)
const Home = resolve => require(['@/views/Home'], resolve)
const Menu = resolve => require(['@/views/Menu/Index'], resolve)
const Map = resolve => require(['@/views/Map/Index'], resolve)
const Device = resolve => require(['@/views/Device/Index'], resolve)

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
      ],
    },
		{ path: '*', redirect: '/' }
  ]
})
