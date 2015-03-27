/**
 * ActivitiesStore Class
 * @author SurfaceW
 * @version 1.0
 */

var $             = window.$;
var constants        = require('../constants/constants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var EventEmiter   = require('../util/EventEmiter');

var _activities = {};
var activityEvent = constants.ACTIVITY_EVENTS;
var activityState = constants.ACTIVITY_STATES;

// Data for testing
var activitiesData = [

];

var ActivitiesStore = {

	getAll: function () {
		return _activities;
	}
};

function fetch() {
	
	_activities = activitiesData;

	if (_activities.length === 0) {
		return activityState.PUBLISHER_NEW;
	}

	return activityState.PUBLISHER_ACTIVITIE_LIST;
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
			var state = fetch();
			ActivitiesStore.trigger('change', state);
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