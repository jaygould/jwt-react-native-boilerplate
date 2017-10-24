import Config from 'react-native-config';
export default {
	url: Config.API_URL,
	configHeaders: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
};
