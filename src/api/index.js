import {
  AccountApi,
	CommonApi,
	DocApi,
	EventApi,
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
	device:(data)=>{
		return DocApi.query(Object.assign({key1:'deviceMgr'},data))
	},
	searchDevice:(data)=>{
		return DocApi.query({key1:'deviceMgr',key2:data})
	},
	addDevice:(data)=>{
		return DocApi.save({key1:'deviceMgr'},data)
	},
	updateDevice:(data)=>{
		return DocApi.update({key1:'deviceMgr'},data)
	},
	reomveDevice:(data)=>{
    return DocApi.remove(Object.assign({key1:'deviceMgr'},data))
  },
	ladderBinder:(data)=>{
		return DocApi.query(Object.assign({key1:'ladderBinder'},data))
	},
	addLadderBinder:(data)=>{
		return DocApi.save({key1:'ladderBinder'},data)
	},
	updateLadderBinder:(data)=>{
		return DocApi.update({key1:'ladderBinder'},data)
	},
	reomveLadderBinder:(data)=>{
    return DocApi.remove(Object.assign({key1:'ladderBinder'},data))
  },
	history:(data)=>{
		return EventApi.query(Object.assign({key1:'historyEvent'},data))
	},
	addHistory:(data)=>{
		return EventApi.save({key1:'historyEvent'},data)
	},
	updateHistory:(data)=>{
		return EventApi.update({key1:'historyEvent'},data)
	},
	reomveHistory:(data)=>{
    return EventApi.remove(Object.assign({key1:'historyEvent'},data))
  },
	level:(data)=>{
		return EventApi.query(Object.assign({key1:'errorLevel'},data))
	},
	addLevel:(data)=>{
		return EventApi.save({key1:'errorLevel'},data)
	},
	updateLevel:(data)=>{
		return EventApi.update({key1:'errorLevel'},data)
	},
	reomveLevel:(data)=>{
    return EventApi.remove(Object.assign({key1:'errorLevel'},data))
  },
	errorCode:(data)=>{
		return EventApi.query(Object.assign({key1:'errorCode'},data))
	},
	addErrorCode:(data)=>{
		return EventApi.save({key1:'errorCode'},data)
	},
	updateErrorCode:(data)=>{
		return EventApi.update({key1:'errorCode'},data)
	},
	reomveErrorCode:(data)=>{
    return EventApi.remove(Object.assign({key1:'errorCode'},data))
  },
	msgPerson:(data)=>{
		return EventApi.query(Object.assign({key1:'msgPerson'},data))
	},
	addMsgPerson:(data)=>{
		return EventApi.save({key1:'msgPerson'},data)
	},
	updateMsgPerson:(data)=>{
		return EventApi.update({key1:'msgPerson'},data)
	},
	reomveMsgPerson:(data)=>{
    return EventApi.remove(Object.assign({key1:'msgPerson'},data))
  },
}
