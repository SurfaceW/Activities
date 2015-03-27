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
var NoActivity      = require('./fragment/NoActivity.react');

var ActivitiesStore = require('../stores/ActivitiesStore');
var ActivityAction  = require('../actions/ActivityAction');

var constants       = require('../constants/constants').ACTIVITY_STATES;


var Publisher = React.createClass({

	getInitialState: function () {
		return {
			'view': constants.LOADING 
		};
	},

	getDefaultProps: function () {
		return {
			'version': '1.0.0'
		};
	},

	componentDidMount: function () {
		ActivitiesStore.on('change', this._change);
		ActivityAction.fetch();
	},

	render: function () {
		var _this = this;

		switch (this.state.view) {
			case constants.LOADING:
				return (
					<div className="wrapper">
						<Header />
						<Loading />
					</div>
				);
				break;
			case constants.PUBLISHER_NEW:
				// 为新用户渲染的视图(没有活动)
				return (
					<div className="wrapper">
						<Header />
						<NoActivity />
					</div>
				);
				break;
			case constants.PUBLISHER_ACTIVITY_LIST:
				// 渲染的已有的活动列表
				return (
					<div className="wrapper">
						<Header />
						<ActivityList />
					</div>
				);
				break;
			case constants.PUBLISHER_DESIGN:
				// do something...
				break;
			case constants.PUBLISHER_DETAIL:
				// do something...
				break;
			case constants.PUBLISHER_ADD_NEW:
				// do something...
				break;
			default: break;
		}
	},

	_change: function (state) {
		this.setState({'view': state});
	}
});

module.exports = Publisher;