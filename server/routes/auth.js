const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const ejwt = require('express-jwt');
const config = require('../config');

let createToken = (req, res, next) => {
	req.authToken = jwt.sign(_.omit(req.user, 'password'), config.secret, {
		expiresIn: '1m'
	});
	next();
};
let createRefreshToken = (req, res, next) => {
	var db = req.db;
	//if refresh token doesnt exist already. It won't exist when signing up abviously, but when the user logs in they should have one already in the DB. This just adds one in if they haven't (testing mainly). It doesn't always need to be in the /login endpoint route
	if (!req.user.refreshToken) {
		req.refreshToken = jwt.sign({ type: 'refresh' }, config.secret, {
			expiresIn: 60 * 60 * 24 * 90
		});
		db
			.collection('users')
			.update(
				{ email: req.user.email },
				{ $set: { refreshToken: req.refreshToken } },
				err => {
					if (err) {
						return res.status(400).send({
							success: false,
							message: err
						});
					}
					next();
				}
			);
	} else {
		req.refreshToken = req.user.refreshToken;
		next();
	}
};
let validateRefreshToken = (req, res, next) => {
	var db = req.db;
	if (req.body.refreshToken != '') {
		db
			.collection('users')
			.findOne({ refreshToken: req.body.refreshToken }, (err, user) => {
				if (err) {
					return res.status(400).send({
						success: false,
						message: err
					});
				}
				req.user = user;
				next();
			});
	} else {
		return res.status(400).send({
			success: false,
			message: 'There is no refresh token to check'
		});
	}
};

router.post(
	'/signup',
	(req, res, next) => {
		var db = req.db;
		if (!req.body.email || !req.body.password) {
			return res.status(400).send({
				success: false,
				message: 'You must send the username and the password'
			});
		}
		db.collection('users').findOne({ email: req.body.email }, (err, user) => {
			if (user) {
				return res.status(400).send({
					success: false,
					message: 'A user with that username already exists'
				});
			}
			var profile = _.pick(req.body, 'email', 'company', 'userLevel');
			db.collection('users').insert(profile, err => {
				if (err) {
					return res.status(400).send({
						success: false,
						message: err
					});
				}
				req.user = profile;
				next();
			});
		});
	},
	createToken,
	createRefreshToken,
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
		var db = req.db;
		db
			.collection('users')
			.find()
			.toArray((err, results) => {
				if (!req.body.email || !req.body.password) {
					return res.status(400).send({
						success: false,
						message: 'You must send the username and the password'
					});
				}
				var user = _.find(results, { email: req.body.email });
				if (!user) {
					return res.status(401).send({
						success: false,
						message: 'The username or password don\'t match'
					});
				}
				if (!(user.password === req.body.password)) {
					return res.status(401).send({
						success: false,
						message: 'The username or password don\'t match'
					});
				}
				req.user = user;
				next();
			});
	},
	createToken,
	createRefreshToken,
	(req, res) => {
		res.status(201).send({
			success: true,
			authToken: req.authToken,
			refreshToken: req.refreshToken
		});
	}
);

router.post('/refreshToken', validateRefreshToken, createToken, (req, res) => {
	res.status(201).send({
		success: true,
		authToken: req.authToken
	});
});

//all URLs starting with /protected will be safe when sending "Authorization: Bearer [token]" header
router.use('/protected', ejwt({ secret: config.secret }));
//catch any errors if the JWT is not valid
router.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send({
			success: false,
			error: 'UnauthorizedError'
		});
	}
});
router.post('/protected/getAll', (req, res) => {
	var db = req.db;
	db
		.collection('users')
		.find({})
		.toArray((err, users) => {
			res.status(201).send({
				success: true,
				message: users
			});
		});
});
module.exports = router;
