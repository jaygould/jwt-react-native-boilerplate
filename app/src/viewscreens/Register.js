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

import ErrorBar from '../viewcomponents/ErrorBar';
import { register } from '../modules/auth/auth.service';

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
			<View style={styles.container}>
				<ErrorBar />
				<FormLabel>First name</FormLabel>
				<Field name="first" component={renderInput} />
				<FormLabel>Last name</FormLabel>
				<Field name="last" component={renderInput} />
				<FormLabel>Email</FormLabel>
				<Field name="email" component={renderInput} />
				<FormLabel>Password</FormLabel>
				<Field name="password" component={renderPassword} />
				<FormValidationMessage containerStyle={styles.errorMessage}>
					{this.props.errorMessage}
				</FormValidationMessage>
				<Button
					onPress={handleSubmit(submitForm)}
					buttonStyle={styles.submitButton}
					textStyle={styles.submitButtonText}
					title={'Register'}
				/>
				{this.props.registered ? (
					<Text style={styles.loggedInDesc}>Register was successfull</Text>
				) : null}
			</View>
		);
	}
}

//must be rendered outside of the render method as this will cause it to re-render each time the props change
const renderInput = ({ input: { onChange, ...restInput } }) => {
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
