import { store } from '../../app';

export const handleErrors = response => {
	if (!response.success) {
		if (response.code && response.code === 'invalidToken') {
			store.dispatch({ type: 'INVALID_TOKEN' });
		} else {
			throw Error(response.message);
		}
	}
	return response;
};
