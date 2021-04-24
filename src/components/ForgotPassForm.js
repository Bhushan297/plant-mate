import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	View, 
	ScrollView,
	Modal, 
	ToastAndroid,
	StatusBar
} from 'react-native';
import {
	Layout,
	Input,
	Text,
	Button,
	Icon,
    Card,
	Spinner,
} from '@ui-kitten/components';
import {forgotApi} from '../hooks/useAuth';
import FadeinView from '../components/FadeinView';

const ForgotPassForm = ({authNavigation}) => {
	const [username, setUname] = useState('');
	const [answer1, setAns1] = useState('');
	const [answer2, setAns2] = useState('');
	const [password, setPassword] = useState('');
	const [conPassword, setConPassword] = useState('');
	const [passwordLenErr, setPasswordLenErr] = useState('basic');
	const [passwordErr, setPasswordErr] = useState('basic');
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
		if(username && password && answer1 && answer2 == null || ''){
			openModal();
		}
		else{
			setWaiting(true)
			const resultApi = await forgotApi(username, password, answer1, answer2);
			if (resultApi) {
				ToastAndroid.show("Password Successfully Updated!", ToastAndroid.SHORT)
				authNavigation.replace('Login');
			}
			else{
				setWaiting(false)
				openModal();
			}
		}
		
	};

	const eyeIcon = (props) => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
		</TouchableWithoutFeedback>
	);

	const AlertIcon = (props) => (
		<Icon {...props} name='alert-circle-outline'/>
	);

    const cardHeader = () => (
        <Text style={styles.title}>Forgot Password</Text>
    )

	const validatePasswordLength = (pass) =>{
		setPassword(pass);
		if(pass.length < 8){
			setPasswordLenErr('danger')
		}
		else{
			setPasswordLenErr('success')
		}
	}

	const validatePassword = (newConPass) => {
		setConPassword(newConPass);
		if(newConPass === password){
			setPasswordErr('success');
		}
		else{
			setPasswordErr('danger');
		}
	}

	return (
		<Layout style={{ flex: 1, backgroundColor: '#CBF6E0' }}>
			<View>
				<StatusBar barStyle="dark-content" backgroundColor="#CBF6E0" />
				<ScrollView>
					<Card style={styles.container} header={cardHeader}>
						<Input
							style={styles.inputElements}
							value={username}
							size={'large'}
							label="Username"
							placeholder={'Enter username'}
							onChangeText={(newUname) => setUname(newUname)}
						/>

						<Input
							style={styles.inputElements}
							value={answer1}
							size={'large'}
							label="What is your mothers maiden name?"
							placeholder={'Enter Answer 1'}
							onChangeText={(newAns1) => setAns1(newAns1)}
						/>

						<Input
							style={styles.inputElements}
							value={answer2}
							size={'large'}
							label="Which year did you graduate?"
							placeholder={'Enter Answer 2'}
							onChangeText={(newAns2) => setAns2(newAns2)}
						/>

						<Input
							style={styles.inputElements}
							value={password}
							size={'large'}
							label="New Password"
							placeholder={'Enter new password'}
							onChangeText={(pass) =>
								validatePasswordLength(pass)
							}
							accessoryRight={eyeIcon}
							secureTextEntry={secureTextEntry}
							status={passwordLenErr}
							caption={'Should contain at least 8 characters'}
							captionIcon={AlertIcon}
						/>
						<Input
							style={styles.inputElements}
							value={conPassword}
							size={'large'}
							label="Confirm Password"
							placeholder={'Re-enter password'}
							onChangeText={(conPass) =>
								validatePassword(conPass)
							}
							secureTextEntry={true}
							status={passwordErr}
						/>
						<Button
							style={styles.inputElements}
							onPress={() => callApi()}
						>
							{waiting ? (
								<Spinner status="basic" />
							) : (
								'Reset Password'
							)}
						</Button>
					</Card>
				</ScrollView>
			</View>
			<Modal visible={visible} animationType={'slide'} transparent={true}>
				<FadeinView style={styles.backdrop}>
					<Card style={{ elevation: 5 }} disabled={true}>
						<Text category="s1">
							Invalid entry, Please try filling the form again.
						</Text>
						<Button
							style={styles.buttonStyle}
							status="danger"
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
        flex: 1,
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
	tinyLogo: {
        flex: 2,
		width: 200,
		height: 150,
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

export default ForgotPassForm;