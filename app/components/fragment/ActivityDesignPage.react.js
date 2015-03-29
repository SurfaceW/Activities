/**
 * ActivityDesignPage React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React = window.React;
var $     = window.$;

var PageAction = require('../../actions/PageAction');

var ActivityDesignPage = React.createClass({

	getInitialState: function () {
		return this.props.data;
	},

	render: function () {
		return (
				<div
				key={this._id}
				className={this.props.highlight 
					? "activity-design-page-container"
					: "activity-design-page-container activity-page-highlight"}
				onClick={this._selectpage}
				data-page={this.state.page}>
				<div className="page-design-option">
					<label>选择本页面模板</label>
					<select className="page-design-template"
						onChange={this._changetemplate}>
						<option value="1">简单清晰</option>
						<option value="2">时尚动感</option>
					</select>
				</div>
				<div className="page-design-option">
					<label>页面标题</label>
					<input type="text" 
						placeholder="炫酷的标题"
						className="page-design-title" 
						onChange={this._changetitle} />
				</div>
				<div className="page-design-option">
					<label>页面介绍</label>
					<textarea 
						placeholder="来段有意思的文字吧"
						className="page-design-text" 
						onChange={this._changetext}>
					</textarea>
				</div>
				<div className="page-design-option">
					<label>背景图片</label>
					<input type="file" 
						placeholder="炫酷的标题"
						className="page-design-" 
						onChange={this._changefile} />
				</div>
			</div>
		);
	},

	_selectpage: function (e) {
		PageAction.highlight($(e.currentTarget).attr('data-page'));
	},

	_value: function (t) {
		return $(t).val();
	},

	_changetemplate: function (e) {
		this.state.template = this._value(e.target);
		this.render();
	},

	_changetitle: function (e) {
		this.state.components.title = this._value(e.target);
		this.render();
	},

	_changefile: function (e) {
		this.setState({'components':{'bgurl': this._value(e.target)}});
	},

	_changetext: function (e) {
		this.state.components.text = this._value(e.target);
		this.render();
	}
});

module.exports = ActivityDesignPage;