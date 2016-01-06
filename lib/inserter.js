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
		insertpointKey: '@INSERTPOINT ::',
		refKey: '@ref:',
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
		this.blockRegex = new RegExp('(?:\\S.+' + this.options.insertpointKey + ')([\\s].\\S+)(?:.)', 'g');
		this.refRegex = new RegExp('(?:\\S.+' + this.options.refKey + ')(.\\S+)(?:.)', 'g');


		var content = fs.readFileSync(this.endpointFiles[2], 'utf-8');


		insertComments = content.match(this.blockRegex);

		if (insertComments) {
			console.log('true: ');
		}

		var matches = [], match;
		while (match = this.blockRegex.exec(content)) {
		    matches.push(match[1]);
		}
		console.log('matches: ', insertComments);
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