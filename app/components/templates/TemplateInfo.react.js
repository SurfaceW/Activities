/**
 * TemplateInfo React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var TemplateInfo = React.createClass({

	render: function () {
		console.log(this.props.infos);
		return (
			<div className="activity-template-info">
				{this.props.infos.toString()}
			</div>
		);
	}
});

module.exports = TemplateInfo;