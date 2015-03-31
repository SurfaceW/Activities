/**
 * Participator React Componment
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var Header          = require('./fragment/Header.react');
var Loading         = require('./fragment/Loading.react');
var Error           = require('./fragment/Error.react');
var ActivityPreview = require('./Preview.react');

var AS              = require('../stores/ActivitiesStore');
var ActivityAction  = require('../actions/ActivityAction');

var constants       = require('../constants/constants').ACTIVITY_STATES;


var Participator = React.createClass({

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
		AS.on('view_change', this._viewchange);
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
			case constants.PARTICIPATOR_PRVIEW:
				return (
					<div className="wrapper">
						<ActivityPreview />
					</div>
				);
				break;
			case constants.PARTICIPATOR_2DCODE:
				return (
					<div className="wrapper">
						<Header title="活动二维码" />
						<div>This is 2DCode</div>
					</div>
				);
				break;
			default: 
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
		this.setState(AS.getAllStates());
	}
});

module.exports = Participator;