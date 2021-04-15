
import React, { useState } from 'react';
import {
	StyleSheet,
	Image,
	SafeAreaView, 
	ScrollView,
} from 'react-native';
import {
	Layout,
	Input,
	Text,
	Button,
    Card
} from '@ui-kitten/components';

const ForgotPassForm = ({navigation}) => {

	const [email, setEmail] = useState('');
	const [emailErr, setEmailErr] = useState('basic');

    const cardHeader = () => (
        <Text style={styles.title}>Forgot Password</Text>
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

	return (
		<Layout style={{ flex: 1, backgroundColor: "#CBF6E0" }}>
			<SafeAreaView>
				<ScrollView 
					showsVerticalScrollIndicator = {false}
				>
					<Image
						style={styles.tinyLogo}
						source={require('./../../assets/logo.png')}
					/>
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
							onChangeText={(newEmail) => validateEmail(newEmail)}
							status={emailErr}
						/>
						<Button style={styles.inputElements}>
							Get OTP
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
		width: 300,
		height: 300,
		alignSelf: 'center',
	},
});

export default ForgotPassForm;