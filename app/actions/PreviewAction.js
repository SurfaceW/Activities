/**
 * PreviewAction
 * 
 * @author SurfaceW
 * @version 1.0
 */

var consts          = require('../constants/constants');
var AppDispatcher   = require('../dispatcher/Dispatcher');

var previewEvent = consts.PREVIEW_EVENTS;
var PreviewAction = {

	next: function () {
		AppDispatcher.dispatch({
			type: previewEvent.PAGE_HIEGHLIGHT
		});
	}

};

module.exports = PreviewAction;