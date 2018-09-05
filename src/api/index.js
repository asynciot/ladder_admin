import { stringify } from 'qs';
import {
	root,
	AccountApi,
	DeviceApi,
	rootApi,
	MaintenanceApi,
	DocApi
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
	//role
	role:(data)=>{
		return AccountApi.query(Object.assign({key1:'authority'},data))
	},
	//device
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
	},
	//maintain
	people:(data)=>{
		return MaintenanceApi.query(Object.assign({key1:'member'},data))
	},
	addPeople:(data)=>{
		return MaintenanceApi.save({key1:'member'},data)
	},
	updatePeople:(data)=>{
		return MaintenanceApi.update({key1:'member'},data)
	},
	removePeople:(data)=>{
    return MaintenanceApi.remove(Object.assign({key1:'member'},data))
  },
	//doc
	team:(data)=>{
		return MaintenanceApi.query(Object.assign({key1:'group'},data))
	},
	addTeam:(data)=>{
		return MaintenanceApi.save({key1:'group'},data)
	},
	updateTeam:(data)=>{
		return MaintenanceApi.update({key1:'group'},data)
	},
	removeTeam:(data)=>{
    return MaintenanceApi.remove(Object.assign({key1:'group'},data))
  },
	company:(data)=>{
		return DocApi.query(Object.assign({key1:'company'},data))
	},
	addCompany:(data)=>{
		return DocApi.save({key1:'company'},data)
	},
	updateCompany:(data)=>{
		return DocApi.update({key1:'company'},data)
	},
	removeCompany:(data)=>{
		return DocApi.remove(Object.assign({key1:'company'},data))
	},
	site:(data)=>{
		return MaintenanceApi.query(Object.assign({key1:'site'},data))
	},
}
