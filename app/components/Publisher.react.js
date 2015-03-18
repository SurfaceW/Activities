/**
 * Publisher React Componment
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var Header          = require('./fragment/Header.react');
var ActivityList    = require('./fragment/ActivityList.react');
var ActivitiesStore = require('../stores/ActivitiesStore');
var ActivityAction  = require('../actions/ActivityAction');


var Publisher = React.createClass({
	render: function () {

		// Async load data from server
		setTimeout(function () {
			ActivityAction.fetch();
		}, 1);

		return (
			<div className="wrapper">
				<Header />
				<ActivityList />
			</div>
		);
	}
});

module.exports = Publisher;