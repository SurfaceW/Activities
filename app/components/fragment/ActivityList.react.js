/**
 * ActivityList React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var ActivitiesStore = require('../../stores/ActivitiesStore');
var ActivityItem    = require('./ActivityItem.react');
var ActivityAction  = require('../../actions/ActivityAction');

var ActivityList = React.createClass({

	getInitialState: function () {
		// return {'activities': ActivitiesStore.getAllStates()};
		return {};
	},

	render: function () {

		var activitiesData = this.props.data;
		var activities = [];

		for (var i = 0; i < activitiesData.length; i++) {
			activities.push(<ActivityItem 
				key={i} 
				data={activitiesData[i]} 
				type="list" />);
		};

		return (
			<div className="activity-list-container">
				{activities}
				<button 
					className="add-activity-button" 
					onClick={this._onclick}
				>
				+ 新建活动
				</button>
			</div>
		);
	},

	_onclick: function () {
		ActivityAction.create();
	}
});

module.exports = ActivityList;