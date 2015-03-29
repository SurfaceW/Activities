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
		return {};
	},

	getInitialState: function () {
		return {'page': 0}
	},

	render: function () {

		var data = ActivitiesStore.currentActivity;
		var i = this.state.page;

		return (
			<div className="activity-preview-container">
				<Templates 
					page={i}
					template={data.design[i].template}
					info={data.info}
					components={data.design[i].components} />
				<div className="preview-control-panel">
					<button className="left-arrow">上一页
					</button>
					<button className="right-arrow">下一页
					</button>
					
					<SliderDot 
						highlight={i}
						number={data.design.length} />
				</div>
			</div>
		);
	}
});

var SliderDot = React.createClass({
	render: function () {

		var dots = [];
		for (var i = 0; i < this.props.number; i++) {
			dots.push('flag');
		}

		return (
			<div className="slider-dots">
				{dots.map(function(item, i) {return (
					<div className="slider-little-dot"
						key={i}>
					</div>);})}
			</div>
		);
	}
});

module.exports = Preview;