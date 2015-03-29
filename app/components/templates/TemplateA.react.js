/**
 * TemplateA React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var TemplateA = React.createClass({

	render: function () {
		return (
			<div className="activity-template-a">
				This is templateA.
			</div>
		);
	}
});

module.exports = TemplateA;