import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import AuthApi from './auth.api';
import { connectionErrorTimeout, asyncError } from './../errors/error.reducer';
import * as AuthReducer from './auth.reducer';
import App from './../../app';
import config from '../../config';

const _saveItem = async (item, selectedValue) => {
	try {
		await AsyncStorage.setItem(item, selectedValue);
	} catch (error) {
		throw error;
	}
};

export const refreshToken = (refreshToken, prevFailedRequest) => {
	return dispatch => {
		return AuthApi.refreshToken(refreshToken)
			.then(response => {
				if (response.success) {
					dispatch({
						type: 'DONE_REFRESHING_TOKEN'
					});
					dispatch(AuthReducer.saveAppToken(response.authToken));
					_saveItem('authToken', response.authToken)
						.then(resp => {
							prevFailedRequest();
							console.log('Refresh finished');
						})
						.catch(error => {
							dispatch(asyncError(error));
						});
					return response;
				} else {
					dispatch(connectionErrorTimeout());
				}
			})
			.catch(error => {
				dispatch(connectionErrorTimeout());
			});
	};
};

export const isTokenExpired = token => {
	var tokenExpiration = jwtDecode(token).exp;
	//if token will expire in the next 30 seconds...
	if (
		tokenExpiration &&
		moment.unix(tokenExpiration) - moment(Date.now()) < 30
	) {
		return true;
	}
};

//used to decide if user should be sent to login screen or be logged in on app load
//could be updated to check the validity of the token
export const checkAuthStatus = () => {
	return async dispatch => {
		try {
			const authToken = await AsyncStorage.getItem('authToken');
			const refreshToken = await AsyncStorage.getItem('refreshToken');
			if (authToken != null && refreshToken != null) {
				dispatch(AuthReducer.setLoginSuccess(authToken, refreshToken));
			}
			return authToken;
		} catch (error) {
			dispatch(asyncError(error));
		}
	};
};

export const logout = () => {
	return async dispatch => {
		dispatch(AuthReducer.setLogout());
		try {
			await AsyncStorage.removeItem('authToken');
			App.startApp();
		} catch (error) {
			dispatch(asyncError(error));
		}
	};
};

export const login = (email, password) => {
	return dispatch => {
		dispatch(AuthReducer.setLoginPending());
		return AuthApi.login(email, password)
			.then(response => {
				if (response.success) {
					dispatch(
						AuthReducer.setLoginSuccess(
							response.authToken,
							response.refreshToken
						)
					);
					_saveItem('authToken', response.authToken)
						.then(resp => {
							_saveItem('refreshToken', response.refreshToken)
								.then(resp => {
									App.startAppLoggedIn();
								})
								.catch(error => {
									dispatch(asyncError(error));
								});
						})
						.catch(error => {
							dispatch(asyncError(error));
						});
				} else {
					dispatch(AuthReducer.setLoginError(response.message));
				}
			})
			.catch(error => {
				dispatch(connectionErrorTimeout());
			});
	};
};

//test function on the login and logged in areas to show the JWT is working
export const checkAuthTest = () => {
	return async dispatch => {
		try {
			const token = await AsyncStorage.getItem('authToken');
			return AuthApi.checkAuthTest(token)
				.then(response => {
					if (response.success) {
						console.log('Success: ', response.message);
					} else {
						console.log('Error: ', response);
					}
				})
				.catch(error => {
					dispatch(connectionErrorTimeout());
				});
		} catch (error) {
			dispatch(asyncError(error));
		}
	};
};
