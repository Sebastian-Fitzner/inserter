/**
 * Description of TestCase.
 * @module TestCase
 *
 * @author
 */

import Helpers from '../../utils/helpers';
import App from '../../app';
import AppModule from '../_global/module';
const $ = App.$;

class TestCase extends AppModule {
	/**
	 * Constructor for our class
	 *
	 * @see module.js
	 *
	 * @param {Object} obj - Object which is passed to our class
	 * @param {Object} obj.el - element which will be saved in this.el
	 * @param {Object} obj.options - options which will be passed in as JSON object
	 */
	constructor(obj) {
		let options = {};

		super(obj, options);
	}

	/**
	 * Initialize the view and merge options
	 *
	 */
	initialize() {
		console.log('init TestCase');

		super.initialize();
	}

	/**
	 * Bind events
	 *
	 * Listen to open and close events
	 */
	bindEvents() {
		// Global events

		// Local events
	}

	/**
	 * Render class
	 */
	render() {
	}
}

export default TestCase;