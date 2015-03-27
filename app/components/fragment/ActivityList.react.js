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

		if (!this.isini) this.ini();

		if (!!activitiesData && activitiesData.length >= 1) {

			for (var i = 0; i < activitiesData.length; i++) {
				activities.push(<ActivityItem key={i} content={activitiesData[i]} />);
			};

			return (<div className="activity-list-container">{activities}</div>);

		} else if (!!activitiesData && activitiesData.length === 0) {

			// User hasn't create any activity
			return (<div className="activity-list-container"><NoActivity /></div>);

		} else {

			// Loading from server
			return (<div className="activity-list-container"><Loading /></div>);
		}
	}
});

module.exports = ActivityList;