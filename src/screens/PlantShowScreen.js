import React from 'react';
import { Image, View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Divider } from '@ui-kitten/components';

const PlantShowScreen = ({ navigation }) => {
	const result = navigation.getParam('data');
	console.log(Object.keys(result));

	const header = () => (
		<View style={styles.title}>
			<Text category="h1">{result.name}</Text>
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
				<Divider />
				<View style={styles.listItem}>
					<Text style={styles.itemTitle} category="s1">
						Plant name
					</Text>
					<Text style={styles.descr}>{result.name}</Text>
				</View>
				<Divider />
				<View style={styles.listItem}>
					<Text style={styles.itemTitle} category="s1">
						Disease
					</Text>
					<Text style={styles.descr}>{result.disease_name}</Text>
				</View>
				<Divider />
				<View style={styles.listItem}>
					<Text style={styles.itemTitle} category="s1">
						Probability of disease
					</Text>
					<Text style={styles.descr}>{result.disease_prob}</Text>
				</View>
				<Divider />
				<View style={styles.listItem}>
					<Text style={styles.itemTitle} category="s1">
						Cause of disease
					</Text>
					<Text style={styles.descr}>{result.cause}</Text>
				</View>
				<Divider />
				<View style={styles.listItem}>
					<Text style={styles.itemTitle} category="s1">
						Remedy
					</Text>
					<Text style={styles.descr}>{result.cure}</Text>
				</View>
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
	listItem: {
		paddingVertical: 10,
		alignItems: 'center',
	},
	itemTitle: {
		color: '#13293D',
	},
	descr: {
		color: '#0B992C',
	},
});

export default PlantShowScreen;
