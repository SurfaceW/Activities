/**
 * TemplateA React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React      = window.React;
var $          = window.$;
var PageAction = require('../../actions/PageAction');

var TemplateA = React.createClass({

	_iterator: function (value, key) {
		return (
			<input 
				key={key}
				placeholder={value}
				name={value} />
		);
	},

	render: function () {

		var data = this.data = this.props.data;

		switch (this.props.page) {
			case 0:
				return (
					<div className="activity-template-a">
						<div className="template-a-image-center">
						</div>
						<div className="template-a-info-block">
							<h2>{data.name}</h2>
							<p>{data.date}</p>
							<address>{data.loca}</address>
						</div>
					</div>
				);
				break;
			case 1:
				return (
					<div className="activity-template-a">
						<div className="template-a-article">
							<h1>相关介绍</h1>
							<img src={data.design.imgurl} />
							<p>{data.design.text}</p>
						</div>
					</div>
				);
				break;
			case 2:
				return (
					<div className="activity-template-a">
						<div className="activity-template-a">
							<div className="template-a-article">
								<h1>更多信息</h1>
								<video></video>
								<p>{data.design.extra}</p>
							</div>
							<a href={data.design.link}>更多详细信息</a>
							<div className="template-a-submit">
								<button onClick={this._switchtosubmit}>我要报名</button>
							</div>
						</div>
					</div>
				);
				break;
			case 3:
				return (
					<div className="activity-template-a">
						<div className="template-a-article">
							<h1>报名信息</h1>
							{data.info.map(this._iterator)}
						</div>
						<div className="template-a-submit-sure">
							<button onClick={this._join}>确定报名</button>
						</div>
					</div>
				);
				break;
		}
	},

	_switchtosubmit: function () {
		PageAction.prepare();
	},

	_join: function () {
		PageAction.join(this.state);
	}
});

module.exports = TemplateA;