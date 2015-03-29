/**
 * Template React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var TemplateA = require('./TemplateA.react');
var TemplateB = require('./TemplateB.react');
var TemplateInfo = require('./TemplateInfo.react');

var Templates = React.createClass({

	render: function () {

		switch (parseInt(this.props.template, 10)) {
			case 1:
				return (
					<div className="activity-preview-page">
						<TemplateA />
					</div>
				);
				break;
			case 2:
				return (
					<div className="activity-preview-page">
						<TemplateB />
					</div>
				);
				break;
			case 0:
				return (
					<div className="activity-preview-page">
						<TemplateInfo />
					</div>
				);
				break;
		}
	}
});

module.exports = Templates;