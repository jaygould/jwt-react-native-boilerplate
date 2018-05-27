import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { logout, checkAuthTest } from '../modules/auth/auth.service';

import ErrorBar from '../viewcomponents/ErrorBar';

import { globalStyle } from './style';

class LoggedIn extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<LinearGradient
				colors={['#3A1C71', '#D76D77', '#FFAF7B']}
				style={styles.container}
			>
				<StatusBar barStyle="light-content" />

				<ErrorBar />
				{this.props.loggedIn ? (
					<Text style={styles.loggedInDesc}>
						You are logged in with token: {this.props.authToken}
					</Text>
				) : null}
				<View>
					<Button
						onPress={this.props.logoutButton}
						buttonStyle={[globalStyle.btn, styles.loggedInBtn]}
						titleStyle={globalStyle.btnText}
						title={'Log out'}
					/>
					<Button
						onPress={this.props.checkAuthTest}
						buttonStyle={[globalStyle.btn, styles.loggedInBtn]}
						titleStyle={globalStyle.btnText}
						title={'Check restricted access'}
					/>
				</View>
			</LinearGradient>
		);
	}
}

function mapStateToProps(store) {
	return {
		loggedIn: store.auth.loggedIn,
		authToken: store.auth.authToken
	};
}
function mapDispatchToProps(dispatch) {
	return {
		logoutButton: () => {
			dispatch(logout());
		},
		checkAuthTest: () => {
			dispatch(checkAuthTest());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loggedInDesc: {
		margin: 10,
		fontSize: 11,
		padding: 20,
		color: '#444',
		marginTop: 30
	},
	loggedInBtn: {
		width: '100%',
		marginTop: 20
	}
});
