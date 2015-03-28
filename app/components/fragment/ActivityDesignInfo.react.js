/**
 * ActivityDesignInfo React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React = window.React;
var $     = window.$;

var ActivityDesignInfo = React.createClass({

	getInitialState: function () {
		return {'states': this.props.data};
	},

	_iteratorInfos: function (item, key) {
		return (
			<div className="page-design-option" key={key}>
				<input type="text" 
					value={item}
					data-order={key}
					className="page-design-quiz" 
					placeholder="需要的参与者信息"
					onChange={this._changeinfo} />
				<button className="page-deisgn-quiz-del"
					data-order={key}
					onClick={this._deleteinfo}>删除此Quiz
				</button>
			</div>
		);
	},

	render: function () {
		return (
			<div className="activity-design-page-container">
				<p>请输入你想向参与者征集的信息：</p>
				{this.state.states.map(this._iteratorInfos)}
				<button 
					className="info-item-add" 
					onClick={this._addnewInfo}>
					添加新的选项
				</button>
			</div>
		);
	},

	_changeinfo: function (e) {
		var $target = $(e.target);
		var state = this.state.states;
		state[parseInt($target.attr('data-order'),10)] = $target.val();
		this.setState({'states': state})
	},

	_deleteinfo: function (e) {
		var $target = $(e.target);
		var state = this.state.states;
		state.splice(parseInt($target.attr('data-order'), 10), 1);
		this.setState({'states': state});
	},

	_addnewInfo: function () {
		var state = this.state.states;
		state = this.state.states;
		state[state.length] = '新的信息';
		this.setState({'states': state});
	}
});

module.exports = ActivityDesignInfo;