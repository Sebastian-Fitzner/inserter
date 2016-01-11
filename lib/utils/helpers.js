/* ==============================================
 * Requirements
 * ============================================== */
var chalk = require('chalk');
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

/* ==============================================
 * Variables
 * ============================================== */
var marker = '\n==================================================\n';

/**
 * Represents a Helpers object.
 * @module Helpers object
 *
 * @author Sebastian Fitzner
 */
var Helpers = {};

/**
 * Messages
 */
Helpers.msg = {
	error: function (error, stderr) {
		return 'ERROR: Something goes wrong! Please open an issue on github with the following error code: \n\n' + error || stderr + '\n'
	},
	warning: function (warning) {
		return 'WARNING: ' + warning
	},
	info: function (info) {
		return 'INFORMATION: ' + info
	},
	success: function (item) {
		return 'DONE: ' + item + ' successfully updated!'
	}
};

/* ==============================================
 * Functions
 * ============================================== */

/**
 * Log messages to the console.
 *
 * @param {String} color - Define the color of message (see chalk.js).
 * @param {String} msg - Message which will be displayed.
 */
Helpers.message = function (color, msg) {
	console.log(
		chalk[color](marker) +
		chalk[color](msg) +
		chalk[color](marker)
	);
};


Helpers.extend = function (a, b) {
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
};

Helpers.cleanupPath = function (path) {
	if (path !== '') {
		return path.replace(/\/?$/, '/');
	}
};
Helpers.cleanUpString = function (str) {
	if (str) {
		return str.replace(/[, ]+/g, ' ').trim();
	}
};

Helpers.write = function (filepath, data, callback) {
	mkdirp(path.dirname(filepath), function (err) {
		if (err) {
			throw err;
		}
		fs.writeFile(filepath, data, function (err) {
			if (err) {
				throw err;
			}
			if (callback) {
				callback(null, filepath);
			} else {
				Helpers.message('green', Helpers.msg.success(filepath));
			}
		});
	});
};

Helpers.deleteExtension = function (filename) {
	return filename.replace(/\.[^/.]+$/, "");
};

/* ==============================================
 * Export
 * ============================================== */
module.exports = Helpers;