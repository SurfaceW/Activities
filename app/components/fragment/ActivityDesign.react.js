/**
 * ActivityDesign React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React              = window.React;
var $                  = window.$;

var ActivitiesStore    = require('../../stores/ActivitiesStore');
var ActivityAction     = require('../../actions/ActivityAction');
var PageAction         = require('../../actions/PageAction');
var ActivityDesignPage = require('./ActivityDesignPage.react');
var ActivityDesignInfo = require('./ActivityDesignInfo.react');
var templates          = require('../../constants/constants').ACTIVITY_PAGE_TEMPLATE;

var ActivityDesign = React.createClass({

	getInitialState: function () {
		var s = ActivitiesStore.currentActivity;
		if (s.design) {
			return s;
		}

		var ndesign = [];
		var ninfo = [];
		return $.extend(s, {
			'design': ndesign.concat(templates.design),
			'info': ninfo.concat(templates.info)
		});
	},

	componentDidMount: function () {
		var _this = this;
		ActivitiesStore.on('page_change', function (page) {
			if (_this.state.selectedPage == page) return;
			_this.setState({'selectedPage': page});
		});
	},

	componentWillMount: function () {

	},

	_iteratorPages: function (item, key) {
		return (
			<ActivityDesignPage 
				hieghtligh={item.page == this.state.selectedPage ? true : false}
				type="template" 
				data={item} 
				key={key} />
		);
	},

	render: function () {

		var activityDeisgnPages = [];
		return (
			<div className="activity-design-container">
				<div className="activity-design-pages">
					{this.state.design.map(this._iteratorPages)}
					<ActivityDesignInfo data={this.state.info}/>
				</div>
				<div className="activity-deisgn-panel">
					<button className="add-new-page" onClick={this._newpage}>新建页面</button>
					<button className="delete-page" onClick={this._deletelast}>删除尾页</button>
					<button className="preview-page" onClick={this._preview}>效果预览</button>
					<button className="finish-design" onClick={this._finish}>完成设计</button>
				</div>
			</div>
		);
	},

	_newpage: function () {
		var newp = {'page': 1, 'template': 1, 'components': {}};
		var old = this.state.design
		newp.page = this.state.design.length + 1;
		old.push(newp);
		this.setState({'design': old});
	},

	_deletelast: function () {
		if (this.state.length === 1) return;
		var old = this.state.design;
		old.pop();
		this.setState({'design': old});
	},

	_preview: function () {
		PageAction.preview();
	},

	_finish: function () {
		PageAction.finish(this.state);
	}

});

module.exports = ActivityDesign;