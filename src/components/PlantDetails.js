import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const PlantDetails = ({ result }) => {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: result.image_url }} />
			<Text style={styles.name}>{result.common_name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 180,
		height: 180,
		borderRadius: 8,
		marginBottom: 5,
	},
	name: {
		fontWeight: 'bold',
	},
});

export default PlantDetails;
