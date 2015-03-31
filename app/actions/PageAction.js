/**
 * PageAction
 * 
 * @author SurfaceW
 * @version 1.0
 */

var consts          = require('../constants/constants');
var AppDispatcher   = require('../dispatcher/Dispatcher');

var activityEvent = consts.PAGE_EVENTS;
var PageAction = {

	// 渲染并预览页面
	preview: function () {
		AppDispatcher.dispatch({
			type: activityEvent.PAGE_PREVIEW
		});
	},

	// 完成页面设计和编辑
	finish: function (data) {
		AppDispatcher.dispatch({
			type: activityEvent.PAGE_FINISH,
			data: data
		});
	}
};

module.exports = PageAction;