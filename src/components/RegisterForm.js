import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	SafeAreaView, 
	ScrollView,
} from 'react-native';
import {
	Layout,
	Input,
	Text,
	Button,
	Icon,
    Card
} from '@ui-kitten/components';

const RegisterForm = ({navigation}) => {
	const [name, setName] = useState('');
	const [place, setPlace] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [conPassword, setConPassword] = useState('');
	const [emailErr, setEmailErr] = useState('basic');
	const [passwordErr, setPasswordErr] = useState('basic');
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const eyeIcon = (props) => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
		</TouchableWithoutFeedback>
	);

	const AlertIcon = (props) => (
		<Icon {...props} name='alert-circle-outline'/>
	);

    const labelStyle = (name) => (
        <Text style={styles.label} category='h6'>{name}</Text>
    )

    const cardHeader = () => (
        <Text style={styles.title}>Register</Text>
    )

	const validateEmail = (newEmail) => {
		setEmail(newEmail);
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(String(newEmail).toLowerCase())){
			setEmailErr('success');
		}
		else{
			setEmailErr('danger');
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
		<Layout style={{ flex: 1, backgroundColor: "#CBF6E0" }}>
			<SafeAreaView>
				<ScrollView>
					<Card 
						style={styles.container}
						header={cardHeader}
					>
						<Input
							style={styles.inputElements}
							value={name}
							size={'large'}
							label="Name"
							placeholder={'Enter name'}
							onChangeText={(newName) => setName(newName)}
						/>
                        <Input
							style={styles.inputElements}
							value={email}
							size={'large'}
							label="Email"
							placeholder={'Enter email'}
							onChangeText={(newEmail) => validateEmail(newEmail)}
							status={emailErr}
						/>
                        <Input
							style={styles.inputElements}
							value={place}
							size={'large'}
							label="Place"
							placeholder={'Enter place'}
							onChangeText={(newPlace) => setPlace(newPlace)}
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
							caption= {'Should contain at least 8 characters'}
							captionIcon={AlertIcon}
						/>
						<Input
							style={styles.inputElements}
							value={conPassword}
							size={'large'}
							label="Confirm Password"
							placeholder={'Re-enter password'}
							onChangeText={(conPass) => validatePassword(conPass)}
							secureTextEntry={true}
							status={passwordErr}
						/>
						<Button style={styles.inputElements}>
							Sign Up
						</Button>
					</Card>
				</ScrollView>
			</SafeAreaView>
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
});

export default RegisterForm;