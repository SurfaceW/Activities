/**
 * ActivityList React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;
var ActivitiesStore = require('../../stores/ActivitiesStore');
var ActivityItem    = require('./ActivityItem.react');

var ActivityList = React.createClass({

	isini: false,

	ini: function () {
		var _this  = this;
		this.isini = true;

		ActivitiesStore.on('fetch_complete', function () {
			_this.setState({'fetchComplete': true});
		});
	},

	render: function () {

		var _this = this;
		var activitiesData = ActivitiesStore.getAll();
		var activities = [];

		if (!this.isini) this.ini();

		if (!!activitiesData && activitiesData.length >= 1) {

			for (var i = 0; i < activitiesData.length; i++) {
				activities.push(<ActivityItem key={i} content={activitiesData[i]} />);
			};

			return (<div>{activities}</div>);

		} else if (!!activitiesData && activitiesData.length === 0) {

			// User hasn't create any activity
			return (<div> {"You haven't yet create an activity!"} </div>);

		} else {

			// Loading from server
			return (<div>{"Now Processing the Data..."}</div>);
		}
	}
});

module.exports = ActivityList;