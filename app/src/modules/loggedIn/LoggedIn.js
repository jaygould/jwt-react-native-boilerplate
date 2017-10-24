import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { logout, checkAuthTest } from '../auth/auth.service';

import ErrorBar from './../errors/ErrorBar';

class LoggedIn extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={styles.container}>
				<ErrorBar />
				<Text>Welcome</Text>
				<Button
					onPress={this.props.logoutButton}
					// icon={{ name: 'vpn-key', size: 32, color: '#444' }}
					buttonStyle={styles.submitButton}
					textStyle={styles.submitButtonText}
					title={'Log out'}
				/>
				<Button
					onPress={this.props.checkAuthTest}
					// icon={{ name: 'vpn-key', size: 32, color: '#444' }}
					buttonStyle={styles.submitButton}
					textStyle={styles.submitButtonText}
					title={'Check restricted access'}
				/>
			</View>
		);
	}
}

function mapStateToProps(store) {
	return {};
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
	submitButton: {
		backgroundColor: '#ffffff',
		borderRadius: 10,
		marginTop: 20,
		borderWidth: 1,
		borderColor: '#666666'
	},
	submitButtonText: {
		textAlign: 'center',
		color: '#444'
	}
});
