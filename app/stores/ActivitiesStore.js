/**
 * ActivitiesStore
 * @author SurfaceW
 * @version 1.0
 */

var $             = window.$;
var constants     = require('../constants/constants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var EventEmiter   = require('../util/EventEmiter');

var events        = constants.ACTIVITY_EVENTS;
var pageEvent     = constants.PAGE_EVENTS;
var states        = constants.ACTIVITY_STATES;

var _activity     = [];

// test data
var activityData = require('../../data/demodata').testdata;
// var activityData = [];


var AS = ActivitiesStore = {

	// participator or publisher
	usertype: null,

	// 整个App的顶级视图
	view: states.LOADING,

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

	if (AS.usertype === 'publisher') {
		// 如果没有活动，展开新手视图，否则打开活动列表
		AS.view = _activity.length === 0 
			? states.PUBLISHER_NEW
			: states.PUBLISHER_ACTIVITY_LIST;
	} else {
		AS.view = states.PARTICIPATOR_PRVIEW;
		AS.currentActivity = _activity[0];
	}

	
}

function detail(name) {
	for (var i = _activity.length - 1; i >= 0; i--) {
		if (_activity[i].name === name) {
			AS.currentActivity = _activity[i];
		}
	};
	AS.view = states.PUBLISHER_ACTIVITY_DETAIL;
}

function cancel() {
	AS.view = states.PUBLISHER_ACTIVITY_LIST;
}

function preview() {
	AS.view = states.PUBLISHER_ACTIVITY_PRVIEW;
}

function create(d) {
	if (d) {
		if (d.newAc) {
			delete d.newAc;
			_updateObj(AS.currentActivity, d);
		} else {
			_activity.push(d);
			AS.currentActivity = d;
		}
		AS.view = states.PUBLISHER_ACTIVITY_DESIGN;
	} else {
		AS.view = states.PUBLISHER_ADD_NEW;
	}
}

function update(data) {
	if (data) {
		AS.currentActivity = data;
		AS.view = states.PUBLISHER_ACTIVITY_LIST;
		AS.currentActivity = null;

		if (!data.share.url) {
			// If it is new we need to use Ajax to fetch back the
			// url and 2dc source
		}
	}
}

function deleteItem() {
	
}

function _updateObj(origin, target) {
	$.each(target, function (key, val) {
		origin[key] = target[key];
	});
}

$.extend(AS, EventEmiter.prototype);

AppDispatcher.register(function (action) {
	switch(action.type) {
		case events.ACTIVITY_FETCH:
			// fetch().done(function () {});
			fetch();
			AS.trigger('view_change');
			break;
		case events.ACTIVITY_CREATE:
			create(action.data);
			AS.trigger('view_change');
			break;
		case events.ACTIVITY_UPDATE:
			update(action.data);
			AS.trigger('view_change');
			break;
		case events.ACTIVITY_DELETE:
			delete(action.data);
			AS.trigger('view_change');
			break;
		case events.ACTIVITY_DETAIL:
			detail(action.data);
			AS.trigger('view_change');
			break;
		case events.ACTIVITY_CANCEL:
			cancel();
			AS.trigger('view_change');
			break;

		// ------------- PAGE EVENT -------------

		case pageEvent.PAGE_HIEGHLIGHT:
			AS.trigger('page_change', action.data);
			break;
		case pageEvent.PAGE_PREVIEW:
			preview();
			AS.trigger('view_change');
			break;
		case pageEvent.PAGE_FINISH:
			update(action.data);
			AS.trigger('view_change');
			break;
	}
});

module.exports = ActivitiesStore;