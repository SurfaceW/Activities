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
				{this.props.components.bgurl},
				{this.props.components.title},
				{this.props.components.text}
			</div>
		);
	}
});

module.exports = TemplateA;