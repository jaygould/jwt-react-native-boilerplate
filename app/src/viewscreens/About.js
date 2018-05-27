import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import { logout, checkAuthTest } from '../modules/auth/auth.service';

import ErrorBar from '../viewcomponents/ErrorBar';

import { globalStyle } from './style';

class About extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<LinearGradient
				colors={['#3A1C71', '#D76D77', '#FFAF7B']}
				style={styles.container}
			>
				<ErrorBar />
				<View style={styles.textWrap}>
					<Text style={styles.text}>
						This app runs on React Native, with Redux handling local state
						across the application for authentication. The authentication is
						based around JSON Web Tokens (JWT's) which are created on a server.
					</Text>
					<Text style={styles.text}>
						The server runs on Node JS with a MongoDB/Mongoose database. The app
						can register people to this database, and allow them to log in using
						their credentials.
					</Text>
					<Text style={styles.text}>
						The JWT's keep the user logged in for a number of seconds until the
						auth token expires. If the auth token has expired, the app will save
						the failed request in a local buffer, and ask the server for a new
						auth token by sending a refresh token for authorization. If the
						refresh token is valid, the new auth token is sent back, and the
						initial buffered request is fired again.
					</Text>
				</View>
			</LinearGradient>
		);
	}
}

function mapStateToProps(store) {
	return {};
}
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(About);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textWrap: {
		padding: 20
	},
	text: {
		backgroundColor: 'rgba(0,0,0,0)',
		color: '#fff',
		marginTop: 10
	}
});
