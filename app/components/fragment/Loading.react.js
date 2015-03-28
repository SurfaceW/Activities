/**
 * Loading React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React = window.React;
var $     = window.$;

var Loading = React.createClass({

	render: function () {
		return (
			<div className="loading-container">
				<div className="loading-icon">Loading...</div>
			</div>
		);
	}
});

module.exports = Loading;