import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Input, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import ErrorBar from '../viewcomponents/ErrorBar';
import { register } from '../modules/auth/auth.service';

import { globalStyle, defaultNavigator } from './style';

class Register extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { handleSubmit } = this.props;
		const submitForm = e => {
			this.props.register(e.first, e.last, e.email, e.password);
		};

		return (
			<LinearGradient
				colors={['#3A1C71', '#D76D77', '#FFAF7B']}
				style={styles.container}
			>
				<ErrorBar />

				<Field name="first" placeholder="First name" component={renderInput} />
				<Field name="last" placeholder="Last name" component={renderInput} />
				<Field name="email" placeholder="Email" component={renderInput} />
				<Field
					name="password"
					placeholder="Password"
					component={renderPassword}
				/>
				<View style={styles.errorMessage}>
					<Text>{this.props.errorMessage}</Text>
				</View>

				<Button
					onPress={handleSubmit(submitForm)}
					buttonStyle={[globalStyle.btn]}
					titleStyle={globalStyle.btnText}
					title={'Register'}
				/>
				{this.props.registered ? (
					<Text style={styles.loggedInDesc}>Register was successfull</Text>
				) : null}
			</LinearGradient>
		);
	}
}

//must be rendered outside of the render method as this will cause it to re-render each time the props change
const renderInput = ({ input: { onChange, ...restInput }, placeholder }) => {
	console.log(placeholder);
	return (
		<Input
			inputContainerStyle={styles.input}
			inputStyle={styles.placeholder}
			onChangeText={onChange}
			placeholder={placeholder}
			{...restInput}
		/>
	);
};
const renderPassword = ({ input: { onChange, ...restInput }, placeholder }) => {
	return (
		<Input
			inputContainerStyle={styles.input}
			inputStyle={styles.placeholder}
			onChangeText={onChange}
			placeholder={placeholder}
			{...restInput}
			secureTextEntry={true}
		/>
	);
};

function mapStateToProps(store, ownProps) {
	return {
		errorMessage: store.auth.regError,
		registered: store.auth.registered,
		authToken: store.auth.authToken
	};
}
function mapDispatchToProps(dispatch) {
	return {
		register: (first, last, email, password) => {
			dispatch(register(first, last, email, password));
		}
	};
}
let RegisterConnect = connect(mapStateToProps, mapDispatchToProps)(Register);
export default reduxForm({
	form: 'registerForm'
})(RegisterConnect);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
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
