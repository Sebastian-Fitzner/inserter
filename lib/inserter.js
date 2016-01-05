/* ==============================================
 * Requirements
 * ============================================== */
var fs = require('fs');
var glob = require('glob');
var Helpers = require('./utils/helpers');

/* ==============================================
 * Vars
 * ============================================== */

/* ==============================================
 * Module
 * ============================================== */

var Inserter = function (obj) {
	this.options = {
		insertStartKey: '@INSERT :: START',
		insertEndKey: '@INSERT :: END',
		tplFolder: false,
		endpointFolders: false
	};
	this.options = Helpers.extend(this.options, obj);

	this.initialize();
};

Inserter.prototype = {
	initialize: function () {
		this.tplFiles = this.saveFiles(this.options.tplFolder);
		this.endpointFiles = this.saveFiles(this.options.endpointFolders);
		this.inserts = this.createInsertObj();

		console.log('files: ', this.tplFiles);

		var content = fs.readFileSync(this.tplFiles[0], 'utf-8');

		console.log('content: ', content);

		var insertComments = content.match(/@INSERT :: [A-Z]*/g);
		console.log('comments: ', insertComments);
	},

	saveFiles: function (folders) {
		var files = [];
		folders.forEach(function (folder) {
			files = files.concat(glob.sync(folder + '/**/*.*'));
		});
		return files;
	},

	createInsertObj: function(){

	}

};

module.exports = Inserter;