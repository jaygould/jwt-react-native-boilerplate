// Actions
export const setLoginPending = () => {
	return {
		type: 'SET_LOGIN_PENDING'
	};
};
export const setLoginSuccess = (authToken, refreshToken) => {
	return {
		type: 'SET_LOGIN_SUCCESS',
		authToken,
		refreshToken
	};
};
export const setLoginError = loginError => {
	return {
		type: 'SET_LOGIN_ERROR',
		loginError
	};
};
export const setLogout = () => {
	return {
		type: 'SET_LOGOUT'
	};
};
export const saveAppToken = authToken => {
	return {
		type: 'SAVE_APP_TOKEN',
		authToken
	};
};
//Reducer
let initialState = {
	loginPending: false,
	loggedIn: false,
	loginError: false,
	authToken: null,
	refreshToken: null
};

export default function(state = initialState, action) {
	switch (action.type) {
	case 'SET_LOGIN_PENDING':
		return {
			...state,
			loginPending: true
		};
	case 'SET_LOGIN_SUCCESS':
		return {
			...state,
			loginPending: false,
			loggedIn: true,
			loginError: false,
			authToken: action.authToken,
			refreshToken: action.refreshToken
		};
	case 'SET_LOGIN_ERROR':
		return {
			...state,
			loginPending: false,
			loggedIn: false,
			loginError: action.loginError
		};
	case 'SET_LOGOUT':
		return {
			...state,
			authToken: false,
			refreshToken: false,
			loggedIn: false
		};
	case 'REFRESHING_TOKEN':
		return {
			...state,
			tokenRefreshing: true
		};
	case 'DONE_REFRESHING_TOKEN':
		return {
			...state,
			tokenRefreshing: false
		};
	case 'SAVE_APP_TOKEN':
		return {
			...state,
			authToken: action.authToken
		};
	default:
		return state;
	}
}
