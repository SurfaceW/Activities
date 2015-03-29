/**
 * Publisher React Componment
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var Header          = require('./fragment/Header.react');
var ActivityList    = require('./fragment/ActivityList.react');
var Loading         = require('./fragment/Loading.react');
var Error           = require('./fragment/Error.react');
var NoActivity      = require('./fragment/NoActivity.react');
var NewActivity     = require('./fragment/NewActivity.react');
var ActivityDesign  = require('./fragment/ActivityDesign.react');
var ActivityDetail  = require('./fragment/ActivityDetail.react');
var ActivityPreview = require('./Preview.react');

var ActivitiesStore = require('../stores/ActivitiesStore');
var ActivityAction  = require('../actions/ActivityAction');

var constants       = require('../constants/constants').ACTIVITY_STATES;


var Publisher = React.createClass({

	getInitialState: function () {
		return {
			'view': constants.LOADING,
			'activities': null
		};
	},

	getDefaultProps: function () {
		return {
			'version': '1.0.0'
		};
	},

	componentDidMount: function () {
		ActivitiesStore.on('view_change', this._viewchange);
		ActivityAction.fetch();
	},

	render: function () {
		var _this = this;
		
		switch (this.state.view) {
			case constants.LOADING:
				return (
					<div className="wrapper">
						<Header title="Activities"/>
						<Loading />
					</div>
				);
				break;
			case constants.PUBLISHER_NEW:
				// 为新用户渲染的视图(没有活动)
				return (
					<div className="wrapper">
						<Header title="活动列表" />
						<NoActivity />
					</div>
				);
				break;
			case constants.PUBLISHER_ACTIVITY_LIST:
				// 渲染的已有的活动列表
				return (
					<div className="wrapper">
						<Header title="活动列表" />
						<ActivityList type="publisher"/>
					</div>
				);
				break;
			case constants.PUBLISHER_ADD_NEW:
				// 渲染创建新的活动
				return (
					<div className="wrapper">
						<Header title="新建活动" />
						<NewActivity />
					</div>
				);
				break;
			case constants.PUBLISHER_ACTIVITY_DESIGN:
				// 进入活动设计页面
				return (
					<div className="wrapper">
						<Header title="活动设计" />
						<ActivityDesign />
					</div>
				);
				break;
			case constants.PUBLISHER_ACTIVITY_PRVIEW:
				// 进入活动预览页面
				return (
					<div className="wrapper">
						<ActivityPreview />
					</div>
				);
				break;
			case constants.PUBLISHER_ACTIVITY_DETAIL:
				// 进入活动的详细信息页面
				return (
					<div className="wrapper">
						<Header title="活动详情" />
						<ActivityDetail />
					</div>
				);
				break;
			default: 
				// Whoops something went wrong
				return (
					<div className="wrapper">
						<Header title="Activities" />
						<Error />
					</div>
				);
				break;
		}
	},

	_viewchange: function () {
		this.setState(ActivitiesStore.getAllStates());
	}
});

module.exports = Publisher;