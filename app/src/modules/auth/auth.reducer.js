// Actions
export const setAuthPending = () => {
	return {
		type: 'SET_AUTH_PENDING'
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
export const setRegisterSuccess = () => {
	return {
		type: 'SET_REGISTER_SUCCESS'
	};
};
export const setRegisterError = regError => {
	return {
		type: 'SET_REGISTER_ERROR',
		regError
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
	authPending: false,
	loggedIn: false,
	registered: false,
	loginError: false,
	regError: false,
	authToken: null,
	refreshToken: null,
	tokenIsValid: null,
	pendingRefreshingToken: null
};

export default function(state = initialState, action) {
	switch (action.type) {
	case 'SET_AUTH_PENDING':
		return {
			...state,
			authPending: true
		};
	case 'SET_LOGIN_SUCCESS':
		return {
			...state,
			authPending: false,
			loggedIn: true,
			loginError: false,
			authToken: action.authToken,
			refreshToken: action.refreshToken
		};
	case 'SET_LOGIN_ERROR':
		return {
			...state,
			authPending: false,
			loggedIn: false,
			loginError: action.loginError
		};
	case 'SET_REGISTER_SUCCESS':
		return {
			...state,
			authPending: false,
			regError: false,
			registered: true
		};
	case 'SET_REGISTER_ERROR':
		return {
			...state,
			authPending: false,
			regError: action.regError
		};
	case 'SET_LOGOUT':
		return {
			...state,
			authToken: false,
			refreshToken: false,
			loggedIn: false
		};
	case 'INVALID_TOKEN':
		return {
			...state,
			tokenIsValid: false
		};
	case 'REFRESHING_TOKEN':
		return {
			...state,
			pendingRefreshingToken: true,
			tokenIsValid: false
		};
	case 'TOKEN_REFRESHED':
		return {
			...state,
			pendingRefreshingToken: null,
			tokenIsValid: true
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
