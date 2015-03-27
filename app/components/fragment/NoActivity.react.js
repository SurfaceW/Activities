var React = window.React;
var ActivityAction = require('../../actions/ActivityAction');

var NoActivity = React.createClass({

	// Handle Create New Activities
	handleClick: function () {
		ActivityAction.create();
	},

	render: function () {
		return (
			<div className="no-activity-container">
			<p className="no-activity-hint">还没有活动，创建一个吧 :)</p>
			<button className="add-first-activity" onClick={this.handleClick}>
				<span className="add-first-activity-icon"></span>
				新建活动
			</button>
			</div>
		);
	}

});

module.exports = NoActivity;