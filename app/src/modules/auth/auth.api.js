import config from '../../config';
import { handleErrors } from './errors.api';

class AuthApi {
	static login(email, password) {
		return fetch(`${config.url}/api/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ email: email, password: password }),
			headers: config.configHeaders
		})
			.then(response => response.json())
			.then(handleErrors)
			.catch(error => {
				throw error;
			});
	}
	static refreshToken(refreshToken) {
		return fetch(`${config.url}/api/auth/refreshToken`, {
			method: 'POST',
			body: JSON.stringify({ refreshToken: refreshToken }),
			headers: config.configHeaders
		})
			.then(response => response.json())
			.then(handleErrors)
			.catch(error => {
				throw error;
			});
	}
	static checkAuthTest(token) {
		return fetch(`${config.url}/api/auth/getAll`, {
			method: 'POST',
			headers: {
				...config.configHeaders,
				Authorization: 'Bearer ' + token
			}
		})
			.then(response => response.json())
			.then(handleErrors)
			.catch(error => {
				throw error;
			});
	}
}
export default AuthApi;
