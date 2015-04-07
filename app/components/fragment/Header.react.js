var React = window.React;
var $     = window.$;

var Header = React.createClass({

	render: function () {
		return (
			<header className="header-container">
				<div className="header-center">
				<div className="header-icon"><img src={"../../style/img/header-icon.png"} /></div>
				<div className="header-content">{this.props.title}</div>
				</div>
			</header>
		);
	}
});

module.exports = Header;