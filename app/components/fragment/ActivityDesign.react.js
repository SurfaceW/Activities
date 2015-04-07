/**
 * ActivityDesign React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React              = window.React;
var $                  = window.$;

var AS                 = require('../../stores/ActivitiesStore');
var ActivityAction     = require('../../actions/ActivityAction');
var PageAction         = require('../../actions/PageAction');
var ActivityDesignPage = require('./ActivityDesignPage.react');
var ActivityDesignInfo = require('./ActivityDesignInfo.react');

var ActivityDesign = React.createClass({

	getInitialState: function () {
		var s = AS.currentActivity;
		if (s.design) {
			return s;
		}

		return $.extend(s, {
			'design': {},
			'info': ['联系人姓名', '联系人电话']
		});
	},

	render: function () {
		return (
			<div className="activity-design-container">
				<div className="activity-design-pages">
					<ActivityDesignPage data={this.state.design} />
					<ActivityDesignInfo data={this.state.info} />
				</div>
				<div className="activity-deisgn-panel">
					<button className="preview-page" onClick={this._preview}>预览</button>
					<button className="finish-design" onClick={this._finish}>完成</button>
				</div>
			</div>
		);
	},

	_preview: function () {
		PageAction.preview();
	},

	_finish: function () {
		PageAction.finish(this.state);
	}

});

module.exports = ActivityDesign;