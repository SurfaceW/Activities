/**
 * Event Emiter Class
 * @author SurfaceW
 * @version 1.0
 */

var EventEmiter = function () {};
var _ID         = 1;
var _c          = [];

var fn = EventEmiter.prototype = {

	/**
	 * Event Dispatch / Trigger
	 * @param  {String} e event name
	 * @param  {Object} a arguments of the event
	 */
	dispatch: function (e, a) {
		for (var i = 0; i < _c.length; i++) {
			if (_c[i].e === e) _c[i].c.call(this, a);
		};
	},

	/**
	 * Event Bind
	 * @param  {String} n event name
	 * @param  {Function} c the callback function
	 */
	on: function (n, c) {
		if (typeof n === 'string' && typeof c === 'function') {
			_c.push({
				'id': _ID, 
				'e': n,
				'c': c
			});
			_ID ++;
		}
	},

	/**
	 * Unbind event
	 * @param  {String} e event name
	 * @return {[type]}   [description]
	 */
	off: function (e) {
		if (typeof e !== 'string') return;
		for (var i = _c.length - 1; i >= 0; i--) {
			if (_c[i].e === e) _c.splice(i, 1);
		};
	}
}


fn.trigger = fn.dispatch;
module.exports = EventEmiter;
