/**
 * ActivityList React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var ActivitiesStore = require('../../stores/ActivitiesStore');

var ActivityItem    = require('./ActivityItem.react');
var NoActivity      = require('./NoActivity.react');
var Loading         = require('./Loading.react');

var ActivityList = React.createClass({

	isini: false,

	render: function () {

		var activitiesData = ActivitiesStore.getAll();
		var activities = [];

		for (var i = 0; i < activitiesData.length; i++) {
			activities.push(<ActivityItem key={i} content={activitiesData[i]} />);
		};

		return (<div className="activity-list-container">{activities}</div>);
	}
});

module.exports = ActivityList;