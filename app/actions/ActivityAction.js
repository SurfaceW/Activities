/**
 * Activity Action Class
 * @author SurfaceW
 * @version 1.0
 */

var consts          = require('../constants/constants');
var AppDispatcher   = require('../dispatcher/Dispatcher');

var activityEvent = consts.ACTIVITY_EVENTS;
var ActivityAction = {

	// Fetch back data from server
	fetch: function () {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_FETCH
		});
	},

	// Create a new activity
	create: function () {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_CREATE
		});
	},

	// Update the activity data
	update: function (content) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_UPDATE,
			content: content
		});
	},

	// Delete activity
	delete: function (id) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_DELETE,
			id: id
		});
	},

};

module.exports = ActivityAction;