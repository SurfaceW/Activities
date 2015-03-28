/**
 * NoActivity React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React          = window.React;
var ActivityAction = require('../../actions/ActivityAction');

var NoActivity = React.createClass({

	render: function () {
		return (
			<div className="no-activity-container">
				<p className="no-activity-hint">还没有活动，创建一个吧 :)</p>
				<button 
					className="add-first-activity" 
					onClick={this._onclick}>
					<span className="add-first-activity-icon"></span>
					新建活动
				</button>
			</div>
		);
	},

	_onclick: function () {
		ActivityAction.create();
	}

});

module.exports = NoActivity;