import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../modules/auth/auth.reducer';
import error from '../modules/errors/error.reducer';

const rootReducer = combineReducers({
	auth,
	error,
	form: formReducer
});

export default rootReducer;
