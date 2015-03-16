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
			React.render( <Publisher />, _container);
		break;
		case consts.USERTYPE.PARTICIPATOR:
			React.render( <Participator />, _container);
		break;
	}
})();
	
