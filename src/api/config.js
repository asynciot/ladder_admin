import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// HTTP相关
let API_ROOT = (process.env.NODE_ENV == 'production')
			? 'http://cake.paradish.cn'
			:'http://localhost:9000'
Vue.http.options.root = API_ROOT
Vue.http.options.crossOrigin = true;
Vue.http.options.credentials = true ;

export const AccountApi = Vue.resource('accounts{/key1}{/key2}{/key3}')
