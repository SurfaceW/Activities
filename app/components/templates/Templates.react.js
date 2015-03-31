/**
 * Template React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React        = window.React;
var $            = window.$;

var TemplateA    = require('./TemplateA.react');
var TemplateB    = require('./TemplateB.react');

var Templates = React.createClass({

	render: function () {

		var data = this.props.data;

		switch (parseInt(data.design.template, 10)) {
			case 1:
				return (
					<div className="activity-preview-page">
						<TemplateA
							page={this.props.page}
							data={this.props.data} />
					</div>
				);
				break;
			case 2:
				return (
					<div className="activity-preview-page">
						<TemplateB 
							page={this.props.page}
							data={this.props.data} />
					</div>
				);
				break;
		}
	}
});

module.exports = Templates;