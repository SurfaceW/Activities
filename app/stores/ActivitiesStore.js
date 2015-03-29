/**
 * ActivitiesStore
 * @author SurfaceW
 * @version 1.0
 */

var $             = window.$;
var constants     = require('../constants/constants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var EventEmiter   = require('../util/EventEmiter');

var activityEvent = constants.ACTIVITY_EVENTS;
var pageEvent     = constants.PAGE_EVENTS;
var activityState = constants.ACTIVITY_STATES;

var _activity     = [];

// test data
// var activityData = require('../../data/demodata').testdata;
var activityData = [];


var ActivitiesStore = {

	// 整个App的顶级视图
	view: activityState.LOADING,

	// 当前正在交互的 Activity
	currentActivity: null,

	getAllStates: function () {
		return {
			'view': this.view,
			'activities': _activity
		}
	}
};

function fetch() {	
	_activity = activityData;

	// 如果没有活动，展开新手视图，否则打开活动列表
	ActivitiesStore.view = _activity.length === 0 
		? activityState.PUBLISHER_NEW
		: activityState.PUBLISHER_ACTIVITY_LIST;
}

function detail(name) {
	for (var i = _activity.length - 1; i >= 0; i--) {
		if (_activity[i].name === name) {
			ActivitiesStore.currentActivity = _activity[i];
		}
	};
	ActivitiesStore.view = activityState.PUBLISHER_ACTIVITY_DETAIL;
}

function cancel() {
	ActivitiesStore.view = activityState.PUBLISHER_ACTIVITY_LIST;
}

function preview() {
	ActivitiesStore.view = activityState.PUBLISHER_ACTIVITY_PRVIEW;
}

function create(d) {
	if (d) {
		_activity.push(d);
		ActivitiesStore.currentActivity = d;
		ActivitiesStore.view = activityState.PUBLISHER_ACTIVITY_DESIGN;
	} else {
		ActivitiesStore.view = activityState.PUBLISHER_ADD_NEW;
	}
}

function update(data) {
	ActivitiesStore.currentActivity = data;
	ActivitiesStore.view = activityState.PUBLISHER_ACTIVITY_LIST;
}

function deleteItem() {
	
}

$.extend(ActivitiesStore, EventEmiter.prototype);

AppDispatcher.register(function (action) {
	switch(action.type) {
		case activityEvent.ACTIVITY_FETCH:
			// fetch().done(function () {});
			fetch();
			ActivitiesStore.trigger('view_change');
			break;
		case activityEvent.ACTIVITY_CREATE:
			create(action.data);
			ActivitiesStore.trigger('view_change');
			break;
		case activityEvent.ACTIVITY_UPDATE:
			update(action.data);
			ActivitiesStore.trigger('view_change');
			break;
		case activityEvent.ACTIVITY_DELETE:
			delete(action.data);
			ActivitiesStore.trigger('view_change');
			break;
		case activityEvent.ACTIVITY_DETAIL:
			detail(action.data);
			ActivitiesStore.trigger('view_change');
			break;
		case activityEvent.ACTIVITY_CANCEL:
			cancel();
			ActivitiesStore.trigger('view_change');
			break;

		// ------------- PAGE EVENT -------------

		case pageEvent.PAGE_HIEGHLIGHT:
			ActivitiesStore.trigger('page_change', action.data);
			break;
		case pageEvent.PAGE_PREVIEW:
			preview();
			ActivitiesStore.trigger('view_change');
			break;
		case pageEvent.PAGE_FINISH:
			update(action.data);
			ActivitiesStore.trigger('view_change');
			break;
	}
});

module.exports = ActivitiesStore;