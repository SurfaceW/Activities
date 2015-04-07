/**
 * ActivityItem React Componement
 * 
 * @author SurfaceW
 * @version 1.0 
 */

var React          = window.React;
var ActivityAction = require('../../actions/ActivityAction');

var ActivityItem = React.createClass({

	render: function () {
		return (
			<div className="activity-card" onClick={this._onclick}>
				<div className="activity-card-image">
					<img src={this.props.data.icon} />
				</div>
				<div className="activity-card-title">
					<p>{this.props.data.name}</p>
				</div>
			</div>
		);
	},

	_onclick: function () {
		ActivityAction.detail(this.props.data.name);
	}
});

module.exports = ActivityItem;