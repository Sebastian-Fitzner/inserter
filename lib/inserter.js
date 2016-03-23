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
		refKey: '@ref:',
		tagKey: '@tag:',
		keepKey: '@keep:',
		keep: true,
		templates: false,
		endpoints: false
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
		this.tplFiles = this.getFiles(this.options.templates);
		this.endpointFiles = this.getFiles(this.options.endpoints);

		// Regex
		this.dataRegex = new RegExp('(?:.+' + this.options.insertStartkey + '+.*?)(.@.*)([\\s\\S]+?)(?:.+' + this.options.insertEndkey + '.*)', 'g');
		this.idRegex = new RegExp('(?:' + this.options.idKey + ')(.\\S+)(?:.)', 'i');
		this.refRegex = new RegExp('(?:' + this.options.refKey + ')(.\\S+)(?:.)', 'i');
		this.tagRegex = new RegExp('(?:' + this.options.tagKey + ')(.\\S+)(?:.)', 'i');
		this.keepRegex = new RegExp('(?:' + this.options.keepKey + ')(.\\S+)(?:.)', 'i');

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

	getFiles: function (filesOrFolders) {
		var files = [];

		if (!filesOrFolders) return;

		filesOrFolders.forEach(function (fileOrFolder) {
			if (fs.lstatSync(fileOrFolder).isDirectory()) {
				files = files.concat(glob.sync(fileOrFolder + '/**/*.*'));
			} else if (fs.lstatSync(fileOrFolder).isFile()) {
				files.push(fileOrFolder);
			}
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
			_this.getData().forEach(function (item) {
				var content = fs.readFileSync(file, 'utf-8');

				if (item.id) {
					var idRegex = new RegExp('(.+' + _this.options.insertpointKey + '.+' + _this.options.refKey + '.' + item.id + '.*)', 'g');
					var matchId = idRegex.exec(content);

					if (matchId) {
						content = _this.buildContent(content, item.data, matchId[0], idRegex);
						item.inserted = true;
					}
				}

				if (item.tag) {
					var tagRegex = new RegExp('(.+' + _this.options.insertpointKey + '.+' + _this.options.refKey + '.' + item.tag + '.*)', 'g');
					var matchTag = tagRegex.exec(content);

					if (matchTag) {
						content = _this.buildContent(content, item.data, matchTag[0], tagRegex);
						item.inserted = true;
					}
				}

				if (matchId || matchTag) {
					Helpers.write(file, content);
				}

			});
		});
	},

	buildContent: function (content, data, match, regex) {
		var keep = this.keepRegex.exec(match);
		keep = keep && keep[1] ? Helpers.cleanUpString(keep[1]) : this.options.keep;

		var newContent = keep !== 'false' ? data + '\n' + match : data;

		return content.replace(regex, newContent);
	},

	checkUnused: function () {
		this.getData().forEach(function (item) {
			var data = item.id ? item.id : item.tag;

			if (!item.inserted) Helpers.message('yellow', Helpers.msg.warning('For the template ' + chalk.magenta(data) + ' I haven\'t found any @ref in your insertpoints :('));
		});
	}
};

module.exports = Inserter;