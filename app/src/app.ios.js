import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './viewscreens';
import { iconsMap, iconsLoaded } from './modules/utils/appIcons';

import configureStore from './store/configureStore';
import { checkAuthStatus } from './modules/auth/auth.service';

import { defaultNavigator, defaultTabs } from './viewscreens/style';

export const store = configureStore();
registerScreens(store, Provider);

const navigatorStyle = {
	navBarTranslucent: true,
	drawUnderNavBar: false,
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	statusBarTextColorScheme: 'light',
	drawUnderTabBar: false
};

class App extends Component {
	constructor(props) {
		super(props);
		//check logged in status before starting app...
		//dispatch action so thunk can be used to update state when login is successfull
		//mapStateToProps not working on this page as it's the root of the app
		store.dispatch(checkAuthStatus()).then(loggedIn => {
			if (loggedIn) {
				App.startAppLoggedIn();
			} else {
				App.startApp();
			}
		});
	}

	static startApp() {
		Navigation.startSingleScreenApp({
			screen: {
				screen: 'testapp.Home',
				title: 'Welcome',
				navigatorStyle: {
					...defaultNavigator,
					statusBarTextColorScheme: 'light'
				},
				navigatorButtons: {}
			},
			passProps: {},
			animationType: 'slide-down'
		});
	}

	static startAppLoggedIn() {
		Navigation.startTabBasedApp({
			tabs: [
				{
					label: 'Dashboard',
					screen: 'testapp.LoggedIn',
					title: 'Dashboard',
					navigatorStyle: defaultNavigator
				},
				{
					label: 'About',
					screen: 'testapp.About',
					title: 'About',
					navigatorStyle: defaultNavigator
				}
			],
			tabsStyle: defaultTabs,
			animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade'
		});
	}
}
export default App;
