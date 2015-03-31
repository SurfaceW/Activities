/**
 * ActivityDesignPage React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React = window.React;
var $     = window.$;

var PageAction = require('../../actions/PageAction');
var AS         = require('../../stores/ActivitiesStore');

var ActivityDesignPage = React.createClass({

	getInitialState: function () {
		return {'data': this.props.data};
	},

	render: function () {
		return (
			
				<div className="activity-design-page-container">

				<div className="page-design-option">
					<label>选择本活动面模板</label>
					<select className="page-design-template"
						value={this.state.data.template}
						onChange={this._changetemplate}>
						<option value="1">简单清晰</option>
						<option value="2">时尚动感</option>
					</select>
				</div>

				<div className="page-design-option">
					<label>外链链接</label>
					<input type="text" 
						value={this.state.data.link}
						placeholder="详细的介绍网址"
						className="page-design-link" 
						onChange={this._changelink} />
				</div>

				<div className="page-design-option">
					<label>视频外链</label>
					<input type="text" 
						value={this.state.data.video}
						placeholder="视频的外部链接地址"
						className="page-design-video" 
						onChange={this._changevideo} />
				</div>

				<div className="page-design-option">
					<label>页面介绍</label>
					<textarea 
						value={this.state.data.text}
						placeholder="来段有意思的文字吧"
						className="page-design-text" 
						onChange={this._changetext}>
					</textarea>
				</div>

				<div className="page-design-option">
					<label>补充说明</label>
					<textarea 
						value={this.state.data.extra}
						placeholder="讲明一些细节"
						className="page-design-text" 
						onChange={this._changeexra}>
					</textarea>
				</div>

				<div className="page-design-option">
					<label>活动图片</label>
					<input type="text" 
						placeholder="URL"
						value={this.state.data.imgurl}
						className="page-design-pic-activity" 
						onChange={this._changeapic} />
				</div>


				<div className="page-design-option">
					<label>背景图片</label>
					<input type="text" 
						value={this.state.data.bgurl}
						placeholder="URL"
						className="page-design-pic-bg" 
						onChange={this._changebg} />
				</div>
			</div>
		);
	},

	_value: function (t) {
		return $(t).val();
	},

	_changestate: function (key, val) {
		var fresh = this.state.data;
		fresh[key] = val;
		this.setState({'data': fresh});
	},

	_changetemplate: function (e) {
		this._changestate('template', this._value(e.target));
	},

	_changelink: function (e) {
		this._changestate('link', this._value(e.target));
	},

	_changebg: function (e) {
		this._changestate('bgurl', this._value(e.target));
	},

	_changeapic: function (e) {
		this._changestate('imgurl', this._value(e.target));
	},

	_changevideo: function (e) {
		this._changestate('video', this._value(e.target));
	},

	_changeexra: function (e) {
		this._changestate('extra', this._value(e.target));
	},

	_changetext: function (e) {
		this._changestate('text', this._value(e.target));
	}
});

module.exports = ActivityDesignPage;