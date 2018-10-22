// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import iView from 'iview';
import base64url from 'base64url';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import '@/assets/public.scss';    // 使用 CSS
import api from './api'
import moment from 'moment'
import _ from 'lodash'
import { format } from 'date-fns'
import "printthis";
import VueResource from 'vue-resource'; 


Vue.use(VueResource); 
Vue.http.options.emulateJSON = true; 
Vue.config.productionTip = false
Vue.use(iView).use(VueCookie);
Vue.prototype.$api = api
window.$cookie = VueCookie
window._ = _
window.moment = moment;
window.base64url = base64url
window.format = (val, type) => val ? format(val, type) : null;
Vue.prototype.$format = window.format

// router.beforeEach((to, from, next) => {
//   if(window.$cookie.get('id')||to.name=='login'){
//     next()
//   }else {
//     next({name:'login'})
//   }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
