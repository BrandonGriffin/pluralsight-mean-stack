var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
		firstName: { type: String, required: '{PATH} is required!' },
		lastName: { type: String, required: '{PATH} is required!' },
		username: { type: String, required: '{PATH} is required!', unique: true },
		salt: { type: String, required: '{PATH} is required!' },
		hashed_pwd: { type: String, required: '{PATH} is required!' },
		roles: [String]
	});

userSchema.methods = {
	authenticate: function(passwordToMatch) {
		return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashed_pwd;
	},
	hasRole: function(role) {
		return this.roles.indexOf(role) > -1;
	}
}
	
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
	User.find({}).exec(function(err, collection) {
		if(collection.length === 0) {
			var salt = encrypt.createSalt();
			var hash = encrypt.hashPassword(salt, 'a');

			User.create({firstName: 'Brandon', lastName: 'Griffin', username: 'bgriff', salt: salt, hashed_pwd: hash, roles: ['admin']});
			User.create({firstName: 'John', lastName: 'Harriger', username: 'jharriger', salt: salt, hashed_pwd: hash, roles: []});
			User.create({firstName: 'Brad', lastName: 'Blevins', username: 'bblevins', salt: salt, hashed_pwd: hash});
		}
	});
}

exports.createDefaultUsers = createDefaultUsers;