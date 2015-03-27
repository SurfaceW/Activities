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
		'ACTIVITY_CREATE': 	1,
		'ACTIVITY_UPDATE': 	2,
		'ACTIVITY_DELETE': 	3 
	},

	// States of Components
	'ACTIVITY_STATES': {
		'LOADING': 0,
		
		'PUBLISHER_NEW': 1,
		'PUBLISHER_ADD_NEW': 2,
		'PUBLISHER_ACTIVITY_DESIGN': 3,
		'PUBLISHER_ACTIVITY_VIEW': 4,
		'PUBLISHER_ACTIVITY_DETAIL': 5,
		'PUBLISHER_ACTIVITY_LIST': 6,

		'PARTICIPATOR_VIEW': 7,
		'PARTICIPATOR_2DCODE': 8
	}

};