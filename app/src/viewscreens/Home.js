import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';

import { globalStyle, defaultNavigator } from './style';

class Home extends Component {
	constructor(props) {
		super(props);
		this.goToLoginPage = this.goToLoginPage.bind(this);
	}

	goToLoginPage() {
		this.props.navigator.push({
			screen: 'testapp.Login',
			title: 'Login',
			passProps: {},
			animated: true,
			backButtonHidden: false,
			navigatorStyle: defaultNavigator,
			navigatorButtons: {}
		});
	}

	render() {
		return (
			<LinearGradient
				colors={['#3A1C71', '#D76D77', '#FFAF7B']}
				style={styles.homeContainer}
			>
				<StatusBar barStyle="light-content" />
				<Text style={styles.welcomeText}>
					JWT authentication boilerplate with Redux
				</Text>
				<Button
					onPress={this.goToLoginPage}
					buttonStyle={[globalStyle.btn, styles.welcomeBtn]}
					titleStyle={globalStyle.btnText}
					title="Enter"
				/>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 30
	},
	welcomeText: {
		fontFamily: 'Norwester',
		backgroundColor: 'rgba(0,0,0,0)',
		color: '#fff',
		fontSize: 30,
		textAlign: 'center'
	},
	welcomeBtn: {
		marginTop: 30,
		width: '100%'
	}
});
function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
