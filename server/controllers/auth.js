const Users = require('../models/Users');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const errors = require('./error');

let createToken = (req, res, next) => {
	req.authToken = jwt.sign(
		_.omit(req.user.toObject(), 'password'),
		config.secret,
		{
			expiresIn: '5s'
		}
	);

	next();
};
let createRefreshToken = (req, res, next) => {
	//if refresh token doesnt exist already. It won't exist when signing up abviously, but when the user logs in they should have one already in the DB. This just adds one in if they haven't (testing mainly). It doesn't always need to be in the /login endpoint route
	if (!req.user.refreshToken) {
		req.refreshToken = jwt.sign({ type: 'refresh' }, config.secret, {
			expiresIn: 60 * 60 * 24 * 90
		});
		Users.findOneAndUpdate(
			{ email: req.user.email },
			{ refreshToken: req.refreshToken }
		)
			.then(() => {
				next();
			})
			.catch(err => {
				return errors.errorHandler(res, err);
			});
	} else {
		req.refreshToken = req.user.refreshToken;
		next();
	}
};
let validateRefreshToken = (req, res, next) => {
	if (req.body.refreshToken != '') {
		Users.findOne({ refreshToken: req.body.refreshToken })
			.then(user => {
				req.user = user;
				next();
			})
			.catch(err => {
				return errors.errorHandler(res, err);
			});
	} else {
		return errors.errorHandler(res, 'There is no refresh token to check.');
	}
};

module.exports = {
	createToken,
	createRefreshToken,
	validateRefreshToken
};
