import {
  AccountApi,
	CommonApi,
	DocApi,
} from './config'
export default {
  //account
  register:(data)=>{
    return AccountApi.save(data)
  },
	updateUser:(data)=>{
    return AccountApi.update(data)
  },
	user:(data)=>{
    return AccountApi.query(data)
  },
	reomveUser:(data)=>{
    return AccountApi.remove(data)
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
	addRole:(data)=>{
		return AccountApi.save({key1:'authority'},data)
	},
	updateRole:(data)=>{
		return AccountApi.update({key1:'authority'},data)
	},
	reomveRole:(data)=>{
    return AccountApi.remove(Object.assign({key1:'authority'},data))
  },
	//setting
	addSettings:(data)=>{
		return CommonApi.save({key1:'settings'},data)
	},
	//doc
	manufacturer:(data)=>{
		return DocApi.query(Object.assign({key1:'manufacturer'},data))
	},
	addManufacturer:(data)=>{
		return DocApi.save({key1:'manufacturer'},data)
	},
	updateManufacturer:(data)=>{
		return DocApi.update({key1:'manufacturer'},data)
	},
	reomveManufacturer:(data)=>{
    return DocApi.remove(Object.assign({key1:'manufacturer'},data))
  },
	building:(data)=>{
		return DocApi.query(Object.assign({key1:'building'},data))
	},
	addBuilding:(data)=>{
		return DocApi.save({key1:'building'},data)
	},
	updateBuilding:(data)=>{
		return DocApi.update({key1:'building'},data)
	},
	reomveBuilding:(data)=>{
    return DocApi.remove(Object.assign({key1:'building'},data))
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
	reomveCompany:(data)=>{
    return DocApi.remove(Object.assign({key1:'company'},data))
  },
	product:(data)=>{
		return DocApi.query(Object.assign({key1:'productInfo'},data))
	},
	addProduct:(data)=>{
		return DocApi.save({key1:'productInfo'},data)
	},
	updateProduct:(data)=>{
		return DocApi.update({key1:'productInfo'},data)
	},
	reomveProduct:(data)=>{
    return DocApi.remove(Object.assign({key1:'productInfo'},data))
  },
	maintenance:(data)=>{
		return DocApi.query(Object.assign({key1:'maintenanceInfo'},data))
	},
	addMaintenance:(data)=>{
		return DocApi.save({key1:'maintenanceInfo'},data)
	},
	updateMaintenance:(data)=>{
		return DocApi.update({key1:'maintenanceInfo'},data)
	},
	reomveMaintenance:(data)=>{
    return DocApi.remove(Object.assign({key1:'maintenanceInfo'},data))
  },
	setInfo:(data)=>{
		return DocApi.query(Object.assign({key1:'setupInfo'},data))
	},
	addSetInfo:(data)=>{
		return DocApi.save({key1:'setupInfo'},data)
	},
	updateSetInfo:(data)=>{
		return DocApi.update({key1:'setupInfo'},data)
	},
	reomveSetInfo:(data)=>{
    return DocApi.remove(Object.assign({key1:'setupInfo'},data))
  },
}
