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
	{
		'id': 0,
		'name': '2015同学聚会',
		'detail': [
			{
				'page': 1,
				'components': [
					{'type': 1, 'value': './static/xx/xx.png'},
					{'type': 10, 'show': 1, 'value': '2015高中同学聚会'}
				]
			},
			{
				'page': 2,
				'components': [
					{'type': 0, 'value': 'blue'},
					{'type': 20, 'show': 2, 'hide': 1, 'value': '2015同学会是由高12级组织的一次主要的活动。'},
					{'type': 20, 'show': 2, 'hide': 1, 'value': 
					'我们已经很久没有见面了，这将会是一次有意思的旅程。'+'我们考虑在适当的地方见面，在适当的地方做一些有意思的事情！'}
				]
			},
			{
				'page': 3,
				'components': [
					{'type': 0, 'value': 'green'},
					{'type': 20, 'show': 1, 'value': '欢迎加入我们！'},
					{'type': 80, 'show': 1, 'value': '2015-7-20 9:30'},
					{'type': 70, 'show': 2, 'value': '四川省内江市，内江市第六中学高中部'}
				]
			}
		]
	},
	{
		'id': 1,
		'name': '南非支教活动',
		'detail': []
	}
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

ActivitiesStore.dispatcher = new AppDispatcher();
ActivitiesStore.dispatcher.register(function (action) {
	switch(action.type) {
		case activityEvent.ACTIVITY_FETCH:
			// fetch().done(function () {});
			fetch();
			ActivitiesStore.trigger('fetch_complete');
		break;
		case activityEvent.ACTIVITY_CREATE: 
		
		break;
		case activityEvent.ACTIVITY_UPDATE:

		break;
		case activityEvent.ACTIVITY_DELETE:

		break;
	}
});

module.exports = ActivitiesStore;