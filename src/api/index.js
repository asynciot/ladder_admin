import { stringify } from 'qs';
import {
	root,
  AccountApi,
	DeviceApi,
	rootApi
} from './config'
export default {
	ws: (data) => `${root.replace('http', 'ws')}/v1/devices/socket?${stringify(data)}`,
	debug: (data) => `${root.replace('http', 'ws')}/v1/devices/socketDebug?${stringify(data)}`,
  //account
  register:(data)=>{
    return AccountApi.save(data)
  },
	update:(data)=>{
    return AccountApi.update(data)
  },
	user:(data)=>{
    return AccountApi.query({key1:data})
  },
  login:(data)=>{
    return AccountApi.save({key1:'login'},data)
  },
	logout:(data)=>{
    return AccountApi.save({key1:'logout'},data)
  },
	password:(data)=>{
		return AccountApi.save({key1:'password'},data)
	},
	devices: (data) => {
		return DeviceApi.query(Object.assign({key1: 'location'}, data))
	},
	deviceInfo: (data) => {
		return DeviceApi.query({key1: 'info', key2: data })
	},
	monitor: (data, opt) => {
		return DeviceApi.save(Object.assign({key1: 'ladder', key2: 'monitor', key3: data.id, key4: data.num }, opt),{})
	},
	deviceHistory: (id, data)=>{
		return DeviceApi.query(Object.assign({key1:'values', key2: id},data))
	},
	getHistory: (id,data)=>{
		return DeviceApi.query(Object.assign({key1:'ladder', key2: 'waves', key3: id},data))
	},
	staticts: (data)=> {
		return rootApi.query(Object.assign({key1:'mointors', key2: 'statistic'},data))
	}
}
