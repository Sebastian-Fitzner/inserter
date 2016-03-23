// Main Requirements
import App from './app';
import Helpers from './utils/helpers';

require('respimage');

let $ = App.$;

// ES6 Modules
import CTA from './modules/cta/cta';
import Dropdown from './modules/dropdown/dropdown';
import Overlay from './modules/overlay/overlay';
import Gallery from './modules/gallery/gallery';
import Slider from './modules/slider/slider';
import SlideFox from './modules/slide-fox/slide-fox';
import EqualRows from './modules/equal-rows/equal-rows';


import TestCase from './modules/test-case/test-case';

// @INSERTPOINT :: @ref: js-import, @keep: true

"use strict";

// Main Functionality
class Core {
	constructor() {
		this.initialize();
	}

	/**
	 * Initialize our core functionality
	 * This function will only be executed once.
	 */
	initialize() {
		console.log('App initialized with version: ', App.version);

		/**
		 * Detect Touch
		 */
		if (!App.support.touch) {
			$('html').addClass('no-touch');
		} else {
			$('html').addClass('touch');
		}

		/**
		 * Init overlay
		 */
		new Overlay();

		/**
		 * Init gallery
		 */
		new Gallery();

	}

	render(context) {



/**
 * Init TestCase
 */
Helpers.loadModule({
	el: '[data-js-module="test-case"]',
	module: TestCase,
	context: context
});

		// @INSERTPOINT :: @ref: js-init-v3, @keep: true

		/**
		 * Init Dropdowns
		 */
		//Helpers.loadModule({
		//	el: '[data-js-module="dropdown"]',
		//	module: Dropdown,
		//	context: context
		//});

	}
}

document.addEventListener("DOMContentLoaded", function () {
	var core = new Core();

	/**
	 * Render modules
	 */
	core.render();

	/**
	 * Initialize modules which are loaded after initial load
	 * via custom event 'DOMchanged'
	 */
	App.Vent.on(App.EVENTS.DOMchanged, (context) => {
		console.log('Dom has changed. Initialising new modules in: ', context);
		core.render(context);
	});
});