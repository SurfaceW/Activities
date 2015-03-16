/**
 * Publisher React Componment
 * @author SurfaceW
 * @version 1.0 
 */

var React = window.React;
var $     = window.$;

var Header = require('./fragment/Header.react');
var ActivitiesStore = require('../stores/ActivitiesStore');

var Publisher = React.createClass({
	render: function () {
		return (
			<Header />
		);
	}
});

module.exports = Publisher;