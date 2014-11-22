var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
	development: {
		db: 'mongodb://localhost/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		rootPath: rootPath,
		db: 'mongodb://bgriffin:multivision@ds049160.mongolab.com:49160/psmvdb',
		port: process.env.PORT || 80
	}
}