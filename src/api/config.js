import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// HTTP相关
let API_ROOT = (process.env.NODE_ENV == 'production')
			? 'http://localhost:9000'
			:'http://localhost:9000'
Vue.http.options.root = API_ROOT
Vue.http.options.crossOrigin = true;
Vue.http.options.credentials = true ;

export const root = API_ROOT
export const AccountApi = Vue.resource('v1/accounts{/key1}{/key2}{/key3}')
export const DeviceApi = Vue.resource('v1/devices{/key1}{/key2}{/key3}{/key4}')
export const rootApi = Vue.resource('v1{/key1}{/key2}{/key3}{/key4}')
export const MaintenanceApi = Vue.resource('v1/maintenance{/key1}{/key2}{/key3}')
export const DocApi = Vue.resource('v1/documents{/key1}{/key2}{/key3}')