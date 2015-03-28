/**
 * ActivityDetail React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var ActivitiesStore = require('../../stores/ActivitiesStore');
var ActivityAction  = require('../../actions/ActivityAction');

var ActivityDesign = React.createClass({

	render: function () {
		return (
			<div className="activity-detail-container">
				Now you can see the detail of this activity!
			</div>
		);
	}

});

module.exports = ActivityDesign;