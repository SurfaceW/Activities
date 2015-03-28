/**
 * Activity Action Class
 * 
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
	create: function (data) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_CREATE,
			data: data
		});
	},

	// Update the activity data
	update: function (data) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_UPDATE,
			data: data
		});
	},

	// Delete activity
	delete: function (id) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_DELETE,
			id: id
		});
	},

	// Show the Detail of An Activity
	detail: function(name) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_DETAIL,
			name: name
		});
	},

	// Cancel the create activity
	cancel: function() {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_CANCEL
		});
	}

};

module.exports = ActivityAction;