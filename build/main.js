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
	var _container = $('#main-container').get(0);
	switch (usertype) {
		case consts.USERTYPE.PUBLISHER: 
			React.render( React.createElement(Publisher, null), _container);
		break;
		case consts.USERTYPE.PARTICIPATOR:
			React.render( React.createElement(Participator, null), _container);
		break;
	}
})();
	


},{"./components/AParticipation.react":3,"./components/Publisher.react":4,"./constants/constants":8}],2:[function(require,module,exports){
/**
 * Activity Action Class
 * @author SurfaceW
 * @version 1.0
 */

var consts          = require('../constants/constants');
var ActivitiesStore = require('../stores/ActivitiesStore');
var AppDispatcher   = ActivitiesStore.dispatcher;

var activityEvent = consts.ACTIVITY_EVENTS;
var ActivityAction = {

	fetch: function () {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_FETCH
		});
	},

	create: function (content) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_CREATE,
			content: content
		});
	},

	update: function (content) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_UPDATE,
			content: content
		});
	},

	delete: function (id) {
		AppDispatcher.dispatch({
			type: activityEvent.ACTIVITY_DELETE,
			id: id
		});
	}

};

module.exports = ActivityAction;

},{"../constants/constants":8,"../stores/ActivitiesStore":10}],3:[function(require,module,exports){
/**
 * Participator React Componment
 * @author SurfaceW
 * @version 1.0 
 */

var React = window.React;

var Participator = React.createClass({displayName: "Participator",
	render: function () {
		return (
			React.createElement("div", null, "Actually a Participator!")
		);
	}
});

module.exports = Participator;

},{}],4:[function(require,module,exports){
/**
 * Publisher React Componment
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;

var Header          = require('./fragment/Header.react');
var ActivityList    = require('./fragment/ActivityList.react');
var ActivitiesStore = require('../stores/ActivitiesStore');
var ActivityAction  = require('../actions/ActivityAction');


var Publisher = React.createClass({displayName: "Publisher",
	render: function () {

		// Async load data from server
		setTimeout(function () {
			ActivityAction.fetch();
		}, 1);

		return (
			React.createElement("div", {className: "wrapper"}, 
				React.createElement(Header, null), 
				React.createElement(ActivityList, null)
			)
		);
	}
});

module.exports = Publisher;

},{"../actions/ActivityAction":2,"../stores/ActivitiesStore":10,"./fragment/ActivityList.react":6,"./fragment/Header.react":7}],5:[function(require,module,exports){
/**
 * ActivityItem React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React = window.React;
var $     = window.$;

var ActivityItem = React.createClass({displayName: "ActivityItem",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("h2", null, this.props.content.name)
			)
		);
	}
});

module.exports = ActivityItem;

},{}],6:[function(require,module,exports){
/**
 * ActivityList React Componement
 * @author SurfaceW
 * @version 1.0 
 */

var React           = window.React;
var $               = window.$;
var ActivitiesStore = require('../../stores/ActivitiesStore');
var ActivityItem    = require('./ActivityItem.react');

var ActivityList = React.createClass({displayName: "ActivityList",

	isini: false,

	ini: function () {
		var _this  = this;
		this.isini = true;

		ActivitiesStore.on('fetch_complete', function () {
			_this.setState({'fetchComplete': true});
		});
	},

	render: function () {

		var _this = this;
		var activitiesData = ActivitiesStore.getAll();
		var activities = [];

		if (!this.isini) this.ini();

		if (!!activitiesData && activitiesData.length >= 1) {

			for (var i = 0; i < activitiesData.length; i++) {
				activities.push(React.createElement(ActivityItem, {key: i, content: activitiesData[i]}));
			};

			return (React.createElement("div", null, activities));

		} else if (!!activitiesData && activitiesData.length === 0) {

			// User hasn't create any activity
			return (React.createElement("div", null, " ", "You haven't yet create an activity!", " "));

		} else {

			// Loading from server
			return (React.createElement("div", null, "Now Processing the Data..."));
		}
	}
});

module.exports = ActivityList;

},{"../../stores/ActivitiesStore":10,"./ActivityItem.react":5}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
/**
 * This is the constants and configuration for app
 */

module.exports = {

	// Usertype
	'USERTYPE': {

		'PUBLISHER': 'publisher',
		'PARTICIPATOR': 'participator'
	},

	// H5 Componements Type
	'TEMPLATE_COMPONEMENT_TYPE': {

		'BACKGROUND_DEFAUT': 0,
		'BACKGROUND_URL': 1,

		'TITLE_LARGE': 10,
		'TITLE_MIDDLE':11,
		'TITLE_SMALL': 12,

		'PARAGRAPTH': 20,

		'LINK': 30,

		'IMAGE': 40,

		'SOUND': 50,

		'VIDEO': 60,

		'LOCATION': 70,

		'DATE_TIME': 80
	}, 

	// Componements Showing and Hiding Style
	'TEMPLATE_COMPONEMENT_DISPLAY_TYPE': {

		'EASE_IN': 0,
		'EASE_OUT': 1
	},

	// Componements Special Animation Style
	'TEMPLATE_COMPONEMENT_AINMATION_TYPE': {

		'SWING': 0
	},

	// Activity Events
	'ACTIVITY_EVENTS': {
		'ACTIVITY_FETCH': 	0,
		'ACTIVITY_CREATE': 	1,
		'ACTIVITY_UPDATE': 	2,
		'ACTIVITY_DELETE': 	3 
	}

};

},{}],9:[function(require,module,exports){
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
  // if (__DEV__) {
  //   if (format === undefined) {
  //     throw new Error('invariant requires an error message argument');
  //   }
  // }

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


},{}],10:[function(require,module,exports){
/**
 * ActivitiesStore Class
 * @author SurfaceW
 * @version 1.0
 */

var $             = window.$;
var consts        = require('../constants/constants');
var AppDispatcher = require('../dispatcher/Dispatcher');
var EventEmiter   = require('../util/EventEmiter');

var _activities = {};
var activityEvent = consts.ACTIVITY_EVENTS;

// Data for testing
var activitiesData = [
	{
		'id': 0,
		'name': '2015同学聚会',
		'detail': [
			{
				'page': 1,
				'components': [
					{'type': 1, 'value': './static/xx/xx.png'},
					{'type': 10, 'show': 1, 'value': '2015高中同学聚会'}
				]
			},
			{
				'page': 2,
				'components': [
					{'type': 0, 'value': 'blue'},
					{'type': 20, 'show': 2, 'hide': 1, 'value': '2015同学会是由高12级组织的一次主要的活动。'},
					{'type': 20, 'show': 2, 'hide': 1, 'value': 
					'我们已经很久没有见面了，这将会是一次有意思的旅程。'+'我们考虑在适当的地方见面，在适当的地方做一些有意思的事情！'}
				]
			},
			{
				'page': 3,
				'components': [
					{'type': 0, 'value': 'green'},
					{'type': 20, 'show': 1, 'value': '欢迎加入我们！'},
					{'type': 80, 'show': 1, 'value': '2015-7-20 9:30'},
					{'type': 70, 'show': 2, 'value': '四川省内江市，内江市第六中学高中部'}
				]
			}
		]
	},
	{
		'id': 1,
		'name': '南非支教活动',
		'detail': []
	}
];

var ActivitiesStore = {

	getAll: function () {
		return _activities;
	}
};

function fetch() {
	// return $.ajax({
	// 	url: '',
	// 	type: ''
	// });
	
	_activities = activitiesData;
}

function create() {
}

function update() {
}

function deleteItem() {
}

$.extend(ActivitiesStore, EventEmiter.prototype);

ActivitiesStore.dispatcher = new AppDispatcher();
ActivitiesStore.dispatcher.register(function (action) {
	switch(action.type) {
		case activityEvent.ACTIVITY_FETCH:
			// fetch().done(function () {});
			fetch();
			ActivitiesStore.trigger('fetch_complete');
		break;
		case activityEvent.ACTIVITY_CREATE: 
		
		break;
		case activityEvent.ACTIVITY_UPDATE:

		break;
		case activityEvent.ACTIVITY_DELETE:

		break;
	}
});

module.exports = ActivitiesStore;

},{"../constants/constants":8,"../dispatcher/Dispatcher":9,"../util/EventEmiter":11}],11:[function(require,module,exports){
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

fn.emmit   = fn.on;
fn.trigger = fn.dispatch;

module.exports = EventEmiter;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL0FjdGl2aXRpZXMvYXBwL21haW4uanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL0FjdGl2aXRpZXMvYXBwL2FjdGlvbnMvQWN0aXZpdHlBY3Rpb24uanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL0FjdGl2aXRpZXMvYXBwL2NvbXBvbmVudHMvQVBhcnRpY2lwYXRpb24ucmVhY3QuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL0FjdGl2aXRpZXMvYXBwL2NvbXBvbmVudHMvUHVibGlzaGVyLnJlYWN0LmpzIiwiL1VzZXJzL3llcWluZ25hbi9TaXRlcy9BY3Rpdml0aWVzL2FwcC9jb21wb25lbnRzL2ZyYWdtZW50L0FjdGl2aXR5SXRlbS5yZWFjdC5qcyIsIi9Vc2Vycy95ZXFpbmduYW4vU2l0ZXMvQWN0aXZpdGllcy9hcHAvY29tcG9uZW50cy9mcmFnbWVudC9BY3Rpdml0eUxpc3QucmVhY3QuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL0FjdGl2aXRpZXMvYXBwL2NvbXBvbmVudHMvZnJhZ21lbnQvSGVhZGVyLnJlYWN0LmpzIiwiL1VzZXJzL3llcWluZ25hbi9TaXRlcy9BY3Rpdml0aWVzL2FwcC9jb25zdGFudHMvY29uc3RhbnRzLmpzIiwiL1VzZXJzL3llcWluZ25hbi9TaXRlcy9BY3Rpdml0aWVzL2FwcC9kaXNwYXRjaGVyL0Rpc3BhdGNoZXIuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL0FjdGl2aXRpZXMvYXBwL3N0b3Jlcy9BY3Rpdml0aWVzU3RvcmUuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL0FjdGl2aXRpZXMvYXBwL3V0aWwvRXZlbnRFbWl0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxHQUFHOztBQUVILElBQUksS0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7R0FFRztBQUNILFNBQVMsVUFBVSxJQUFJOztFQUVyQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztFQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztFQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztFQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztBQUM5QixFQUFFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDOztBQUU5QixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0dBRUc7QUFDSCxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLFFBQVEsRUFBRTtFQUNqRCxJQUFJLEVBQUUsR0FBRyxPQUFPLEdBQUcsT0FBTyxFQUFFLENBQUM7RUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUM7RUFDL0IsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDOztBQUVEO0FBQ0E7QUFDQTs7R0FFRztBQUNILFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsRUFBRSxFQUFFO0VBQzdDLFNBQVM7SUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztJQUNuQix5RUFBeUU7SUFDekUs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QUFPO0VBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtHQUN4QyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQ25DLENBQUM7RUFDRjtBQUNGLENBQUM7O0FBRUQsRUFBRSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ25CLEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7QUFFekIsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBBY3Rpdml0aWVzIE1haW4gQXBwIEVudHJhbmNlXG4gKi9cblxudmFyIFJlYWN0ICAgICAgICA9IHdpbmRvdy5SZWFjdDtcbnZhciAkICAgICAgICAgICAgPSB3aW5kb3cuJDtcblxudmFyIGNvbnN0cyAgICAgICA9IHJlcXVpcmUoJy4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xudmFyIFB1Ymxpc2hlciAgICA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9QdWJsaXNoZXIucmVhY3QnKTtcbnZhciBQYXJ0aWNpcGF0b3IgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvQVBhcnRpY2lwYXRpb24ucmVhY3QnKTtcblxuLy8gdmFyIHVzZXJ0eXBlID0gbnVsbDsgXG52YXIgdXNlcnR5cGUgPSAncHVibGlzaGVyJzsgLy8gaW4gdGVzdCBjYXNlXG4vLyB2YXIgdXNlcnR5cGUgPSAncGFydGljaXBhdG9yJztcblxuKGZ1bmN0aW9uICgpIHtcblx0dmFyIF9jb250YWluZXIgPSAkKCcjbWFpbi1jb250YWluZXInKS5nZXQoMCk7XG5cdHN3aXRjaCAodXNlcnR5cGUpIHtcblx0XHRjYXNlIGNvbnN0cy5VU0VSVFlQRS5QVUJMSVNIRVI6IFxuXHRcdFx0UmVhY3QucmVuZGVyKCA8UHVibGlzaGVyIC8+LCBfY29udGFpbmVyKTtcblx0XHRicmVhaztcblx0XHRjYXNlIGNvbnN0cy5VU0VSVFlQRS5QQVJUSUNJUEFUT1I6XG5cdFx0XHRSZWFjdC5yZW5kZXIoIDxQYXJ0aWNpcGF0b3IgLz4sIF9jb250YWluZXIpO1xuXHRcdGJyZWFrO1xuXHR9XG59KSgpO1xuXHRcbiIsIi8qKlxuICogQWN0aXZpdHkgQWN0aW9uIENsYXNzXG4gKiBAYXV0aG9yIFN1cmZhY2VXXG4gKiBAdmVyc2lvbiAxLjBcbiAqL1xuXG52YXIgY29uc3RzICAgICAgICAgID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xudmFyIEFjdGl2aXRpZXNTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9BY3Rpdml0aWVzU3RvcmUnKTtcbnZhciBBcHBEaXNwYXRjaGVyICAgPSBBY3Rpdml0aWVzU3RvcmUuZGlzcGF0Y2hlcjtcblxudmFyIGFjdGl2aXR5RXZlbnQgPSBjb25zdHMuQUNUSVZJVFlfRVZFTlRTO1xudmFyIEFjdGl2aXR5QWN0aW9uID0ge1xuXG5cdGZldGNoOiBmdW5jdGlvbiAoKSB7XG5cdFx0QXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBhY3Rpdml0eUV2ZW50LkFDVElWSVRZX0ZFVENIXG5cdFx0fSk7XG5cdH0sXG5cblx0Y3JlYXRlOiBmdW5jdGlvbiAoY29udGVudCkge1xuXHRcdEFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogYWN0aXZpdHlFdmVudC5BQ1RJVklUWV9DUkVBVEUsXG5cdFx0XHRjb250ZW50OiBjb250ZW50XG5cdFx0fSk7XG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiAoY29udGVudCkge1xuXHRcdEFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogYWN0aXZpdHlFdmVudC5BQ1RJVklUWV9VUERBVEUsXG5cdFx0XHRjb250ZW50OiBjb250ZW50XG5cdFx0fSk7XG5cdH0sXG5cblx0ZGVsZXRlOiBmdW5jdGlvbiAoaWQpIHtcblx0XHRBcHBEaXNwYXRjaGVyLmRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IGFjdGl2aXR5RXZlbnQuQUNUSVZJVFlfREVMRVRFLFxuXHRcdFx0aWQ6IGlkXG5cdFx0fSk7XG5cdH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY3Rpdml0eUFjdGlvbjsiLCIvKipcbiAqIFBhcnRpY2lwYXRvciBSZWFjdCBDb21wb25tZW50XG4gKiBAYXV0aG9yIFN1cmZhY2VXXG4gKiBAdmVyc2lvbiAxLjAgXG4gKi9cblxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xuXG52YXIgUGFydGljaXBhdG9yID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5BY3R1YWxseSBhIFBhcnRpY2lwYXRvciE8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJ0aWNpcGF0b3I7IiwiLyoqXG4gKiBQdWJsaXNoZXIgUmVhY3QgQ29tcG9ubWVudFxuICogQGF1dGhvciBTdXJmYWNlV1xuICogQHZlcnNpb24gMS4wIFxuICovXG5cbnZhciBSZWFjdCAgICAgICAgICAgPSB3aW5kb3cuUmVhY3Q7XG52YXIgJCAgICAgICAgICAgICAgID0gd2luZG93LiQ7XG5cbnZhciBIZWFkZXIgICAgICAgICAgPSByZXF1aXJlKCcuL2ZyYWdtZW50L0hlYWRlci5yZWFjdCcpO1xudmFyIEFjdGl2aXR5TGlzdCAgICA9IHJlcXVpcmUoJy4vZnJhZ21lbnQvQWN0aXZpdHlMaXN0LnJlYWN0Jyk7XG52YXIgQWN0aXZpdGllc1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL0FjdGl2aXRpZXNTdG9yZScpO1xudmFyIEFjdGl2aXR5QWN0aW9uICA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvQWN0aXZpdHlBY3Rpb24nKTtcblxuXG52YXIgUHVibGlzaGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIEFzeW5jIGxvYWQgZGF0YSBmcm9tIHNlcnZlclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0QWN0aXZpdHlBY3Rpb24uZmV0Y2goKTtcblx0XHR9LCAxKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndyYXBwZXJcIj5cblx0XHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0XHQ8QWN0aXZpdHlMaXN0IC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQdWJsaXNoZXI7IiwiLyoqXG4gKiBBY3Rpdml0eUl0ZW0gUmVhY3QgQ29tcG9uZW1lbnRcbiAqIEBhdXRob3IgU3VyZmFjZVdcbiAqIEB2ZXJzaW9uIDEuMCBcbiAqL1xuXG52YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7XG52YXIgJCAgICAgPSB3aW5kb3cuJDtcblxudmFyIEFjdGl2aXR5SXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxoMj57dGhpcy5wcm9wcy5jb250ZW50Lm5hbWV9PC9oMj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGl2aXR5SXRlbTsiLCIvKipcbiAqIEFjdGl2aXR5TGlzdCBSZWFjdCBDb21wb25lbWVudFxuICogQGF1dGhvciBTdXJmYWNlV1xuICogQHZlcnNpb24gMS4wIFxuICovXG5cbnZhciBSZWFjdCAgICAgICAgICAgPSB3aW5kb3cuUmVhY3Q7XG52YXIgJCAgICAgICAgICAgICAgID0gd2luZG93LiQ7XG52YXIgQWN0aXZpdGllc1N0b3JlID0gcmVxdWlyZSgnLi4vLi4vc3RvcmVzL0FjdGl2aXRpZXNTdG9yZScpO1xudmFyIEFjdGl2aXR5SXRlbSAgICA9IHJlcXVpcmUoJy4vQWN0aXZpdHlJdGVtLnJlYWN0Jyk7XG5cbnZhciBBY3Rpdml0eUxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0aXNpbmk6IGZhbHNlLFxuXG5cdGluaTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfdGhpcyAgPSB0aGlzO1xuXHRcdHRoaXMuaXNpbmkgPSB0cnVlO1xuXG5cdFx0QWN0aXZpdGllc1N0b3JlLm9uKCdmZXRjaF9jb21wbGV0ZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdF90aGlzLnNldFN0YXRlKHsnZmV0Y2hDb21wbGV0ZSc6IHRydWV9KTtcblx0XHR9KTtcblx0fSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dmFyIGFjdGl2aXRpZXNEYXRhID0gQWN0aXZpdGllc1N0b3JlLmdldEFsbCgpO1xuXHRcdHZhciBhY3Rpdml0aWVzID0gW107XG5cblx0XHRpZiAoIXRoaXMuaXNpbmkpIHRoaXMuaW5pKCk7XG5cblx0XHRpZiAoISFhY3Rpdml0aWVzRGF0YSAmJiBhY3Rpdml0aWVzRGF0YS5sZW5ndGggPj0gMSkge1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFjdGl2aXRpZXNEYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGFjdGl2aXRpZXMucHVzaCg8QWN0aXZpdHlJdGVtIGtleT17aX0gY29udGVudD17YWN0aXZpdGllc0RhdGFbaV19IC8+KTtcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiAoPGRpdj57YWN0aXZpdGllc308L2Rpdj4pO1xuXG5cdFx0fSBlbHNlIGlmICghIWFjdGl2aXRpZXNEYXRhICYmIGFjdGl2aXRpZXNEYXRhLmxlbmd0aCA9PT0gMCkge1xuXG5cdFx0XHQvLyBVc2VyIGhhc24ndCBjcmVhdGUgYW55IGFjdGl2aXR5XG5cdFx0XHRyZXR1cm4gKDxkaXY+IHtcIllvdSBoYXZlbid0IHlldCBjcmVhdGUgYW4gYWN0aXZpdHkhXCJ9IDwvZGl2Pik7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBMb2FkaW5nIGZyb20gc2VydmVyXG5cdFx0XHRyZXR1cm4gKDxkaXY+e1wiTm93IFByb2Nlc3NpbmcgdGhlIERhdGEuLi5cIn08L2Rpdj4pO1xuXHRcdH1cblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQWN0aXZpdHlMaXN0OyIsInZhciBSZWFjdCA9IHdpbmRvdy5SZWFjdDtcbnZhciAkICAgICA9IHdpbmRvdy4kO1xuXG52YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdHJlbmRlcjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8aGVhZGVyIGNsYXNzTmFtZT1cImhlYWRlci1jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdj48c3BhbiBjbGFzc05hbWU9XCJoZWFkZXItbG9nb1wiPjwvc3Bhbj4gQWN0aXZpdGllczwvZGl2PlxuXHRcdFx0PC9oZWFkZXI+XG5cdFx0KTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7IiwiLyoqXG4gKiBUaGlzIGlzIHRoZSBjb25zdGFudHMgYW5kIGNvbmZpZ3VyYXRpb24gZm9yIGFwcFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG5cdC8vIFVzZXJ0eXBlXG5cdCdVU0VSVFlQRSc6IHtcblxuXHRcdCdQVUJMSVNIRVInOiAncHVibGlzaGVyJyxcblx0XHQnUEFSVElDSVBBVE9SJzogJ3BhcnRpY2lwYXRvcidcblx0fSxcblxuXHQvLyBINSBDb21wb25lbWVudHMgVHlwZVxuXHQnVEVNUExBVEVfQ09NUE9ORU1FTlRfVFlQRSc6IHtcblxuXHRcdCdCQUNLR1JPVU5EX0RFRkFVVCc6IDAsXG5cdFx0J0JBQ0tHUk9VTkRfVVJMJzogMSxcblxuXHRcdCdUSVRMRV9MQVJHRSc6IDEwLFxuXHRcdCdUSVRMRV9NSURETEUnOjExLFxuXHRcdCdUSVRMRV9TTUFMTCc6IDEyLFxuXG5cdFx0J1BBUkFHUkFQVEgnOiAyMCxcblxuXHRcdCdMSU5LJzogMzAsXG5cblx0XHQnSU1BR0UnOiA0MCxcblxuXHRcdCdTT1VORCc6IDUwLFxuXG5cdFx0J1ZJREVPJzogNjAsXG5cblx0XHQnTE9DQVRJT04nOiA3MCxcblxuXHRcdCdEQVRFX1RJTUUnOiA4MFxuXHR9LCBcblxuXHQvLyBDb21wb25lbWVudHMgU2hvd2luZyBhbmQgSGlkaW5nIFN0eWxlXG5cdCdURU1QTEFURV9DT01QT05FTUVOVF9ESVNQTEFZX1RZUEUnOiB7XG5cblx0XHQnRUFTRV9JTic6IDAsXG5cdFx0J0VBU0VfT1VUJzogMVxuXHR9LFxuXG5cdC8vIENvbXBvbmVtZW50cyBTcGVjaWFsIEFuaW1hdGlvbiBTdHlsZVxuXHQnVEVNUExBVEVfQ09NUE9ORU1FTlRfQUlOTUFUSU9OX1RZUEUnOiB7XG5cblx0XHQnU1dJTkcnOiAwXG5cdH0sXG5cblx0Ly8gQWN0aXZpdHkgRXZlbnRzXG5cdCdBQ1RJVklUWV9FVkVOVFMnOiB7XG5cdFx0J0FDVElWSVRZX0ZFVENIJzogXHQwLFxuXHRcdCdBQ1RJVklUWV9DUkVBVEUnOiBcdDEsXG5cdFx0J0FDVElWSVRZX1VQREFURSc6IFx0Mixcblx0XHQnQUNUSVZJVFlfREVMRVRFJzogXHQzIFxuXHR9XG5cbn07IiwiLyoqXG4gKiBDaGFuZ2UgZnJvbSBmYWNlYm9vaywgd2l0aCBzdGFuZGFyZCBvYmogc3R5bGUgd2l0aCBTdXJmYWNlV1xuICogXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRGlzcGF0Y2hlclxuICogQHR5cGVjaGVja3NcbiAqIEBwcmV2ZW50TXVuZ2VcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9sYXN0SUQgPSAxO1xudmFyIF9wcmVmaXggPSAnSURfJztcblxuLyoqXG4gKiBEaXNwYXRjaGVyIGlzIHVzZWQgdG8gYnJvYWRjYXN0IHBheWxvYWRzIHRvIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLiBUaGlzIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSBnZW5lcmljIHB1Yi1zdWIgc3lzdGVtcyBpbiB0d28gd2F5czpcbiAqXG4gKiAgIDEpIENhbGxiYWNrcyBhcmUgbm90IHN1YnNjcmliZWQgdG8gcGFydGljdWxhciBldmVudHMuIEV2ZXJ5IHBheWxvYWQgaXNcbiAqICAgICAgZGlzcGF0Y2hlZCB0byBldmVyeSByZWdpc3RlcmVkIGNhbGxiYWNrLlxuICogICAyKSBDYWxsYmFja3MgY2FuIGJlIGRlZmVycmVkIGluIHdob2xlIG9yIHBhcnQgdW50aWwgb3RoZXIgY2FsbGJhY2tzIGhhdmVcbiAqICAgICAgYmVlbiBleGVjdXRlZC5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgY29uc2lkZXIgdGhpcyBoeXBvdGhldGljYWwgZmxpZ2h0IGRlc3RpbmF0aW9uIGZvcm0sIHdoaWNoXG4gKiBzZWxlY3RzIGEgZGVmYXVsdCBjaXR5IHdoZW4gYSBjb3VudHJ5IGlzIHNlbGVjdGVkOlxuICpcbiAqICAgdmFyIGZsaWdodERpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuICpcbiAqICAgLy8gS2VlcHMgdHJhY2sgb2Ygd2hpY2ggY291bnRyeSBpcyBzZWxlY3RlZFxuICogICB2YXIgQ291bnRyeVN0b3JlID0ge2NvdW50cnk6IG51bGx9O1xuICpcbiAqICAgLy8gS2VlcHMgdHJhY2sgb2Ygd2hpY2ggY2l0eSBpcyBzZWxlY3RlZFxuICogICB2YXIgQ2l0eVN0b3JlID0ge2NpdHk6IG51bGx9O1xuICpcbiAqICAgLy8gS2VlcHMgdHJhY2sgb2YgdGhlIGJhc2UgZmxpZ2h0IHByaWNlIG9mIHRoZSBzZWxlY3RlZCBjaXR5XG4gKiAgIHZhciBGbGlnaHRQcmljZVN0b3JlID0ge3ByaWNlOiBudWxsfVxuICpcbiAqIFdoZW4gYSB1c2VyIGNoYW5nZXMgdGhlIHNlbGVjdGVkIGNpdHksIHdlIGRpc3BhdGNoIHRoZSBwYXlsb2FkOlxuICpcbiAqICAgZmxpZ2h0RGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gKiAgICAgYWN0aW9uVHlwZTogJ2NpdHktdXBkYXRlJyxcbiAqICAgICBzZWxlY3RlZENpdHk6ICdwYXJpcydcbiAqICAgfSk7XG4gKlxuICogVGhpcyBwYXlsb2FkIGlzIGRpZ2VzdGVkIGJ5IGBDaXR5U3RvcmVgOlxuICpcbiAqICAgZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NpdHktdXBkYXRlJykge1xuICogICAgICAgQ2l0eVN0b3JlLmNpdHkgPSBwYXlsb2FkLnNlbGVjdGVkQ2l0eTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGNvdW50cnksIHdlIGRpc3BhdGNoIHRoZSBwYXlsb2FkOlxuICpcbiAqICAgZmxpZ2h0RGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gKiAgICAgYWN0aW9uVHlwZTogJ2NvdW50cnktdXBkYXRlJyxcbiAqICAgICBzZWxlY3RlZENvdW50cnk6ICdhdXN0cmFsaWEnXG4gKiAgIH0pO1xuICpcbiAqIFRoaXMgcGF5bG9hZCBpcyBkaWdlc3RlZCBieSBib3RoIHN0b3JlczpcbiAqXG4gKiAgIENvdW50cnlTdG9yZS5kaXNwYXRjaFRva2VuID0gZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NvdW50cnktdXBkYXRlJykge1xuICogICAgICAgQ291bnRyeVN0b3JlLmNvdW50cnkgPSBwYXlsb2FkLnNlbGVjdGVkQ291bnRyeTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFdoZW4gdGhlIGNhbGxiYWNrIHRvIHVwZGF0ZSBgQ291bnRyeVN0b3JlYCBpcyByZWdpc3RlcmVkLCB3ZSBzYXZlIGEgcmVmZXJlbmNlXG4gKiB0byB0aGUgcmV0dXJuZWQgdG9rZW4uIFVzaW5nIHRoaXMgdG9rZW4gd2l0aCBgd2FpdEZvcigpYCwgd2UgY2FuIGd1YXJhbnRlZVxuICogdGhhdCBgQ291bnRyeVN0b3JlYCBpcyB1cGRhdGVkIGJlZm9yZSB0aGUgY2FsbGJhY2sgdGhhdCB1cGRhdGVzIGBDaXR5U3RvcmVgXG4gKiBuZWVkcyB0byBxdWVyeSBpdHMgZGF0YS5cbiAqXG4gKiAgIENpdHlTdG9yZS5kaXNwYXRjaFRva2VuID0gZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgaWYgKHBheWxvYWQuYWN0aW9uVHlwZSA9PT0gJ2NvdW50cnktdXBkYXRlJykge1xuICogICAgICAgLy8gYENvdW50cnlTdG9yZS5jb3VudHJ5YCBtYXkgbm90IGJlIHVwZGF0ZWQuXG4gKiAgICAgICBmbGlnaHREaXNwYXRjaGVyLndhaXRGb3IoW0NvdW50cnlTdG9yZS5kaXNwYXRjaFRva2VuXSk7XG4gKiAgICAgICAvLyBgQ291bnRyeVN0b3JlLmNvdW50cnlgIGlzIG5vdyBndWFyYW50ZWVkIHRvIGJlIHVwZGF0ZWQuXG4gKlxuICogICAgICAgLy8gU2VsZWN0IHRoZSBkZWZhdWx0IGNpdHkgZm9yIHRoZSBuZXcgY291bnRyeVxuICogICAgICAgQ2l0eVN0b3JlLmNpdHkgPSBnZXREZWZhdWx0Q2l0eUZvckNvdW50cnkoQ291bnRyeVN0b3JlLmNvdW50cnkpO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIHVzYWdlIG9mIGB3YWl0Rm9yKClgIGNhbiBiZSBjaGFpbmVkLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiAgIEZsaWdodFByaWNlU3RvcmUuZGlzcGF0Y2hUb2tlbiA9XG4gKiAgICAgZmxpZ2h0RGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbihwYXlsb2FkKSB7XG4gKiAgICAgICBzd2l0Y2ggKHBheWxvYWQuYWN0aW9uVHlwZSkge1xuICogICAgICAgICBjYXNlICdjb3VudHJ5LXVwZGF0ZSc6XG4gKiAgICAgICAgIGNhc2UgJ2NpdHktdXBkYXRlJzpcbiAqICAgICAgICAgICBmbGlnaHREaXNwYXRjaGVyLndhaXRGb3IoW0NpdHlTdG9yZS5kaXNwYXRjaFRva2VuXSk7XG4gKiAgICAgICAgICAgRmxpZ2h0UHJpY2VTdG9yZS5wcmljZSA9XG4gKiAgICAgICAgICAgICBnZXRGbGlnaHRQcmljZVN0b3JlKENvdW50cnlTdG9yZS5jb3VudHJ5LCBDaXR5U3RvcmUuY2l0eSk7XG4gKiAgICAgICAgICAgYnJlYWs7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgYGNvdW50cnktdXBkYXRlYCBwYXlsb2FkIHdpbGwgYmUgZ3VhcmFudGVlZCB0byBpbnZva2UgdGhlIHN0b3JlcydcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzIGluIG9yZGVyOiBgQ291bnRyeVN0b3JlYCwgYENpdHlTdG9yZWAsIHRoZW5cbiAqIGBGbGlnaHRQcmljZVN0b3JlYC5cbiAqL1xuZnVuY3Rpb24gRGlzcGF0Y2hlciAoKSB7XG5cbiAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gIHRoaXMuX2lzUGVuZGluZyA9IHt9O1xuICB0aGlzLl9pc0hhbmRsZWQgPSB7fTtcbiAgdGhpcy5faXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICB0aGlzLl9wZW5kaW5nUGF5bG9hZCA9IG51bGw7XG5cbn1cblxuLyoqXG4gKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBiZSBpbnZva2VkIHdpdGggZXZlcnkgZGlzcGF0Y2hlZCBwYXlsb2FkLiBSZXR1cm5zXG4gKiBhIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBgd2FpdEZvcigpYC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBpZCA9IF9wcmVmaXggKyBfbGFzdElEKys7XG4gIHRoaXMuX2NhbGxiYWNrc1tpZF0gPSBjYWxsYmFjaztcbiAgcmV0dXJuIGlkO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBjYWxsYmFjayBiYXNlZCBvbiBpdHMgdG9rZW4uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gKi9cbkRpc3BhdGNoZXIucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbihpZCkge1xuICBpbnZhcmlhbnQoXG4gICAgdGhpcy5fY2FsbGJhY2tzW2lkXSxcbiAgICAnRGlzcGF0Y2hlci51bnJlZ2lzdGVyKC4uLik6IGAlc2AgZG9lcyBub3QgbWFwIHRvIGEgcmVnaXN0ZXJlZCBjYWxsYmFjay4nLFxuICAgIGlkXG4gICk7XG4gIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbaWRdO1xufVxuXG4vKipcbiAqIFdhaXRzIGZvciB0aGUgY2FsbGJhY2tzIHNwZWNpZmllZCB0byBiZSBpbnZva2VkIGJlZm9yZSBjb250aW51aW5nIGV4ZWN1dGlvblxuICogb2YgdGhlIGN1cnJlbnQgY2FsbGJhY2suIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIHVzZWQgYnkgYSBjYWxsYmFjayBpblxuICogcmVzcG9uc2UgdG8gYSBkaXNwYXRjaGVkIHBheWxvYWQuXG4gKlxuICogQHBhcmFtIHthcnJheTxzdHJpbmc+fSBpZHNcbiAqL1xuRGlzcGF0Y2hlci5wcm90b3R5cGUud2FpdEZvciA9IGZ1bmN0aW9uKGlkcykge1xuICBpbnZhcmlhbnQoXG4gICAgdGhpcy5faXNEaXNwYXRjaGluZyxcbiAgICAnRGlzcGF0Y2hlci53YWl0Rm9yKC4uLik6IE11c3QgYmUgaW52b2tlZCB3aGlsZSBkaXNwYXRjaGluZy4nXG4gICk7XG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBpZHMubGVuZ3RoOyBpaSsrKSB7XG4gICAgdmFyIGlkID0gaWRzW2lpXTtcbiAgICBpZiAodGhpcy5faXNQZW5kaW5nW2lkXSkge1xuICAgICAgaW52YXJpYW50KFxuICAgICAgICB0aGlzLl9pc0hhbmRsZWRbaWRdLFxuICAgICAgICAnRGlzcGF0Y2hlci53YWl0Rm9yKC4uLik6IENpcmN1bGFyIGRlcGVuZGVuY3kgZGV0ZWN0ZWQgd2hpbGUgJyArXG4gICAgICAgICd3YWl0aW5nIGZvciBgJXNgLicsXG4gICAgICAgIGlkXG4gICAgICApO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGludmFyaWFudChcbiAgICAgIHRoaXMuX2NhbGxiYWNrc1tpZF0sXG4gICAgICAnRGlzcGF0Y2hlci53YWl0Rm9yKC4uLik6IGAlc2AgZG9lcyBub3QgbWFwIHRvIGEgcmVnaXN0ZXJlZCBjYWxsYmFjay4nLFxuICAgICAgaWRcbiAgICApO1xuICAgIHRoaXMuX2ludm9rZUNhbGxiYWNrKGlkKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoZXMgYSBwYXlsb2FkIHRvIGFsbCByZWdpc3RlcmVkIGNhbGxiYWNrcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcGF5bG9hZFxuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAgaW52YXJpYW50KFxuICAgICF0aGlzLl9pc0Rpc3BhdGNoaW5nLFxuICAgICdEaXNwYXRjaC5kaXNwYXRjaCguLi4pOiBDYW5ub3QgZGlzcGF0Y2ggaW4gdGhlIG1pZGRsZSBvZiBhIGRpc3BhdGNoLidcbiAgKTtcbiAgdGhpcy5fc3RhcnREaXNwYXRjaGluZyhwYXlsb2FkKTtcbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgIGlmICh0aGlzLl9pc1BlbmRpbmdbaWRdKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5faW52b2tlQ2FsbGJhY2soaWQpO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICB0aGlzLl9zdG9wRGlzcGF0Y2hpbmcoKTtcbiAgfVxufVxuXG4vKipcbiAqIElzIHRoaXMgRGlzcGF0Y2hlciBjdXJyZW50bHkgZGlzcGF0Y2hpbmcuXG4gKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuRGlzcGF0Y2hlci5wcm90b3R5cGUuaXNEaXNwYXRjaGluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5faXNEaXNwYXRjaGluZztcbn1cblxuLyoqXG4gKiBDYWxsIHRoZSBjYWxsYmFjayBzdG9yZWQgd2l0aCB0aGUgZ2l2ZW4gaWQuIEFsc28gZG8gc29tZSBpbnRlcm5hbFxuICogYm9va2tlZXBpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gKiBAaW50ZXJuYWxcbiAqL1xuRGlzcGF0Y2hlci5wcm90b3R5cGUuX2ludm9rZUNhbGxiYWNrID0gZnVuY3Rpb24oaWQpIHtcbiAgdGhpcy5faXNQZW5kaW5nW2lkXSA9IHRydWU7XG4gIHRoaXMuX2NhbGxiYWNrc1tpZF0odGhpcy5fcGVuZGluZ1BheWxvYWQpO1xuICB0aGlzLl9pc0hhbmRsZWRbaWRdID0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBTZXQgdXAgYm9va2tlZXBpbmcgbmVlZGVkIHdoZW4gZGlzcGF0Y2hpbmcuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBheWxvYWRcbiAqIEBpbnRlcm5hbFxuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5fc3RhcnREaXNwYXRjaGluZyA9IGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAgZm9yICh2YXIgaWQgaW4gdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgdGhpcy5faXNQZW5kaW5nW2lkXSA9IGZhbHNlO1xuICAgIHRoaXMuX2lzSGFuZGxlZFtpZF0gPSBmYWxzZTtcbiAgfVxuICB0aGlzLl9wZW5kaW5nUGF5bG9hZCA9IHBheWxvYWQ7XG4gIHRoaXMuX2lzRGlzcGF0Y2hpbmcgPSB0cnVlO1xufVxuXG4vKipcbiAqIENsZWFyIGJvb2trZWVwaW5nIHVzZWQgZm9yIGRpc3BhdGNoaW5nLlxuICpcbiAqIEBpbnRlcm5hbFxuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5fc3RvcERpc3BhdGNoaW5nID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3BlbmRpbmdQYXlsb2FkID0gbnVsbDtcbiAgdGhpcy5faXNEaXNwYXRjaGluZyA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgLy8gaWYgKF9fREVWX18pIHtcbiAgLy8gICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgLy8gICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gRGlzcGF0Y2hlcjtcbiIsIi8qKlxuICogQWN0aXZpdGllc1N0b3JlIENsYXNzXG4gKiBAYXV0aG9yIFN1cmZhY2VXXG4gKiBAdmVyc2lvbiAxLjBcbiAqL1xuXG52YXIgJCAgICAgICAgICAgICA9IHdpbmRvdy4kO1xudmFyIGNvbnN0cyAgICAgICAgPSByZXF1aXJlKCcuLi9jb25zdGFudHMvY29uc3RhbnRzJyk7XG52YXIgQXBwRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4uL2Rpc3BhdGNoZXIvRGlzcGF0Y2hlcicpO1xudmFyIEV2ZW50RW1pdGVyICAgPSByZXF1aXJlKCcuLi91dGlsL0V2ZW50RW1pdGVyJyk7XG5cbnZhciBfYWN0aXZpdGllcyA9IHt9O1xudmFyIGFjdGl2aXR5RXZlbnQgPSBjb25zdHMuQUNUSVZJVFlfRVZFTlRTO1xuXG4vLyBEYXRhIGZvciB0ZXN0aW5nXG52YXIgYWN0aXZpdGllc0RhdGEgPSBbXG5cdHtcblx0XHQnaWQnOiAwLFxuXHRcdCduYW1lJzogJzIwMTXlkIzlrabogZrkvJonLFxuXHRcdCdkZXRhaWwnOiBbXG5cdFx0XHR7XG5cdFx0XHRcdCdwYWdlJzogMSxcblx0XHRcdFx0J2NvbXBvbmVudHMnOiBbXG5cdFx0XHRcdFx0eyd0eXBlJzogMSwgJ3ZhbHVlJzogJy4vc3RhdGljL3h4L3h4LnBuZyd9LFxuXHRcdFx0XHRcdHsndHlwZSc6IDEwLCAnc2hvdyc6IDEsICd2YWx1ZSc6ICcyMDE16auY5Lit5ZCM5a2m6IGa5LyaJ31cblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0J3BhZ2UnOiAyLFxuXHRcdFx0XHQnY29tcG9uZW50cyc6IFtcblx0XHRcdFx0XHR7J3R5cGUnOiAwLCAndmFsdWUnOiAnYmx1ZSd9LFxuXHRcdFx0XHRcdHsndHlwZSc6IDIwLCAnc2hvdyc6IDIsICdoaWRlJzogMSwgJ3ZhbHVlJzogJzIwMTXlkIzlrabkvJrmmK/nlLHpq5gxMue6p+e7hOe7h+eahOS4gOasoeS4u+imgeeahOa0u+WKqOOAgid9LFxuXHRcdFx0XHRcdHsndHlwZSc6IDIwLCAnc2hvdyc6IDIsICdoaWRlJzogMSwgJ3ZhbHVlJzogXG5cdFx0XHRcdFx0J+aIkeS7rOW3sue7j+W+iOS5heayoeacieingemdouS6hu+8jOi/meWwhuS8muaYr+S4gOasoeacieaEj+aAneeahOaXheeoi+OAgicrJ+aIkeS7rOiAg+iZkeWcqOmAguW9k+eahOWcsOaWueingemdou+8jOWcqOmAguW9k+eahOWcsOaWueWBmuS4gOS6m+acieaEj+aAneeahOS6i+aDhe+8gSd9XG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdCdwYWdlJzogMyxcblx0XHRcdFx0J2NvbXBvbmVudHMnOiBbXG5cdFx0XHRcdFx0eyd0eXBlJzogMCwgJ3ZhbHVlJzogJ2dyZWVuJ30sXG5cdFx0XHRcdFx0eyd0eXBlJzogMjAsICdzaG93JzogMSwgJ3ZhbHVlJzogJ+asoui/juWKoOWFpeaIkeS7rO+8gSd9LFxuXHRcdFx0XHRcdHsndHlwZSc6IDgwLCAnc2hvdyc6IDEsICd2YWx1ZSc6ICcyMDE1LTctMjAgOTozMCd9LFxuXHRcdFx0XHRcdHsndHlwZSc6IDcwLCAnc2hvdyc6IDIsICd2YWx1ZSc6ICflm5vlt53nnIHlhoXmsZ/luILvvIzlhoXmsZ/luILnrKzlha3kuK3lrabpq5jkuK3pg6gnfVxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0J2lkJzogMSxcblx0XHQnbmFtZSc6ICfljZfpnZ7mlK/mlZnmtLvliqgnLFxuXHRcdCdkZXRhaWwnOiBbXVxuXHR9XG5dO1xuXG52YXIgQWN0aXZpdGllc1N0b3JlID0ge1xuXG5cdGdldEFsbDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBfYWN0aXZpdGllcztcblx0fVxufTtcblxuZnVuY3Rpb24gZmV0Y2goKSB7XG5cdC8vIHJldHVybiAkLmFqYXgoe1xuXHQvLyBcdHVybDogJycsXG5cdC8vIFx0dHlwZTogJydcblx0Ly8gfSk7XG5cdFxuXHRfYWN0aXZpdGllcyA9IGFjdGl2aXRpZXNEYXRhO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbn1cblxuZnVuY3Rpb24gZGVsZXRlSXRlbSgpIHtcbn1cblxuJC5leHRlbmQoQWN0aXZpdGllc1N0b3JlLCBFdmVudEVtaXRlci5wcm90b3R5cGUpO1xuXG5BY3Rpdml0aWVzU3RvcmUuZGlzcGF0Y2hlciA9IG5ldyBBcHBEaXNwYXRjaGVyKCk7XG5BY3Rpdml0aWVzU3RvcmUuZGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbiAoYWN0aW9uKSB7XG5cdHN3aXRjaChhY3Rpb24udHlwZSkge1xuXHRcdGNhc2UgYWN0aXZpdHlFdmVudC5BQ1RJVklUWV9GRVRDSDpcblx0XHRcdC8vIGZldGNoKCkuZG9uZShmdW5jdGlvbiAoKSB7fSk7XG5cdFx0XHRmZXRjaCgpO1xuXHRcdFx0QWN0aXZpdGllc1N0b3JlLnRyaWdnZXIoJ2ZldGNoX2NvbXBsZXRlJyk7XG5cdFx0YnJlYWs7XG5cdFx0Y2FzZSBhY3Rpdml0eUV2ZW50LkFDVElWSVRZX0NSRUFURTogXG5cdFx0XG5cdFx0YnJlYWs7XG5cdFx0Y2FzZSBhY3Rpdml0eUV2ZW50LkFDVElWSVRZX1VQREFURTpcblxuXHRcdGJyZWFrO1xuXHRcdGNhc2UgYWN0aXZpdHlFdmVudC5BQ1RJVklUWV9ERUxFVEU6XG5cblx0XHRicmVhaztcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQWN0aXZpdGllc1N0b3JlOyIsIi8qKlxuICogRXZlbnQgRW1pdGVyIENsYXNzXG4gKiBAYXV0aG9yIFN1cmZhY2VXXG4gKiBAdmVyc2lvbiAxLjBcbiAqL1xuXG52YXIgRXZlbnRFbWl0ZXIgPSBmdW5jdGlvbiAoKSB7fTtcbnZhciBfSUQgICAgICAgICA9IDE7XG52YXIgX2MgICAgICAgICAgPSBbXTtcblxudmFyIGZuID0gRXZlbnRFbWl0ZXIucHJvdG90eXBlID0ge1xuXG5cdC8qKlxuXHQgKiBFdmVudCBEaXNwYXRjaCAvIFRyaWdnZXJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBlIGV2ZW50IG5hbWVcblx0ICogQHBhcmFtICB7T2JqZWN0fSBhIGFyZ3VtZW50cyBvZiB0aGUgZXZlbnRcblx0ICovXG5cdGRpc3BhdGNoOiBmdW5jdGlvbiAoZSwgYSkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgX2MubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChfY1tpXS5lID09PSBlKSBfY1tpXS5jLmNhbGwodGhpcywgYSk7XG5cdFx0fTtcblx0fSxcblxuXHQvKipcblx0ICogRXZlbnQgQmluZFxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IG4gZXZlbnQgbmFtZVxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gYyB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdG9uOiBmdW5jdGlvbiAobiwgYykge1xuXHRcdGlmICh0eXBlb2YgbiA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGMgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdF9jLnB1c2goe1xuXHRcdFx0XHQnaWQnOiBfSUQsIFxuXHRcdFx0XHQnZSc6IG4sXG5cdFx0XHRcdCdjJzogY1xuXHRcdFx0fSk7XG5cdFx0XHRfSUQgKys7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBVbmJpbmQgZXZlbnRcblx0ICogQHBhcmFtICB7U3RyaW5nfSBlIGV2ZW50IG5hbWVcblx0ICogQHJldHVybiB7W3R5cGVdfSAgIFtkZXNjcmlwdGlvbl1cblx0ICovXG5cdG9mZjogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAodHlwZW9mIGUgIT09ICdzdHJpbmcnKSByZXR1cm47XG5cdFx0Zm9yICh2YXIgaSA9IF9jLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRpZiAoX2NbaV0uZSA9PT0gZSkgX2Muc3BsaWNlKGksIDEpO1xuXHRcdH07XG5cdH1cbn1cblxuZm4uZW1taXQgICA9IGZuLm9uO1xuZm4udHJpZ2dlciA9IGZuLmRpc3BhdGNoO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdGVyO1xuIl19
