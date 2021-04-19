import React from 'react';
import { Image, View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Divider } from '@ui-kitten/components';

const PlantShowScreen = ({ navigation }) => {
	const result = navigation.getParam('data');

	const header = () => (
		<View style={styles.title}>
			<Text category="h1">{result.name}</Text>
		</View>
	);

	return (
		<ScrollView styles={{ flex: 1 }}>
			<View style={styles.cardStyle}>
				<Image
					style={styles.image}
					source={{ uri: result.image_url }}
				/>
				<View style={styles.infoRow}>
					<View style={{flexShrink: 1, marginRight: 5}}>
						<Text style={styles.itemTitle} category="h3">
							Plant
						</Text>
						<Text style={styles.rowDescr} category="s1">
							{result.name}
						</Text>
					</View>
					<View style={{flexShrink: 1, marginRight: 5}}>
						<Text style={styles.itemTitle} category="h3">
							Disease
						</Text>
						<Text style={styles.rowDescr} category="s1">
							{result.disease_name}
						</Text>
					</View>
					<View style={{flexShrink: 1, marginRight: 5}}>
						<Text style={styles.itemTitle} category="h3">
							Probability
						</Text>
						<Text style={styles.rowDescr} category="s1">
							{result.disease_prob}
						</Text>
					</View>
				</View>
				<View style={styles.listItem}>
					<Text style={styles.itemTitle} category="h3">
						Cause of disease
					</Text>
					<Text style={styles.descr} category="s1">
						{result.cause}
					</Text>
				</View>
				<View style={styles.listItem}>
					<Text style={styles.itemTitle} category="h3">
						Remedy
					</Text>
					<Text style={styles.descr} category="s1">
						{result.cure}
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	cardStyle: {
		marginVertical: 15,
		alignItems: 'center',
		marginHorizontal: 20,
	},
	infoRow: {
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingVertical: 10,
	},
	title: {
		alignSelf: 'center',
		fontSize: 18,
		marginVertical: 10,
		color: '#111344',
	},
	image: {
		aspectRatio: 1,
		width: '85%',
		borderRadius: 5,
	},
	listItem: {
		paddingVertical: 10,
		// alignItems: 'center',
	},
	itemTitle: {
		color: '#161A12',
	},
	rowDescr: {
		color: '#697177',
		marginRight: 5,
		flexShrink: 1,
		marginRight: 5,
		// width: '50%'
	},
	descr: {
		marginTop: 5,
		color: '#697177',
	},
});

export default PlantShowScreen;
