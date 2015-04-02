/**
 * PageAction
 * 
 * @author SurfaceW
 * @version 1.0
 */

var consts          = require('../constants/constants');
var AppDispatcher   = require('../dispatcher/Dispatcher');

var pageevent = consts.PAGE_EVENTS;
var PageAction = {

	// 渲染并预览页面
	preview: function () {
		AppDispatcher.dispatch({
			type: pageevent.PAGE_PREVIEW
		});
	},

	// 完成页面设计和编辑
	finish: function (data) {
		AppDispatcher.dispatch({
			type: pageevent.PAGE_FINISH,
			data: data
		});
	},

	// 极润准备加入活动的界面
	prepare: function () {
		AppDispatcher.dispatch({
			type: pageevent.PAGE_PREPARE
		});
	},

	// 用户加入活动事件
	join: function (data) {
		AppDispatcher.dispatch({
			type: pageevent.PAGE_JOIN,
			data: data
		});
	},

	// 用户翻页事件
	prevpage: function (page) {
		AppDispatcher.dispatch({
			type: pageevent.PAGE_PREV,
			data: page
		});
	},

	nextpage: function (page) {
		AppDispatcher.dispatch({
			type: pageevent.PAGE_NEXT,
			data: page
		});
	}
};

module.exports = PageAction;