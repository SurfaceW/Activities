/**
 * Preview React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var ActivitiesStore = require('../stores/ActivitiesStore');
var ActivityAction  = require('../actions/ActivityAction');
var Templates       = require('./templates/Templates.react');

var Preview = React.createClass({

	getDefaultProps: function () {
	},

	getInitialState: function () {
		return {'page': 0}
	},

	componentDidMount: function () {
	},

	render: function () {

		var data;
		this.data = data = ActivitiesStore.currentActivity;
		console.log(data);
		var i = this.state.page;

		return (
			<div className="activity-preview-container">
				<Templates 
					page={i}
					template={data.template} // 0 为 info page 的默认值
					info={data.info}
					components={data.design[i] ? data.design[i].components : null} />
				<div className="preview-control-panel">
					<button 
						className="left-arrow"
						onClick={this._prepage}>
						上一页
					</button>
					<button 
						className="right-arrow"
						onClick={this._nexpage}>
						下一页
					</button>
					<SliderDot
						display={i === data.design.length ? false : true}
						highlight={i}
						number={data.design.length} />
				</div>
			</div>
		);
	},

	_prepage: function () {
		if (this.state.page === 0) return;
		this.setState({'page': this.state.page - 1});
	},

	_nexpage: function () {
		if (this.state.page >= this.data.design.length) return;
		this.setState({'page': this.state.page + 1});
	}
});

var SliderDot = React.createClass({
	render: function () {

		if (!this.props.display) return null;

		var self = this;
		var dots = [];
		for (var i = 0; i < this.props.number; i++) {
			dots.push('flag');
		}

		return (
			<div className="slider-dots">
				{dots.map(function(item, i) {
					if (i === self.props.highlight) {
						return (
							<div className="slider-little-dot-highlight"
							key={i}>x
							</div>
						);
					} else {
						return (
							<div className="slider-little-dot"
							key={i}>o
							</div>
						);
					}
				})}
			</div>
		);
	}
});

module.exports = Preview;