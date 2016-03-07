var Inserter = require('./index');

var insert = new Inserter({
	templates: ['test/tpl/test-case/usage/README.md'],
	endpoints: ['test/output/pages.hbs']
});

insert.render();