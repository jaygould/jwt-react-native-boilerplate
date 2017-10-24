import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import { Button, Icons } from 'react-native-elements';

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
			animationType: 'fade',
			backButtonHidden: false,
			navigatorStyle: {},
			navigatorButtons: {}
		});
	}

	render() {
		return (
			<View style={styles.homeContainer}>
				<Image source={require('../../img/title.png')} style={styles.logo} />
				<Button
					onPress={this.goToLoginPage}
					//icon={{ name: 'account-box', size: 32, color: '#fff' }}
					buttonStyle={styles.btn}
					textStyle={styles.btnText}
					title={'Enter'}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	logo: {
		marginBottom: 100
	},
	homeContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 30
	},
	btn: {
		backgroundColor: '#2073d4',
		borderRadius: 30,
		marginTop: 20,
		padding: 20,
		width: '100%'
	},
	btnText: {
		textAlign: 'center',
		fontSize: 14
	}
});
function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
