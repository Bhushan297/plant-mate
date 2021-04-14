import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import useResults from '../hooks/useResults';
import PlantDetails from '../components/PlantDetails';

const HomeScreen = ({parent}) => {
	const [term, setTerm] = useState('');
	const [results, errorMessage, searchApi] = useResults();
	
	return (
		<Layout level='2' style={{ flex: 1 }}>
			{errorMessage ? <Text>{errorMessage}</Text> : null}
			<FlatList
				data={results}
				style={styles.container}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				keyExtractor={(result) => result.id.toString()}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() =>
								parent.navigate('PlantShow', {
									data: item,
								})
							}
							style={styles.image}
						>
							<PlantDetails result={item} />
						</TouchableOpacity>
					);
				}}
			/>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 10
	},
	image: {
		width: '45%',
		marginBottom: 15,
		marginHorizontal: 10,
		borderRadius: 8
	},
});

export default HomeScreen;


