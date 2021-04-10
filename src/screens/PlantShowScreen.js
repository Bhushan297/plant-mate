import React, { useState, useEffect } from 'react';
import { Image, FlatList, View, ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Card, Divider, List, ListItem } from '@ui-kitten/components';
import trefle from '../api/trefle';

const PlantShowScreen = ({ navigation }) => {
	const [result, setResult] = useState(null);
	const name = navigation.getParam('name');
	const getResult = async (name) => {
		const response = await trefle.get('/', {
			params: {
				'filter[common_name]': name,
			},
		});
		setResult(response.data.data[0]);
	};

	useEffect(() => {
		getResult(name);
	}, []);

	if (!result) {
		return null;
	}

	const header = () => (
		<View style={styles.title}>
			<Text category="h1">{result.common_name}</Text>
		</View>
	);

	return (
		<ScrollView styles={{ flex: 1 }}>
			<Card style={styles.cardStyle} header={header}>
				<Divider />
				<Image
					style={styles.image}
					source={{ uri: result.image_url }}
				/>
			</Card>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	cardStyle: {
		margin: 10,
		alignItems: 'center',
	},
	title: {
		alignSelf: 'center',
		fontSize: 18,
		marginVertical: 10,
		color: '#111344',
	},
	image: {
		width: 300,
		height: 200,
	},
});

export default PlantShowScreen;
