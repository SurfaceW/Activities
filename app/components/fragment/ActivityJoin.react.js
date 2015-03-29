/**
 * ActivityJoin React Componement
 * 
 * @author SurfaceW
 * @version 1.0 
 */

var React          = window.React;
var ActivityAction = require('../../actions/ActivityAction');
var TwoDCode = require('./2DCode.react');

var ActivityJoin = React.createClass({

	render: function () {
		return (
			<div className="activity-join-container">
				Hello, Welcome to join Activity! After joining the activity you will get a 2D Code!
			</div>
		);
	}
});

module.exports = ActivityJoin;