const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/auth.js');
const Users = require('../models/Users');
const LoginActivity = require('../models/LoginActivity');

let registerUser = (first, last, email, password) => {
	return new Promise((res, rej) => {
		if (!first || !last || !email || !password) {
			return rej('You must send all details.');
		}
		return Users.find({ email: email })
			.then(user => {
				if (user.length > 0) {
					return rej('A user with that username already exists.');
				}
				let passwordHash = bcrypt.hashSync(password.trim(), 12);
				let newUser = { first, last, email };
				newUser.password = passwordHash;
				res(Users.create(newUser));
			})
			.catch(err => {
				rej(err);
			});
	});
};

let loginUser = (email, password) => {
	return new Promise((res1, rej1) => {
		if (!email || !password) {
			return rej1('You must send the username and the password.');
		}
		return Users.findOne({ email: email })
			.then(user => {
				if (!user) return rej1('No matching user.');
				return new Promise((res2, rej2) => {
					bcrypt.compare(password, user.password, (err, success) => {
						if (err) {
							return rej2(
								'The has been an unexpected error, please try again later'
							);
						}
						if (!success) {
							return rej2('Your password is incorrect.');
						} else {
							res1(user);
						}
					});
				});
			})
			.catch(err => {
				rej1(err);
			});
	});
};

let createToken = user => {
	return jwt.sign(_.omit(user.toObject(), 'password'), config.secret, {
		expiresIn: '10s' //lower value for testing
	});
};

let createRefreshToken = user => {
	//It doesn't always need to be in the /login endpoint route
	let refreshToken = jwt.sign({ type: 'refresh' }, config.secret, {
		expiresIn: '20s' // 1 hour
	});
	return Users.findOneAndUpdate(
		{ email: user.email },
		{ refreshToken: refreshToken }
	)
		.then(() => {
			return refreshToken;
		})
		.catch(err => {
			throw err;
		});
};

let validateRefreshToken = refreshToken => {
	if (refreshToken != '') {
		return new Promise((res, rej) => {
			jwt.verify(refreshToken, config.secret, err => {
				if (err) {
					rej({
						code: 'refreshExpired',
						message: 'Refresh token expired - session ended.'
					});
				} else {
					Users.findOne({ refreshToken: refreshToken })
						.then(user => {
							res(user);
						})
						.catch(err => {
							rej(err);
						});
				}
			});
		});
	} else {
		throw 'There is no refresh token to check.';
	}
};

let logUserActivity = (user, activity) => {
	return LoginActivity.create({ userID: user.id, activityType: activity });
};

module.exports = {
	registerUser,
	loginUser,
	createToken,
	createRefreshToken,
	validateRefreshToken,
	logUserActivity
};
