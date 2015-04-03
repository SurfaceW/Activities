/**
 * Preview React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React      = window.React;
var $          = window.$;

var AS         = require('../stores/ActivitiesStore');
var PageAction = require('../actions/PageAction');
var Templates  = require('./templates/Templates.react');

var $body = $('body');

var Preview = React.createClass({

	getDefaultProps: function () {
		return {'pagenumber': 4};
	},

	getInitialState: function () {
		return {'page': 0}
	},

	componentDidMount: function () {
		var _this = this;
		AS.on('preview_prepare', function () {
			_this.setState({'page': 3});
			_this._nexpage();
		});

		// Hack: revise the body's height to fullscreen
		$body.height($(document).height());

		// Bind Mobile-End UI Events
		$body.on('swipeleft', function (e) {
			_this._nexpage();
		});

		$body.on('swiperight', function (e) {
			_this._prepage();
		});
	},

	render: function () {

		var data;
		var i = this.state.page;

		this.data = data = AS.currentActivity;

		return (
			<div className="activity-preview-container">
				<Templates 
					page={i}
					data={this.data} />
				<div className="preview-control-panel">
					<button 
						hidden="hidden"
						className="left-arrow"
						onClick={this._prepage}>
						上一页
					</button>
					<button 
						hidden="hidden"
						className="right-arrow"
						onClick={this._nexpage}>
						下一页
					</button>
					<SliderDot
						display={i === this.props.pagenumber - 1 ? false : true}
						highlight={i}
						number={this.props.pagenumber} />
				</div>
			</div>
		);
	},

	_prepage: function () {
		if (this.state.page === 0) return;
		this.setState({'page': this.state.page - 1});
		PageAction.prevpage(this.state.page);
	},

	_nexpage: function () {
		if (this.state.page >= this.props.pagenumber - 1) return;
		this.setState({'page': this.state.page + 1});
		PageAction.nextpage(this.state.page);
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
				<div className="slider-dots-container">
					{dots.map(function(item, i) {
						if (i === self.props.highlight) {
							return (
								<div 
								className="slider-little-dot highlight-dot"
								key={i}>
								</div>
							);
						} else {
							return (
								<div className="slider-little-dot"
								key={i}>
								</div>
							);
						}
					})}
				</div>
			</div>
		);
	}
});

module.exports = Preview;