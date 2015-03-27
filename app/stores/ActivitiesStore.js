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
var activityEvent = consts.ACTIVITY_EVENTS;

// Data for testing
var activitiesData = [

];

var ActivitiesStore = {

	getAll: function () {
		return _activities;
	}
};

function fetch() {
	// return $.ajax({
	// 	url: '',
	// 	type: ''
	// });
	
	_activities = activitiesData;
}

function create() {
}

function update() {
}

function deleteItem() {
}

$.extend(ActivitiesStore, EventEmiter.prototype);

AppDispatcher.register(function (action) {
	switch(action.type) {
		case activityEvent.ACTIVITY_FETCH:
			// fetch().done(function () {});
			fetch();
			ActivitiesStore.trigger('change');
		break;
		case activityEvent.ACTIVITY_CREATE: 
			// ActivitiesStore.trigger('create_new_activity');
		break;
		case activityEvent.ACTIVITY_UPDATE:

		break;
		case activityEvent.ACTIVITY_DELETE:

		break;
	}
});

module.exports = ActivitiesStore;