import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// HTTP相关
let API_ROOT = (process.env.NODE_ENV == 'production')
			// ? 'http://ladder.asynciot.com/v1'
			? 'http://ladder.ezplay.top/v1'
			// :'http://server.paradish.cn'
			:'http://localhost:9001/v1'
Vue.http.options.root = API_ROOT
Vue.http.options.crossOrigin = true;
Vue.http.options.credentials = true ;

export const CommonApi = Vue.resource('common{/key1}{/key2}{/key3}')
export const AccountApi = Vue.resource('accounts{/key1}{/key2}{/key3}')
export const DocApi = Vue.resource('documents{/key1}{/key2}{/key3}')
export const EventApi = Vue.resource('events{/key1}{/key2}{/key3}')
export const MointorApi = Vue.resource('mointors{/key1}{/key2}{/key3}')
export const MaintenanceApi = Vue.resource('maintenance{/key1}{/key2}{/key3}')
