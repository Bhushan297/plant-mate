import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	SafeAreaView,
	ScrollView,
	Modal, 
	ToastAndroid,
} from 'react-native';
import { Layout, Input, Text, Button, Icon, Card, Spinner } from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import {loginApi} from '../hooks/useAuth';
import FadeinView from '../components/FadeinView';

const LoginForm = ({ authNavigation }) => {
	const [username, setName] = useState('');
	const [password, setPassword] = useState('');
	const [waiting, setWaiting] = useState(false);
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);
	const [visible, setVisible] = useState(false);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const openModal = () => {
		setVisible(true);
	};

	const callApi = async () => {
		setWaiting(true)
		const resultApi = await loginApi(username, password);
		if (resultApi) {
			ToastAndroid.show("Logged In Successfully!", ToastAndroid.SHORT)
			await SecureStore.setItemAsync('loggedIn', 'true');
			await SecureStore.setItemAsync('username', username);
			authNavigation.replace('Tabs');
		}
		else{
			setWaiting(false)
			openModal();
		}
	};

	const eyeIcon = (props) => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
		</TouchableWithoutFeedback>
	);

	const cardHeader = () => <Text style={styles.title}>Login</Text>;

	return (
		<Layout style={{ flex: 1, backgroundColor: '#CBF6E0' }}>
			<SafeAreaView>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Image
						style={styles.tinyLogo}
						source={require('./../../assets/logo.png')}
					/>
					<Card style={styles.container} header={cardHeader}>
						<Input
							style={styles.inputElements}
							value={username}
							size={'large'}
							label="Username"
							placeholder={'Enter username'}
							autoCapitalize="none"
							onChangeText={(newName) => setName(newName)}
						/>
						<Input
							style={styles.inputElements}
							value={password}
							size={'large'}
							label="Password"
							placeholder={'Enter password'}
							onChangeText={(pass) => setPassword(pass)}
							accessoryRight={eyeIcon}
							secureTextEntry={secureTextEntry}
						/>
						<TouchableWithoutFeedback
							onPress={() =>
								authNavigation.navigate('ForgotPass')
							}
						>
							<Text style={styles.ghostButton}>
								Forgot password?
							</Text>
						</TouchableWithoutFeedback>
						<Button
							style={styles.inputElements}
							onPress={() => callApi()}
						>
							{ waiting ? <Spinner status='basic'/> : "Login"}
						</Button>
						<TouchableWithoutFeedback
							onPress={() => authNavigation.navigate('Register')}
						>
							<Text style={styles.ghostButton}>
								Not a member? Sign Up
							</Text>
						</TouchableWithoutFeedback>
					</Card>
				</ScrollView>
			</SafeAreaView>
			<Modal
				visible={visible}
				animationType={'slide'}
				transparent={true}
			>
				<FadeinView style={styles.backdrop}>
					<Card style={{ elevation: 5 }} disabled={true}>
						<Text category="s1">
							Username or Password incorrect.
						</Text>
						<Button 
							style={styles.buttonStyle}
							status='danger' 
							onPress={() => setVisible(false)}
						>
							Dismiss
						</Button>
					</Card>
				</FadeinView>
			</Modal>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 15,
		justifyContent: 'center',
	},
	inputElements: {
		marginTop: 20,
	},
	title: {
		alignSelf: 'center',
		fontSize: 18,
		fontFamily: 'Montserrat-Bold',
		marginVertical: 10,
		color: '#111344',
	},
	ghostButton: {
		alignSelf: 'center',
		fontWeight: 'bold',
		color: '#22BF6E',
		marginTop: 5,
	},
	tinyLogo: {
		width: 250,
		height: 250,
		alignSelf: 'center',
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15
	},
	buttonStyle: {
		marginVertical: 5
	},
});

export default LoginForm;
