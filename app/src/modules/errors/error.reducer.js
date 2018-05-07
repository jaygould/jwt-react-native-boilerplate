// Actions
export const connectionError = error => {
	return {
		type: 'CONNECTION_ERROR',
		error
	};
};
export const showError = error => {
	return {
		type: 'SHOW_ERROR',
		error
	};
};
export const removeError = () => {
	return {
		type: 'REMOVE_ERROR'
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
	case 'SHOW_ERROR':
		return {
			...state,
			error: true,
			errorMessage: action.error
		};
	case 'REMOVE_ERROR':
		return {
			...state,
			error: false,
			errorMessage: null
		};

	default:
		return state;
	}
}
