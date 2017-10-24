import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import { jwt } from './middleware';

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		applyMiddleware(jwt, thunk, logger)
	);
}
