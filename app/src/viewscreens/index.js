import { Navigation } from 'react-native-navigation';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import LoggedIn from './LoggedIn';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('testapp.Home', () => Home, store, Provider);
	Navigation.registerComponent(
		'testapp.Register',
		() => Register,
		store,
		Provider
	);
	Navigation.registerComponent('testapp.Login', () => Login, store, Provider);

	Navigation.registerComponent(
		'testapp.LoggedIn',
		() => LoggedIn,
		store,
		Provider
	);
}
