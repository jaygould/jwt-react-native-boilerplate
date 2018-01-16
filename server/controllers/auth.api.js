const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const _ = require('lodash');
const ejwt = require('express-jwt');
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
				//TODO: encrypt password
				let newUser = _.pick(req.body, 'first', 'last', 'email', 'password');
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
				if (!(user.password === req.body.password)) {
					return errors.errorHandler(
						res,
						'The username or password don\'t match.'
					);
				}
				req.user = user;
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

//all URLs starting with /protected will be safe when sending "Authorization: Bearer [token]" header
router.use('/protected', ejwt({ secret: config.secret }));
//catch any errors if the JWT is not valid
router.use((err, req, res) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send({
			success: false,
			error: 'UnauthorizedError'
		});
	}
});
router.post('/protected/getAll', (req, res) => {
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
