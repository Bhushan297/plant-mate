import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Modal, Animated } from 'react-native';
import { Text, Button, Layout, Card, Input } from '@ui-kitten/components';
import Accordian from '../components/Accordian';
import plants from '../api/plants';
import { FontAwesome } from '@expo/vector-icons';
import FadeinView from '../components/FadeinView';
import LocalizationContext from '../components/Translation';
import i18n from 'i18n-js';

const FaqScreen = () => {
	const [results, setResults] = useState([]);
	const [value, setValue] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [visible, setVisible] = useState(false);
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const { setLocale, getLocale, initializeAppLanguage } = useContext(
		LocalizationContext
	);

	const getFaqs = async () => {
		try {
			const response = await plants.get(i18n.t('faqApi'));
			setResults(response.data);
		} catch (err) {
			console.log(err);
			setErrorMessage('Something went wrong');
		}
	};

	useEffect(() => {
		initializeAppLanguage();
		getFaqs();
	}, [i18n.locale]);

	const sendQuestion = (question) => {
		console.log(question);
	};

	const openModal = () => {
		setVisible(true);
		setValue('');
	}

	return (
		<Layout level="3" style={{ flex: 1 }}>
			<Text category="h3" style={styles.title}>
				{i18n.t('faqTitle')}
			</Text>
			{errorMessage ? <Text>{errorMessage}</Text> : null}
			<FlatList
				data={results}
				keyExtractor={(result) => result.id.toString()}
				renderItem={({ item }) => {
					return (
						<Accordian
							title={item.question}
							description={item.answer}
						/>
					);
				}}
			/>
			<Modal visible={visible} animationType={'slide'} transparent={true}>
				<FadeinView style={styles.backdrop}>
					<Card style={{ elevation: 5 }} disabled={true}>
						<Text category="s1">{i18n.t('faqModalTitle')}</Text>
						<Input
							placeholder={i18n.t('faqModalPlaceholder')}
							value={value}
							style={{ marginTop: 10 }}
							onChangeText={(nextValue) => setValue(nextValue)}
						/>
						<Button
							style={styles.buttonStyle}
							onPress={() => sendQuestion(value)}
						>
							{i18n.t('buttonSend')}
						</Button>
						<Button
							style={styles.buttonStyle}
							status="danger"
							onPress={() => setVisible(false)}
						>
							{i18n.t('buttonDismiss')}
						</Button>
					</Card>
				</FadeinView>
			</Modal>
			<TouchableOpacity
				style={styles.floating}
				activeOpacity={0.8}
				onPress={openModal}
			>
				<FontAwesome name="plus" size={24} color="white" />
			</TouchableOpacity>
		</Layout>
	);
};

const styles = StyleSheet.create({
	title: {
		flexDirection: 'row',
		textAlign: 'center',
		marginVertical: 15,
	},
	floating: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2FDA82',
		width: 50,
		height: 50,
		borderRadius: 50,
		position: 'absolute',
		bottom: 10,
		right: 10,
		elevation: 3,
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
	}
});

export default FaqScreen;
