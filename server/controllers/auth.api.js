const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const auth = require('./auth');
const errors = require('./error');
const Users = require('../models/Users');

router.post('/signup', (req, res) => {
	auth
		.registerUser(
			req.body.first,
			req.body.last,
			req.body.email,
			req.body.password
		)
		.then(user => {
			auth.logUserActivity(user, 'signup');
		})
		.then(() => {
			res.send({
				success: true
			});
		})
		.catch(err => {
			return errors.errorHandler(res, err);
		});
});

router.post('/login', (req, res) => {
	auth
		.loginUser(req.body.email, req.body.password)
		.then(user => {
			let authToken = auth.createToken(user);
			let refreshToken = auth.createRefreshToken(user);
			let userActivityLog = auth.logUserActivity(user, 'login');
			return Promise.all([
				authToken,
				refreshToken,
				userActivityLog
			]).then(tokens => {
				return {
					authToken: tokens[0],
					refreshToken: tokens[1]
				};
			});
		})
		.then(success => {
			res.send({
				success: true,
				authToken: success.authToken,
				refreshToken: success.refreshToken
			});
		})
		.catch(err => {
			return errors.errorHandler(res, err);
		});
});

router.post('/refreshToken', (req, res) => {
	auth
		.validateRefreshToken(req.body.refreshToken)
		.then(tokenResponse => {
			return auth.createToken(tokenResponse);
		})
		.then(authToken => {
			res.status(200).send({
				success: true,
				authToken: authToken
			});
		})
		.catch(err => {
			if (err.code) {
				return errors.errorHandler(res, err.message, err.code);
			} else {
				return errors.errorHandler(res, err.message);
			}
		});
});

router.use((req, res, next) => {
	var token = req.headers['authorization'];
	token = token.replace('Bearer ', '');
	return jwt.verify(token, config.secret, jwtErr => {
		if (jwtErr) {
			return errors.errorHandler(
				res,
				'Your access token is invalid.',
				'invalidToken'
			);
		} else {
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
