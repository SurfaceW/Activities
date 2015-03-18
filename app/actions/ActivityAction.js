/**
 * Activity Action Class
 * @author SurfaceW
 * @version 1.0
 */

var consts          = require('../constants/constants');
var ActivitiesStore = require('../stores/ActivitiesStore');
var AppDispatcher   = ActivitiesStore.dispatcher;

var activityEvent = consts.ACTIVITY_EVENTS;
var ActivityAction = {

	fetch: function () {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_FETCH
		});
	},

	create: function (content) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_CREATE,
			content: content
		});
	},

	update: function (content) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_UPDATE,
			content: content
		});
	},

	delete: function (id) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_DELETE,
			id: id
		});
	}

};

module.exports = ActivityAction;