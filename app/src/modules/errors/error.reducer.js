//Action creator
export const connectionErrorTimeout = () => {
	return dispatch => {
		dispatch(connectionError());
		return setTimeout(() => {
			dispatch(removeConnectionError());
		}, 3000);
	};
};

// Actions
export const connectionError = () => {
	return {
		type: 'CONNECTION_ERROR',
		error: 'There seems to be a problem reaching the server. Please try later.'
	};
};
export const removeConnectionError = () => {
	return {
		type: 'REMOVE_CONNECTION_ERROR'
	};
};
export const asyncError = error => {
	return {
		type: 'ASYNC_ERROR',
		error
	};
};

//Reducer
let initialState = {
	error: false,
	errorMessage: null
};

export default function(state = initialState, action) {
	switch (action.type) {
	case 'CONNECTION_ERROR':
		return {
			...state,
			error: true,
			errorMessage: action.error
		};
	case 'REMOVE_CONNECTION_ERROR':
		return {
			...state,
			error: false,
			errorMessage: null
		};
	case 'ASYNC_ERROR':
		return {
			...state,
			error: true,
			errorMessage: action.error
		};
	default:
		return state;
	}
}
