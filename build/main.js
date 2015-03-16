(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Activities Main App Entrance
 */

var React        = window.React;
var $            = window.$;

var consts       = require('./constants/constants');
var Publisher    = require('./components/Publisher.react');
var Participator = require('./components/AParticipation.react');

// var usertype = null; 
var usertype = 'publisher'; // in test case
// var usertype = 'participator';

(function () {
	var _container = $('body').get(0);
	switch (usertype) {
		case consts.USERTYPE.PUBLISHER: 
			React.render( React.createElement(Publisher, null), _container);
		break;
		case consts.USERTYPE.PARTICIPATOR:
			React.render( React.createElement(Participator, null), _container);
		break;
	}
})();
	


},{"./components/AParticipation.react":2,"./components/Publisher.react":3,"./constants/constants":5}],2:[function(require,module,exports){
var React = window.React;
var $     = window.$;

var Header = require('./fragment/Header.react');

var Participator = React.createClass({displayName: "Participator",
	render: function () {
		return (
			React.createElement("div", null, "I‘m Actually a Participator!")
		);
	}
});

module.exports = Participator;

},{"./fragment/Header.react":4}],3:[function(require,module,exports){
/**
 * Publisher React Componment
 * @author SurfaceW
 * @version 1.0 
 */

var React = window.React;
var $     = window.$;

var Header = require('./fragment/Header.react');
var ActivitiesStore = require('../stores/ActivitiesStore');

var Publisher = React.createClass({displayName: "Publisher",
	render: function () {
		return (
			React.createElement(Header, null)
		);
	}
});

module.exports = Publisher;

},{"../stores/ActivitiesStore":7,"./fragment/Header.react":4}],4:[function(require,module,exports){
var React = window.React;
var $     = window.$;

var Header = React.createClass({displayName: "Header",

	render: function () {
		return (
			React.createElement("header", {className: "header-container"}, 
				React.createElement("div", null, React.createElement("span", {className: "header-logo"}), " Activities")
			)
		);
	}

});

module.exports = Header;

},{}],5:[function(require,module,exports){
/**
 * This is the constants and configuration for app
 */

module.exports = {

	// Identify the usertype
	'USERTYPE': {
		'PUBLISHER': 'publisher',
		'PARTICIPATOR': 'participator'
	}
};

},{}],6:[function(require,module,exports){
/**
 * Change from facebook, with standard obj style with SurfaceW
 * 
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 * @preventMunge
 */

"use strict";

var _lastID = 1;
var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */
function Dispatcher () {

  this._callbacks = {};
  this._isPending = {};
  this._isHandled = {};
  this._isDispatching = false;
  this._pendingPayload = null;

}

/**
 * Registers a callback to be invoked with every dispatched payload. Returns
 * a token that can be used with `waitFor()`.
 *
 * @param {function} callback
 * @return {string}
 */
Dispatcher.prototype.register = function(callback) {
  var id = _prefix + _lastID++;
  this._callbacks[id] = callback;
  return id;
}

/**
 * Removes a callback based on its token.
 *
 * @param {string} id
 */
Dispatcher.prototype.unregister = function(id) {
  invariant(
    this._callbacks[id],
    'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
    id
  );
  delete this._callbacks[id];
}

/**
 * Waits for the callbacks specified to be invoked before continuing execution
 * of the current callback. This method should only be used by a callback in
 * response to a dispatched payload.
 *
 * @param {array<string>} ids
 */
Dispatcher.prototype.waitFor = function(ids) {
  invariant(
    this._isDispatching,
    'Dispatcher.waitFor(...): Must be invoked while dispatching.'
  );
  for (var ii = 0; ii < ids.length; ii++) {
    var id = ids[ii];
    if (this._isPending[id]) {
      invariant(
        this._isHandled[id],
        'Dispatcher.waitFor(...): Circular dependency detected while ' +
        'waiting for `%s`.',
        id
      );
      continue;
    }
    invariant(
      this._callbacks[id],
      'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
      id
    );
    this._invokeCallback(id);
  }
}

/**
 * Dispatches a payload to all registered callbacks.
 *
 * @param {object} payload
 */
Dispatcher.prototype.dispatch = function(payload) {
  invariant(
    !this._isDispatching,
    'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
  );
  this._startDispatching(payload);
  try {
    for (var id in this._callbacks) {
      if (this._isPending[id]) {
        continue;
      }
      this._invokeCallback(id);
    }
  } finally {
    this._stopDispatching();
  }
}

/**
 * Is this Dispatcher currently dispatching.
 *
 * @return {boolean}
 */
Dispatcher.prototype.isDispatching = function() {
  return this._isDispatching;
}

/**
 * Call the callback stored with the given id. Also do some internal
 * bookkeeping.
 *
 * @param {string} id
 * @internal
 */
Dispatcher.prototype._invokeCallback = function(id) {
  this._isPending[id] = true;
  this._callbacks[id](this._pendingPayload);
  this._isHandled[id] = true;
}

/**
 * Set up bookkeeping needed when dispatching.
 *
 * @param {object} payload
 * @internal
 */
Dispatcher.prototype._startDispatching = function(payload) {
  for (var id in this._callbacks) {
    this._isPending[id] = false;
    this._isHandled[id] = false;
  }
  this._pendingPayload = payload;
  this._isDispatching = true;
}

/**
 * Clear bookkeeping used for dispatching.
 *
 * @internal
 */
Dispatcher.prototype._stopDispatching = function() {
  this._pendingPayload = null;
  this._isDispatching = false;
}

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (__DEV__) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};



module.exports = Dispatcher;


},{}],7:[function(require,module,exports){
/**
 * ActivitiesStore Class
 * @author SurfaceW
 * @version 1.0
 */

var $             = window.$;
var AppDispatcher = require('../dispatcher/Dispatcher');
var EventEmiter   = require('../util/EventEmiter');

var ActivitiesStore = {

}

$.extend(ActivitiesStore, EventEmiter.prototype);

ActivitiesStore.on('hello', function (msg) {
	console.log(msg);
});

ActivitiesStore.trigger('hello', 'this is cool!');
ActivitiesStore.off('hello');
ActivitiesStore.trigger('hello', 'fuck you!');

module.exports = ActivitiesStore;

},{"../dispatcher/Dispatcher":6,"../util/EventEmiter":8}],8:[function(require,module,exports){
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
		console.log(_c);
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


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL0FjdGl2aXRpZXMvYXBwL21haW4uanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL0FjdGl2aXRpZXMvYXBwL2NvbXBvbmVudHMvQVBhcnRpY2lwYXRpb24ucmVhY3QuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL0FjdGl2aXRpZXMvYXBwL2NvbXBvbmVudHMvUHVibGlzaGVyLnJlYWN0LmpzIiwiL1VzZXJzL3llcWluZ25hbi9TaXRlcy9BY3Rpdml0aWVzL2FwcC9jb21wb25lbnRzL2ZyYWdtZW50L0hlYWRlci5yZWFjdC5qcyIsIi9Vc2Vycy95ZXFpbmduYW4vU2l0ZXMvQWN0aXZpdGllcy9hcHAvY29uc3RhbnRzL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy95ZXFpbmduYW4vU2l0ZXMvQWN0aXZpdGllcy9hcHAvZGlzcGF0Y2hlci9EaXNwYXRjaGVyLmpzIiwiL1VzZXJzL3llcWluZ25hbi9TaXRlcy9BY3Rpdml0aWVzL2FwcC9zdG9yZXMvQWN0aXZpdGllc1N0b3JlLmpzIiwiL1VzZXJzL3llcWluZ25hbi9TaXRlcy9BY3Rpdml0aWVzL2FwcC91dGlsL0V2ZW50RW1pdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsR0FBRzs7QUFFSCxJQUFJLEtBQUssVUFBVSxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQUksQ0FBQyxjQUFjLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRTVCLElBQUksTUFBTSxTQUFTLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3BELElBQUksU0FBUyxNQUFNLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQzNELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDOztBQUVoRSx3QkFBd0I7QUFD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QUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQ3pDLENBQUM7QUFDSixFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Q0FFQyxFQUFFLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ25CLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsRUFBRTtHQUNyRCxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ1AsSUFBSSxFQUFFLEdBQUc7SUFDVCxHQUFHLEVBQUUsQ0FBQztJQUNOLEdBQUcsRUFBRSxDQUFDO0lBQ04sQ0FBQyxDQUFDO0dBQ0gsR0FBRyxHQUFHLENBQUM7R0FDUDtBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztDQUVDLEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRTtFQUNqQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRSxPQUFPO0VBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtHQUN4QyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQ25DLENBQUM7RUFDRjtBQUNGLENBQUM7QUFDRDs7QUFFQSxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7QUFDekIsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBBY3Rpdml0aWVzIE1haW4gQXBwIEVudHJhbmNlXG4gKi9cblxudmFyIFJlYWN0ICAgICAgICA9IHdpbmRvdy5SZWFjdDtcbnZhciAkICAgICAgICAgICAgPSB3aW5kb3cuJDtcblxudmFyIGNvbnN0cyAgICAgICA9IHJlcXVpcmUoJy4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xudmFyIFB1Ymxpc2hlciAgICA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9QdWJsaXNoZXIucmVhY3QnKTtcbnZhciBQYXJ0aWNpcGF0b3IgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvQVBhcnRpY2lwYXRpb24ucmVhY3QnKTtcblxuLy8gdmFyIHVzZXJ0eXBlID0gbnVsbDsgXG52YXIgdXNlcnR5cGUgPSAncHVibGlzaGVyJzsgLy8gaW4gdGVzdCBjYXNlXG4vLyB2YXIgdXNlcnR5cGUgPSAncGFydGljaXBhdG9yJztcblxuKGZ1bmN0aW9uICgpIHtcblx0dmFyIF9jb250YWluZXIgPSAkKCdib2R5JykuZ2V0KDApO1xuXHRzd2l0Y2ggKHVzZXJ0eXBlKSB7XG5cdFx0Y2FzZSBjb25zdHMuVVNFUlRZUEUuUFVCTElTSEVSOiBcblx0XHRcdFJlYWN0LnJlbmRlciggPFB1Ymxpc2hlciAvPiwgX2NvbnRhaW5lcik7XG5cdFx0YnJlYWs7XG5cdFx0Y2FzZSBjb25zdHMuVVNFUlRZUEUuUEFSVElDSVBBVE9SOlxuXHRcdFx0UmVhY3QucmVuZGVyKCA8UGFydGljaXBhdG9yIC8+LCBfY29udGFpbmVyKTtcblx0XHRicmVhaztcblx0fVxufSkoKTtcblx0XG4iLCJ2YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7XG52YXIgJCAgICAgPSB3aW5kb3cuJDtcblxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4vZnJhZ21lbnQvSGVhZGVyLnJlYWN0Jyk7XG5cbnZhciBQYXJ0aWNpcGF0b3IgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PknigJhtIEFjdHVhbGx5IGEgUGFydGljaXBhdG9yITwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnRpY2lwYXRvcjsiLCIvKipcbiAqIFB1Ymxpc2hlciBSZWFjdCBDb21wb25tZW50XG4gKiBAYXV0aG9yIFN1cmZhY2VXXG4gKiBAdmVyc2lvbiAxLjAgXG4gKi9cblxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xudmFyICQgICAgID0gd2luZG93LiQ7XG5cbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL2ZyYWdtZW50L0hlYWRlci5yZWFjdCcpO1xudmFyIEFjdGl2aXRpZXNTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9BY3Rpdml0aWVzU3RvcmUnKTtcblxudmFyIFB1Ymxpc2hlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxIZWFkZXIgLz5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQdWJsaXNoZXI7IiwidmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xudmFyICQgICAgID0gd2luZG93LiQ7XG5cbnZhciBIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwiaGVhZGVyLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2PjxzcGFuIGNsYXNzTmFtZT1cImhlYWRlci1sb2dvXCI+PC9zcGFuPiBBY3Rpdml0aWVzPC9kaXY+XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHQpO1xuXHR9XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjsiLCIvKipcbiAqIFRoaXMgaXMgdGhlIGNvbnN0YW50cyBhbmQgY29uZmlndXJhdGlvbiBmb3IgYXBwXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0Ly8gSWRlbnRpZnkgdGhlIHVzZXJ0eXBlXG5cdCdVU0VSVFlQRSc6IHtcblx0XHQnUFVCTElTSEVSJzogJ3B1Ymxpc2hlcicsXG5cdFx0J1BBUlRJQ0lQQVRPUic6ICdwYXJ0aWNpcGF0b3InXG5cdH1cbn07IiwiLyoqXG4gKiBDaGFuZ2UgZnJvbSBmYWNlYm9vaywgd2l0aCBzdGFuZGFyZCBvYmogc3R5bGUgd2l0aCBTdXJmYWNlV1xuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRGlzcGF0Y2hlclxuICogQHR5cGVjaGVja3NcbiAqIEBwcmV2ZW50TXVuZ2VcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9sYXN0SUQgPSAxO1xudmFyIF9wcmVmaXggPSAnSURfJztcblxuLyoqXG4gKiBEaXNwYXRjaGVyIGlzIHVzZWQgdG8gYnJvYWRjYXN0IHBheWxvYWRzIHRvIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLiBUaGlzIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSBnZW5lcmljIHB1Yi1zdWIgc3lzdGVtcyBpbiB0d28gd2F5czpcbiAqXG4gKiAgIDEpIENhbGxiYWNrcyBhcmUgbm90IHN1YnNjcmliZWQgdG8gcGFydGljdWxhciBldmVudHMuIEV2ZXJ5IHBheWxvYWQgaXNcbiAqICAgICAgZGlzcGF0Y2hlZCB0byBldmVyeSByZWdpc3RlcmVkIGNhbGxiYWNrLlxuICogICAyKSBDYWxsYmFja3MgY2FuIGJlIGRlZmVycmVkIGluIHdob2xlIG9yIHBhcnQgdW50aWwgb3RoZXIgY2FsbGJhY2tzIGhhdmVcbiAqICAgICAgYmVlbiBleGVjdXRlZC5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgY29uc2lkZXIgdGhpcyBoeXBvdGhldGljYWwgZmxpZ2h0IGRlc3RpbmF0aW9uIGZvcm0sIHdoaWNoXG4gKiBzZWxlY3RzIGEgZGVmYXVsdCBjaXR5IHdoZW4gYSBjb3VudHJ5IGlzIHNlbGVjdGVkOlxuICpcbiAqICAgdmFyIGZsaWdodERpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuICpcbiAqICAgLy8gS2VlcHMgdHJhY2sgb2Ygd2hpY2ggY291bnRyeSBpcyBzZWxlY3RlZFxuICogICB2YXIgQ291bnRyeVN0b3JlID0ge2NvdW50cnk6IG51bGx9O1xuICpcbiAqICAgLy8gS2VlcHMgdHJhY2sgb2Ygd2hpY2ggY2l0eSBpcyBzZWxlY3RlZFxuICogICB2YXIgQ2l0eVN0b3JlID0ge2NpdHk6IG51bGx9O1xuICpcbiAqICAgLy8gS2VlcHMgdHJhY2sgb2YgdGhlIGJhc2UgZmxpZ2h0IHByaWNlIG9mIHRoZSBzZWxlY3RlZCBjaXR5XG4gKiAgIHZhciBGbGlnaHRQcmljZVN0b3JlID0ge3ByaWNlOiBudWxsfVxuICpcbiAqIFdoZW4gYSB1c2VyIGNoYW5nZXMgdGhlIHNlbGVjdGVkIGNpdHksIHdlIGRpc3BhdGNoIHRoZSBwYXlsb2FkOlxuICpcbiAqICAgZmxpZ2h0RGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gKiAgICAgYWN0aW9uVHlwZTogJ2NpdHktdXBkYXRlJyxcbiAqICAgICBzZWxlY3RlZENpdHk6ICdwYXJpcydcbiAqICAgfSk7XG4gKlxuICogVGhpcyBwYXlsb2FkIGlzIGRpZ2VzdGVkIGJ5IGBDaXR5U3RvcmVgOlxuICpcbiAqICAgZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NpdHktdXBkYXRlJykge1xuICogICAgICAgQ2l0eVN0b3JlLmNpdHkgPSBwYXlsb2FkLnNlbGVjdGVkQ2l0eTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGNvdW50cnksIHdlIGRpc3BhdGNoIHRoZSBwYXlsb2FkOlxuICpcbiAqICAgZmxpZ2h0RGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gKiAgICAgYWN0aW9uVHlwZTogJ2NvdW50cnktdXBkYXRlJyxcbiAqICAgICBzZWxlY3RlZENvdW50cnk6ICdhdXN0cmFsaWEnXG4gKiAgIH0pO1xuICpcbiAqIFRoaXMgcGF5bG9hZCBpcyBkaWdlc3RlZCBieSBib3RoIHN0b3JlczpcbiAqXG4gKiAgIENvdW50cnlTdG9yZS5kaXNwYXRjaFRva2VuID0gZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NvdW50cnktdXBkYXRlJykge1xuICogICAgICAgQ291bnRyeVN0b3JlLmNvdW50cnkgPSBwYXlsb2FkLnNlbGVjdGVkQ291bnRyeTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFdoZW4gdGhlIGNhbGxiYWNrIHRvIHVwZGF0ZSBgQ291bnRyeVN0b3JlYCBpcyByZWdpc3RlcmVkLCB3ZSBzYXZlIGEgcmVmZXJlbmNlXG4gKiB0byB0aGUgcmV0dXJuZWQgdG9rZW4uIFVzaW5nIHRoaXMgdG9rZW4gd2l0aCBgd2FpdEZvcigpYCwgd2UgY2FuIGd1YXJhbnRlZVxuICogdGhhdCBgQ291bnRyeVN0b3JlYCBpcyB1cGRhdGVkIGJlZm9yZSB0aGUgY2FsbGJhY2sgdGhhdCB1cGRhdGVzIGBDaXR5U3RvcmVgXG4gKiBuZWVkcyB0byBxdWVyeSBpdHMgZGF0YS5cbiAqXG4gKiAgIENpdHlTdG9yZS5kaXNwYXRjaFRva2VuID0gZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NvdW50cnktdXBkYXRlJykge1xuICogICAgICAgLy8gYENvdW50cnlTdG9yZS5jb3VudHJ5YCBtYXkgbm90IGJlIHVwZGF0ZWQuXG4gKiAgICAgICBmbGlnaHREaXNwYXRjaGVyLndhaXRGb3IoW0NvdW50cnlTdG9yZS5kaXNwYXRjaFRva2VuXSk7XG4gKiAgICAgICAvLyBgQ291bnRyeVN0b3JlLmNvdW50cnlgIGlzIG5vdyBndWFyYW50ZWVkIHRvIGJlIHVwZGF0ZWQuXG4gKlxuICogICAgICAgLy8gU2VsZWN0IHRoZSBkZWZhdWx0IGNpdHkgZm9yIHRoZSBuZXcgY291bnRyeVxuICogICAgICAgQ2l0eVN0b3JlLmNpdHkgPSBnZXREZWZhdWx0Q2l0eUZvckNvdW50cnkoQ291bnRyeVN0b3JlLmNvdW50cnkpO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIHVzYWdlIG9mIGB3YWl0Rm9yKClgIGNhbiBiZSBjaGFpbmVkLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiAgIEZsaWdodFByaWNlU3RvcmUuZGlzcGF0Y2hUb2tlbiA9XG4gKiAgICAgZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgICBzd2l0Y2ggKHBheWxvYWQuYWN0aW9uVHlwZSkge1xuICogICAgICAgICBjYXNlICdjb3VudHJ5LXVwZGF0ZSc6XG4gKiAgICAgICAgIGNhc2UgJ2NpdHktdXBkYXRlJzpcbiAqICAgICAgICAgICBmbGlnaHREaXNwYXRjaGVyLndhaXRGb3IoW0NpdHlTdG9yZS5kaXNwYXRjaFRva2VuXSk7XG4gKiAgICAgICAgICAgRmxpZ2h0UHJpY2VTdG9yZS5wcmljZSA9XG4gKiAgICAgICAgICAgICBnZXRGbGlnaHRQcmljZVN0b3JlKENvdW50cnlTdG9yZS5jb3VudHJ5LCBDaXR5U3RvcmUuY2l0eSk7XG4gKiAgICAgICAgICAgYnJlYWs7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgYGNvdW50cnktdXBkYXRlYCBwYXlsb2FkIHdpbGwgYmUgZ3VhcmFudGVlZCB0byBpbnZva2UgdGhlIHN0b3JlcydcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzIGluIG9yZGVyOiBgQ291bnRyeVN0b3JlYCwgYENpdHlTdG9yZWAsIHRoZW5cbiAqIGBGbGlnaHRQcmljZVN0b3JlYC5cbiAqL1xuZnVuY3Rpb24gRGlzcGF0Y2hlciAoKSB7XG5cbiAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gIHRoaXMuX2lzUGVuZGluZyA9IHt9O1xuICB0aGlzLl9pc0hhbmRsZWQgPSB7fTtcbiAgdGhpcy5faXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICB0aGlzLl9wZW5kaW5nUGF5bG9hZCA9IG51bGw7XG5cbn1cblxuLyoqXG4gKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSBpbnZva2VkIHdpdGggZXZlcnkgZGlzcGF0Y2hlZCBwYXlsb2FkLiBSZXR1cm5zXG4gKiBhIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBgd2FpdEZvcigpYC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBpZCA9IF9wcmVmaXggKyBfbGFzdElEKys7XG4gIHRoaXMuX2NhbGxiYWNrc1tpZF0gPSBjYWxsYmFjaztcbiAgcmV0dXJuIGlkO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBjYWxsYmFjayBiYXNlZCBvbiBpdHMgdG9rZW4uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gKi9cbkRpc3BhdGNoZXIucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbihpZCkge1xuICBpbnZhcmlhbnQoXG4gICAgdGhpcy5fY2FsbGJhY2tzW2lkXSxcbiAgICAnRGlzcGF0Y2hlci51bnJlZ2lzdGVyKC4uLik6IGAlc2AgZG9lcyBub3QgbWFwIHRvIGEgcmVnaXN0ZXJlZCBjYWxsYmFjay4nLFxuICAgIGlkXG4gICk7XG4gIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbaWRdO1xufVxuXG4vKipcbiAqIFdhaXRzIGZvciB0aGUgY2FsbGJhY2tzIHNwZWNpZmllZCB0byBiZSBpbnZva2VkIGJlZm9yZSBjb250aW51aW5nIGV4ZWN1dGlvblxuICogb2YgdGhlIGN1cnJlbnQgY2FsbGJhY2suIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIHVzZWQgYnkgYSBjYWxsYmFjayBpblxuICogcmVzcG9uc2UgdG8gYSBkaXNwYXRjaGVkIHBheWxvYWQuXG4gKlxuICogQHBhcmFtIHthcnJheTxzdHJpbmc+fSBpZHNcbiAqL1xuRGlzcGF0Y2hlci5wcm90b3R5cGUud2FpdEZvciA9IGZ1bmN0aW9uKGlkcykge1xuICBpbnZhcmlhbnQoXG4gICAgdGhpcy5faXNEaXNwYXRjaGluZyxcbiAgICAnRGlzcGF0Y2hlci53YWl0Rm9yKC4uLik6IE11c3QgYmUgaW52b2tlZCB3aGlsZSBkaXNwYXRjaGluZy4nXG4gICk7XG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBpZHMubGVuZ3RoOyBpaSsrKSB7XG4gICAgdmFyIGlkID0gaWRzW2lpXTtcbiAgICBpZiAodGhpcy5faXNQZW5kaW5nW2lkXSkge1xuICAgICAgaW52YXJpYW50KFxuICAgICAgICB0aGlzLl9pc0hhbmRsZWRbaWRdLFxuICAgICAgICAnRGlzcGF0Y2hlci53YWl0Rm9yKC4uLik6IENpcmN1bGFyIGRlcGVuZGVuY3kgZGV0ZWN0ZWQgd2hpbGUgJyArXG4gICAgICAgICd3YWl0aW5nIGZvciBgJXNgLicsXG4gICAgICAgIGlkXG4gICAgICApO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGludmFyaWFudChcbiAgICAgIHRoaXMuX2NhbGxiYWNrc1tpZF0sXG4gICAgICAnRGlzcGF0Y2hlci53YWl0Rm9yKC4uLik6IGAlc2AgZG9lcyBub3QgbWFwIHRvIGEgcmVnaXN0ZXJlZCBjYWxsYmFjay4nLFxuICAgICAgaWRcbiAgICApO1xuICAgIHRoaXMuX2ludm9rZUNhbGxiYWNrKGlkKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoZXMgYSBwYXlsb2FkIHRvIGFsbCByZWdpc3RlcmVkIGNhbGxiYWNrcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcGF5bG9hZFxuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAgaW52YXJpYW50KFxuICAgICF0aGlzLl9pc0Rpc3BhdGNoaW5nLFxuICAgICdEaXNwYXRjaC5kaXNwYXRjaCguLi4pOiBDYW5ub3QgZGlzcGF0Y2ggaW4gdGhlIG1pZGRsZSBvZiBhIGRpc3BhdGNoLidcbiAgKTtcbiAgdGhpcy5fc3RhcnREaXNwYXRjaGluZyhwYXlsb2FkKTtcbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgIGlmICh0aGlzLl9pc1BlbmRpbmdbaWRdKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5faW52b2tlQ2FsbGJhY2soaWQpO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICB0aGlzLl9zdG9wRGlzcGF0Y2hpbmcoKTtcbiAgfVxufVxuXG4vKipcbiAqIElzIHRoaXMgRGlzcGF0Y2hlciBjdXJyZW50bHkgZGlzcGF0Y2hpbmcuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuRGlzcGF0Y2hlci5wcm90b3R5cGUuaXNEaXNwYXRjaGluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5faXNEaXNwYXRjaGluZztcbn1cblxuLyoqXG4gKiBDYWxsIHRoZSBjYWxsYmFjayBzdG9yZWQgd2l0aCB0aGUgZ2l2ZW4gaWQuIEFsc28gZG8gc29tZSBpbnRlcm5hbFxuICogYm9va2tlZXBpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gKiBAaW50ZXJuYWxcbiAqL1xuRGlzcGF0Y2hlci5wcm90b3R5cGUuX2ludm9rZUNhbGxiYWNrID0gZnVuY3Rpb24oaWQpIHtcbiAgdGhpcy5faXNQZW5kaW5nW2lkXSA9IHRydWU7XG4gIHRoaXMuX2NhbGxiYWNrc1tpZF0odGhpcy5fcGVuZGluZ1BheWxvYWQpO1xuICB0aGlzLl9pc0hhbmRsZWRbaWRdID0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBTZXQgdXAgYm9va2tlZXBpbmcgbmVlZGVkIHdoZW4gZGlzcGF0Y2hpbmcuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBheWxvYWRcbiAqIEBpbnRlcm5hbFxuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5fc3RhcnREaXNwYXRjaGluZyA9IGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAgZm9yICh2YXIgaWQgaW4gdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgdGhpcy5faXNQZW5kaW5nW2lkXSA9IGZhbHNlO1xuICAgIHRoaXMuX2lzSGFuZGxlZFtpZF0gPSBmYWxzZTtcbiAgfVxuICB0aGlzLl9wZW5kaW5nUGF5bG9hZCA9IHBheWxvYWQ7XG4gIHRoaXMuX2lzRGlzcGF0Y2hpbmcgPSB0cnVlO1xufVxuXG4vKipcbiAqIENsZWFyIGJvb2trZWVwaW5nIHVzZWQgZm9yIGRpc3BhdGNoaW5nLlxuICpcbiAqIEBpbnRlcm5hbFxuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5fc3RvcERpc3BhdGNoaW5nID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3BlbmRpbmdQYXlsb2FkID0gbnVsbDtcbiAgdGhpcy5faXNEaXNwYXRjaGluZyA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKF9fREVWX18pIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gRGlzcGF0Y2hlcjtcbiIsIi8qKlxuICogQWN0aXZpdGllc1N0b3JlIENsYXNzXG4gKiBAYXV0aG9yIFN1cmZhY2VXXG4gKiBAdmVyc2lvbiAxLjBcbiAqL1xuXG52YXIgJCAgICAgICAgICAgICA9IHdpbmRvdy4kO1xudmFyIEFwcERpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyL0Rpc3BhdGNoZXInKTtcbnZhciBFdmVudEVtaXRlciAgID0gcmVxdWlyZSgnLi4vdXRpbC9FdmVudEVtaXRlcicpO1xuXG52YXIgQWN0aXZpdGllc1N0b3JlID0ge1xuXG59XG5cbiQuZXh0ZW5kKEFjdGl2aXRpZXNTdG9yZSwgRXZlbnRFbWl0ZXIucHJvdG90eXBlKTtcblxuQWN0aXZpdGllc1N0b3JlLm9uKCdoZWxsbycsIGZ1bmN0aW9uIChtc2cpIHtcblx0Y29uc29sZS5sb2cobXNnKTtcbn0pO1xuXG5BY3Rpdml0aWVzU3RvcmUudHJpZ2dlcignaGVsbG8nLCAndGhpcyBpcyBjb29sIScpO1xuQWN0aXZpdGllc1N0b3JlLm9mZignaGVsbG8nKTtcbkFjdGl2aXRpZXNTdG9yZS50cmlnZ2VyKCdoZWxsbycsICdmdWNrIHlvdSEnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY3Rpdml0aWVzU3RvcmU7IiwiLyoqXG4gKiBFdmVudCBFbWl0ZXIgQ2xhc3NcbiAqIEBhdXRob3IgU3VyZmFjZVdcbiAqIEB2ZXJzaW9uIDEuMFxuICovXG5cbnZhciBFdmVudEVtaXRlciA9IGZ1bmN0aW9uICgpIHt9O1xudmFyIF9JRCAgICAgICAgID0gMTtcbnZhciBfYyAgICAgICAgICA9IFtdO1xuXG52YXIgZm4gPSBFdmVudEVtaXRlci5wcm90b3R5cGUgPSB7XG5cblx0LyoqXG5cdCAqIEV2ZW50IERpc3BhdGNoIC8gVHJpZ2dlclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGUgZXZlbnQgbmFtZVxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IGEgYXJndW1lbnRzIG9mIHRoZSBldmVudFxuXHQgKi9cblx0ZGlzcGF0Y2g6IGZ1bmN0aW9uIChlLCBhKSB7XG5cdFx0Y29uc29sZS5sb2coX2MpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgX2MubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChfY1tpXS5lID09PSBlKSBfY1tpXS5jLmNhbGwodGhpcywgYSk7XG5cdFx0fTtcblx0fSxcblxuXHQvKipcblx0ICogRXZlbnQgQmluZFxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IG4gZXZlbnQgbmFtZVxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gYyB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdG9uOiBmdW5jdGlvbiAobiwgYykge1xuXHRcdGlmICh0eXBlb2YgbiA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGMgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdF9jLnB1c2goe1xuXHRcdFx0XHQnaWQnOiBfSUQsIFxuXHRcdFx0XHQnZSc6IG4sXG5cdFx0XHRcdCdjJzogY1xuXHRcdFx0fSk7XG5cdFx0XHRfSUQgKys7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBVbmJpbmQgZXZlbnRcblx0ICogQHBhcmFtICB7U3RyaW5nfSBlIGV2ZW50IG5hbWVcblx0ICogQHJldHVybiB7W3R5cGVdfSAgIFtkZXNjcmlwdGlvbl1cblx0ICovXG5cdG9mZjogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAodHlwZW9mIGUgIT09ICdzdHJpbmcnKSByZXR1cm47XG5cdFx0Zm9yICh2YXIgaSA9IF9jLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRpZiAoX2NbaV0uZSA9PT0gZSkgX2Muc3BsaWNlKGksIDEpO1xuXHRcdH07XG5cdH1cbn1cblxuXG5mbi50cmlnZ2VyID0gZm4uZGlzcGF0Y2g7XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdGVyO1xuIl19
