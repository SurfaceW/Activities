/**
 * Error React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React = window.React;
var $     = window.$;

var Error = React.createClass({

	render: function () {
		return (
			<div className="error-hint-container">
				<p className="error-hint">
					{"啊哦，貌似出了点问题 >_<||"}
				</p>
			</div>
		);
	}
});

module.exports = Error;