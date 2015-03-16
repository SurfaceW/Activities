/**
 * ActivitiesStore Class
 * @author SurfaceW
 * @version 1.0
 */

var $             = window.$;
var consts        = require('../constants/constants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var EventEmiter   = require('../util/EventEmiter');

var _activities = {};

var ActivitiesStore = {

}

$.extend(ActivitiesStore, EventEmiter.prototype);

AppDispatcher.register(function (action) {
	switch(action.actionType) {
		case consts.ACTIVITY_CHANGE_NAME : 
		
		break;
	}
});

module.exports = ActivitiesStore;