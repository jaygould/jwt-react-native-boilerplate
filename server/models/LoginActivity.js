const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginActivitySchema = new Schema({
	userID: String,
	time: { type: Date, default: Date.now },
	activityType: String
});

const LoginActivity = mongoose.model(
	'LoginActivity',
	loginActivitySchema,
	'LoginActivity'
);

module.exports = LoginActivity;
