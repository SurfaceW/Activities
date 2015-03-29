var React = window.React;
var $     = window.$;

var Header = React.createClass({

	render: function () {
		return (
			<header className="header-container">
				<div><span className="header-logo"></span> {this.props.title}</div>
			</header>
		);
	}
});

module.exports = Header;