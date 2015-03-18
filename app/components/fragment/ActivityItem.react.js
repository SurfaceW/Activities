/**
 * ActivityItem React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React = window.React;
var $     = window.$;

var ActivityItem = React.createClass({
	render: function () {
		return (
			<div>
				<h2>{this.props.content.name}</h2>
			</div>
		);
	}
});

module.exports = ActivityItem;