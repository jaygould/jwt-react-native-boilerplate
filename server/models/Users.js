const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	first: String,
	last: String,
	email: String,
	password: String,
	refreshToken: String
});

const Users = mongoose.model('Users', usersSchema, 'Users');

module.exports = Users;
