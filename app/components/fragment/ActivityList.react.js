/**
 * ActivityList React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React          = window.React;
var $              = window.$;

var AS             = require('../../stores/ActivitiesStore');
var ActivityItem   = require('./ActivityItem.react');
var ActivityAction = require('../../actions/ActivityAction');

var ActivityList = React.createClass({

	render: function () {

		var data = AS.getAllStates().activities;
		var activities = [];

		for (var i = 0; i < data.length; i++) {
			activities.push(<ActivityItem 
				key={i} 
				data={data[i]} />);
		};

		return (
			<div className="activity-list-container">
				{activities}
				<button 
					className="add-activity-button" 
					onClick={this._onclick}>
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