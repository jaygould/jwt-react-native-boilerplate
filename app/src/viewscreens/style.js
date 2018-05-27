import { StyleSheet } from 'react-native';

export const defaultNavigator = {
	drawUnderNavBar: true,
	navBarTranslucent: true,
	navBarTransparent: true,
	navBarTextColor: '#ffffff', // change the text color of the title (remembered across pushes)
	navBarButtonColor: '#fff', // Change color of nav bar buttons (eg. the back button) (remembered across pushes)
	navBarHidden: false, // make the nav bar hidden
	statusBarTextColorScheme: 'light'
};

export const defaultTabs = {
	tabBarButtonColor: 'white',
	tabBarSelectedButtonColor: 'rgb(171, 171, 171)',
	tabBarBackgroundColor: 'black'
};

export const globalStyle = StyleSheet.create({
	btn: {
		backgroundColor: 'rgba(0,0,0,0)',
		borderRadius: 2,
		borderColor: '#fff',
		borderWidth: 1,
		padding: 10
	},
	btnText: {
		textAlign: 'center',
		fontSize: 14
	}
});
