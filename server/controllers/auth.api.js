const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('./auth');
const config = require('../config/auth.js');
const errors = require('./error');

router.post(
	'/signup',
	(req, res, next) => {
		if (!req.body.email || !req.body.password) {
			return errors.errorHandler(
				res,
				'You must send the username and the password.'
			);
		}
		Users.find({ email: req.body.email })
			.then(user => {
				if (user.length > 0) {
					return errors.errorHandler(
						res,
						'A user with that username already exists.'
					);
				}
				let passwordHash = bcrypt.hashSync(req.body.password.trim(), 12);
				let newUser = _.pick(req.body, 'first', 'last', 'email');
				newUser.password = passwordHash;
				return Users.create(newUser);
			})
			.then(newUser => {
				req.user = newUser;
				next();
			})
			.catch(err => {
				return errors.errorHandler(res, err);
			});
	},
	auth.createToken,
	auth.createRefreshToken,
	(req, res) => {
		res.status(201).send({
			success: true,
			authToken: req.authToken,
			refreshToken: req.refreshToken
		});
	}
);

router.post(
	'/login',
	(req, res, next) => {
		if (!req.body.email || !req.body.password) {
			return errors.errorHandler(
				res,
				'You must send the username and the password.'
			);
		}
		Users.findOne({ email: req.body.email })
			.then(user => {
				if (user.length == 0) {
					return errors.errorHandler(res, 'There has been an error.');
				}
				bcrypt.compare(req.body.password, user.password, (err, success) => {
					if (err) {
						return errors.errorHandler(
							res,
							'The has been an unexpected error, please try again later'
						);
					}
					if (!success) {
						return errors.errorHandler(res, 'Your password is incorrect.');
					} else {
						req.user = user;
						req.activity = 'login';
						next();
					}
				});
			})
			.catch(err => {
				return errors.errorHandler(res, err);
			});
	},
	auth.createToken,
	auth.createRefreshToken,
	(req, res) => {
		res.status(201).send({
			success: true,
			authToken: req.authToken,
			refreshToken: req.refreshToken
		});
	}
);

router.post(
	'/refreshToken',
	auth.validateRefreshToken,
	auth.createToken,
	(req, res) => {
		res.status(201).send({
			success: true,
			authToken: req.authToken
		});
	}
);

router.use((req, res, next) => {
	var token = req.headers['authorization'];
	if (!token) {
		return next();
	}
	token = token.replace('Bearer ', '');
	jwt.verify(token, config.secret, (err, user) => {
		if (err) {
			//attempt to refresh token here... if successful, next(). Maybe won't work as we'd need the refresh token on every request?
			return errors.errorHandler(
				res,
				'Your access token is invalid.',
				'invalidToken'
			);
		} else {
			req.user = user;
			next();
		}
	});
});

router.post('/getAll', (req, res) => {
	Users.find()
		.then(users => {
			res.status(201).send({
				success: true,
				message: users
			});
		})
		.catch(err => {
			return errors.errorHandler(res, err);
		});
});

module.exports = router;
