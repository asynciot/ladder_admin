import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// HTTP相关
let API_ROOT = (process.env.NODE_ENV == 'production')
			? 'http://ladder.asynciot.com'
			:'http://ladder.asynciot.com'
Vue.http.options.root = API_ROOT
Vue.http.options.crossOrigin = true;
Vue.http.options.credentials = true ;

export const root = API_ROOT
export const AccountApi = Vue.resource('v1/accounts{/key1}{/key2}{/key3}')
export const DeviceApi = Vue.resource('v1/devices{/key1}{/key2}{/key3}{/key4}')
