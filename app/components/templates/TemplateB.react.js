/**
 * TemplateA React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React      = window.React;
var $          = window.$;
var PageAction = require('../../actions/PageAction');
var AS         = require('../../stores/ActivitiesStore');


var $body = $('body');

var TemplateB = React.createClass({

	componentDidMount: function () {
		var _this = this;
		var $container = $(this.getDOMNode());
		var $items     = $container.find('.activity-template-a');

		$items.eq(0).fadeIn('fast');

		AS.on('page_next', function (page) {
			_this._bodychange();
			$items.eq(page - 1).fadeOut('slow');
			$items.eq(page).fadeIn('slow');
		});

		AS.on('page_prev', function (page) {
			_this._bodychange();
			$items.eq(page + 1).fadeOut('slow');
			$items.eq(page).fadeIn('slow');
		});

		this._bodychange();
	},

	// Handle by jQuery not the state machines = =
	// It's HACK for future to fix and solve
	shouldComponentUpdate: function () {
		return false;
	},

	_iterator: function (value, key) {
		return (
			<input 
				key={key}
				placeholder={value}
				name={value} />
		);
	},

	// 让 $body 的背景颜色发生改变
	_bodychange: function () {
		var url = 'url(' + this.props.data.design.bgurl + ') 30% 30% no-repeat';
		if (this.props.data.design.bgurl) {
			$body.css({
				'background': url
			});
		} else {
			$body.removeClass();
			$body.toggleClass('activity-template-bg-' + (this.props.page + 1));
		}
	},

	render: function () {

		var data = this.data = this.props.data;

		return (
			<div className="activity-template-a-container">
				<div className="activity-template-a">
					<div className="template-a-article">
					<div className="template-a-image-center">
						<img id="template-a-image" src={data.icon} />
					</div>
					<div className="template-a-info-block">
						<h2>{data.name}</h2>
						<p className="template-a-info-data">{data.date}</p>
						<p className="template-a-info-loca">{data.loca}</p>
					</div>
					</div>
				</div>

				<div className="activity-template-a">
					<div className="template-a-header">
						<h2>相关介绍</h2>
					</div>
					<div className="template-a-article">
						<img src={data.design.imgurl} />
						<p>{data.design.text}</p>
					</div>
				</div>

				<div className="activity-template-a">
					<div className="template-a-header">
						<h2>更多信息</h2>
					</div>
					<div className="template-a-article">
						<iframe
						src={data.design.video}
						frameBorder="0"
						allowFullScreen={true}>
						</iframe>
						<section>
						<p>{data.design.extra}</p>
						<a href={data.design.link}>更多详细信息戳我</a>
						</section>
					</div>
				</div>

				<div className="activity-template-a">
					<div className="template-a-header">
						<h2>报名信息</h2>
					</div>
					<div className="template-a-submit">
						
						{data.info.map(this._iterator)}
						<button onClick={this._join}>确定报名</button>
					</div>
				</div>
			</div>
		);
	},

	_join: function () {
		PageAction.join(this.state);
	}
});

module.exports = TemplateB;