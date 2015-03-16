var React = window.React;
var $     = window.$;

var Header = require('./fragment/Header.react');

var Participator = React.createClass({
	render: function () {
		return (
			<div>I‘m Actually a Participator!</div>
		);
	}
});

module.exports = Participator;