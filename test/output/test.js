

import TestCase from './modules/test-case/test-case';

/*** @INSERTPOINT :: @ref: js-import */

$(document).ready(function () {


/**
 * Init TestCase
 */
Helpers.loadModule({
	el: '[data-js-module="test-case"]',
	module: TestCase,
	context: context
});

// @INSERTPOINT :: @ref: js-init

});


