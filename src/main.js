// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'

import 'vue-easytable/libs/themes-base/index.css'
import '@/libs/bootstrap/dist/css/bootstrap.min.css'
import '@/libs/AdminLTE.min.css'
import '@/libs/Ionicons/css/ionicons.min.css'
import '@/libs/font-awesome/css/font-awesome.min.css'
import '@/libs/AdminLTE.min.css'
import '@/libs/skins/_all-skins.css'
import '@/libs/layer/theme/default/layer.css'
import '@/libs/dataTables/css/dataTables.bootstrap.css'
import '@/libs/jquery-treetable/css/jquery.treetable.css'
import '@/libs/jquery-treetable/css/jquery.treetable.theme.default.css'
import '@/libs/zTree/css/zTreeStyle/zTreeStyle.css'
import '@/libs/common.css'

import '@/libs/bootstrap/dist/js/bootstrap.min.js'
import '@/libs/jquery-slimscroll/jquery.slimscroll.min.js'
import '@/libs/fastclick/lib/fastclick.js'
import '@/libs/dataTables/js/jquery.dataTables.min.js'
import '@/libs/adminlte.min.js'
import '@/libs/admin.js'
import '@/libs/jquery-treetable/jquery.treetable.js'
import '@/libs/zTree/js/jquery.ztree.all.min.js'
// import '@/libs/layer/layer.js'
// import '@/libs/bootstrap-fileinput/js/locales/zh.js'
import { VTable, VPagination } from 'vue-easytable'
import api from './api'

window.$cookie = VueCookie
Vue.prototype.$api = api
Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
