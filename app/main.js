/**
 * Activities Main App Entrance
 */

var React        = window.React;
var $            = window.$;

var consts       = require('./constants/constants');
var Publisher    = require('./components/Publisher.react');
var Participator = require('./components/Participator.react');
var AS           = require('./stores/ActivitiesStore');

// var usertype = null; 
AS.usertype = 'publisher'; // in test case
// AS.usertype = 'participator';

(function () {
	var _container = $('#main-container').get(0);
	switch (AS.usertype) {
		case consts.USERTYPE.PUBLISHER: 
			React.render(<Publisher />, _container);
		break;
		case consts.USERTYPE.PARTICIPATOR:
			React.render(<Participator />, _container);
		break;
	}
})();
	
