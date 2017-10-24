import { isTokenExpired, refreshToken } from '../modules/auth/auth.service';
import * as AuthReducer from '../modules/auth/auth.reducer';

//https://stackoverflow.com/questions/36948557/how-to-use-redux-to-refresh-jwt-token/36986329?noredirect=1#comment77189237_36986329

//on each async dispatch, It checks the authToken expiration, and if it's about to expire
//it will send a request to the server to refresh the authToken using the refreshToken
//in the remote DB and save the new authToken locally again. It does this automatically
//each time the local authToken expires.

//TO DO - THE INTIIAL REQUEST DOESNT WORK SO IT NEEDS TO BE QUEUED
export const jwt = store => next => action => {
	if (typeof action === 'function') {
		var theState = store.getState();
		if (
			theState.auth &&
			theState.auth.authToken &&
			isTokenExpired(theState.auth.authToken)
		) {
			if (!theState.auth.tokenRefreshing) {
				//this must go here and not inside the refreshing token function because it will cause an infinite loop in there because
				//the function will execute inside this look before it's marked at currently refreshing
				store.dispatch({ type: 'REFRESHING_TOKEN' });
				store.dispatch(refreshToken(theState.auth.refreshToken));
			} else {
				//queue up async functions?
				//if async functions happen whilst the token is being refreshed, they may not go through.
				//the token ius set to refresh xxx seconds before it expires so it may be ok, but if it doesn't
				//refresh in time, it will return a 401, and need to write something to handle that.
				//also add global 401 error check wiht interceptor?
				// /https://stackoverflow.com/questions/41796592/how-to-handle-401-errors-in-a-redux-react-application
			}
		}
	}
	return next(action);
};
