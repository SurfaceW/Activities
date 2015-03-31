/**
 * TemplateB React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var TemplateB = React.createClass({

	render: function () {
		return (
			<div className="activity-template-b">
				This is TemplateB.
				{this.props.components.title},
				{this.props.components.text}
			</div>
		);
	}
});

module.exports = TemplateB;