/**
 * ActivityDetail React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var ActivitiesStore = require('../../stores/ActivitiesStore');
var ActivityAction  = require('../../actions/ActivityAction');

var ActivityDetail = React.createClass({

	_iteratorPages: function (item, i) {
		return (
			null
		);
	},

	render: function () {

		return (
			<div className="activity-preview-container">
				{data.design.map(this._iteratorPages)}
			</div>
		);
	}

});

module.exports = ActivityDetail;