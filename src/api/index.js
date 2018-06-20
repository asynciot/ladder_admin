import {
  AccountApi,
} from './config'
export default {
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
}
