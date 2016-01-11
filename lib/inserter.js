/* ==============================================
 * Requirements
 * ============================================== */
var fs = require('fs');
var glob = require('glob');
var Helpers = require('./utils/helpers');
var chalk = require('chalk');

/* ==============================================
 * Vars
 * ============================================== */

/* ==============================================
 * Module
 * ============================================== */

var Inserter = function (obj) {
	this.options = {
		insertStartkey: '@INSERT :: START',
		insertEndkey: '@INSERT :: END',
		insertpointKey: '@INSERTPOINT ::',
		tplKey: '@template:',
		idKey: '@id:',
		tagKey: '@tag:',
		tplFolder: false,
		endpointFolders: false
	};
	this.options = Helpers.extend(this.options, obj);

	this.initialize();
};

Inserter.prototype = {

	getData: function () {
		return this._data;
	},

	setData: function (data) {
		this._data = data;
	},

	initialize: function () {
		// Files
		this.tplFiles = this.getFiles(this.options.tplFolder);
		this.endpointFiles = this.getFiles(this.options.endpointFolders);

		// Regex
		this.dataRegex = new RegExp('(?:.+' + this.options.insertStartkey + '+.*?)(.@.*)([\\s\\S]+?)(?:.+' + this.options.insertEndkey + '.*)', 'g');
		this.idRegex = new RegExp('(?:' + this.options.idKey + ')(.\\S+)(?:.)', 'i');
		this.tagRegex = new RegExp('(?:' + this.options.tagKey + ')(.\\S+)(?:.)', 'i');

		// Set data object
	},

	preRender: function () {
		this.setData(this.filesContent());
	},

	render: function () {
		this.preRender();
		this.writeData();
		this.checkUnused();
	},

	/**
	 * Expose data for further usage
	 *
	 * @public
	 */
	exposeData: function () {
		this.preRender();
		return this.getData();
	},

	getFiles: function (folders) {
		var files = [];
		folders.forEach(function (folder) {
			files = files.concat(glob.sync(folder + '/**/*.*'));
		});
		return files;
	},

	filesContent: function () {
		var _this = this;
		var data = [];

		this.tplFiles.forEach(function (file) {
			var content = fs.readFileSync(file, 'utf-8');

			data = data.concat(_this.fileContent(content));
		});

		return data;
	},

	fileContent: function (content) {
		var _this = this;
		var matches = [];
		var match;

		while (match = this.dataRegex.exec(content)) {
			var id = _this.idRegex.exec(match[1]);
			var tag = _this.tagRegex.exec(match[1]);

			matches.push({
				id: id && id[1] ? Helpers.cleanUpString(id[1]) : false,
				tag: tag && tag[1] ? Helpers.cleanUpString(tag[1]) : false,
				data: match[2],
				inserted: false
			});
		}

		return matches;
	},


	writeData: function () {
		var _this = this;

		this.endpointFiles.forEach(function (file) {
			var content = fs.readFileSync(file, 'utf-8');
			var newContent;

			_this.getData().forEach(function (item) {
				var insertpointRegex = new RegExp('(.+' + _this.options.insertpointKey + '.+' + _this.options.idKey + '.' + item.id + '.*)', 'g');
				var match = insertpointRegex.exec(content);

				if (match) {
					newContent = item.data + '\n' + match[0];

					var result = content.replace(insertpointRegex, newContent);
					content = result;
					item.inserted = true;

					Helpers.write(file, result);
				}
			});
		});
	},

	checkUnused: function () {
		this.getData().forEach(function (item) {
			if (!item.inserted) Helpers.message('yellow', Helpers.msg.warning('For the template ID ' + chalk.magenta(item.id) + ' I haven\'t found any insertpoint :('));
		});
	}
};

module.exports = Inserter;