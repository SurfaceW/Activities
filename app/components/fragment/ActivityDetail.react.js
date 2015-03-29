/**
 * ActivityDetail React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var ActivitiesStore = require('../../stores/ActivitiesStore');
var ActivityAction  = require('../../actions/ActivityAction');

var ActivityDetail = React.createClass({

	_iteratorCard: function (item, i) {
		return (
			<ParticipatorCard
				key={i}
				data={item} />
		);
	},

	render: function () {

		var data = ActivitiesStore.currentActivity;

		return (
			<div className="activity-detail-container">
				<div className="activity-large-card">
					<h2>{data.name}</h2>
					<img src={data.icon} />
					<a><span>活动分享</span>{data.share.url}</a>
					<div className="acitivity-share">
						<img src={data.share['2dc']} />
						<p>点击二维码分享</p>
					</div>
				</div>
				<div className="activity-participators-container">
					<p>参与者</p>
					{data.participators.map(this._iteratorCard)}
				</div>
				<div className="activity-detail-control">
					<button onClick={this._goback}>返回</button>
					<button onClick={this._change}>修改</button>
				</div>
			</div>
		);
	},

	_goback: function () {
		ActivitiesStore.currentActivity = null;
		ActivityAction.cancel();
	},

	_change: function () {
		// Alias for change the activity content.
		ActivityAction.create();
	}
});

var ParticipatorCard = React.createClass({

	render: function () {
		var data = this.props.data;
		return (
			<div className="participator-card">
				<img src={data.icon} />
				<table className="participator-info-line">
					<tr><td>姓名</td><td>{data.name}</td></tr>
					<tr><td>电话</td><td>{data.tel}</td></tr>
				</table>
			</div>
		);
	}

});

module.exports = ActivityDetail;