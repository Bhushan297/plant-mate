import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { Layout, Input, Text, Button, Icon, Card } from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import useAuth from '../hooks/useAuth';

const LoginForm = ({ authNavigation }) => {
	const [username, setName] = useState('');
	const [password, setPassword] = useState('');
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);
	const [loginApi] = useAuth();

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const callApi = async () => {
		const resultApi = await loginApi(username, password);
		if (resultApi) {
			await SecureStore.setItemAsync('loggedIn', 'true');
			await SecureStore.setItemAsync('username', username);
			authNavigation.replace('Tabs');
		}
	};

	const eyeIcon = (props) => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
		</TouchableWithoutFeedback>
	);

	const AlertIcon = (props) => (
		<Icon {...props} name="alert-circle-outline" />
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
							caption={'Should contain at least 8 characters'}
							captionIcon={AlertIcon}
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
							Log in
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
});

export default LoginForm;
