/**
 * NewActivity React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $ = window.$;

var ActivitiesStore = require('../../stores/ActivitiesStore');
var ActivityAction  = require('../../actions/ActivityAction');

var SelectInput     = require('../forms/Select.react');
var InputText       = require('../forms/InputText.react');
var InputDate       = require('../forms/InputDate.react');

var NewActivity = React.createClass({

	getInitialState: function () {
		return {
			'name': null,
			'type': null,
			'date': null,
			'loca': null
		};
	},

	render: function () {
		return (
			<div className="create-new-activity-container">
				<div className="activity-card">
					<img src=""></img>
					<input type="text" className="activity-name" 
						placeholder="请输入活动名称" 
						onChange={this._changename}
					/>
				</div>
				<div className="activity-info">
					<div className="activity-info-item">
						<label>选择活动类型</label>
						<select className="activity-info-type" 
							onChange={this._changetype}>
							<option value="1">聚会</option>
							<option value="2">旅行</option>
							<option value="3">会议</option>
							<option value="4">其它</option>
						</select>
					</div>

					<div className="activity-info-item">
						<label>请选择活动时间</label>
						<input type="date" 
							className="activity-info-date" 
							onChange={this._changedate}/>
					</div>

					<div className="activity-info-item">
						<label>请选择活动地点</label>
						<input type="text" 
							className="activity-info-loca" 
							onChange={this._changeloca}/>
					</div>
				</div>
				<button 
					className="activity-create"
					onClick={this._createNewActivity}>
					创建活动
				</button>
				<button 
					className="activity-cancel"
					onClick={this._cancel}>
					取消创建
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
		console.log({'type': this._value(e.target)});
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