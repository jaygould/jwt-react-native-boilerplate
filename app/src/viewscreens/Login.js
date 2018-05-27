import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import LinearGradient from 'react-native-linear-gradient';
import { Input, Button } from 'react-native-elements';

import ErrorBar from '../viewcomponents/ErrorBar';
import { login, checkAuthTest } from '../modules/auth/auth.service';

import { globalStyle, defaultNavigator } from './style';

class Login extends Component {
	constructor(props) {
		super(props);
		this.goToRegister = this.goToRegister.bind(this);
	}

	render() {
		const { handleSubmit } = this.props;
		const submitForm = e => {
			this.props.login(e.email, e.password);
		};

		return (
			<LinearGradient
				colors={['#3A1C71', '#D76D77', '#FFAF7B']}
				style={styles.container}
			>
				<ErrorBar />
				<Field name="email" component={renderEmail} />
				<Field name="password" component={renderPassword} />

				<View style={styles.errorMessage}>
					<Text>{this.props.errorMessage}</Text>
				</View>

				<View style={styles.authBtnWrap}>
					<Button
						onPress={handleSubmit(submitForm)}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title="Log in"
					/>
					<Button
						onPress={this.goToRegister}
						buttonStyle={[globalStyle.btn, styles.authBtn]}
						titleStyle={globalStyle.btnText}
						title={'Create account'}
					/>
				</View>

				{this.props.loggedIn ? (
					<Text style={styles.loggedInDesc}>
						You are logged in with token: {this.props.authToken}
					</Text>
				) : null}
				<Button
					onPress={this.props.checkAuthTest}
					buttonStyle={[globalStyle.btn, styles.accessBtn]}
					titleStyle={globalStyle.btnText}
					title={'Check restricted access'}
				/>
			</LinearGradient>
		);
	}
	goToRegister() {
		this.props.navigator.push({
			screen: 'testapp.Register',
			title: 'Register',
			passProps: {},
			animated: true,
			backButtonHidden: false,
			navigatorStyle: defaultNavigator,
			navigatorButtons: {}
		});
	}
}

//must be rendered outside of the render method - from Redux Form docs
const renderEmail = ({ input: { onChange, ...restInput } }) => {
	return (
		<Input
			placeholder="Email"
			inputContainerStyle={styles.input}
			inputStyle={styles.placeholder}
			onChangeText={onChange}
			{...restInput}
		/>
	);
};
const renderPassword = ({ input: { onChange, ...restInput } }) => {
	return (
		<Input
			placeholder="Password"
			name="password"
			inputContainerStyle={styles.input}
			inputStyle={styles.placeholder}
			onChangeText={onChange}
			secureTextEntry={true}
			{...restInput}
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
		alignItems: 'center',
		padding: 10
	},
	input: {
		backgroundColor: '#ffffff',
		borderBottomWidth: 0,
		marginBottom: 10,
		borderRadius: 2,
		paddingVertical: 5,
		width: '100%'
	},
	placeholder: {
		fontSize: 12
	},
	errorMessage: {
		marginTop: 40
	},
	loggedInDesc: {
		marginTop: 40
	},
	authBtnWrap: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		paddingHorizontal: 15
	},
	authBtn: {
		marginHorizontal: 0,
		marginVertical: 18,
		width: '80%',
		alignSelf: 'center'
	},
	accessBtn: {
		marginHorizontal: 0,
		marginVertical: 30,
		width: '100%',
		alignSelf: 'center'
	}
});
