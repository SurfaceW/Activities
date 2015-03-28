/**
 * ActivityItem React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React          = window.React;
var ActivityAction = require('../../actions/ActivityAction');

var ActivityItem = React.createClass({

	render: function () {
		return (
			<div className="activity-card" onClick={this._onclick}>
				<h2>{this.props.data.name}</h2>
				<img src={this.props.data.imgsrc}></img>
			</div>
		);
	},

	_onclick: function () {
		if (this.props.type === 'list') {
			ActivityAction.detail(this.props.content.name);
		}	
	}
});

module.exports = ActivityItem;