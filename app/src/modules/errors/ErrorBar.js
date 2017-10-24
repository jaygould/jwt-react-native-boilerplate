import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

class ErrorBar extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let errorView = (
			<View style={styles.container}>
				<Text>
					{this.props.error || null}
				</Text>
			</View>
		);
		return this.props.error != null ? errorView : null;
	}
}

function mapStateToProps(store) {
	return {
		error: store.error.errorMessage
	};
}
function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBar);

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(52,52,52,0.3)',
		padding: 10
	}
});
