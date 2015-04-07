/**
 * NewActivity React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React          = window.React;
var $              = window.$;
var AS             = require('../../stores/ActivitiesStore');
var ActivityAction = require('../../actions/ActivityAction');

var NewActivity = React.createClass({

	getInitialState: function () {
		var data;

		if (AS.currentActivity) {
			data = AS.currentActivity;
		} else {
			data = {};
		}

		return {
			'newAc': data.name ? true : false,
			'name': data.name ? data.name : '',
			'type': data.type ? data.type : '',
			'date': data.date ? data.date : '',
			'loca': data.loca ? data.loca : ''
		};
	},

	checkstate: function () {
		this.getInitialState();
	},

	render: function () {

		this.checkstate();

		return (
			<div className="create-new-activity-container">
				<div className="activity-card">
					<div className="activity-card-image">
						<img src="./style/img/ac2.png" />
					</div>
					<div className="activity-card-input">
						<textarea className="activity-name" 
							placeholder="请输入活动名称"
							value={this.state.name}
							onChange={this._changename}></textarea>
					</div>
				</div>
				<div className="activity-info">
					<div className="activity-info-item">
						<label>选择活动类型</label>
						<select className="activity-info-type" 
							onChange={this._changetype} value={this.state.type}>
							<option value="1">聚会</option>
							<option value="2">旅行</option>
							<option value="3">会议</option>
							<option value="4">其它</option>
						</select>
					</div>

					<div className="activity-info-item">
						<label>请选择活动时间</label>
						<input type="date" 
							value={this.state.date}
							className="activity-info-date" 
							onChange={this._changedate}/>
					</div>

					<div className="activity-info-item">
						<label>请选择活动地点</label>
						<input type="text" 
							value={this.state.loca}
							className="activity-info-loca" 
							onChange={this._changeloca}/>
					</div>
				</div>
				<button 
					className="activity-create"
					onClick={this._createNewActivity}>
					确定
				</button>
				<button 
					className="activity-cancel"
					onClick={this._cancel}>
					取消
				</button>
			</div>
		);
	},

	_value: function (t) {
		return $(t).val();
	},

	_changename: function (e) {
		this.setState({'name': this._value(e.target)});
	},

	_changetype: function (e) {
		this.setState({'type': this._value(e.target)});
	},

	_changedate: function (e) {
		this.setState({'date': this._value(e.target)});
	},

	_changeloca: function (e) {
		this.setState({'loca': this._value(e.target)});
	},

	_createNewActivity: function () {
		ActivityAction.create(this.state);
	},

	_cancel: function () {
		ActivityAction.cancel();
	}
});

module.exports = NewActivity;