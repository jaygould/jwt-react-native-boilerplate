import { Navigation } from 'react-native-navigation';

import Home from './modules/home/Home';
import Login from './modules/login/Login';

import LoggedIn from './modules/loggedIn/LoggedIn';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('testapp.Home', () => Home, store, Provider);
	Navigation.registerComponent('testapp.Login', () => Login, store, Provider);

	Navigation.registerComponent(
		'testapp.LoggedIn',
		() => LoggedIn,
		store,
		Provider
	);
}
