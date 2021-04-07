import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native';
import {
	Layout,
	Input,
	Text,
	Button,
	Icon,
    Card
} from '@ui-kitten/components';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const eyeIcon = (props) => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
		</TouchableWithoutFeedback>
	);

    const labelStyle = (name) => (
        <Text style={styles.label} category='h6'>{name}</Text>
    )

    const cardHeader = () => (
        <Text style={styles.title}>Login</Text>
    )

	return (
		<Layout style={{ flex: 1 }}>
			<Card 
                style={styles.container}
                header={cardHeader}
            >
				<Input
					style={styles.inputElements}
					value={email}
					size={'large'}
					label="Email"
					placeholder={'Enter email'}
					onChangeText={(newEmail) => setEmail(newEmail)}
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
                <Button appearance='ghost'>Forgot password?</Button>
				<Button style={styles.inputElements}>
					Log in
				</Button>
			</Card>
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
});

export default LoginForm;