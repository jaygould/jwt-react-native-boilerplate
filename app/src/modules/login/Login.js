import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
	Button,
	Icons,
	FormLabel,
	FormInput,
	FormValidationMessage
} from 'react-native-elements';

import ErrorBar from './../errors/ErrorBar';
import { login, checkAuthTest } from '../auth/auth.service';

class Login extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { handleSubmit } = this.props;
		const submitForm = e => {
			this.props.login(e.email, e.password);
		};

		return (
			<View style={styles.container}>
				<ErrorBar />
				<FormLabel>Email</FormLabel>
				<Field name="email" component={renderEmail} />
				<FormLabel>Password</FormLabel>
				<Field name="password" component={renderPassword} />
				<FormValidationMessage containerStyle={styles.errorMessage}>
					{this.props.errorMessage}
				</FormValidationMessage>
				<Button
					onPress={handleSubmit(submitForm)}
					// icon={{ name: 'vpn-key', size: 32, color: '#444' }}
					buttonStyle={styles.submitButton}
					textStyle={styles.submitButtonText}
					title={'Log in'}
				/>

				{this.props.loggedIn ? (
					<Text style={styles.loggedInDesc}>
						You are logged in with token: {this.props.authToken}
					</Text>
				) : null}
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

//must be rendered outside of the render method as this will cause it to re-render each time the props change
const renderEmail = ({ input: { onChange, ...restInput } }) => {
	return (
		<FormInput
			containerStyle={styles.input}
			onChangeText={onChange}
			{...restInput}
		/>
	);
};
const renderPassword = ({ input: { onChange, ...restInput } }) => {
	return (
		<FormInput
			containerStyle={styles.input}
			onChangeText={onChange}
			{...restInput}
			secureTextEntry={true}
		/>
	);
};

function mapStateToProps(store, ownProps) {
	return {
		errorMessage: store.auth.loginError,
		loggedIn: store.auth.loggedIn,
		authToken: store.auth.authToken
	};
}
function mapDispatchToProps(dispatch) {
	return {
		login: (email, password) => {
			dispatch(login(email, password));
		},
		checkAuthTest: () => {
			dispatch(checkAuthTest());
		}
	};
}
let LoginConnect = connect(mapStateToProps, mapDispatchToProps)(Login);
export default reduxForm({
	form: 'loginForm'
})(LoginConnect);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		width: '75%',
		height: 40
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
	},
	errorMessage: {
		marginTop: 40
	},
	loggedInDesc: {
		marginTop: 40
	}
});
