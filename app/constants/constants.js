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

		'BACKGROUND_DEFAUT': 'default',
		'BACKGROUND_URL': 'url',

		'TITLE_LARGE': 'large',
		'TITLE_MIDDLE': 'middle',
		'TITLE_SMALL': 'small',

		'PARAGRAPTH': 'p',
		'LINK': 'a',
		'IMAGE': 'img',
		'SOUND': 'audio',
		'VIDEO': 'video',
		'LOCATION': 'loc',
		'DATE_TIME': 'date'
	}, 

	// Componements Showing and Hiding Style
	'TEMPLATE_COMPONEMENT_DISPLAY_TYPE': {

		'EASE_IN': 'ease-in',
		'EASE_OUT': 'ease-out'
	},

	// Componements Special Animation Style
	'TEMPLATE_COMPONEMENT_AINMATION_TYPE': {

		'SWING': 'swing'
	},

	// Activity Events
	'ACTIVITY_EVENTS': {

		'ACTIVITY_FETCH': 'fetch',
		'ACTIVITY_CREATE': 	'create',
		'ACTIVITY_UPDATE': 	'update',
		'ACTIVITY_DELETE': 	'delete',
		'ACTIVITY_DETAIL': 'detail',
		'ACTIVITY_CANCEL': 'cancel'
	},

	// Page Events
	'PAGE_EVENTS': {
		'PAGE_PREVIEW': 'preview',
		'PAGE_FINISH': 'finish',
		'PAGE_PREPARE': 'prepare',
		'PAGE_JOIN': 'join',
		'PAGE_NEXT': 'next',
		'PAGE_PREV': 'prev'
	},

	// Preview events
	'PREVIEW_EVENTS': {

	},

	// States of Components
	'ACTIVITY_STATES': {

		'LOADING': 'loading',
		
		'PUBLISHER_NEW': 'new',
		'PUBLISHER_ADD_NEW': 'add-new',
		'PUBLISHER_ACTIVITY_DESIGN': 'design',
		'PUBLISHER_ACTIVITY_PRVIEW': 'review',
		'PUBLISHER_ACTIVITY_DETAIL': 'detail',
		'PUBLISHER_ACTIVITY_LIST': 'list',

		'PARTICIPATOR_PRVIEW': 'p-preview',
		'PARTICIPATOR_2DCODE': 'p-2dcode'
	}
};