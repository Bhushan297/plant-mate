import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Text } from '@ui-kitten/components';

const PlantDetails = ({ result }) => {
	const dimWidth = Dimensions.get('window').width;
	const dimHeight = Dimensions.get('window').height;
	return (
		<View style={styles.container}>
			<Image
				style={{
					width: dimWidth / 2.25,
					height: dimWidth / 2.25,
					borderRadius: 8,
					marginBottom: 5,
					marginHorizontal: 8,
				}}
				source={{ uri: result.image_url }}
			/>
			<Text style={styles.name}>{result.name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	name: {
		fontWeight: 'bold',
		textAlign: 'center'
	},
});

export default PlantDetails;
