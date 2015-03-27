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
	


},{"./components/AParticipation.react":3,"./components/Publisher.react":4,"./constants/constants":10}],2:[function(require,module,exports){
/**
 * Activity Action Class
 * @author SurfaceW
 * @version 1.0
 */

var consts          = require('../constants/constants');
var AppDispatcher   = require('../dispatcher/Dispatcher');

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

},{"../constants/constants":10,"../dispatcher/Dispatcher":11}],3:[function(require,module,exports){
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

},{"../actions/ActivityAction":2,"../stores/ActivitiesStore":12,"./fragment/ActivityList.react":6,"./fragment/Header.react":7}],5:[function(require,module,exports){
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
var NoActivity      = require('./NoActivity.react');
var Loading         = require('./Loading.react');

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

			return (React.createElement("div", {className: "activity-list-container"}, activities));

		} else if (!!activitiesData && activitiesData.length === 0) {

			// User hasn't create any activity
			return (React.createElement("div", {className: "activity-list-container"}, React.createElement(NoActivity, null)));

		} else {

			// Loading from server
			return (React.createElement("div", {className: "activity-list-container"}, React.createElement(Loading, null)));
		}
	}
});

module.exports = ActivityList;

},{"../../stores/ActivitiesStore":12,"./ActivityItem.react":5,"./Loading.react":8,"./NoActivity.react":9}],7:[function(require,module,exports){
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
var React = window.React;
var $     = window.$;

var Loading = React.createClass({displayName: "Loading",

	render: function () {
		return (
			React.createElement("div", {className: "loading-container"}, 
				React.createElement("div", {className: "loading-icon"}, "Loading...")
			)
		);
	}
});

module.exports = Loading;

},{}],9:[function(require,module,exports){
var React = window.React;
var $     = window.$;

var NoActivity = React.createClass({displayName: "NoActivity",

	// Handle Create New Activities
	handleClick: function () {
		console.log('let\'s create a new activity!');
	},

	render: function () {
		return (
			React.createElement("div", {className: "no-activity"}, 
			React.createElement("p", {className: "no-activity-hint"}, "还没有活动，创建一个吧 :)"), 
			React.createElement("button", {className: "add-first-activity", onClick: this.handleClick}, 
				React.createElement("span", {className: "add-first-activity-icon"}), 
				"新建活动"
			)
			)
		);
	}

});

module.exports = NoActivity;

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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



module.exports = new Dispatcher();


},{}],12:[function(require,module,exports){
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

AppDispatcher.register(function (action) {
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

},{"../constants/constants":10,"../dispatcher/Dispatcher":11,"../util/EventEmiter":13}],13:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL2FjdGl2aXRpZXMvYXBwL21haW4uanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL2FjdGl2aXRpZXMvYXBwL2FjdGlvbnMvQWN0aXZpdHlBY3Rpb24uanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL2FjdGl2aXRpZXMvYXBwL2NvbXBvbmVudHMvQVBhcnRpY2lwYXRpb24ucmVhY3QuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL2FjdGl2aXRpZXMvYXBwL2NvbXBvbmVudHMvUHVibGlzaGVyLnJlYWN0LmpzIiwiL1VzZXJzL3llcWluZ25hbi9TaXRlcy9hY3Rpdml0aWVzL2FwcC9jb21wb25lbnRzL2ZyYWdtZW50L0FjdGl2aXR5SXRlbS5yZWFjdC5qcyIsIi9Vc2Vycy95ZXFpbmduYW4vU2l0ZXMvYWN0aXZpdGllcy9hcHAvY29tcG9uZW50cy9mcmFnbWVudC9BY3Rpdml0eUxpc3QucmVhY3QuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL2FjdGl2aXRpZXMvYXBwL2NvbXBvbmVudHMvZnJhZ21lbnQvSGVhZGVyLnJlYWN0LmpzIiwiL1VzZXJzL3llcWluZ25hbi9TaXRlcy9hY3Rpdml0aWVzL2FwcC9jb21wb25lbnRzL2ZyYWdtZW50L0xvYWRpbmcucmVhY3QuanMiLCIvVXNlcnMveWVxaW5nbmFuL1NpdGVzL2FjdGl2aXRpZXMvYXBwL2NvbXBvbmVudHMvZnJhZ21lbnQvTm9BY3Rpdml0eS5yZWFjdC5qcyIsIi9Vc2Vycy95ZXFpbmduYW4vU2l0ZXMvYWN0aXZpdGllcy9hcHAvY29uc3RhbnRzL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy95ZXFpbmduYW4vU2l0ZXMvYWN0aXZpdGllcy9hcHAvZGlzcGF0Y2hlci9EaXNwYXRjaGVyLmpzIiwiL1VzZXJzL3llcWluZ25hbi9TaXRlcy9hY3Rpdml0aWVzL2FwcC9zdG9yZXMvQWN0aXZpdGllc1N0b3JlLmpzIiwiL1VzZXJzL3llcWluZ25hbi9TaXRlcy9hY3Rpdml0aWVzL2FwcC91dGlsL0V2ZW50RW1pdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsR0FBRzs7QUFFSCxJQUFJLEtBQUssVUFBVSxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQUksQ0FBQyxjQUFjLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRTVCLElBQUksTUFBTSxTQUFTLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3BELElBQUksU0FBUyxNQUFNLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQzNELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDOztBQUVoRSx3QkFBd0I7QUFDeEIsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLENBQUMsZUFBZTtBQUMzQyxpQ0FBaUM7O0FBRWpDLENBQUMsWUFBWTtDQUNaLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM3QyxRQUFRLFFBQVE7RUFDZixLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUztHQUM3QixLQUFLLENBQUMsTUFBTSxFQUFFLG9CQUFDLFNBQVMsRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0VBQzFDLE1BQU07RUFDTixLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWTtHQUNoQyxLQUFLLENBQUMsTUFBTSxFQUFFLG9CQUFDLFlBQVksRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0VBQzdDLE1BQU07RUFDTjtBQUNGLENBQUMsR0FBRyxDQUFDOzs7OztBQ3pCTDtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSCxJQUFJLE1BQU0sWUFBWSxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN4RCxJ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QyxFQUFFLENBQUMsRUFBRTtFQUNuQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLEVBQUU7R0FDckQsRUFBRSxDQUFDLElBQUksQ0FBQztJQUNQLElBQUksRUFBRSxHQUFHO0lBQ1QsR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLENBQUMsQ0FBQztHQUNILEdBQUcsR0FBRyxDQUFDO0dBQ1A7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Q0FFQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEVBQUU7RUFDakIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUUsT0FBTztFQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7R0FDeEMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUNuQyxDQUFDO0VBQ0Y7QUFDRixDQUFDOztBQUVELEVBQUUsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUNuQixFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBRXpCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQWN0aXZpdGllcyBNYWluIEFwcCBFbnRyYW5jZVxuICovXG5cbnZhciBSZWFjdCAgICAgICAgPSB3aW5kb3cuUmVhY3Q7XG52YXIgJCAgICAgICAgICAgID0gd2luZG93LiQ7XG5cbnZhciBjb25zdHMgICAgICAgPSByZXF1aXJlKCcuL2NvbnN0YW50cy9jb25zdGFudHMnKTtcbnZhciBQdWJsaXNoZXIgICAgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUHVibGlzaGVyLnJlYWN0Jyk7XG52YXIgUGFydGljaXBhdG9yID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0FQYXJ0aWNpcGF0aW9uLnJlYWN0Jyk7XG5cbi8vIHZhciB1c2VydHlwZSA9IG51bGw7IFxudmFyIHVzZXJ0eXBlID0gJ3B1Ymxpc2hlcic7IC8vIGluIHRlc3QgY2FzZVxuLy8gdmFyIHVzZXJ0eXBlID0gJ3BhcnRpY2lwYXRvcic7XG5cbihmdW5jdGlvbiAoKSB7XG5cdHZhciBfY29udGFpbmVyID0gJCgnI21haW4tY29udGFpbmVyJykuZ2V0KDApO1xuXHRzd2l0Y2ggKHVzZXJ0eXBlKSB7XG5cdFx0Y2FzZSBjb25zdHMuVVNFUlRZUEUuUFVCTElTSEVSOiBcblx0XHRcdFJlYWN0LnJlbmRlciggPFB1Ymxpc2hlciAvPiwgX2NvbnRhaW5lcik7XG5cdFx0YnJlYWs7XG5cdFx0Y2FzZSBjb25zdHMuVVNFUlRZUEUuUEFSVElDSVBBVE9SOlxuXHRcdFx0UmVhY3QucmVuZGVyKCA8UGFydGljaXBhdG9yIC8+LCBfY29udGFpbmVyKTtcblx0XHRicmVhaztcblx0fVxufSkoKTtcblx0XG4iLCIvKipcbiAqIEFjdGl2aXR5IEFjdGlvbiBDbGFzc1xuICogQGF1dGhvciBTdXJmYWNlV1xuICogQHZlcnNpb24gMS4wXG4gKi9cblxudmFyIGNvbnN0cyAgICAgICAgICA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cy9jb25zdGFudHMnKTtcbnZhciBBcHBEaXNwYXRjaGVyICAgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyL0Rpc3BhdGNoZXInKTtcblxudmFyIGFjdGl2aXR5RXZlbnQgPSBjb25zdHMuQUNUSVZJVFlfRVZFTlRTO1xudmFyIEFjdGl2aXR5QWN0aW9uID0ge1xuXG5cdGZldGNoOiBmdW5jdGlvbiAoKSB7XG5cdFx0QXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBhY3Rpdml0eUV2ZW50LkFDVElWSVRZX0ZFVENIXG5cdFx0fSk7XG5cdH0sXG5cblx0Y3JlYXRlOiBmdW5jdGlvbiAoY29udGVudCkge1xuXHRcdEFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogYWN0aXZpdHlFdmVudC5BQ1RJVklUWV9DUkVBVEUsXG5cdFx0XHRjb250ZW50OiBjb250ZW50XG5cdFx0fSk7XG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiAoY29udGVudCkge1xuXHRcdEFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogYWN0aXZpdHlFdmVudC5BQ1RJVklUWV9VUERBVEUsXG5cdFx0XHRjb250ZW50OiBjb250ZW50XG5cdFx0fSk7XG5cdH0sXG5cblx0ZGVsZXRlOiBmdW5jdGlvbiAoaWQpIHtcblx0XHRBcHBEaXNwYXRjaGVyLmRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IGFjdGl2aXR5RXZlbnQuQUNUSVZJVFlfREVMRVRFLFxuXHRcdFx0aWQ6IGlkXG5cdFx0fSk7XG5cdH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBY3Rpdml0eUFjdGlvbjsiLCIvKipcbiAqIFBhcnRpY2lwYXRvciBSZWFjdCBDb21wb25tZW50XG4gKiBAYXV0aG9yIFN1cmZhY2VXXG4gKiBAdmVyc2lvbiAxLjAgXG4gKi9cblxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xuXG52YXIgUGFydGljaXBhdG9yID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5BY3R1YWxseSBhIFBhcnRpY2lwYXRvciE8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJ0aWNpcGF0b3I7IiwiLyoqXG4gKiBQdWJsaXNoZXIgUmVhY3QgQ29tcG9ubWVudFxuICogQGF1dGhvciBTdXJmYWNlV1xuICogQHZlcnNpb24gMS4wIFxuICovXG5cbnZhciBSZWFjdCAgICAgICAgICAgPSB3aW5kb3cuUmVhY3Q7XG52YXIgJCAgICAgICAgICAgICAgID0gd2luZG93LiQ7XG5cbnZhciBIZWFkZXIgICAgICAgICAgPSByZXF1aXJlKCcuL2ZyYWdtZW50L0hlYWRlci5yZWFjdCcpO1xudmFyIEFjdGl2aXR5TGlzdCAgICA9IHJlcXVpcmUoJy4vZnJhZ21lbnQvQWN0aXZpdHlMaXN0LnJlYWN0Jyk7XG52YXIgQWN0aXZpdGllc1N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL0FjdGl2aXRpZXNTdG9yZScpO1xudmFyIEFjdGl2aXR5QWN0aW9uICA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvQWN0aXZpdHlBY3Rpb24nKTtcblxuXG52YXIgUHVibGlzaGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIEFzeW5jIGxvYWQgZGF0YSBmcm9tIHNlcnZlclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0QWN0aXZpdHlBY3Rpb24uZmV0Y2goKTtcblx0XHR9LCAxKTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndyYXBwZXJcIj5cblx0XHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0XHQ8QWN0aXZpdHlMaXN0IC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQdWJsaXNoZXI7IiwiLyoqXG4gKiBBY3Rpdml0eUl0ZW0gUmVhY3QgQ29tcG9uZW1lbnRcbiAqIEBhdXRob3IgU3VyZmFjZVdcbiAqIEB2ZXJzaW9uIDEuMCBcbiAqL1xuXG52YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7XG52YXIgJCAgICAgPSB3aW5kb3cuJDtcblxudmFyIEFjdGl2aXR5SXRlbSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxoMj57dGhpcy5wcm9wcy5jb250ZW50Lm5hbWV9PC9oMj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGl2aXR5SXRlbTsiLCIvKipcbiAqIEFjdGl2aXR5TGlzdCBSZWFjdCBDb21wb25lbWVudFxuICogQGF1dGhvciBTdXJmYWNlV1xuICogQHZlcnNpb24gMS4wIFxuICovXG5cbnZhciBSZWFjdCAgICAgICAgICAgPSB3aW5kb3cuUmVhY3Q7XG52YXIgJCAgICAgICAgICAgICAgID0gd2luZG93LiQ7XG52YXIgQWN0aXZpdGllc1N0b3JlID0gcmVxdWlyZSgnLi4vLi4vc3RvcmVzL0FjdGl2aXRpZXNTdG9yZScpO1xudmFyIEFjdGl2aXR5SXRlbSAgICA9IHJlcXVpcmUoJy4vQWN0aXZpdHlJdGVtLnJlYWN0Jyk7XG52YXIgTm9BY3Rpdml0eSAgICAgID0gcmVxdWlyZSgnLi9Ob0FjdGl2aXR5LnJlYWN0Jyk7XG52YXIgTG9hZGluZyAgICAgICAgID0gcmVxdWlyZSgnLi9Mb2FkaW5nLnJlYWN0Jyk7XG5cbnZhciBBY3Rpdml0eUxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0aXNpbmk6IGZhbHNlLFxuXG5cdGluaTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfdGhpcyAgPSB0aGlzO1xuXHRcdHRoaXMuaXNpbmkgPSB0cnVlO1xuXG5cdFx0QWN0aXZpdGllc1N0b3JlLm9uKCdmZXRjaF9jb21wbGV0ZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdF90aGlzLnNldFN0YXRlKHsnZmV0Y2hDb21wbGV0ZSc6IHRydWV9KTtcblx0XHR9KTtcblx0fSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dmFyIGFjdGl2aXRpZXNEYXRhID0gQWN0aXZpdGllc1N0b3JlLmdldEFsbCgpO1xuXHRcdHZhciBhY3Rpdml0aWVzID0gW107XG5cblx0XHRpZiAoIXRoaXMuaXNpbmkpIHRoaXMuaW5pKCk7XG5cblx0XHRpZiAoISFhY3Rpdml0aWVzRGF0YSAmJiBhY3Rpdml0aWVzRGF0YS5sZW5ndGggPj0gMSkge1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFjdGl2aXRpZXNEYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGFjdGl2aXRpZXMucHVzaCg8QWN0aXZpdHlJdGVtIGtleT17aX0gY29udGVudD17YWN0aXZpdGllc0RhdGFbaV19IC8+KTtcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJhY3Rpdml0eS1saXN0LWNvbnRhaW5lclwiPnthY3Rpdml0aWVzfTwvZGl2Pik7XG5cblx0XHR9IGVsc2UgaWYgKCEhYWN0aXZpdGllc0RhdGEgJiYgYWN0aXZpdGllc0RhdGEubGVuZ3RoID09PSAwKSB7XG5cblx0XHRcdC8vIFVzZXIgaGFzbid0IGNyZWF0ZSBhbnkgYWN0aXZpdHlcblx0XHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJhY3Rpdml0eS1saXN0LWNvbnRhaW5lclwiPjxOb0FjdGl2aXR5IC8+PC9kaXY+KTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIExvYWRpbmcgZnJvbSBzZXJ2ZXJcblx0XHRcdHJldHVybiAoPGRpdiBjbGFzc05hbWU9XCJhY3Rpdml0eS1saXN0LWNvbnRhaW5lclwiPjxMb2FkaW5nIC8+PC9kaXY+KTtcblx0XHR9XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGl2aXR5TGlzdDsiLCJ2YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7XG52YXIgJCAgICAgPSB3aW5kb3cuJDtcblxudmFyIEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJoZWFkZXItY29udGFpbmVyXCI+XG5cdFx0XHRcdDxkaXY+PHNwYW4gY2xhc3NOYW1lPVwiaGVhZGVyLWxvZ29cIj48L3NwYW4+IEFjdGl2aXRpZXM8L2Rpdj5cblx0XHRcdDwvaGVhZGVyPlxuXHRcdCk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyOyIsInZhciBSZWFjdCA9IHdpbmRvdy5SZWFjdDtcbnZhciAkICAgICA9IHdpbmRvdy4kO1xuXG52YXIgTG9hZGluZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJsb2FkaW5nLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImxvYWRpbmctaWNvblwiPkxvYWRpbmcuLi48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRpbmc7IiwidmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xudmFyICQgICAgID0gd2luZG93LiQ7XG5cbnZhciBOb0FjdGl2aXR5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdC8vIEhhbmRsZSBDcmVhdGUgTmV3IEFjdGl2aXRpZXNcblx0aGFuZGxlQ2xpY2s6IGZ1bmN0aW9uICgpIHtcblx0XHRjb25zb2xlLmxvZygnbGV0XFwncyBjcmVhdGUgYSBuZXcgYWN0aXZpdHkhJyk7XG5cdH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibm8tYWN0aXZpdHlcIj5cblx0XHRcdDxwIGNsYXNzTmFtZT1cIm5vLWFjdGl2aXR5LWhpbnRcIj7ov5jmsqHmnInmtLvliqjvvIzliJvlu7rkuIDkuKrlkKcgOik8L3A+XG5cdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cImFkZC1maXJzdC1hY3Rpdml0eVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJhZGQtZmlyc3QtYWN0aXZpdHktaWNvblwiPjwvc3Bhbj5cblx0XHRcdFx05paw5bu65rS75YqoXG5cdFx0XHQ8L2J1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm9BY3Rpdml0eTsiLCIvKipcbiAqIFRoaXMgaXMgdGhlIGNvbnN0YW50cyBhbmQgY29uZmlndXJhdGlvbiBmb3IgYXBwXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cblx0Ly8gVXNlcnR5cGVcblx0J1VTRVJUWVBFJzoge1xuXG5cdFx0J1BVQkxJU0hFUic6ICdwdWJsaXNoZXInLFxuXHRcdCdQQVJUSUNJUEFUT1InOiAncGFydGljaXBhdG9yJ1xuXHR9LFxuXG5cdC8vIEg1IENvbXBvbmVtZW50cyBUeXBlXG5cdCdURU1QTEFURV9DT01QT05FTUVOVF9UWVBFJzoge1xuXG5cdFx0J0JBQ0tHUk9VTkRfREVGQVVUJzogMCxcblx0XHQnQkFDS0dST1VORF9VUkwnOiAxLFxuXG5cdFx0J1RJVExFX0xBUkdFJzogMTAsXG5cdFx0J1RJVExFX01JRERMRSc6MTEsXG5cdFx0J1RJVExFX1NNQUxMJzogMTIsXG5cblx0XHQnUEFSQUdSQVBUSCc6IDIwLFxuXHRcdCdMSU5LJzogMzAsXG5cdFx0J0lNQUdFJzogNDAsXG5cdFx0J1NPVU5EJzogNTAsXG5cdFx0J1ZJREVPJzogNjAsXG5cdFx0J0xPQ0FUSU9OJzogNzAsXG5cdFx0J0RBVEVfVElNRSc6IDgwXG5cdH0sIFxuXG5cdC8vIENvbXBvbmVtZW50cyBTaG93aW5nIGFuZCBIaWRpbmcgU3R5bGVcblx0J1RFTVBMQVRFX0NPTVBPTkVNRU5UX0RJU1BMQVlfVFlQRSc6IHtcblxuXHRcdCdFQVNFX0lOJzogMCxcblx0XHQnRUFTRV9PVVQnOiAxXG5cdH0sXG5cblx0Ly8gQ29tcG9uZW1lbnRzIFNwZWNpYWwgQW5pbWF0aW9uIFN0eWxlXG5cdCdURU1QTEFURV9DT01QT05FTUVOVF9BSU5NQVRJT05fVFlQRSc6IHtcblxuXHRcdCdTV0lORyc6IDBcblx0fSxcblxuXHQvLyBBY3Rpdml0eSBFdmVudHNcblx0J0FDVElWSVRZX0VWRU5UUyc6IHtcblx0XHQnQUNUSVZJVFlfRkVUQ0gnOiBcdDAsXG5cdFx0J0FDVElWSVRZX0NSRUFURSc6IFx0MSxcblx0XHQnQUNUSVZJVFlfVVBEQVRFJzogXHQyLFxuXHRcdCdBQ1RJVklUWV9ERUxFVEUnOiBcdDMgXG5cdH1cblxufTsiLCIvKipcbiAqIENoYW5nZSBmcm9tIGZhY2Vib29rLCB3aXRoIHN0YW5kYXJkIG9iaiBzdHlsZSB3aXRoIFN1cmZhY2VXXG4gKiBcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBEaXNwYXRjaGVyXG4gKiBAdHlwZWNoZWNrc1xuICogQHByZXZlbnRNdW5nZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2xhc3RJRCA9IDE7XG52YXIgX3ByZWZpeCA9ICdJRF8nO1xuXG4vKipcbiAqIERpc3BhdGNoZXIgaXMgdXNlZCB0byBicm9hZGNhc3QgcGF5bG9hZHMgdG8gcmVnaXN0ZXJlZCBjYWxsYmFja3MuIFRoaXMgaXNcbiAqIGRpZmZlcmVudCBmcm9tIGdlbmVyaWMgcHViLXN1YiBzeXN0ZW1zIGluIHR3byB3YXlzOlxuICpcbiAqICAgMSkgQ2FsbGJhY2tzIGFyZSBub3Qgc3Vic2NyaWJlZCB0byBwYXJ0aWN1bGFyIGV2ZW50cy4gRXZlcnkgcGF5bG9hZCBpc1xuICogICAgICBkaXNwYXRjaGVkIHRvIGV2ZXJ5IHJlZ2lzdGVyZWQgY2FsbGJhY2suXG4gKiAgIDIpIENhbGxiYWNrcyBjYW4gYmUgZGVmZXJyZWQgaW4gd2hvbGUgb3IgcGFydCB1bnRpbCBvdGhlciBjYWxsYmFja3MgaGF2ZVxuICogICAgICBiZWVuIGV4ZWN1dGVkLlxuICpcbiAqIEZvciBleGFtcGxlLCBjb25zaWRlciB0aGlzIGh5cG90aGV0aWNhbCBmbGlnaHQgZGVzdGluYXRpb24gZm9ybSwgd2hpY2hcbiAqIHNlbGVjdHMgYSBkZWZhdWx0IGNpdHkgd2hlbiBhIGNvdW50cnkgaXMgc2VsZWN0ZWQ6XG4gKlxuICogICB2YXIgZmxpZ2h0RGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG4gKlxuICogICAvLyBLZWVwcyB0cmFjayBvZiB3aGljaCBjb3VudHJ5IGlzIHNlbGVjdGVkXG4gKiAgIHZhciBDb3VudHJ5U3RvcmUgPSB7Y291bnRyeTogbnVsbH07XG4gKlxuICogICAvLyBLZWVwcyB0cmFjayBvZiB3aGljaCBjaXR5IGlzIHNlbGVjdGVkXG4gKiAgIHZhciBDaXR5U3RvcmUgPSB7Y2l0eTogbnVsbH07XG4gKlxuICogICAvLyBLZWVwcyB0cmFjayBvZiB0aGUgYmFzZSBmbGlnaHQgcHJpY2Ugb2YgdGhlIHNlbGVjdGVkIGNpdHlcbiAqICAgdmFyIEZsaWdodFByaWNlU3RvcmUgPSB7cHJpY2U6IG51bGx9XG4gKlxuICogV2hlbiBhIHVzZXIgY2hhbmdlcyB0aGUgc2VsZWN0ZWQgY2l0eSwgd2UgZGlzcGF0Y2ggdGhlIHBheWxvYWQ6XG4gKlxuICogICBmbGlnaHREaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAqICAgICBhY3Rpb25UeXBlOiAnY2l0eS11cGRhdGUnLFxuICogICAgIHNlbGVjdGVkQ2l0eTogJ3BhcmlzJ1xuICogICB9KTtcbiAqXG4gKiBUaGlzIHBheWxvYWQgaXMgZGlnZXN0ZWQgYnkgYENpdHlTdG9yZWA6XG4gKlxuICogICBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICBpZiAocGF5bG9hZC5hY3Rpb25UeXBlID09PSAnY2l0eS11cGRhdGUnKSB7XG4gKiAgICAgICBDaXR5U3RvcmUuY2l0eSA9IHBheWxvYWQuc2VsZWN0ZWRDaXR5O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogV2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgY291bnRyeSwgd2UgZGlzcGF0Y2ggdGhlIHBheWxvYWQ6XG4gKlxuICogICBmbGlnaHREaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAqICAgICBhY3Rpb25UeXBlOiAnY291bnRyeS11cGRhdGUnLFxuICogICAgIHNlbGVjdGVkQ291bnRyeTogJ2F1c3RyYWxpYSdcbiAqICAgfSk7XG4gKlxuICogVGhpcyBwYXlsb2FkIGlzIGRpZ2VzdGVkIGJ5IGJvdGggc3RvcmVzOlxuICpcbiAqICAgQ291bnRyeVN0b3JlLmRpc3BhdGNoVG9rZW4gPSBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICBpZiAocGF5bG9hZC5hY3Rpb25UeXBlID09PSAnY291bnRyeS11cGRhdGUnKSB7XG4gKiAgICAgICBDb3VudHJ5U3RvcmUuY291bnRyeSA9IHBheWxvYWQuc2VsZWN0ZWRDb3VudHJ5O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogV2hlbiB0aGUgY2FsbGJhY2sgdG8gdXBkYXRlIGBDb3VudHJ5U3RvcmVgIGlzIHJlZ2lzdGVyZWQsIHdlIHNhdmUgYSByZWZlcmVuY2VcbiAqIHRvIHRoZSByZXR1cm5lZCB0b2tlbi4gVXNpbmcgdGhpcyB0b2tlbiB3aXRoIGB3YWl0Rm9yKClgLCB3ZSBjYW4gZ3VhcmFudGVlXG4gKiB0aGF0IGBDb3VudHJ5U3RvcmVgIGlzIHVwZGF0ZWQgYmVmb3JlIHRoZSBjYWxsYmFjayB0aGF0IHVwZGF0ZXMgYENpdHlTdG9yZWBcbiAqIG5lZWRzIHRvIHF1ZXJ5IGl0cyBkYXRhLlxuICpcbiAqICAgQ2l0eVN0b3JlLmRpc3BhdGNoVG9rZW4gPSBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICBpZiAocGF5bG9hZC5hY3Rpb25UeXBlID09PSAnY291bnRyeS11cGRhdGUnKSB7XG4gKiAgICAgICAvLyBgQ291bnRyeVN0b3JlLmNvdW50cnlgIG1heSBub3QgYmUgdXBkYXRlZC5cbiAqICAgICAgIGZsaWdodERpc3BhdGNoZXIud2FpdEZvcihbQ291bnRyeVN0b3JlLmRpc3BhdGNoVG9rZW5dKTtcbiAqICAgICAgIC8vIGBDb3VudHJ5U3RvcmUuY291bnRyeWAgaXMgbm93IGd1YXJhbnRlZWQgdG8gYmUgdXBkYXRlZC5cbiAqXG4gKiAgICAgICAvLyBTZWxlY3QgdGhlIGRlZmF1bHQgY2l0eSBmb3IgdGhlIG5ldyBjb3VudHJ5XG4gKiAgICAgICBDaXR5U3RvcmUuY2l0eSA9IGdldERlZmF1bHRDaXR5Rm9yQ291bnRyeShDb3VudHJ5U3RvcmUuY291bnRyeSk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgdXNhZ2Ugb2YgYHdhaXRGb3IoKWAgY2FuIGJlIGNoYWluZWQsIGZvciBleGFtcGxlOlxuICpcbiAqICAgRmxpZ2h0UHJpY2VTdG9yZS5kaXNwYXRjaFRva2VuID1cbiAqICAgICBmbGlnaHREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAqICAgICAgIHN3aXRjaCAocGF5bG9hZC5hY3Rpb25UeXBlKSB7XG4gKiAgICAgICAgIGNhc2UgJ2NvdW50cnktdXBkYXRlJzpcbiAqICAgICAgICAgY2FzZSAnY2l0eS11cGRhdGUnOlxuICogICAgICAgICAgIGZsaWdodERpc3BhdGNoZXIud2FpdEZvcihbQ2l0eVN0b3JlLmRpc3BhdGNoVG9rZW5dKTtcbiAqICAgICAgICAgICBGbGlnaHRQcmljZVN0b3JlLnByaWNlID1cbiAqICAgICAgICAgICAgIGdldEZsaWdodFByaWNlU3RvcmUoQ291bnRyeVN0b3JlLmNvdW50cnksIENpdHlTdG9yZS5jaXR5KTtcbiAqICAgICAgICAgICBicmVhaztcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFRoZSBgY291bnRyeS11cGRhdGVgIHBheWxvYWQgd2lsbCBiZSBndWFyYW50ZWVkIHRvIGludm9rZSB0aGUgc3RvcmVzJ1xuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MgaW4gb3JkZXI6IGBDb3VudHJ5U3RvcmVgLCBgQ2l0eVN0b3JlYCwgdGhlblxuICogYEZsaWdodFByaWNlU3RvcmVgLlxuICovXG5mdW5jdGlvbiBEaXNwYXRjaGVyICgpIHtcblxuICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgdGhpcy5faXNQZW5kaW5nID0ge307XG4gIHRoaXMuX2lzSGFuZGxlZCA9IHt9O1xuICB0aGlzLl9pc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gIHRoaXMuX3BlbmRpbmdQYXlsb2FkID0gbnVsbDtcblxufVxuXG4vKipcbiAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgd2l0aCBldmVyeSBkaXNwYXRjaGVkIHBheWxvYWQuIFJldHVybnNcbiAqIGEgdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGB3YWl0Rm9yKClgLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkRpc3BhdGNoZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIGlkID0gX3ByZWZpeCArIF9sYXN0SUQrKztcbiAgdGhpcy5fY2FsbGJhY2tzW2lkXSA9IGNhbGxiYWNrO1xuICByZXR1cm4gaWQ7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhIGNhbGxiYWNrIGJhc2VkIG9uIGl0cyB0b2tlbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAqL1xuRGlzcGF0Y2hlci5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uKGlkKSB7XG4gIGludmFyaWFudChcbiAgICB0aGlzLl9jYWxsYmFja3NbaWRdLFxuICAgICdEaXNwYXRjaGVyLnVucmVnaXN0ZXIoLi4uKTogYCVzYCBkb2VzIG5vdCBtYXAgdG8gYSByZWdpc3RlcmVkIGNhbGxiYWNrLicsXG4gICAgaWRcbiAgKTtcbiAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tpZF07XG59XG5cbi8qKlxuICogV2FpdHMgZm9yIHRoZSBjYWxsYmFja3Mgc3BlY2lmaWVkIHRvIGJlIGludm9rZWQgYmVmb3JlIGNvbnRpbnVpbmcgZXhlY3V0aW9uXG4gKiBvZiB0aGUgY3VycmVudCBjYWxsYmFjay4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgdXNlZCBieSBhIGNhbGxiYWNrIGluXG4gKiByZXNwb25zZSB0byBhIGRpc3BhdGNoZWQgcGF5bG9hZC5cbiAqXG4gKiBAcGFyYW0ge2FycmF5PHN0cmluZz59IGlkc1xuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS53YWl0Rm9yID0gZnVuY3Rpb24oaWRzKSB7XG4gIGludmFyaWFudChcbiAgICB0aGlzLl9pc0Rpc3BhdGNoaW5nLFxuICAgICdEaXNwYXRjaGVyLndhaXRGb3IoLi4uKTogTXVzdCBiZSBpbnZva2VkIHdoaWxlIGRpc3BhdGNoaW5nLidcbiAgKTtcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGlkcy5sZW5ndGg7IGlpKyspIHtcbiAgICB2YXIgaWQgPSBpZHNbaWldO1xuICAgIGlmICh0aGlzLl9pc1BlbmRpbmdbaWRdKSB7XG4gICAgICBpbnZhcmlhbnQoXG4gICAgICAgIHRoaXMuX2lzSGFuZGxlZFtpZF0sXG4gICAgICAgICdEaXNwYXRjaGVyLndhaXRGb3IoLi4uKTogQ2lyY3VsYXIgZGVwZW5kZW5jeSBkZXRlY3RlZCB3aGlsZSAnICtcbiAgICAgICAgJ3dhaXRpbmcgZm9yIGAlc2AuJyxcbiAgICAgICAgaWRcbiAgICAgICk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaW52YXJpYW50KFxuICAgICAgdGhpcy5fY2FsbGJhY2tzW2lkXSxcbiAgICAgICdEaXNwYXRjaGVyLndhaXRGb3IoLi4uKTogYCVzYCBkb2VzIG5vdCBtYXAgdG8gYSByZWdpc3RlcmVkIGNhbGxiYWNrLicsXG4gICAgICBpZFxuICAgICk7XG4gICAgdGhpcy5faW52b2tlQ2FsbGJhY2soaWQpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2hlcyBhIHBheWxvYWQgdG8gYWxsIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXlsb2FkXG4gKi9cbkRpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24ocGF5bG9hZCkge1xuICBpbnZhcmlhbnQoXG4gICAgIXRoaXMuX2lzRGlzcGF0Y2hpbmcsXG4gICAgJ0Rpc3BhdGNoLmRpc3BhdGNoKC4uLik6IENhbm5vdCBkaXNwYXRjaCBpbiB0aGUgbWlkZGxlIG9mIGEgZGlzcGF0Y2guJ1xuICApO1xuICB0aGlzLl9zdGFydERpc3BhdGNoaW5nKHBheWxvYWQpO1xuICB0cnkge1xuICAgIGZvciAodmFyIGlkIGluIHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgaWYgKHRoaXMuX2lzUGVuZGluZ1tpZF0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLl9pbnZva2VDYWxsYmFjayhpZCk7XG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIHRoaXMuX3N0b3BEaXNwYXRjaGluZygpO1xuICB9XG59XG5cbi8qKlxuICogSXMgdGhpcyBEaXNwYXRjaGVyIGN1cnJlbnRseSBkaXNwYXRjaGluZy5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5pc0Rpc3BhdGNoaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9pc0Rpc3BhdGNoaW5nO1xufVxuXG4vKipcbiAqIENhbGwgdGhlIGNhbGxiYWNrIHN0b3JlZCB3aXRoIHRoZSBnaXZlbiBpZC4gQWxzbyBkbyBzb21lIGludGVybmFsXG4gKiBib29ra2VlcGluZy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAqIEBpbnRlcm5hbFxuICovXG5EaXNwYXRjaGVyLnByb3RvdHlwZS5faW52b2tlQ2FsbGJhY2sgPSBmdW5jdGlvbihpZCkge1xuICB0aGlzLl9pc1BlbmRpbmdbaWRdID0gdHJ1ZTtcbiAgdGhpcy5fY2FsbGJhY2tzW2lkXSh0aGlzLl9wZW5kaW5nUGF5bG9hZCk7XG4gIHRoaXMuX2lzSGFuZGxlZFtpZF0gPSB0cnVlO1xufVxuXG4vKipcbiAqIFNldCB1cCBib29ra2VlcGluZyBuZWVkZWQgd2hlbiBkaXNwYXRjaGluZy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcGF5bG9hZFxuICogQGludGVybmFsXG4gKi9cbkRpc3BhdGNoZXIucHJvdG90eXBlLl9zdGFydERpc3BhdGNoaW5nID0gZnVuY3Rpb24ocGF5bG9hZCkge1xuICBmb3IgKHZhciBpZCBpbiB0aGlzLl9jYWxsYmFja3MpIHtcbiAgICB0aGlzLl9pc1BlbmRpbmdbaWRdID0gZmFsc2U7XG4gICAgdGhpcy5faXNIYW5kbGVkW2lkXSA9IGZhbHNlO1xuICB9XG4gIHRoaXMuX3BlbmRpbmdQYXlsb2FkID0gcGF5bG9hZDtcbiAgdGhpcy5faXNEaXNwYXRjaGluZyA9IHRydWU7XG59XG5cbi8qKlxuICogQ2xlYXIgYm9va2tlZXBpbmcgdXNlZCBmb3IgZGlzcGF0Y2hpbmcuXG4gKlxuICogQGludGVybmFsXG4gKi9cbkRpc3BhdGNoZXIucHJvdG90eXBlLl9zdG9wRGlzcGF0Y2hpbmcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fcGVuZGluZ1BheWxvYWQgPSBudWxsO1xuICB0aGlzLl9pc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG59XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICAvLyBpZiAoX19ERVZfXykge1xuICAvLyAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRGlzcGF0Y2hlcigpO1xuIiwiLyoqXG4gKiBBY3Rpdml0aWVzU3RvcmUgQ2xhc3NcbiAqIEBhdXRob3IgU3VyZmFjZVdcbiAqIEB2ZXJzaW9uIDEuMFxuICovXG5cbnZhciAkICAgICAgICAgICAgID0gd2luZG93LiQ7XG52YXIgY29uc3RzICAgICAgICA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cy9jb25zdGFudHMnKTtcbnZhciBBcHBEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vZGlzcGF0Y2hlci9EaXNwYXRjaGVyJyk7XG52YXIgRXZlbnRFbWl0ZXIgICA9IHJlcXVpcmUoJy4uL3V0aWwvRXZlbnRFbWl0ZXInKTtcblxudmFyIF9hY3Rpdml0aWVzID0ge307XG52YXIgYWN0aXZpdHlFdmVudCA9IGNvbnN0cy5BQ1RJVklUWV9FVkVOVFM7XG5cbi8vIERhdGEgZm9yIHRlc3RpbmdcbnZhciBhY3Rpdml0aWVzRGF0YSA9IFtcblxuXTtcblxudmFyIEFjdGl2aXRpZXNTdG9yZSA9IHtcblxuXHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gX2FjdGl2aXRpZXM7XG5cdH1cbn07XG5cbmZ1bmN0aW9uIGZldGNoKCkge1xuXHQvLyByZXR1cm4gJC5hamF4KHtcblx0Ly8gXHR1cmw6ICcnLFxuXHQvLyBcdHR5cGU6ICcnXG5cdC8vIH0pO1xuXHRcblx0X2FjdGl2aXRpZXMgPSBhY3Rpdml0aWVzRGF0YTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKCkge1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUl0ZW0oKSB7XG59XG5cbiQuZXh0ZW5kKEFjdGl2aXRpZXNTdG9yZSwgRXZlbnRFbWl0ZXIucHJvdG90eXBlKTtcblxuQXBwRGlzcGF0Y2hlci5yZWdpc3RlcihmdW5jdGlvbiAoYWN0aW9uKSB7XG5cdHN3aXRjaChhY3Rpb24udHlwZSkge1xuXHRcdGNhc2UgYWN0aXZpdHlFdmVudC5BQ1RJVklUWV9GRVRDSDpcblx0XHRcdC8vIGZldGNoKCkuZG9uZShmdW5jdGlvbiAoKSB7fSk7XG5cdFx0XHRmZXRjaCgpO1xuXHRcdFx0QWN0aXZpdGllc1N0b3JlLnRyaWdnZXIoJ2ZldGNoX2NvbXBsZXRlJyk7XG5cdFx0YnJlYWs7XG5cdFx0Y2FzZSBhY3Rpdml0eUV2ZW50LkFDVElWSVRZX0NSRUFURTogXG5cdFx0XG5cdFx0YnJlYWs7XG5cdFx0Y2FzZSBhY3Rpdml0eUV2ZW50LkFDVElWSVRZX1VQREFURTpcblxuXHRcdGJyZWFrO1xuXHRcdGNhc2UgYWN0aXZpdHlFdmVudC5BQ1RJVklUWV9ERUxFVEU6XG5cblx0XHRicmVhaztcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQWN0aXZpdGllc1N0b3JlOyIsIi8qKlxuICogRXZlbnQgRW1pdGVyIENsYXNzXG4gKiBAYXV0aG9yIFN1cmZhY2VXXG4gKiBAdmVyc2lvbiAxLjBcbiAqL1xuXG52YXIgRXZlbnRFbWl0ZXIgPSBmdW5jdGlvbiAoKSB7fTtcbnZhciBfSUQgICAgICAgICA9IDE7XG52YXIgX2MgICAgICAgICAgPSBbXTtcblxudmFyIGZuID0gRXZlbnRFbWl0ZXIucHJvdG90eXBlID0ge1xuXG5cdC8qKlxuXHQgKiBFdmVudCBEaXNwYXRjaCAvIFRyaWdnZXJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBlIGV2ZW50IG5hbWVcblx0ICogQHBhcmFtICB7T2JqZWN0fSBhIGFyZ3VtZW50cyBvZiB0aGUgZXZlbnRcblx0ICovXG5cdGRpc3BhdGNoOiBmdW5jdGlvbiAoZSwgYSkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgX2MubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChfY1tpXS5lID09PSBlKSBfY1tpXS5jLmNhbGwodGhpcywgYSk7XG5cdFx0fTtcblx0fSxcblxuXHQvKipcblx0ICogRXZlbnQgQmluZFxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IG4gZXZlbnQgbmFtZVxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gYyB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdG9uOiBmdW5jdGlvbiAobiwgYykge1xuXHRcdGlmICh0eXBlb2YgbiA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGMgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdF9jLnB1c2goe1xuXHRcdFx0XHQnaWQnOiBfSUQsIFxuXHRcdFx0XHQnZSc6IG4sXG5cdFx0XHRcdCdjJzogY1xuXHRcdFx0fSk7XG5cdFx0XHRfSUQgKys7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBVbmJpbmQgZXZlbnRcblx0ICogQHBhcmFtICB7U3RyaW5nfSBlIGV2ZW50IG5hbWVcblx0ICogQHJldHVybiB7W3R5cGVdfSAgIFtkZXNjcmlwdGlvbl1cblx0ICovXG5cdG9mZjogZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAodHlwZW9mIGUgIT09ICdzdHJpbmcnKSByZXR1cm47XG5cdFx0Zm9yICh2YXIgaSA9IF9jLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRpZiAoX2NbaV0uZSA9PT0gZSkgX2Muc3BsaWNlKGksIDEpO1xuXHRcdH07XG5cdH1cbn1cblxuZm4uZW1taXQgICA9IGZuLm9uO1xuZm4udHJpZ2dlciA9IGZuLmRpc3BhdGNoO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdGVyO1xuIl19
